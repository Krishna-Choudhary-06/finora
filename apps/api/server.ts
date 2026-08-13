import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
import { env } from './config';
import authRouter from './src/auth.routes';

const app = express();
const port = env.PORT || 4000;

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Structured logging
app.use((req, res, next) => {
  const requestId = req.headers['x-request-id'] || req.headers['x-correlation-id'] || 'req-' + Date.now();
  req.headers['x-request-id'] = requestId;
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    requestId,
    method: req.method,
    url: req.url,
  }));
  next();
});

app.use('/api/auth', authRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((req, res) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Endpoint not found' }});
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(JSON.stringify({
    timestamp: new Date().toISOString(),
    requestId: req.headers['x-request-id'],
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  }));
  res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Internal Server Error' }});
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const shutdown = () => {
  console.log('Shutting down server gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
