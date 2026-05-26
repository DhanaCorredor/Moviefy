import { content } from '../../../constants/content'

export const SORT_OPTIONS = {
  TRENDING: 'trending',
  TOP_RATED: 'vote_average.desc',
  RECENT: 'primary_release_date.desc',
}

export const DEFAULT_FILTERS = {
  genreId: '',
  minRating: 0,
  sortBy: SORT_OPTIONS.TRENDING,
}

const RATING_THRESHOLDS = [5, 6, 7, 8, 9]

function FilterMenu({ genres, filters, onChange, onClear }) {
  const isDirty =
    filters.genreId !== DEFAULT_FILTERS.genreId ||
    filters.minRating !== DEFAULT_FILTERS.minRating ||
    filters.sortBy !== DEFAULT_FILTERS.sortBy

  const handleField = (field) => (event) => {
    const raw = event.target.value
    const value = field === 'minRating' ? Number(raw) : raw
    onChange({ ...filters, [field]: value })
  }

  const selectClass =
    'min-w-0 px-3 py-2 bg-surface text-text text-sm rounded-lg border border-transparent focus:border-primary focus:outline-none transition cursor-pointer'

  return (
    <div
      role="group"
      aria-label={content.filters.ariaLabel}
      className="flex flex-wrap items-center gap-2 md:gap-3"
    >
      <label className="flex flex-col gap-1 min-w-0">
        <span className="text-xs text-text/60">
          {content.filters.genreLabel}
        </span>
        <select
          value={filters.genreId}
          onChange={handleField('genreId')}
          className={selectClass}
        >
          <option value="">{content.filters.genreAll}</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 min-w-0">
        <span className="text-xs text-text/60">
          {content.filters.ratingLabel}
        </span>
        <select
          value={filters.minRating}
          onChange={handleField('minRating')}
          className={selectClass}
        >
          <option value="0">{content.filters.ratingAny}</option>
          {RATING_THRESHOLDS.map((n) => (
            <option key={n} value={n}>
              {content.filters.ratingOption(n)}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 min-w-0">
        <span className="text-xs text-text/60">
          {content.filters.sortLabel}
        </span>
        <select
          value={filters.sortBy}
          onChange={handleField('sortBy')}
          className={selectClass}
        >
          <option value={SORT_OPTIONS.TRENDING}>
            {content.filters.sortTrending}
          </option>
          <option value={SORT_OPTIONS.TOP_RATED}>
            {content.filters.sortTopRated}
          </option>
          <option value={SORT_OPTIONS.RECENT}>
            {content.filters.sortRecent}
          </option>
        </select>
      </label>

      {isDirty && (
        <button
          type="button"
          onClick={onClear}
          className="self-end px-3 py-2 text-sm text-text/70 hover:text-text transition"
        >
          {content.filters.clearAll}
        </button>
      )}
    </div>
  )
}

export default FilterMenu
