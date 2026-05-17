# LEXGUARD 🛡️

**LEXGUARD** is an enterprise-grade AI Rights & Contract Intelligence platform designed to protect users from exploitative legal agreements. It leverages a powerful Multi-Agent AI architecture (powered by Google's Gemini 2.5 Flash via Vertex AI) to ingest, analyze, and remediate high-risk clauses in contracts, terms of service, and offer letters.

## 🌟 Key Features
- **Zero-Disk Storage Policy**: Total privacy. Documents are parsed directly from volatile execution memory (buffers) and instantly destroyed post-analysis.
- **Hierarchical Multi-Agent AI**:
  - **Manager Agent**: Coordinates data parsing, risk calculations, and final output JSON structuring.
  - **Clause Extractor Agent**: Deep-reads contracts to map out every explicit and implicit clause.
  - **Risk Evaluator Agent**: Assesses clauses against asymmetric liabilities and calculates a numeric risk percentage (0-100%).
  - **Remediation Advisor Agent**: Generates actionable, strategic counter-offers and safer alternative phrasing.
- **Hybrid Cloud Architecture**: The backend is completely serverless via Google Cloud Run, while the frontend is an ultra-fast React SPA optimized for Vercel delivery.

---

## 🛠 Tech Stack

### Frontend (`/frontend`)
- React 18 (Vite)
- TypeScript
- Tailwind CSS
- Lucide React Icons

### Backend (`/backend`)
- Node.js (v20+)
- Express.js
- Google Cloud Vertex AI SDK (`@google-cloud/vertexai`)
- Multer (Memory-only storage)
- Docker

---

## 🚀 Local Development Guide

### 1. Backend Setup
Navigate to the backend and install dependencies:
```bash
cd backend
npm install
```

**Authentication:** Because LEXGUARD uses the enterprise Vertex AI SDK, you must authenticate your local terminal with Google Cloud Application Default Credentials (ADC) to access the Gemini models:
```bash
gcloud auth application-default login
```

Start the backend API (defaults to port 8080):
```bash
npm run dev
```

### 2. Frontend Setup
In a new terminal, navigate to the frontend:
```bash
cd frontend
npm install
npm run dev
```
Open your browser to `http://localhost:5173`. The frontend is automatically configured to point to `localhost:8080` for local API requests.

---

## ☁️ Production Deployment

### 1. Deploy the Backend to Google Cloud Run
A robust automated deployment script is provided at the root of the project. Ensure you have the `gcloud` CLI installed, authenticated (`gcloud auth login`), and linked to a Google Cloud Project with an active billing account.

```bash
chmod +x deploy-backend.sh
./deploy-backend.sh
```
*Note: This script will automatically create the necessary Docker Artifact Registry, configure Cloud Storage build buckets, build the container image, and deploy it serverless to Cloud Run.*

Once the script finishes, **copy the generated HTTPS Service URL.**

### 2. Deploy the Frontend to Vercel
1. Push this entire repository to GitHub.
2. Import the `/frontend` directory as a new project in your Vercel Dashboard.
3. Before deploying, go to the Vercel project **Environment Variables** settings and add:
   - **Key:** `VITE_API_URL`
   - **Value:** `[Your Google Cloud Run HTTPS URL]`
4. Click **Deploy**. Vercel will automatically read the `vercel.json` router config and deploy the React application.
