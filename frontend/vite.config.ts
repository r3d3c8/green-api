import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'process'

const port = +(process.env.VITE_PORT || 5173)
const apiPort  = +(process.env.API_PORT || 8080)

console.log(`USING VITE_PORT=${port}, API_PORT=${apiPort}`)
console.log(process.env)

export default defineConfig({
  plugins: [react()],
  server: {
    port: port,
    proxy: {
      '/proxy': {
        target: `http://localhost:${apiPort}/`,
        changeOrigin: true,
      },
    },
  },
})
