/*
 * adminService.js
 * MOCK numbers for the admin dashboard: totals of users, resumes, templates and
 * companies, plus the latest resumes and how many target each company.
 * Used by: AdminDashboardPage.
 *
 * TODO (Phase 2): replace mock with real API call to the Express backend (GET /api/admin/stats)
 */
import { getAllUsers } from './authService'
import { getAllResumes } from './resumeService'
import { getCatalog } from './catalogService'

export async function getAdminStats() {
  // TODO (Phase 2): replace mock with real API call to the Express backend
  const [users, resumes, catalog] = await Promise.all([getAllUsers(), getAllResumes(), getCatalog()])

  // Average ATS score over resumes that have been checked at least once
  const checkedResumes = resumes.filter((resume) => typeof resume.atsScore === 'number')
  const averageAtsScore = checkedResumes.length
    ? Math.round(checkedResumes.reduce((total, resume) => total + resume.atsScore, 0) / checkedResumes.length)
    : null

  // How many resumes target each company (shows which company profiles matter most)
  const resumesPerCompany = {}
  resumes.forEach((resume) => {
    resumesPerCompany[resume.companyName] = (resumesPerCompany[resume.companyName] || 0) + 1
  })

  return {
    totals: {
      users: users.filter((user) => user.role !== 'admin').length,
      resumes: resumes.length,
      templates: catalog.templates.length,
      companies: catalog.companies.length,
      roles: catalog.roles.length,
    },
    averageAtsScore,
    checkedCount: checkedResumes.length,
    resumesPerCompany,
    recentResumes: [...resumes].sort((first, second) => second.updatedAt.localeCompare(first.updatedAt)).slice(0, 5),
    users,
  }
}
