import MovieCard from '../MovieCard/MovieCard'

function MovieGrid({ movies }) {
  return (
    <ul className="grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-5">
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  )
}

export default MovieGrid
