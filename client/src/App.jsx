/*
 * App.jsx
 * Root component. Wraps the app in:
 *   BrowserRouter    - enables page URLs (React Router)
 *   ToastProvider    - pop-up notifications available everywhere
 *   AuthProvider     - who is logged in (user / admin)
 *   ResumeProvider   - the logged-in user's list of resumes
 *   CatalogProvider  - companies, roles and templates shared by all pages
 * and then renders AppRoutes, which decides which page to show.
 */
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import { ResumeProvider } from './context/ResumeContext'
import { CatalogProvider } from './context/CatalogContext'
import AppRoutes from './routes/AppRoutes'
import ScrollToTop from './routes/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastProvider>
        <AuthProvider>
          <ResumeProvider>
            <CatalogProvider>
              <AppRoutes />
            </CatalogProvider>
          </ResumeProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
