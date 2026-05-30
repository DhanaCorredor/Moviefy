import { content } from '../../../constants/content'
import { IconHeart, IconHeartFilled } from '../../icons/icons'
import useFavorites from '../../../hooks/useFavorites'

function FavoriteButton({ movie, withLabel = false, className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(movie.id)

  const handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    toggleFavorite(movie)
  }

  const ariaLabel = active
    ? content.favorites.removeAriaLabel(movie.title)
    : content.favorites.addAriaLabel(movie.title)

  const Icon = active ? IconHeartFilled : IconHeart

  if (withLabel) {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={active}
        aria-label={ariaLabel}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
          active
            ? 'bg-primary text-text hover:opacity-90'
            : 'bg-surface text-text hover:bg-surface/80'
        } ${className}`}
      >
        <Icon className="h-5 w-5" />
        <span className="text-sm font-medium">
          {active ? content.favorites.addedLabel : content.favorites.addLabel}
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={ariaLabel}
      className={`flex items-center justify-center h-9 w-9 rounded-full bg-background/70 backdrop-blur transition hover:bg-background/90 ${
        active ? 'text-primary' : 'text-text/90'
      } ${className}`}
    >
      <Icon className="h-5 w-5" />
    </button>
  )
}

export default FavoriteButton
