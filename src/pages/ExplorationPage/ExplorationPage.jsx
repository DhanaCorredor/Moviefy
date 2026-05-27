import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { content } from '../../constants/content'
import {
  discoverMovies,
  getGenres,
  getTrending,
  searchMovies,
} from '../../services/tmdb'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import FilterMenu from '../../components/movies/FilterMenu/FilterMenu'
import {
  DEFAULT_FILTERS,
  hasActiveFilters,
  SORT_OPTIONS,
} from '../../constants/filters'
import HeroCarousel from '../../components/movies/HeroCarousel/HeroCarousel'
import HeroCarouselSkeleton from '../../components/movies/HeroCarouselSkeleton/HeroCarouselSkeleton'
import MovieGrid from '../../components/movies/MovieGrid/MovieGrid'
import MovieGridSkeleton from '../../components/movies/MovieGridSkeleton/MovieGridSkeleton'
import Spinner from '../../components/Spinner/Spinner'
import EmptyState from '../../components/EmptyState/EmptyState'
import ErrorState from '../../components/ErrorState/ErrorState'

const HERO_COUNT = 5

function applyClientFilters(movies, { genreId, minRating }) {
  return movies.filter((movie) => {
    if (genreId && !movie.genreIds.includes(Number(genreId))) return false
    if (minRating > 0 && (movie.rating ?? 0) < minRating) return false
    return true
  })
}

function fetchMoviesPage({ isSearching, activeQuery, filters, page }) {
  if (isSearching) {
    return searchMovies({ query: activeQuery, page })
  }
  if (!hasActiveFilters(filters)) {
    return getTrending({ page })
  }
  return discoverMovies({
    page,
    genreId: filters.genreId,
    minRating: filters.minRating,
    sortBy:
      filters.sortBy === SORT_OPTIONS.TRENDING
        ? 'popularity.desc'
        : filters.sortBy,
  })
}

function ExplorationPage() {
  const [searchParams] = useSearchParams()
  const activeQuery = (searchParams.get('q') ?? '').trim()
  const isSearching = activeQuery.length > 0

  const [filters, setFilters] = useState(DEFAULT_FILTERS)

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
    getGenres()
      .then((list) => {
        if (!cancelled) setGenres(list)
      })
      .catch(() => {
        /* genres load failure is non-blocking */
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      setLoadMoreError(null)
      try {
        const result = await fetchMoviesPage({
          isSearching,
          activeQuery,
          filters,
          page: 1,
        })
        if (cancelled) return
        setMovies(result.movies)
        setPage(result.page)
        setTotalPages(result.totalPages)
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
  }, [
    activeQuery,
    isSearching,
    filters,
    retryNonce,
  ])

  const loadMore = useCallback(async () => {
    if (loading || loadingMore || page >= totalPages) return
    setLoadingMore(true)
    setLoadMoreError(null)
    try {
      const next = await fetchMoviesPage({
        isSearching,
        activeQuery,
        filters,
        page: page + 1,
      })
      setMovies((prev) => {
        const existingIds = new Set(prev.map((m) => m.id))
        const fresh = next.movies.filter((m) => !existingIds.has(m.id))
        return [...prev, ...fresh]
      })
      setPage(next.page)
      setTotalPages(next.totalPages)
    } catch (err) {
      setLoadMoreError(err)
    } finally {
      setLoadingMore(false)
    }
  }, [
    loading,
    loadingMore,
    page,
    totalPages,
    isSearching,
    activeQuery,
    filters,
  ])

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
    setPage(1)
    setTotalPages(1)
    setRetryNonce((n) => n + 1)
  }

  const handleRetryLoadMore = () => {
    setLoadMoreError(null)
    loadMore()
  }

  const handleClearFilters = () => setFilters(DEFAULT_FILTERS)

  const visibleMovies = useMemo(() => {
    if (!isSearching) return movies
    return applyClientFilters(movies, filters)
  }, [movies, isSearching, filters])

  const showHero = !isSearching && !hasActiveFilters(filters)
  const heroMovies = showHero ? visibleMovies.slice(0, HERO_COUNT) : []
  const gridMovies = showHero ? visibleMovies.slice(HERO_COUNT) : visibleMovies

  const reachedEnd =
    !loading &&
    !error &&
    !loadMoreError &&
    page >= totalPages &&
    movies.length > 0

  const sectionTitle = isSearching
    ? content.exploration.searchResultsTitle(activeQuery)
    : content.exploration.moviesSectionTitle

  return (
    <div className="flex flex-col gap-6 md:gap-10 pb-6 md:pb-10">
      {showHero && loading && <HeroCarouselSkeleton />}
      {showHero && !loading && !error && heroMovies.length > 0 && (
        <HeroCarousel movies={heroMovies} genres={genres} />
      )}

      <section className="flex flex-col gap-4 md:gap-6 w-full max-w-screen-2xl mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
          <h1 className="text-2xl md:text-4xl font-bold text-text">
            {sectionTitle}
          </h1>
          <FilterMenu
            genres={genres}
            filters={filters}
            onChange={setFilters}
            onClear={handleClearFilters}
          />
        </div>

        {loading && <MovieGridSkeleton />}

        {!loading && error && <ErrorState onRetry={handleRetry} />}

        {!loading && !error && visibleMovies.length === 0 && (
          <EmptyState
            title={isSearching ? content.states.emptySearchTitle : undefined}
            message={
              isSearching
                ? content.states.emptySearchMessage(activeQuery)
                : undefined
            }
          />
        )}

        {!loading && !error && gridMovies.length > 0 && (
          <>
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
          </>
        )}
      </section>
    </div>
  )
}

export default ExplorationPage
