import { useEffect, useState } from 'react'
import { content } from '../../constants/content'
import { getTrending } from '../../services/tmdb'
import MovieGrid from '../../components/movies/MovieGrid/MovieGrid'
import Spinner from '../../components/Spinner/Spinner'
import EmptyState from '../../components/EmptyState/EmptyState'
import ErrorState from '../../components/ErrorState/ErrorState'

function ExplorationPage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadTrending = async () => {
    setLoading(true)
    setError(null)
    try {
      const { movies } = await getTrending()
      setMovies(movies)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTrending()
  }, [])

  return (
    <div className="px-4 py-6 md:px-8 md:py-10">
      <h1 className="mb-6 md:mb-8 text-2xl md:text-4xl font-bold text-text">
        {content.exploration.title}
      </h1>

      {loading && <Spinner />}
      {!loading && error && <ErrorState onRetry={loadTrending} />}
      {!loading && !error && movies.length === 0 && <EmptyState />}
      {!loading && !error && movies.length > 0 && <MovieGrid movies={movies} />}
    </div>
  )
}

export default ExplorationPage
