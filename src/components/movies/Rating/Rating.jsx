import { content } from '../../../constants/content'

const STARS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function Rating({ value, onChange }) {
  return (
    <div
      role="group"
      aria-label={content.favorites.ratingLabel}
      className="flex flex-wrap items-center gap-0.5"
    >
      {STARS.map((star) => {
        const filled = value != null && star <= value
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star === value ? null : star)}
            aria-label={content.favorites.setRatingAriaLabel(star)}
            aria-pressed={filled}
            className={`text-sm leading-none transition ${
              filled
                ? 'text-yellow-400'
                : 'text-text/25 hover:text-yellow-400/60'
            }`}
          >
            ★
          </button>
        )
      })}
      <span className="ml-1.5 text-[10px] md:text-xs text-text/60">
        {value != null
          ? content.favorites.ratingValue(value)
          : content.favorites.noRating}
      </span>
    </div>
  )
}

export default Rating
