import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { content } from '../../constants/content'
import { ROUTES } from '../../constants/urls'
import { IconBell, IconSearch, IconUser } from '../icons/icons'

function AvatarMenu() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!open) return

    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const menuItemClass = ({ isActive }) =>
    `block px-4 py-2 text-sm transition ${
      isActive ? 'text-primary' : 'text-text hover:bg-primary/20'
    }`

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={content.nav.profileMenuAriaLabel}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center h-9 w-9 rounded-full bg-surface text-text/80 hover:opacity-80 transition"
      >
        <IconUser className="h-5 w-5" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 min-w-40 py-2 bg-surface rounded-lg shadow-lg shadow-black/40 z-30"
        >
          <NavLink
            to={ROUTES.PROFILE}
            role="menuitem"
            onClick={() => setOpen(false)}
            className={menuItemClass}
          >
            {content.nav.profile}
          </NavLink>
          <NavLink
            to={ROUTES.FAVORITES}
            role="menuitem"
            onClick={() => setOpen(false)}
            className={menuItemClass}
          >
            {content.nav.favorites}
          </NavLink>
        </div>
      )}
    </div>
  )
}

function Navbar() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-4 bg-background/95 backdrop-blur">
      <Link
        to={ROUTES.WELCOME}
        aria-label={content.nav.brand}
        className="flex items-center gap-2"
      >
        <img src={logo} alt={content.nav.logoAlt} className="h-8 md:h-9" />
        <span className="text-base md:text-lg font-bold text-text">
          {content.nav.brand}
        </span>
      </Link>

      <nav
        aria-label={content.nav.ariaLabel}
        className="flex items-center gap-4 md:gap-5 text-text/80"
      >
        <Link
          to={ROUTES.EXPLORATION}
          aria-label={content.nav.searchAriaLabel}
          className="hover:text-text transition"
        >
          <IconSearch />
        </Link>
        <button
          type="button"
          aria-label={content.nav.notificationsAriaLabel}
          className="hover:text-text transition"
        >
          <IconBell />
        </button>
        <AvatarMenu />
      </nav>
    </header>
  )
}

export default Navbar
