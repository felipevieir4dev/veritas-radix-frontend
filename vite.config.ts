import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname || '.', './'),
      '@/components': resolve(import.meta.dirname || '.', './components'),
      '@/lib': resolve(import.meta.dirname || '.', './lib'),
      '@/styles': resolve(import.meta.dirname || '.', './styles'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-accordion', '@radix-ui/react-alert-dialog', '@radix-ui/react-dialog'],
        },
      },
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
})