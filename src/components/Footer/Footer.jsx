import { NavLink } from 'react-router-dom'
import { content } from '../../constants/content'
import { ROUTES } from '../../constants/urls'
import {
  IconBookmark,
  IconCompass,
  IconHome,
  IconUser,
} from '../icons/icons'

const NAV_ITEMS = [
  { to: ROUTES.WELCOME, label: content.nav.home, Icon: IconHome, end: true },
  { to: ROUTES.EXPLORATION, label: content.nav.exploration, Icon: IconCompass },
  { to: ROUTES.FAVORITES, label: content.nav.favorites, Icon: IconBookmark },
  { to: ROUTES.PROFILE, label: content.nav.profile, Icon: IconUser },
]

const itemClass = ({ isActive }) =>
  `flex flex-col items-center gap-1 px-3 py-1 text-xs transition ${
    isActive ? 'text-primary' : 'text-text/70 hover:text-text'
  }`

function Footer() {
  return (
    <footer
      aria-label={content.footer.ariaLabel}
      className="fixed bottom-0 left-0 right-0 z-20 bg-surface border-t border-text/10 md:static md:bg-transparent md:border-text/5"
    >
      <nav
        aria-label={content.nav.ariaLabel}
        className="flex justify-around px-2 pt-2 pb-1 md:hidden"
      >
        {NAV_ITEMS.map(({ to, label, Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={itemClass}>
            <Icon />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="flex flex-col items-center gap-1 px-4 pb-2 text-center text-[10px] leading-tight text-text/50 md:gap-2 md:py-8 md:text-xs md:text-text/60">
        <p>{content.footer.copyright}</p>
        <p>{content.footer.tmdbAttribution}</p>
      </div>
    </footer>
  )
}

export default Footer
