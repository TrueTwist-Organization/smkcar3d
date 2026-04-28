import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get all .html files in the root directory
const getHtmlEntries = () => {
  const entries = {};
  const files = fs.readdirSync(__dirname);
  files.forEach(file => {
    if (file.endsWith('.html')) {
        const name = file.replace(/\.html$/, '');
        // For subdirectories, join the path segment
        entries[name] = resolve(__dirname, file);
    }
  });
  return entries;
};

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild',
    rollupOptions: {
        input: getHtmlEntries()
    }
  }
});
