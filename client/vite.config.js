import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the ODISHA SAFE client.
// The dev server proxies /api requests to the Express backend so that the
// frontend can talk to the API without CORS issues during local development.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_PROXY_TARGET || 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
  },
});
