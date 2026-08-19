import { isDbConnected } from '../config/db.js';

/**
 * Guards database-backed routes. If MongoDB is not connected, respond with a
 * clean 503 immediately instead of letting the request hang or throw a noisy
 * buffering error.
 *
 * This pairs with the frontend's demo-fallback: a fast, well-formed error lets
 * the client switch to clearly-labeled demo data without a long delay.
 */
export function requireDb(req, res, next) {
  if (!isDbConnected()) {
    return res.status(503).json({
      message:
        'Database unavailable (running in demo mode). Start MongoDB and set MONGODB_URI to enable live data.',
      demoMode: true,
    });
  }
  next();
}
