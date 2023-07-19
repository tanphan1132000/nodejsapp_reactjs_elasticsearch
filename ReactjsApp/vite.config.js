import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      "/books": {
        target: "http://nodejsapp:3000",
        changeOrigin: true,
        secure: false
      }
    },
  },
  plugins: [react()],
});