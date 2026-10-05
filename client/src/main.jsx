// Starting point: loads fonts and styles, then shows <App /> on the page.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fonts are bundled with the app (no Google Fonts request)
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
