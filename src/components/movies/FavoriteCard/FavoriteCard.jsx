import { content } from '../../../constants/content'
import useFavorites from '../../../hooks/useFavorites'
import MovieCard from '../MovieCard/MovieCard'
import Rating from '../Rating/Rating'

function FavoriteCard({ favorite }) {
  const { removeFavorite, setUserRating } = useFavorites()

  return (
    <div className="flex flex-col gap-2">
      <MovieCard movie={favorite} />
      <Rating
        value={favorite.userRating}
        onChange={(value) => setUserRating(favorite.id, value)}
      />
      <button
        type="button"
        onClick={() => removeFavorite(favorite.id)}
        className="self-start text-xs text-text/60 hover:text-primary transition"
      >
        {content.favorites.removeCta}
      </button>
    </div>
  )
}

export default FavoriteCard
