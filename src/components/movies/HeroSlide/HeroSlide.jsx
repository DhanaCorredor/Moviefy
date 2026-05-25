import { Link } from 'react-router-dom'
import { content } from '../../../constants/content'
import { MOVIE_DETAIL_PATH } from '../../../constants/urls'
import { IconPlay } from '../../icons/icons'

function HeroSlide({ movie, genreName }) {
  const { id, title, backdropUrl, rating, releaseYear, overview } = movie

  const metaParts = []
  if (releaseYear) {
    metaParts.push({ key: 'year', node: <span>{releaseYear}</span> })
  }
  if (rating !== null) {
    metaParts.push({
      key: 'rating',
      node: (
        <span
          aria-label={content.hero.ratingAriaLabel(rating)}
          className="text-yellow-400"
        >
          ★ {rating}
        </span>
      ),
    })
  }
  if (genreName) {
    metaParts.push({ key: 'genre', node: <span>{genreName}</span> })
  }

  return (
    <article className="relative h-full w-full overflow-hidden bg-surface">
      {backdropUrl ? (
        <img
          src={backdropUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-text/40">
          {content.hero.noBackdrop}
        </div>
      )}

      <div className="absolute inset-x-0 top-0 h-32 md:h-40 bg-gradient-to-b from-background via-background/60 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-background from-10% via-background/90 via-40% to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 md:gap-3 p-4 md:p-8">
        <h2 className="text-2xl md:text-5xl font-bold text-text uppercase line-clamp-2">
          {title}
        </h2>
        {metaParts.length > 0 && (
          <div className="flex flex-wrap items-center text-sm md:text-base text-text/80">
            {metaParts.map((part, i) => (
              <span key={part.key} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden="true" className="mx-2 text-text/40">
                    ·
                  </span>
                )}
                {part.node}
              </span>
            ))}
          </div>
        )}
        {overview && (
          <p className="text-sm md:text-base text-text/80 line-clamp-3 md:max-w-2xl">
            {overview}
          </p>
        )}
        <div className="flex flex-wrap gap-3 mt-2">
          <Link
            to={MOVIE_DETAIL_PATH(id)}
            className="inline-flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-white text-background font-bold rounded-lg hover:bg-white/90 hover:scale-105 transition-all"
          >
            <IconPlay className="h-5 w-5 md:h-6 md:w-6" />
            {content.hero.playCta}
          </Link>
          <Link
            to={MOVIE_DETAIL_PATH(id)}
            className="inline-flex items-center px-6 md:px-8 py-2.5 md:py-3 bg-text/25 hover:bg-text/35 text-text font-medium rounded-lg transition"
          >
            {content.hero.moreInfoCta}
          </Link>
        </div>
      </div>
    </article>
  )
}

export default HeroSlide
