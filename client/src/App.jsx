// Root of the app: sets up routing and the shared data providers.
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
