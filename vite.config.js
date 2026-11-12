import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// En-têtes nécessaires pour SharedArrayBuffer (utilisé par input() dans le Worker Python)
const isolation = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
}

export default defineConfig({
  base: './', // chemins relatifs : fonctionne sur GitHub Pages quel que soit le nom du dépôt
  plugins: [vue()],
  server: { headers: isolation },
  preview: { headers: isolation },
})
