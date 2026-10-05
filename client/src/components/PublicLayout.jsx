// Layout for public pages: navbar, page, footer.
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function PublicLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
