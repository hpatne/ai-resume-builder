// Layout for logged-in pages: sidebar on desktop, menu drawer on phones.
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Sidebar from './Sidebar'
import Logo from './Logo'

function DashboardLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[256px_1fr]">
      <aside className="hidden bg-navy lg:block">
        <div className="sticky top-0 h-dvh">
          <Sidebar />
        </div>
      </aside>

      <header className="on-navy sticky top-0 z-30 flex h-14 items-center justify-between bg-navy px-4 lg:hidden">
        <Logo tone="light" to="/dashboard" />
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Open navigation"
          aria-expanded={isDrawerOpen}
          className="grid size-10 place-items-center rounded text-white"
        >
          <Menu size={22} aria-hidden="true" />
        </button>
      </header>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy-deep/60" onClick={() => setIsDrawerOpen(false)} aria-hidden="true" />
          <div className="relative h-full w-72 max-w-[85vw] shadow-pop">
            <Sidebar onNavigate={() => setIsDrawerOpen(false)} />
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Close navigation"
              className="absolute top-4 right-3 grid size-9 place-items-center rounded text-white"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      <main id="main" className="min-w-0 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
