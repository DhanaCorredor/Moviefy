import { Link } from 'react-router-dom'
import { content } from '../../constants/content'
import { ROUTES } from '../../constants/urls'
import logo from '../../assets/logo.png'

function WelcomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex justify-between items-center px-4 py-4">
        <img src={logo} alt={content.welcome.logoAlt} className="h-8" />
        <nav className="flex items-center gap-3">
          <button type="button" className="text-xs font-semibold tracking-widest text-text">
            {content.nav.login}
          </button>
          <button
            type="button"
            className="px-4 py-2 text-xs font-semibold tracking-widest bg-text text-background rounded-lg"
          >
            {content.nav.signup}
          </button>
        </nav>
      </header>

      <main className="flex flex-col flex-grow items-center justify-center px-6 text-center">
        <img src={logo} alt={content.welcome.logoAlt} className="h-24 mb-6" />
        <h1 className="mb-4 text-3xl font-bold text-text">{content.welcome.title}</h1>
        <p className="mb-2 text-lg font-semibold text-text">{content.welcome.headline}</p>
        <p className="mb-8 text-sm text-text/70">{content.welcome.subtitle}</p>
        <Link
          to={ROUTES.EXPLORATION}
          className="block w-full max-w-xs px-8 py-4 text-base font-semibold bg-primary text-text rounded-lg hover:opacity-90 transition"
        >
          {content.welcome.cta}
        </Link>
      </main>

      <footer className="flex flex-col items-center gap-2 px-6 py-4 text-center">
        <p className="text-xs text-text/50">{content.welcome.disclaimer}</p>
        <p className="text-xs text-text/50">{content.welcome.footer}</p>
      </footer>
    </div>
  )
}

export default WelcomePage
