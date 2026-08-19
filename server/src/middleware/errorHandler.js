/**
 * Central error-handling + 404 middleware.
 */

export function notFound(req, res, next) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(', ') });
  }
  // Duplicate key
  if (err.code === 11000) {
    return res.status(409).json({ message: 'Duplicate value violates a unique constraint.' });
  }
  // JWT errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }

  const status = err.status || 500;
  // eslint-disable-next-line no-console
  if (status >= 500) console.error('Server error:', err);
  res.status(status).json({ message: err.message || 'Internal server error' });
}

/** Wrap async route handlers to forward rejections to the error handler. */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
