import { useCallback, useEffect, useState } from 'react'
import { content } from '../../constants/content'
import { getTrending, getGenres } from '../../services/tmdb'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import HeroCarousel from '../../components/movies/HeroCarousel/HeroCarousel'
import HeroCarouselSkeleton from '../../components/movies/HeroCarouselSkeleton/HeroCarouselSkeleton'
import MovieGrid from '../../components/movies/MovieGrid/MovieGrid'
import MovieGridSkeleton from '../../components/movies/MovieGridSkeleton/MovieGridSkeleton'
import Spinner from '../../components/Spinner/Spinner'
import EmptyState from '../../components/EmptyState/EmptyState'
import ErrorState from '../../components/ErrorState/ErrorState'

const HERO_COUNT = 5

function ExplorationPage() {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const [loadMoreError, setLoadMoreError] = useState(null)
  const [retryNonce, setRetryNonce] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [trending, genreList] = await Promise.all([
          getTrending({ page: 1 }),
          getGenres(),
        ])
        if (cancelled) return
        setMovies(trending.movies)
        setPage(trending.page)
        setTotalPages(trending.totalPages)
        setGenres(genreList)
        setError(null)
      } catch (err) {
        if (cancelled) return
        setError(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [retryNonce])

  const loadMore = useCallback(async () => {
    if (loading || loadingMore || page >= totalPages) return
    setLoadingMore(true)
    setLoadMoreError(null)
    try {
      const next = await getTrending({ page: page + 1 })
      setMovies((prev) => [...prev, ...next.movies])
      setPage(next.page)
      setTotalPages(next.totalPages)
    } catch (err) {
      setLoadMoreError(err)
    } finally {
      setLoadingMore(false)
    }
  }, [loading, loadingMore, page, totalPages])

  const sentinelRef = useInfiniteScroll({
    onLoadMore: loadMore,
    enabled:
      !loading &&
      !error &&
      !loadMoreError &&
      page < totalPages &&
      movies.length > 0,
  })

  const handleRetry = () => {
    setLoading(true)
    setError(null)
    setPage(1)
    setTotalPages(1)
    setRetryNonce((n) => n + 1)
  }

  const handleRetryLoadMore = () => {
    setLoadMoreError(null)
    loadMore()
  }

  const heroMovies = movies.slice(0, HERO_COUNT)
  const gridMovies = movies.slice(HERO_COUNT)
  const reachedEnd =
    !loading &&
    !error &&
    !loadMoreError &&
    page >= totalPages &&
    movies.length > 0

  return (
    <div className="flex flex-col gap-6 md:gap-10 pb-6 md:pb-10">
      {loading && (
        <>
          <HeroCarouselSkeleton />
          <div className="px-4 md:px-8">
            <MovieGridSkeleton />
          </div>
        </>
      )}

      {!loading && error && (
        <div className="px-4 py-12 md:px-8">
          <ErrorState onRetry={handleRetry} />
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="px-4 py-12 md:px-8">
          <EmptyState />
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          <HeroCarousel movies={heroMovies} genres={genres} />

          {gridMovies.length > 0 && (
            <section className="flex flex-col gap-4 md:gap-6 w-full max-w-screen-2xl mx-auto px-4 md:px-8">
              <h1 className="text-2xl md:text-4xl font-bold text-text">
                {content.exploration.moviesSectionTitle}
              </h1>
              <MovieGrid movies={gridMovies} />

              <div ref={sentinelRef} aria-hidden="true" className="h-1" />

              {loadingMore && <Spinner />}

              {loadMoreError && (
                <div className="flex flex-col items-center gap-3 py-4">
                  <p className="text-sm text-text/70">
                    {content.states.loadMoreError}
                  </p>
                  <button
                    type="button"
                    onClick={handleRetryLoadMore}
                    className="px-6 py-2.5 bg-primary text-text rounded-lg hover:opacity-90 transition"
                  >
                    {content.states.retry}
                  </button>
                </div>
              )}

              {reachedEnd && (
                <p className="py-6 text-center text-sm text-text/60">
                  {content.states.endOfResults}
                </p>
              )}
            </section>
          )}
        </>
      )}
    </div>
  )
}

export default ExplorationPage
