import MovieCardSkeleton from '../MovieCardSkeleton/MovieCardSkeleton'
import { content } from '../../../constants/content'

function MovieGridSkeleton({ count = 12 }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={content.states.loading}
      className="grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-5"
    >
      {Array.from({ length: count }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  )
}

export default MovieGridSkeleton
