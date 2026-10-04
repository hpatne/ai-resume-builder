/*
 * main.jsx
 * Entry point of the React app. Vite loads this file first (see index.html).
 * It loads the self-hosted fonts and global CSS, then mounts <App /> into #root.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted fonts (no external font requests): Barlow for UI text,
// Barlow Condensed for board-style labels and headings.
import '@fontsource/barlow/400.css'
import '@fontsource/barlow/500.css'
import '@fontsource/barlow/600.css'
import '@fontsource/barlow/700.css'
import '@fontsource/barlow-condensed/600.css'
import '@fontsource/barlow-condensed/700.css'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
