/*
 * ProtectedRoute.jsx
 * Guards pages that need a logged-in user (dashboard, wizard, editor, ATS
 * checker, profile). If nobody is logged in, it redirects to /login and
 * remembers the page they wanted, so login can send them back there.
 */
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PageLoader from '../components/PageLoader'

function ProtectedRoute() {
  const { user, isAuthLoading } = useAuth()
  const location = useLocation()

  // Still checking for a saved session: wait instead of redirecting too early
  if (isAuthLoading) return <PageLoader message="Checking your session…" />

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />
  }

  // Logged in: show the requested page
  return <Outlet />
}

export default ProtectedRoute
