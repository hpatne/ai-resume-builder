// Sends users to the login page if they are not logged in.
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PageLoader from '../components/PageLoader'

function ProtectedRoute() {
  const { user, isAuthLoading } = useAuth()
  const location = useLocation()

  // Wait while checking for a saved login
  if (isAuthLoading) return <PageLoader message="Checking your session…" />

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />
  }

  return <Outlet />
}

export default ProtectedRoute
