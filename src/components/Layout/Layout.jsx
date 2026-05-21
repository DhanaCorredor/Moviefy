import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 pb-32 md:pb-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
