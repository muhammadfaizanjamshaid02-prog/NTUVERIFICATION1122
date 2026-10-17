import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages project site:
  // https://muhammadfaizanjamshaid02-prog.github.io/NTUVERIFICATION1122/
  base: '/NTUVERIFICATION1122/',
  server: {
    port: 5173,
  },
});
