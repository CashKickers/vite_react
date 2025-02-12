import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'prompt',
    injectRegister: false,

    pwaAssets: {
      disabled: true,
    },

    manifest: {
      name: 'Rising Restaurant',
      short_name: 'RR',
      description: 'Rising Restaurant',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/pwa-icon/maskable_icon_x48.png',
          sizes: '48x48',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/pwa-icon/maskable_icon_x72.png',
          sizes: '72x72',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/pwa-icon/maskable_icon_x96.png',
          sizes: '96x96',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/pwa-icon/maskable_icon_x128.png',
          sizes: '128x128',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/pwa-icon/maskable_icon_x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/pwa-icon/maskable_icon_x384.png',
          sizes: '384x384',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/pwa-icon/maskable_icon_x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  }), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})