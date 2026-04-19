import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages deploys this site under https://<user>.github.io/kmd-student-academy/,
// so every asset URL must be prefixed with the repo name. Override at build time
// with VITE_BASE_PATH when deploying to a root-level host (e.g. custom domain).
const basePath = process.env.VITE_BASE_PATH ?? '/kmd-student-academy/';

// https://vite.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [react()],
});
