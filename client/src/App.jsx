/*
 * App.jsx
 * Root component. Wraps the app in:
 *   BrowserRouter    - enables page URLs (React Router)
 *   ToastProvider    - pop-up notifications available everywhere
 *   AuthProvider     - who is logged in (user / admin)
 *   CatalogProvider  - companies, roles and templates shared by all pages
 * and then renders AppRoutes, which decides which page to show.
 */
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import { CatalogProvider } from './context/CatalogContext'
import AppRoutes from './routes/AppRoutes'
import ScrollToTop from './routes/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastProvider>
        <AuthProvider>
          <CatalogProvider>
            <AppRoutes />
          </CatalogProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
