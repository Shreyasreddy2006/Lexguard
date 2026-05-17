import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { uploadMiddleware } from './middleware/fileUpload';
import { analyzeDocument } from './services/agentOrchestrator';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080; // Cloud Run default port is 8080

// Dynamic CORS for Vercel and local development
const allowedOrigins = process.env.CORS_ORIGIN 
  ? [process.env.CORS_ORIGIN, 'http://localhost:5173'] 
  : '*';

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Health check endpoint for Cloud Run
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.post('/api/analyze', uploadMiddleware.single('document'), async (req, res): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No document uploaded or invalid file format' });
      return;
    }

    console.log(`Processing document: ${req.file.originalname} (${req.file.size} bytes)`);

    // In-memory zero-disk execution
    const analysisResult = await analyzeDocument(req.file.buffer, req.file.mimetype);

    // Explicitly drop buffer reference to aid garbage collection
    req.file.buffer = Buffer.alloc(0);

    res.json(analysisResult);
  } catch (error: any) {
    console.error('Document analysis failed:', error);
    res.status(500).json({ error: error.message || 'Internal server error during analysis' });
  }
});

app.listen(port, () => {
  console.log(`LEXGUARD API listening on port ${port}`);
});
