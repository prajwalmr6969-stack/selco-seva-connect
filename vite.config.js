import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/selco-seva-connect/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  }
}))
