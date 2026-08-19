import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { dbState } from './config/db.js';

/**
 * Builds and configures the Express app (separated from server startup so it
 * can be imported for testing).
 */
export function createApp() {
  const app = express();

  // Security headers.
  app.use(helmet());

  // CORS — allow configured client origins (comma-separated).
  const origins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim());
  app.use(
    cors({
      origin: origins.length === 1 && origins[0] === '*' ? true : origins,
      credentials: true,
    })
  );

  // Body parsing + logging.
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  // Basic rate limiting to protect the API.
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use('/api', limiter);

  // Health check. `success` + `message` fields make it easy for the frontend
  // to detect backend availability; `db`/`demoMode` clarify data source.
  app.get('/api/health', (req, res) => {
    const connected = dbState() === 1;
    res.json({
      success: true,
      message: 'ODISHA SAFE API is running',
      db: connected ? 'connected' : 'disconnected',
      demoMode: !connected,
    });
  });


  // API routes.
  app.use('/api', routes);

  // 404 + error handling.
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
