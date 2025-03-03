import {defineConfig} from 'vite';
import autoprefixer from 'autoprefixer';
import react from '@vitejs/plugin-react-swc';
// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    base: './',
    build: {
      outDir: 'dist',
    },
    resolve: {
      alias: [{find: '@', replacement: '/src'}],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({}), // add options if needed
        ],
      },
    },
    server: {
      port: 5173,
      proxy: {
        // https://vitejs.dev/config/server-options.html
      },
    },
  };
});
