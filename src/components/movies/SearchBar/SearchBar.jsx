import { content } from '../../../constants/content'
import { IconClose, IconSearch } from '../../icons/icons'

function SearchBar({ value, onChange }) {
  const hasValue = value.length > 0

  return (
    <div className="relative w-full max-w-2xl">
      <span
        aria-hidden="true"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-text/50"
      >
        <IconSearch className="h-5 w-5" />
      </span>
      <input
        type="search"
        role="searchbox"
        aria-label={content.search.ariaLabel}
        placeholder={content.search.placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full pl-10 pr-10 py-2.5 bg-surface text-text placeholder:text-text/40 rounded-lg border border-transparent focus:border-primary focus:outline-none transition"
      />
      {hasValue && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label={content.search.clearAriaLabel}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-text/60 hover:text-text rounded-lg transition"
        >
          <IconClose className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default SearchBar
