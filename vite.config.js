import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/GA4-Campaign-URL-Builder/',
  server: {
    host: '0.0.0.0'
  },
  optimizeDeps: {
    include: ['date-fns/locale']
  }
});