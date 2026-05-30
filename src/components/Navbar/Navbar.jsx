import { useEffect, useState } from 'react'
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import logo from '../../assets/logo.png'
import { content } from '../../constants/content'
import { ROUTES } from '../../constants/urls'
import useDebounce from '../../hooks/useDebounce'
import SearchBar from '../movies/SearchBar/SearchBar'
import { IconBell, IconUser } from '../icons/icons'

const NAV_ITEMS = [
  { to: ROUTES.WELCOME, label: content.nav.home, end: true },
  { to: ROUTES.EXPLORATION, label: content.nav.exploration },
  { to: ROUTES.FAVORITES, label: content.nav.favorites },
  { to: ROUTES.PROFILE, label: content.nav.profile },
]

const navLinkClass = ({ isActive }) =>
  `px-3 py-1.5 text-sm font-medium rounded-lg transition whitespace-nowrap ${
    isActive
      ? 'text-text bg-primary/15'
      : 'text-text/70 hover:text-text hover:bg-text/5'
  }`

function NavbarSearch() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const urlQuery = searchParams.get('q') ?? ''

  const [query, setQuery] = useState(urlQuery)
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery)
  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery)
    setQuery(urlQuery)
  }

  const debouncedQuery = useDebounce(query, 400)

  useEffect(() => {
    if (debouncedQuery === urlQuery) return

    if (location.pathname !== ROUTES.EXPLORATION) {
      const suffix = debouncedQuery
        ? `?q=${encodeURIComponent(debouncedQuery)}`
        : ''
      navigate(`${ROUTES.EXPLORATION}${suffix}`)
    } else {
      setSearchParams(
        debouncedQuery ? { q: debouncedQuery } : {},
        { replace: true },
      )
    }
  }, [debouncedQuery, urlQuery, location.pathname, navigate, setSearchParams])

  return <SearchBar value={query} onChange={setQuery} />
}

function Navbar() {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 md:gap-6 px-4 py-3 md:px-8 md:py-4 bg-background/95 backdrop-blur">
      <Link
        to={ROUTES.WELCOME}
        aria-label={content.nav.brand}
        className="flex items-center gap-2 shrink-0"
      >
        <img src={logo} alt={content.nav.logoAlt} className="h-8 md:h-9" />
        <span className="text-base md:text-lg font-bold text-text">
          {content.nav.brand}
        </span>
      </Link>

      <nav
        aria-label={content.nav.ariaLabel}
        className="hidden md:flex items-center gap-1"
      >
        {NAV_ITEMS.map(({ to, label, end }) => (
          <NavLink key={to} to={to} end={end} className={navLinkClass}>
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-2 md:gap-3 shrink-0 ml-auto text-text/80">
        <div className="w-40 md:w-64">
          <NavbarSearch />
        </div>
        <button
          type="button"
          aria-label={content.nav.notificationsAriaLabel}
          className="hidden md:block hover:text-text transition"
        >
          <IconBell />
        </button>
        <NavLink
          to={ROUTES.PROFILE}
          aria-label={content.nav.profileMenuAriaLabel}
          className={({ isActive }) =>
            `flex items-center justify-center h-9 w-9 rounded-full bg-surface text-text/80 hover:opacity-80 transition ${
              isActive ? 'ring-2 ring-primary' : ''
            }`
          }
        >
          <IconUser className="h-5 w-5" />
        </NavLink>
      </div>
    </header>
  )
}

export default Navbar
