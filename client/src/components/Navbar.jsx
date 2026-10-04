/*
 * Navbar.jsx
 * Top navigation bar for the public pages (landing, templates, login, signup).
 * On phones the links collapse into a menu opened by the menu button.
 * Shows Log in / Get started, or a dashboard button when already logged in.
 */
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'
import Button from './Button'

const NAV_LINKS = [
  { to: '/templates', label: 'Templates' },
  { to: '/#how-it-works', label: 'How it works', isSectionLink: true },
]

function Navbar() {
  const { user, isAdmin } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Page links are underlined in yellow when open; a link to a home page section never is
  const getLinkClasses = (link) => ({ isActive }) =>
    `rounded px-1 text-[15px] font-semibold ${
      isActive && !link.isSectionLink ? 'text-ink underline decoration-board decoration-[3px]' : 'text-ink-soft hover:text-ink'
    }`

  // Account buttons: logged-in users get a shortcut to their dashboard instead
  const accountButtons = user ? (
    <Button to={isAdmin ? '/admin' : '/dashboard'} size="sm">
      {isAdmin ? 'Admin dashboard' : 'My dashboard'}
    </Button>
  ) : (
    <>
      <Button to="/login" variant="ghost" size="sm">Log in</Button>
      <Button to="/signup" size="sm">Get started</Button>
    </>
  )

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={getLinkClasses(link)}>
              {link.label}
            </NavLink>
          ))}
          <div className="flex items-center gap-2">{accountButtons}</div>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="grid size-10 place-items-center rounded text-ink md:hidden"
        >
          {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-line bg-paper px-4 pt-3 pb-4 md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={getLinkClasses(link)}>
              {link.label}
            </NavLink>
            ))}
            <div className="flex gap-2 pt-1">{accountButtons}</div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
