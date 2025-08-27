import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    hmr: {
      clientPort: 3000
    },
    proxy: {
      // Proxy API requests to Laravel backend
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        configure: () => {
         
        }
      },
      // Proxy Sanctum routes
      '/sanctum': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      // '@': resolve(__dirname, 'src'),
      // Crypto polyfill for browser compatibility
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      util: 'util'
    }
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  },
  optimizeDeps: {
    include: ['crypto-browserify', 'stream-browserify', 'util']
  }

})
