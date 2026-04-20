import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./scss/utils/_variables.scss"; @import "./scss/utils/_shared-mixins.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@layout': '/src/layout',
      '@assets': '/src/assets',
      '@data': '/src/data',
      '@hooks': '/src/hooks',
      '@modules': '/src/modules',
      '@api': '/src/api',
      '@utils': '/src/utils',
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
        },
      },
    },
  },
});
