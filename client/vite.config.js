/*
 * vite.config.js
 * Build tool configuration for the React frontend.
 * - @vitejs/plugin-react: enables JSX and fast refresh while developing.
 * - @tailwindcss/vite: compiles the Tailwind CSS classes used across the app.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
