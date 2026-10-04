/*
 * AdminDashboardPage.jsx  (route: /admin, admin only)
 * Admin overview (deliverable D8): totals, how many resumes target each
 * company, and the latest resumes across all users. Also offers "Reset demo
 * data" to restore the original sample data before a demo.
 */
import { useEffect, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { getAdminStats } from '../../services/adminService'
import { resetAllData } from '../../utils/storage'
import { formatDate } from '../../utils/resumeFormat'
import { getScoreBand } from '../../utils/scoreBand'
import PageHeader from '../../components/PageHeader'
import PageLoader from '../../components/PageLoader'
import Button from '../../components/Button'
import StatusStamp from '../../components/StatusStamp'
import ConfirmDialog from '../../components/ConfirmDialog'
import StatStrip from '../../components/admin/StatStrip'
import CompanyBarList from '../../components/admin/CompanyBarList'
import DataTable from '../../components/admin/DataTable'

function AdminDashboardPage() {
  const [stats, setStats] = useState(null)
  const [isResetOpen, setIsResetOpen] = useState(false)

  // Load the numbers once when the page opens
  useEffect(() => {
    getAdminStats().then(setStats)
  }, [])

  // Clear saved data and reload: the app starts again from the sample data (logged out)
  const handleReset = () => {
    resetAllData()
    window.location.assign('/login')
  }

  if (!stats) return <PageLoader message="Loading admin overview…" />

  const { totals } = stats
  const statItems = [
    { label: 'Users', value: totals.users },
    { label: 'Resumes', value: totals.resumes },
    { label: 'Templates', value: totals.templates, to: '/admin/templates', linkLabel: 'Manage templates' },
    { label: 'Companies', value: totals.companies, to: '/admin/companies', linkLabel: 'Manage companies' },
    { label: 'Roles', value: totals.roles, to: '/admin/roles', linkLabel: 'Manage roles' },
  ]

  const userNames = Object.fromEntries(stats.users.map((user) => [user.id, user.name]))
  const recentColumns = [
    { key: 'title', label: 'Resume', render: (resume) => <span className="font-semibold">{resume.title}</span> },
    { key: 'userId', label: 'User', render: (resume) => userNames[resume.userId] || 'Deleted user' },
    { key: 'templateId', label: 'Template', render: (resume) => <span className="capitalize">{resume.templateId}</span> },
    { key: 'atsScore', label: 'ATS', render: (resume) => (typeof resume.atsScore === 'number' ? <StatusStamp tone={getScoreBand(resume.atsScore).tone}>{resume.atsScore}</StatusStamp> : <span className="text-ink-faint">–</span>) },
    { key: 'updatedAt', label: 'Last edited', render: (resume) => <span className="tabular">{formatDate(resume.updatedAt)}</span> },
  ]

  return (
    <>
      <PageHeader
        title="Admin overview"
        description="Platform totals and the data that drives company and role customisation."
        actions={<Button variant="secondary" onClick={() => setIsResetOpen(true)}><RotateCcw size={17} aria-hidden="true" /> Reset demo data</Button>}
      />

      <StatStrip stats={statItems} />

      <div className="mt-6 grid gap-6 2xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <section className="rounded-lg border border-line bg-paper p-5">
          <h2 className="text-xl font-bold">Resumes per target company</h2>
          <p className="mb-4 text-sm text-ink-faint">
            {stats.checkedCount} of {totals.resumes} resumes ATS-checked{stats.averageAtsScore !== null && `, average score ${stats.averageAtsScore}`}.
          </p>
          <CompanyBarList counts={stats.resumesPerCompany} />
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold">Latest resumes</h2>
          <DataTable caption="Latest resumes" columns={recentColumns} rows={stats.recentResumes} />
        </section>
      </div>

      {isResetOpen && (
        <ConfirmDialog
          title="Reset demo data?"
          message="All changes made in this browser (new accounts, resumes, admin edits) will be removed and the original sample data restored. You will be logged out."
          confirmLabel="Reset data"
          onConfirm={handleReset}
          onCancel={() => setIsResetOpen(false)}
        />
      )}
    </>
  )
}

export default AdminDashboardPage
