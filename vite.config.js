import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Isso faz com que o Vite ouça em 0.0.0.0, acessível via IP da rede
    port: 5173,
  }
})
