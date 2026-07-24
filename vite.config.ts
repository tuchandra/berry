import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Custom domain (tusharc.dev) lives on the user pages site (tuchandra.github.io).
// Project pages from tuchandra/berry are served at tusharc.dev/berry/.
// In dev, no base path. In prod build, base = '/berry/'.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/berry/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
}));
