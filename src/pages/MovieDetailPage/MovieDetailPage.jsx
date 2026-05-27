import { Link, useNavigate, useParams } from 'react-router-dom'
import { content } from '../../constants/content'
import { PERSON_DETAIL_PATH, ROUTES } from '../../constants/urls'
import { getMovieDetail } from '../../services/tmdb'
import useTmdbDetail from '../../hooks/useTmdbDetail'
import Spinner from '../../components/Spinner/Spinner'
import ErrorState from '../../components/ErrorState/ErrorState'

function MetaSeparator() {
  return <span aria-hidden="true" className="text-text/30">·</span>
}

function CastCard({ person }) {
  return (
    <Link
      to={PERSON_DETAIL_PATH(person.id)}
      className="group flex flex-col gap-2 w-28 md:w-36 shrink-0"
    >
      <div className="aspect-[2/3] rounded-lg overflow-hidden bg-surface transition-shadow group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
        {person.profileUrl ? (
          <img
            src={person.profileUrl}
            alt={content.persons.profileAlt(person.name)}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-xs text-text/40">
            {content.persons.noProfile}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-0.5 px-0.5">
        <p className="text-xs md:text-sm font-semibold text-text line-clamp-2 group-hover:text-primary transition-colors">
          {person.name}
        </p>
        {person.character && (
          <p className="text-[10px] md:text-xs text-text/60 line-clamp-2">
            {person.character}
          </p>
        )}
      </div>
    </Link>
  )
}

function DirectorCard({ person }) {
  return (
    <Link
      to={PERSON_DETAIL_PATH(person.id)}
      className="group flex items-center gap-3"
    >
      <div className="size-14 md:size-16 rounded-full overflow-hidden bg-surface shrink-0">
        {person.profileUrl ? (
          <img
            src={person.profileUrl}
            alt={content.persons.profileAlt(person.name)}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-[10px] text-text/40">
            {content.persons.noProfile}
          </div>
        )}
      </div>
      <p className="text-sm md:text-base font-semibold text-text group-hover:text-primary transition-colors">
        {person.name}
      </p>
    </Link>
  )
}

function MovieDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    data: movie,
    loading,
    error,
    notFound,
    retry: handleRetry,
  } = useTmdbDetail(getMovieDetail, id)

  const handleBack = () => navigate(-1)

  if (loading) {
    return (
      <div className="px-4 py-12 md:px-8">
        <Spinner />
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-20 md:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-text">
          {content.movieDetail.notFoundTitle}
        </h2>
        <p className="text-sm md:text-base text-text/70">
          {content.movieDetail.notFoundMessage}
        </p>
        <Link
          to={ROUTES.EXPLORATION}
          className="px-6 py-2.5 bg-primary text-text rounded-lg hover:opacity-90 transition"
        >
          {content.movieDetail.notFoundCta}
        </Link>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 py-12 md:px-8">
        <ErrorState onRetry={handleRetry} />
      </div>
    )
  }

  if (!movie) return null

  return (
    <article className="flex flex-col gap-8 md:gap-12 pb-10">
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
          onClick={handleBack}
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

            <div className="flex flex-wrap items-center gap-2 md:gap-3 text-sm md:text-base text-text/70">
              {movie.releaseYear && <span>{movie.releaseYear}</span>}
              {movie.releaseYear && movie.runtime && <MetaSeparator />}
              {movie.runtime && (
                <span>{content.movieDetail.runtimeLabel(movie.runtime)}</span>
              )}
              {(movie.releaseYear || movie.runtime) &&
                movie.rating !== null && <MetaSeparator />}
              {movie.rating !== null && (
                <span
                  aria-label={content.movies.ratingAriaLabel(movie.rating)}
                  className="text-yellow-400"
                >
                  ★ {movie.rating}
                </span>
              )}
            </div>

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
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-3 w-full max-w-screen-2xl mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-text">
          {content.movieDetail.overviewTitle}
        </h2>
        <p className="text-sm md:text-base text-text/80 leading-relaxed">
          {movie.overview || content.movieDetail.noOverview}
        </p>
      </section>

      {movie.trailerKey && (
        <section className="flex flex-col gap-4 w-full max-w-screen-2xl mx-auto px-4 md:px-8">
          <h2 className="text-xl md:text-2xl font-bold text-text">
            {content.movieDetail.trailerTitle}
          </h2>
          <div className="aspect-video w-full max-w-4xl rounded-lg overflow-hidden bg-surface shadow-2xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${movie.trailerKey}`}
              title={content.movieDetail.trailerFrameTitle(movie.title)}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        </section>
      )}

      <section className="flex flex-col gap-4 w-full max-w-screen-2xl mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-text">
          {content.movieDetail.directorTitle}
        </h2>
        {movie.directors.length > 0 ? (
          <div className="flex flex-wrap gap-4 md:gap-6">
            {movie.directors.map((person) => (
              <DirectorCard key={person.id} person={person} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-text/60">
            {content.movieDetail.noDirector}
          </p>
        )}
      </section>

      <section className="flex flex-col gap-4 w-full max-w-screen-2xl mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-text">
          {content.movieDetail.castTitle}
        </h2>
        {movie.cast.length > 0 ? (
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
            {movie.cast.map((person) => (
              <CastCard key={person.id} person={person} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-text/60">{content.movieDetail.noCast}</p>
        )}
      </section>
    </article>
  )
}

export default MovieDetailPage
