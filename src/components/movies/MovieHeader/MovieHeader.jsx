import { content } from '../../../constants/content'
import useFavorites from '../../../hooks/useFavorites'
import FavoriteButton from '../FavoriteButton/FavoriteButton'
import Rating from '../Rating/Rating'

function MovieHeader({ movie, onBack }) {
  const { favorites, isFavorite, setUserRating } = useFavorites()
  const userRating =
    favorites.find((favorite) => favorite.id === movie.id)?.userRating ?? null

  const metaParts = []
  if (movie.releaseYear) {
    metaParts.push({
      key: 'year',
      node: <span>{movie.releaseYear}</span>,
    })
  }
  if (movie.runtime) {
    metaParts.push({
      key: 'runtime',
      node: <span>{content.movieDetail.runtimeLabel(movie.runtime)}</span>,
    })
  }
  if (movie.rating !== null) {
    metaParts.push({
      key: 'rating',
      node: (
        <span
          aria-label={content.movies.ratingAriaLabel(movie.rating)}
          className="text-yellow-400"
        >
          ★ {movie.rating}
        </span>
      ),
    })
  }

  return (
    <>
      <div className="relative w-full">
        <div className="aspect-[16/9] md:aspect-[21/9] w-full bg-surface overflow-hidden">
          {movie.backdropUrl && (
            <img
              src={movie.backdropUrl}
              alt={content.movieDetail.backdropAlt(movie.title)}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>
      </div>

      <div className="relative -mt-32 md:-mt-48 w-full max-w-screen-2xl mx-auto px-4 md:px-8">
        <button
          type="button"
          onClick={onBack}
          className="mb-4 md:mb-6 px-4 py-2 bg-surface/80 text-text rounded-lg hover:bg-surface transition text-sm"
        >
          ← {content.movieDetail.backCta}
        </button>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          <div className="w-40 md:w-64 shrink-0 aspect-[2/3] rounded-lg overflow-hidden bg-surface shadow-2xl">
            {movie.posterUrl ? (
              <img
                src={movie.posterUrl}
                alt={content.movies.posterAlt(movie.title)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-xs text-text/40">
                {content.movies.noPoster}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 flex-1">
            <h1 className="text-3xl md:text-5xl font-bold text-text">
              {movie.title}
            </h1>

            {metaParts.length > 0 && (
              <div className="flex flex-wrap items-center text-sm md:text-base text-text/70">
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

            {movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-surface text-text/80 rounded-lg text-xs md:text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {movie.tagline && (
              <p className="text-base md:text-lg italic text-text/70">
                {movie.tagline}
              </p>
            )}

            <div className="flex flex-col gap-3">
              <FavoriteButton movie={movie} withLabel className="self-start" />
              {isFavorite(movie.id) && (
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-text/70">
                    {content.favorites.ratingLabel}
                  </span>
                  <Rating
                    value={userRating}
                    onChange={(value) => setUserRating(movie.id, value)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MovieHeader
