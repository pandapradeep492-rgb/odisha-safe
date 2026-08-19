import mongoose from 'mongoose';

/**
 * Connects to MongoDB using MONGODB_URI. Throws on failure so the caller can
 * decide whether to exit or continue (server.js logs and continues so the API
 * still starts; DB-backed routes will return errors until connected).
 */
export async function connectDB(uri) {
  if (!uri) throw new Error('MONGODB_URI is not set');
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000,
  });
  return mongoose.connection;
}

export function dbState() {
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  return mongoose.connection.readyState;
}
