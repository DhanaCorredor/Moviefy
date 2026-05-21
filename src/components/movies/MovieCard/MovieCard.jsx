import { content } from '../../../constants/content'

function MovieCard({ movie }) {
  const { title, posterUrl, releaseYear, rating } = movie

  return (
    <article className="flex flex-col gap-2 transition hover:scale-[1.02]">
      <div className="aspect-[2/3] rounded-lg overflow-hidden bg-surface">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={content.movies.posterAlt(title)}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-xs text-text/40">
            {content.movies.noPoster}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-0.5 px-0.5">
        <h3 className="text-sm md:text-base font-semibold text-text line-clamp-1">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-xs">
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
    </article>
  )
}

export default MovieCard
