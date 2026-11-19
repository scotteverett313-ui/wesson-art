import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Inline (empty) PostCSS config so Vite doesn't pick up a postcss.config
  // from a parent directory when this folder lives inside another repo.
  css: { postcss: {} },
});
