import { defineConfig } from 'vite'

export default defineConfig({
  base: '/hapi-monthsary_baby/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
