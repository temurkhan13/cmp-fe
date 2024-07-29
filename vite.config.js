import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import string from 'vite-plugin-string';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    string({
      include: '**/*.html',
    }),

    {
      name: 'exclude-component-minification',
      enforce: 'post',
      apply: 'build',
      async transform(code, id) {
        if (id.endsWith('WordReportTemplate.jsx')) { // Adjust the condition to match your component file
          return {
            code,
            map: null // Provide source map if necessary
          };
        }

        // For other files, use esbuild to minify the code
        const result = await esbuild.transform(code, {
          minify: true,
          sourcemap: false,
        });

        return {
          code: result.code,
          map: result.map
        };
      }
    }

  ],
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
  server: {
    proxy: {
      '/api': {
        target: 'http://139.59.4.99:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

})
