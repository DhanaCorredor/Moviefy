import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/urls'

function DetailNotFound({ title, message, cta, to = ROUTES.EXPLORATION }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-20 md:px-8 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold text-text">{title}</h2>
      <p className="text-sm md:text-base text-text/70">{message}</p>
      <Link
        to={to}
        className="px-6 py-2.5 bg-primary text-text rounded-lg hover:opacity-90 transition"
      >
        {cta}
      </Link>
    </div>
  )
}

export default DetailNotFound
