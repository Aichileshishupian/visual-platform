import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/mock': {
        target: 'http://127.0.0.1:4523',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mock/, '/m1/8029820-7784537-default')
      }
    }
  }
})