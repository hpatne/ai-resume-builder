/*
 * App.jsx
 * Root component. Wraps the app in:
 *   BrowserRouter    - enables page URLs (React Router)
 *   ToastProvider    - pop-up notifications available everywhere
 *   CatalogProvider  - companies, roles and templates shared by all pages
 * and then renders AppRoutes, which decides which page to show.
 */
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { CatalogProvider } from './context/CatalogContext'
import AppRoutes from './routes/AppRoutes'
import ScrollToTop from './routes/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastProvider>
        <CatalogProvider>
          <AppRoutes />
        </CatalogProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
