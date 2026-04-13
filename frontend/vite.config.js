import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, repoRoot, '');
  const backendPort = env.PORT || '5000';

  return {
    // Load `VITE_*` from repo root `.env` (same file as backend), not only `frontend/.env`
    envDir: repoRoot,
    plugins: [react()],
    server: {
      port: 5173,
      // Dev: browser calls same-origin `/api` → Vite forwards to Express (avoids wrong VITE_API_URL / PORT mismatch)
      proxy: {
        '/api': {
          target: `http://127.0.0.1:${backendPort}`,
          changeOrigin: true
        }
      }
    }
  };
});
