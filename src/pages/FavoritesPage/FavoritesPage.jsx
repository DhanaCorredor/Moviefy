import { Link } from 'react-router-dom'
import { content } from '../../constants/content'
import { ROUTES } from '../../constants/urls'
import useFavorites from '../../hooks/useFavorites'
import EmptyState from '../../components/EmptyState/EmptyState'
import FavoriteCard from '../../components/movies/FavoriteCard/FavoriteCard'

function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <section className="flex flex-col gap-4 md:gap-6 w-full max-w-screen-2xl mx-auto px-4 md:px-8 py-6 md:py-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-4xl font-bold text-text">
          {content.favorites.pageTitle}
        </h1>
        {favorites.length > 0 && (
          <p className="text-sm text-text/60">
            {content.favorites.countLabel(favorites.length)}
          </p>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <EmptyState
            title={content.favorites.emptyTitle}
            message={content.favorites.emptyMessage}
          />
          <Link
            to={ROUTES.EXPLORATION}
            className="px-6 py-2.5 bg-primary text-text rounded-lg hover:opacity-90 transition"
          >
            {content.favorites.emptyCta}
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {favorites.map((favorite) => (
            <li key={favorite.id}>
              <FavoriteCard favorite={favorite} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default FavoritesPage
