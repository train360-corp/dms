import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: 'manifest.xml', dest: '' },
        { src: 'public/icons/**/*', dest: 'icons' },
      ],
    }),
  ],
  server: {
    port: 3000,
  }
});