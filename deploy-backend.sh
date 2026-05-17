#!/bin/bash
set -e

echo "Deploying LEXGUARD Backend to Google Cloud Run..."

PROJECT_ID=$(gcloud config get-value project)
REGION="us-central1"
SERVICE_NAME="lexguard-api"
IMAGE_NAME="us-central1-docker.pkg.dev/$PROJECT_ID/lexguard-repo/$SERVICE_NAME"
BUCKET_NAME="gs://${PROJECT_ID}-custom-build-bucket"

echo "1. Enabling required GCP APIs..."
gcloud services enable run.googleapis.com \
  aiplatform.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  storage.googleapis.com

echo "2. Setting up Artifact Registry..."
gcloud artifacts repositories create lexguard-repo \
  --repository-format=docker \
  --location=$REGION \
  --description="Docker repository" || true

echo "3. Creating custom Cloud Storage bucket for build..."
# We explicitly create a bucket because the auto-generated one often fails with PERMISSION_DENIED on new accounts
gcloud storage buckets create $BUCKET_NAME --location=$REGION || true

echo "4. Building and pushing container image to Artifact Registry..."
cd backend
gcloud builds submit --tag $IMAGE_NAME --gcs-source-staging-dir $BUCKET_NAME/source

echo "5. Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE_NAME \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_CLOUD_PROJECT=$PROJECT_ID,GOOGLE_CLOUD_LOCATION=$REGION \
  --memory 512Mi

echo "Deployment complete! Copy the Service URL above and set it as VITE_API_URL in your Vercel frontend."
