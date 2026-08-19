import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the ODISHA SAFE client.
//
// IMPORTANT: This is a React + Vite app. It MUST be started with the Vite dev
// server (`npm run dev`) or served as a built bundle (`npm run build` +
// `npm run preview`). Do NOT open client/index.html directly with VS Code
// "Live Server" (e.g. http://127.0.0.1:5500/client/index.html) — the app is
// compiled from /src/main.jsx by Vite, so opening the raw HTML shows a blank
// page because the JSX modules are never transformed/served.
//
// The dev server proxies /api requests to the Express backend so that the
// frontend can talk to the API without CORS issues during local development.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Open the correct URL automatically so the app is easy to launch.
    open: true,
    proxy: {
      '/api': {
        target: process.env.VITE_PROXY_TARGET || 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 4173,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
  },
});
