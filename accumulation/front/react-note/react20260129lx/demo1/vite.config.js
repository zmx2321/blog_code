import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // 避免绑定到 IPv6 (::1) 导致 EPERM
    port: 5173,
  },
})
