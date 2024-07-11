import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      //  Alias for importing components from a directory
      '@components': '/src/components',
      '@styles': '/src/styles',
      '@layout': '/src/layout',
      '@assets': '/src/assets',
      '@data': '/src/data',
      '@hooks': '/src/hooks',
      '@modules': '/src/modules',
      '@api': '/src/api',
      '@utils': '/src/utils',
      '@store': '/src/store',
      
    },
  },

})
