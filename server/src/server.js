import 'dotenv/config';
import { createApp } from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

/**
 * Boots the server. Tries to connect to MongoDB first; if the connection fails
 * (e.g. Mongo not running), the API still starts so health/checks work — but
 * DB-backed routes return a fast 503 (demo mode) until a connection is available.
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
        '   The API will start in DEMO MODE; database routes return 503 until MongoDB is available.\n' +
        '   Tip: set MONGODB_URI in server/.env and ensure MongoDB is running.'
    );
  }

  const server = app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 ODISHA SAFE API listening on http://localhost:${PORT}`);
  });

  // Friendly, non-crashing message if the port is already taken. On macOS,
  // port 5000 is often used by the AirPlay Receiver / Control Center — either
  // disable it (System Settings → General → AirDrop & Handoff) or set a
  // different PORT in server/.env (e.g. PORT=5001) and update the Vite proxy.
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      // eslint-disable-next-line no-console
      console.error(
        `\n❌ Port ${PORT} is already in use.\n` +
          '   • On macOS, disable the AirPlay Receiver (System Settings → General →\n' +
          '     AirDrop & Handoff), or\n' +
          `   • Set a different port in server/.env, e.g. PORT=5001, then update\n` +
          '     client/.env VITE_PROXY_TARGET=http://localhost:5001\n'
      );
      process.exit(1);
    }
    throw err;
  });
}

start();
