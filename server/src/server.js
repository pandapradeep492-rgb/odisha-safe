import 'dotenv/config';
import { createApp } from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

/**
 * Boots the server. Tries to connect to MongoDB first; if the connection fails
 * (e.g. Mongo not running), the API still starts so health/checks work — but
 * DB-backed routes will return errors until a connection is available.
 */
async function start() {
  const app = createApp();

  try {
    await connectDB(process.env.MONGODB_URI);
    // eslint-disable-next-line no-console
    console.log('✅ MongoDB connected');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(
      `⚠️  Could not connect to MongoDB (${err.message}).\n` +
        '   The API will start, but database routes will fail until MongoDB is available.\n' +
        '   Tip: set MONGODB_URI in server/.env and ensure MongoDB is running.'
    );
  }

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 ODISHA SAFE API listening on http://localhost:${PORT}`);
  });
}

start();
