import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    minify: true,
    sourcemap: true,
    commonjsOptions: {
      include: [],
    },
    target: ['es2020'],
  },
  resolve: {
    alias: {
      mqtt: 'mqtt/dist/mqtt.js',
    },
  },
  optimizeDeps: {
    disabled: false,
  },
});
