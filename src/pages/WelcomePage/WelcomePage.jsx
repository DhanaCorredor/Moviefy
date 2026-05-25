import { Link } from 'react-router-dom'
import { content } from '../../constants/content'
import { ROUTES } from '../../constants/urls'
import logo from '../../assets/logo.png'

function WelcomePage() {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1920')] bg-cover bg-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background"
      />

      <main className="relative z-10 flex flex-col flex-grow items-center justify-center px-6 md:px-12">
        <div className="flex flex-col items-center w-full max-w-md md:max-w-xl text-center">
          <img
            src={logo}
            alt={content.welcome.logoAlt}
            className="h-24 md:h-32 mb-6 md:mb-8"
          />
          <h1 className="mb-4 md:mb-6 text-3xl md:text-5xl font-bold text-text [text-shadow:_0_2px_8px_rgba(0,0,0,0.7)]">
            {content.welcome.title}
          </h1>
          <p className="mb-2 md:mb-3 text-lg md:text-2xl font-semibold text-text [text-shadow:_0_2px_6px_rgba(0,0,0,0.7)]">
            {content.welcome.headline}
          </p>
          <p className="mb-8 md:mb-10 text-sm md:text-base text-text/90 [text-shadow:_0_1px_4px_rgba(0,0,0,0.7)]">
            {content.welcome.subtitle}
          </p>
          <Link
            to={ROUTES.EXPLORATION}
            className="block w-full max-w-xs md:max-w-sm px-8 md:px-12 py-4 md:py-5 text-base md:text-lg font-semibold bg-primary text-text rounded-lg shadow-lg shadow-primary/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/60 active:scale-100"
          >
            {content.welcome.cta}
          </Link>
        </div>
      </main>

      <footer className="relative z-10 flex flex-col items-center gap-2 px-6 md:px-12 py-4 md:py-6 text-center">
        <p className="text-xs md:text-sm text-text/60">{content.welcome.disclaimer}</p>
        <p className="text-xs md:text-sm text-text/60">{content.welcome.footer}</p>
      </footer>
    </div>
  )
}

export default WelcomePage
