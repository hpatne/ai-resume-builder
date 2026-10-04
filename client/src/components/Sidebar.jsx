/*
 * Sidebar.jsx
 * Navy navigation rail for logged-in pages. Admins see an extra Admin group.
 * The current page is highlighted in station-board yellow.
 * On phones DashboardLayout shows it as a slide-in drawer (`onNavigate` closes it).
 */
import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FilePlus2, LayoutTemplate, ScanSearch, UserRound, ShieldCheck, Building2, BriefcaseBusiness, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'

const USER_LINKS = [
  { to: '/dashboard', label: 'My resumes', icon: LayoutDashboard },
  { to: '/create', label: 'Create resume', icon: FilePlus2 },
  { to: '/ats-checker', label: 'ATS checker', icon: ScanSearch },
  { to: '/templates', label: 'Templates', icon: LayoutTemplate },
  { to: '/profile', label: 'Profile', icon: UserRound },
]

const ADMIN_LINKS = [
  { to: '/admin', label: 'Admin overview', icon: ShieldCheck, end: true },
  { to: '/admin/templates', label: 'Manage templates', icon: LayoutTemplate },
  { to: '/admin/companies', label: 'Manage companies', icon: Building2 },
  { to: '/admin/roles', label: 'Manage roles', icon: BriefcaseBusiness },
]

function Sidebar({ onNavigate }) {
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  // Draws one group of links
  const renderLinks = (links) =>
    links.map(({ to, label, icon: Icon, end }) => (
      <li key={to}>
        <NavLink
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-3 py-2.5 text-[15px] font-semibold transition-colors ${
              isActive ? 'bg-board text-ink' : 'text-navy-ink hover:bg-white/8 hover:text-white'
            }`
          }
        >
          <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
          {label}
        </NavLink>
      </li>
    ))

  return (
    <div className="on-navy flex h-full flex-col bg-navy px-3 py-5">
      <div className="px-2">
        <Logo tone="light" to={isAdmin ? '/admin' : '/dashboard'} />
      </div>

      <nav aria-label="App" className="mt-8 flex-1 overflow-y-auto">
        <ul className="space-y-1">{renderLinks(USER_LINKS)}</ul>
        {isAdmin && (
          <>
            <h2 className="board-text mt-7 mb-2 px-3 text-xs text-navy-ink/80">Admin</h2>
            <ul className="space-y-1">{renderLinks(ADMIN_LINKS)}</ul>
          </>
        )}
      </nav>

      {/* Logged-in user and log out */}
      <div className="mt-4 border-t border-white/10 px-2 pt-4">
        <p className="truncate text-[15px] font-semibold text-white">{user?.name}</p>
        <p className="truncate text-sm text-navy-ink">{user?.email}</p>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-3 inline-flex items-center gap-2 rounded px-1 text-sm font-semibold text-navy-ink hover:text-white"
        >
          <LogOut size={16} aria-hidden="true" />
          Log out
        </button>
      </div>
    </div>
  )
}

export default Sidebar
