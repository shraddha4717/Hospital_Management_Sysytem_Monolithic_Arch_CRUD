import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy /api calls to Spring Boot backend
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
})
