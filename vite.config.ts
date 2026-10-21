import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';
import {OG_IMAGE_URL, SITE_URL} from './src/core/site';

// Replaces %SITE_URL% and %OG_IMAGE_URL% in index.html with the constants in
// src/core/site.ts, so the canonical host is defined in exactly one place.
function siteUrlPlugin(): Plugin {
  return {
    name: 'legacya-site-url',
    transformIndexHtml(html) {
      return html
        .replaceAll('%SITE_URL%', SITE_URL)
        .replaceAll('%OG_IMAGE_URL%', OG_IMAGE_URL);
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
