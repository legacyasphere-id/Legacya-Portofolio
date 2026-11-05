import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';
import {OG_IMAGE_URL, SITE_URL} from './src/core/site';

// Replaces %SITE_URL% and %OG_IMAGE_URL% in index.html with the constants in
// src/core/site.ts, so the canonical host is defined in exactly one place.
// Also copies dist/index.html to dist/404.html so GitHub Pages deep links
// (such as /Legacya-Portofolio/work) load the SPA router instead of a static 404.
function siteUrlPlugin(): Plugin {
  return {
    name: 'legacya-site-url',
    transformIndexHtml(html) {
      return html
        .replaceAll('%SITE_URL%', SITE_URL)
        .replaceAll('%OG_IMAGE_URL%', OG_IMAGE_URL);
    },
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexHtml = path.join(distDir, 'index.html');
      const notFoundHtml = path.join(distDir, '404.html');
      if (fs.existsSync(indexHtml)) {
        fs.copyFileSync(indexHtml, notFoundHtml);
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: process.env.GITHUB_ACTIONS ? '/Legacya-Portofolio/' : '/',
    plugins: [react(), tailwindcss(), siteUrlPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
