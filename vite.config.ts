import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/Legacya-Portofolio/' : '/',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
})
