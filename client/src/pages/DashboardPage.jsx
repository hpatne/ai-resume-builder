/*
 * DashboardPage.jsx  (route: /dashboard, protected)
 * The user's home after login. Resume management is added in the next step.
 */
import PageHeader from '../components/PageHeader'
import { useAuth } from '../context/AuthContext'

function DashboardPage() {
  const { user } = useAuth()
  return <PageHeader title="My resumes" description={`Welcome, ${user.name}.`} />
}

export default DashboardPage
