import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
});
