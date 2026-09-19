import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import documentRoutes from './routes/documents.js';
import revisionRoutes from './routes/revisions.js';
import { errorHandler } from './middleware/errorHandler.js';
const app = express();
app.use(cors({
  origin: [
    env.CLIENT_URL,
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});
app.use('/api/documents', documentRoutes);
app.use('/api/documents/:id/revisions', revisionRoutes);
app.use(errorHandler);
export default app;