import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-redux': ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
          'vendor-ui': ['framer-motion', 'formik', 'yup', 'react-icons'],
          'vendor-editors': ['jodit-react'],
          'vendor-export': ['exceljs', 'jspdf', 'pptxgenjs'],
        },
      },
    },
  },
});
