import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@clovirtualfashion/components/styles/globals.css': fileURLToPath(new URL('./vendor/clovirtualfashion-components/dist/styles/globals.css', import.meta.url)),
      '@clovirtualfashion/components': fileURLToPath(new URL('./vendor/clovirtualfashion-components/dist/index.es.js', import.meta.url)),
      '@clovirtualfashion/foundation': fileURLToPath(new URL('./vendor/clovirtualfashion-foundation/dist/foundation.es.js', import.meta.url)),
    },
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
