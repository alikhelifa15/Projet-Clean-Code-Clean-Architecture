import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
      interval: 100
    },
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      host: 'localhost', 
      port: 5173,
      clientPort: 3001, 
      protocol: 'ws',
      timeout: 120000,
      overlay: true,
    }
  },
  optimizeDeps: {
    force: true
  },
  
})