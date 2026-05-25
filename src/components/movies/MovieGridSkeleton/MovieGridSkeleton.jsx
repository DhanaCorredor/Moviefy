import MovieCardSkeleton from '../MovieCardSkeleton/MovieCardSkeleton'

function MovieGridSkeleton({ count = 8 }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Cargando películas"
      className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
    >
      {Array.from({ length: count }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  )
}

export default MovieGridSkeleton
