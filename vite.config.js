import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/hapi-monthsary_baby/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
