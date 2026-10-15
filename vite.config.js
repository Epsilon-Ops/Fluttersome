import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/Fluttersome/',

  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'Fluttersome',
        short_name: 'Fluttersome',
        description: 'Mon application accessible hors ligne',
        theme_color: '#6d28d9',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: './',
        scope: './',

        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },

      workbox: {
        globPatterns: [
          '**/*.{js,css,html,svg,png,ico,woff2}'
        ]
      }
    })
  ]
})