import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import string from 'vite-plugin-string';



// To get the local IP address
import os from 'os';

const getLocalIPAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const iface = interfaces[interfaceName];
    for (const alias of iface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
};


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
    server: {
      host: getLocalIPAddress() || '0.0.0.0',
      port: 5173, // You can change the port if needed
      strictPort: true, // Ensure the selected port is used, if not available, it will fail
    },

    proxy: {
      '/api': {
        target: 'http://139.59.4.99:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

})
