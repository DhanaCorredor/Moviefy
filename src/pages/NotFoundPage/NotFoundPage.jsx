import { Link } from 'react-router-dom'
import { content } from '../../constants/content'
import { ROUTES } from '../../constants/urls'

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-20 md:px-8 text-center">
      <p className="text-7xl md:text-9xl font-bold text-primary/40">404</p>
      <h1 className="text-2xl md:text-4xl font-bold text-text">
        {content.notFound.title}
      </h1>
      <p className="text-sm md:text-base text-text/70 max-w-md">
        {content.notFound.message}
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
        <Link
          to={ROUTES.WELCOME}
          className="px-6 py-2.5 bg-primary text-text rounded-lg hover:opacity-90 transition"
        >
          {content.notFound.ctaWelcome}
        </Link>
        <Link
          to={ROUTES.EXPLORATION}
          className="px-6 py-2.5 bg-surface text-text/80 rounded-lg hover:text-text hover:bg-surface/80 transition border border-text/10"
        >
          {content.notFound.ctaExploration}
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
