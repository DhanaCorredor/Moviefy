import { useNavigate, useParams } from 'react-router-dom'
import { content } from '../../constants/content'
import { YOUTUBE_EMBED_URL } from '../../constants/urls'
import { getMovieDetail } from '../../services/tmdb'
import useTmdbDetail from '../../hooks/useTmdbDetail'
import Spinner from '../../components/Spinner/Spinner'
import ErrorState from '../../components/ErrorState/ErrorState'
import DetailNotFound from '../../components/DetailNotFound/DetailNotFound'
import MovieHeader from '../../components/movies/MovieHeader/MovieHeader'
import MovieWatchProviders from '../../components/movies/MovieWatchProviders/MovieWatchProviders'
import MovieCastList from '../../components/movies/MovieCastList/MovieCastList'
import MovieDirectorsList from '../../components/movies/MovieDirectorsList/MovieDirectorsList'

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
      <DetailNotFound
        title={content.movieDetail.notFoundTitle}
        message={content.movieDetail.notFoundMessage}
        cta={content.movieDetail.notFoundCta}
      />
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
      <MovieHeader movie={movie} onBack={handleBack} />

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
              src={YOUTUBE_EMBED_URL(movie.trailerKey)}
              title={content.movieDetail.trailerFrameTitle(movie.title)}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        </section>
      )}

      <MovieWatchProviders providers={movie.watchProviders} />
      <MovieDirectorsList directors={movie.directors} />
      <MovieCastList cast={movie.cast} />
    </article>
  )
}

export default MovieDetailPage
