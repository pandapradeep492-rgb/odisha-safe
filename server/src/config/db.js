import mongoose from 'mongoose';

/**
 * Connects to MongoDB using MONGODB_URI. Throws on failure so the caller can
 * decide whether to exit or continue (server.js logs and continues so the API
 * still starts; DB-backed routes will return a clean 503 until connected).
 *
 * We disable Mongoose command buffering so that when the DB is NOT connected,
 * queries fail fast with an error instead of hanging forever. This is critical
 * for demo mode: the frontend expects DB routes to fail quickly so it can fall
 * back to demo data rather than waiting on a stalled request.
 */
mongoose.set('strictQuery', true);
mongoose.set('bufferCommands', false);

export async function connectDB(uri) {
  if (!uri) throw new Error('MONGODB_URI is not set');
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000,
  });
  return mongoose.connection;
}

/** 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting */
export function dbState() {
  return mongoose.connection.readyState;
}

/** Convenience helper: is the database currently usable? */
export function isDbConnected() {
  return mongoose.connection.readyState === 1;
}
