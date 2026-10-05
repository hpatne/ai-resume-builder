// Vite settings: React + Tailwind. optimizeDeps bundles all libraries at start
// so the dev server never has to reload in the middle of a session.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client', 'react-router-dom', 'react-to-print', 'lucide-react'],
  },
})
