import { NavLink } from 'react-router-dom'
import { content } from '../../constants/content'
import { ROUTES } from '../../constants/urls'
import {
  IconBookmark,
  IconCompass,
  IconGitHub,
  IconHome,
  IconInstagram,
  IconTwitterX,
  IconUser,
  IconYouTube,
} from '../icons/icons'

const NAV_ITEMS = [
  { to: ROUTES.WELCOME, label: content.nav.home, Icon: IconHome, end: true },
  { to: ROUTES.EXPLORATION, label: content.nav.exploration, Icon: IconCompass },
  { to: ROUTES.FAVORITES, label: content.nav.favorites, Icon: IconBookmark },
  { to: ROUTES.PROFILE, label: content.nav.profile, Icon: IconUser },
]

const SOCIAL_ITEMS = [
  { key: 'instagram', Icon: IconInstagram, hoverColor: 'hover:text-[#E4405F]' },
  { key: 'twitter', Icon: IconTwitterX, hoverColor: 'hover:text-text' },
  { key: 'youtube', Icon: IconYouTube, hoverColor: 'hover:text-[#FF0000]' },
  { key: 'github', Icon: IconGitHub, hoverColor: 'hover:text-text' },
]

const navItemClass = ({ isActive }) =>
  `flex flex-col items-center gap-1 px-3 py-1 text-xs transition ${
    isActive ? 'text-primary' : 'text-text/70 hover:text-text'
  }`

function Footer() {
  return (
    <footer
      aria-label={content.footer.ariaLabel}
      className="fixed bottom-0 left-0 right-0 z-20 bg-surface/70 backdrop-blur-md border-t border-text/10"
    >
      <nav
        aria-label={content.nav.ariaLabel}
        className="flex justify-around px-2 pt-2 pb-1 md:hidden"
      >
        {NAV_ITEMS.map(({ to, label, Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={navItemClass}>
            <Icon />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="flex flex-wrap items-center justify-center gap-4 px-4 pb-2 text-xs text-text/60 md:flex-nowrap md:justify-between md:gap-4 md:py-3 md:text-sm">
        <p>{content.footer.copyright}</p>

        <ul
          aria-label={content.footer.socialAriaLabel}
          className="flex items-center gap-2 md:gap-3"
        >
          {SOCIAL_ITEMS.map(({ key, Icon, hoverColor }) => {
            const item = content.footer.social[key]
            return (
              <li key={key}>
                <a
                  href={item.url}
                  aria-label={item.label}
                  onClick={(e) => e.preventDefault()}
                  className={`flex items-center justify-center p-1.5 bg-text/5 hover:bg-text/15 text-text/60 ${hoverColor} rounded-full transition-all hover:scale-110 cursor-pointer`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              </li>
            )
          })}
        </ul>

        <a
          href={content.footer.tmdbUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={content.footer.tmdbAriaLabel}
          className="inline-flex items-center transition hover:drop-shadow-[0_0_8px_rgba(93,44,213,0.6)] hover:scale-105"
        >
          <img
            src="/tmdb-logo.svg"
            alt={content.footer.tmdbLogoAlt}
            className="h-4 md:h-5 w-auto"
          />
        </a>
      </div>
    </footer>
  )
}

export default Footer
