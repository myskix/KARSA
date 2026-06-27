import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'icon.svg'
      ],
      devOptions: {
        enabled: true
      },
      workbox: {
        // Cache all static assets including JS, CSS, HTML, JSON, SVG, images
        globPatterns: [
          '**/*.{js,css,html,json,svg,png,jpg,webp,woff,woff2}'
        ],
        // Runtime caching for any fetched resources
        runtimeCaching: [
          {
            // Cache Google Fonts (if used in the future)
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Cache external images (ui-avatars etc)
            urlPattern: /^https:\/\/ui-avatars\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'external-images-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      manifest: {
        name: 'KARSA - Konselor Karir Siswa Afirmasi',
        short_name: 'KARSA',
        description: 'Offline-First Digital Career Counselor untuk siswa daerah 3T',
        theme_color: '#2563eb',
        background_color: '#f8fafc',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        categories: ['education', 'productivity'],
        icons: [
          {
            src: 'icon.svg',
            sizes: '48x48 72x72 96x96 128x128 192x192 256x256 512x512',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'icon.svg',
            sizes: '48x48 72x72 96x96 128x128 192x192 256x256 512x512',
            type: 'image/svg+xml',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  build: {
    // Keep bundle small
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: undefined // Keep everything in one chunk for offline simplicity
      }
    }
  }
});
