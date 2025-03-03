import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import autoprefixer from 'autoprefixer';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({}), // add options if needed
      ],
    },
  },
  plugins: [react(), svgr({})],
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      external: [/^node:\w+/],
    },
  },
});
