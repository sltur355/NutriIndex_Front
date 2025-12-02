import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    // mkcert убираем отсюда
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'NutriScan',
        short_name: 'NutriScan',
        start_url: '/NutriIndex_Front/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0097B3',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/NutriIndex_Front/logo192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: '/NutriIndex_Front/logo512.png',
            type: 'image/png',
            sizes: '512x512',
          },
        ],
      },
    }),
  ],
  base: '/NutriIndex_Front/',
  server: {
    port: 5173,  // ← стандартный Vite порт
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/'),
      },
    },
  },
})
