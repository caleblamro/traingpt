import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Update the path to your entry file if needed
      '@/index.js': '@/index.tsx'
    },
  },
})
