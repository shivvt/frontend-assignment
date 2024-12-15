// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,   // Enable globals for Jest matchers like 'expect'
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',  // Path to setupTests.js
  },
});
