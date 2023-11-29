/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 80,
    watch: {
      usePolling: true,
      useFsEvents: true,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/Tests/setup.tsx',
    coverage: {
      provider: 'istanbul',
      reporter: ['cobertura'],
    },
  },
});
