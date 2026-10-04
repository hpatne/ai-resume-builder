/*
 * AppRoutes.jsx
 * Every URL in the app and the page it shows.
 * Public pages share PublicLayout (navbar + footer).
 * Logged-in pages share DashboardLayout (sidebar) and are wrapped in
 * ProtectedRoute; admin pages are additionally wrapped in AdminRoute.
 */
import { Routes, Route } from 'react-router-dom'
import PublicLayout from '../components/PublicLayout'
import DashboardLayout from '../components/DashboardLayout'
import ProtectedRoute from './ProtectedRoute'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import TemplatesPage from '../pages/TemplatesPage'
import DashboardPage from '../pages/DashboardPage'
import CreateResumePage from '../pages/CreateResumePage'
import ResumeEditorPage from '../pages/ResumeEditorPage'
import NotFoundPage from '../pages/NotFoundPage'

function AppRoutes() {
  return (
    <Routes>
      {/* Public pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Logged-in user pages */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create" element={<CreateResumePage />} />
          <Route path="/editor/:resumeId" element={<ResumeEditorPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
