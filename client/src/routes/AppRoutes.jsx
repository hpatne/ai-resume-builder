/*
 * AppRoutes.jsx
 * Every URL in the app and the page it shows.
 * Public pages share PublicLayout (navbar + footer).
 */
import { Routes, Route } from 'react-router-dom'
import PublicLayout from '../components/PublicLayout'
import LandingPage from '../pages/LandingPage'
import NotFoundPage from '../pages/NotFoundPage'

function AppRoutes() {
  return (
    <Routes>
      {/* Public pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
