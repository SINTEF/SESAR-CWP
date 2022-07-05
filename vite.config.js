import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  plugins: [react(), commonjs()],
  build: {
    minify: true,
    sourcemap: true,
  },
  resolve: {
    alias: {
      mqtt: 'mqtt/dist/mqtt.js',
    },
  },
});
