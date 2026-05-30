import { Link } from 'react-router-dom'
import { content } from '../../../constants/content'
import { MOVIE_DETAIL_PATH } from '../../../constants/urls'
import FavoriteButton from '../FavoriteButton/FavoriteButton'

function MovieCard({ movie }) {
  const { id, title, posterUrl, releaseYear, rating } = movie

  return (
    <Link
      to={MOVIE_DETAIL_PATH(id)}
      className="group flex flex-col gap-2 transition-transform duration-200 ease-out hover:-translate-y-2"
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-surface shadow-md group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(255,255,255,0.15)] transition-shadow duration-200">
        <FavoriteButton movie={movie} className="absolute top-2 right-2 z-10" />
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={content.movies.posterAlt(title)}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-out"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-xs text-text/40">
            {content.movies.noPoster}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-0.5 md:gap-1 px-0.5">
        <h3 className="text-xs md:text-base font-semibold text-text line-clamp-1 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-sm">
          <span className="text-text/60">
            {releaseYear || content.movies.noYear}
          </span>
          {rating !== null && (
            <span
              aria-label={content.movies.ratingAriaLabel(rating)}
              className="text-yellow-400"
            >
              ★ {rating}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
