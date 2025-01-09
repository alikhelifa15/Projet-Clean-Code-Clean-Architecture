import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],  // React plugin sans options supplémentaires
  server: {
    watch: {
      usePolling: true,
      interval: 100
    },
    host: true,
    port: 5173,
    strictPort: true,
    hmr: {
      host: '0.0.0.0',
      port: 5173,
      clientPort: 5173,
      protocol: 'ws',
      timeout: 120000,
      overlay: true,
    }
  },
  optimizeDeps: {
    force: true
  }
})