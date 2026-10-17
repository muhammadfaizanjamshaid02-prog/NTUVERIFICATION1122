import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path: '/NTUVERIFICATION1122/' for the GitHub Pages project site,
  // '/' for Vercel (Vercel sets the VERCEL env var during builds).
  base: process.env.VERCEL ? '/' : '/NTUVERIFICATION1122/',
  server: {
    port: 5173,
  },
});
