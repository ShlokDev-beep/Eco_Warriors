import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Optimize for React 19
      jsxImportSource: 'react',
      babel: {
        plugins: []
      }
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Eco Warriors: Rise of the Guardians',
        short_name: 'Eco Warriors',
        description: 'A 3D environmental game where players protect ecosystems from pollution and climate change',
        theme_color: '#2ecc71',
        background_color: '#1a1a1a',
        display: 'fullscreen',
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
          }
        ]
      },
      workbox: {
        // Optimize caching for 3D assets
        globPatterns: ['**/*.{js,css,html,ico,png,svg,glb,gltf}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    host: true,
    port: 3000,
    // Better development experience
    open: false,
    strictPort: false
  },
  preview: {
    host: true,
    port: 3000
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    sourcemap: true,
    // Optimize for 3D games
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three'],
          'react-three': ['@react-three/fiber', '@react-three/drei', '@react-three/rapier'],
          utils: ['zustand', 'axios', 'howler']
        }
      }
    },
    // Optimize for 3D assets
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      '@react-three/rapier'
    ]
  },
  // Define environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  }
})