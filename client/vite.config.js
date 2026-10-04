/*
 * vite.config.js
 * Build tool configuration for the React frontend.
 * - @vitejs/plugin-react: enables JSX and fast refresh while developing.
 * - @tailwindcss/vite: compiles the Tailwind CSS classes used across the app.
 * - optimizeDeps.include: pre-bundles every library when the dev server starts,
 *   so it never has to re-bundle (and reload) in the middle of a session.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client', 'react-router-dom', 'react-to-print', 'lucide-react'],
  },
})
