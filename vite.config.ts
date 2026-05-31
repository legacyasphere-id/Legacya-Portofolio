import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Vercel deploys at root; GitHub Pages needs the repo subpath
  base: process.env.VERCEL ? '/' : '/Legacya-Portofolio/',
})
