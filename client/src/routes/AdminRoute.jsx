/*
 * AdminRoute.jsx
 * Guards the admin pages (/admin/...). Not logged in -> /login.
 * Logged in but not an admin -> back to the normal dashboard.
 * TODO (Phase 2): the Express backend must also check the admin role on every
 * admin API call; hiding pages in the browser alone is not security.
 */
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PageLoader from '../components/PageLoader'

function AdminRoute() {
  const { user, isAdmin, isAuthLoading } = useAuth()
  const location = useLocation()

  if (isAuthLoading) return <PageLoader message="Checking your session…" />
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (!isAdmin) return <Navigate to="/dashboard" replace />

  return <Outlet />
}

export default AdminRoute
