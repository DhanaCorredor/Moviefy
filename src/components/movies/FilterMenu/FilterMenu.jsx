import { useEffect, useRef, useState } from 'react'
import { content } from '../../../constants/content'
import {
  hasActiveFilters,
  RATING_THRESHOLDS,
  SORT_OPTIONS,
} from '../../../constants/filters'
import { IconChevronDown } from '../../icons/icons'

function FilterDropdown({ label, options, value, defaultValue, onChange }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  const isActive = String(value) !== String(defaultValue)
  const selected = options.find(
    (opt) => String(opt.value) === String(value),
  )

  useEffect(() => {
    if (!open) return

    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  function handleSelect(optValue) {
    onChange(optValue)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((prev) => !prev)}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer whitespace-nowrap border backdrop-blur ${
          isActive
            ? 'bg-primary text-text border-primary shadow-lg shadow-primary/30 hover:bg-primary/90'
            : 'bg-surface/60 text-text/80 border-text/10 hover:bg-surface hover:text-text hover:border-text/25'
        }`}
      >
        <span>{isActive && selected ? selected.label : label}</span>
        <IconChevronDown
          className={`h-3 w-3 opacity-70 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute right-0 top-full mt-2 min-w-48 max-h-72 overflow-y-auto py-1.5 bg-surface/95 backdrop-blur-md border border-text/10 rounded-lg shadow-xl shadow-black/50 z-30"
        >
          {options.map((opt) => {
            const isSelected = String(opt.value) === String(value)
            return (
              <li
                key={String(opt.value)}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    handleSelect(opt.value)
                  }
                }}
                tabIndex={0}
                className={`px-4 py-2 text-sm cursor-pointer transition outline-none ${
                  isSelected
                    ? 'text-primary bg-primary/10 font-medium'
                    : 'text-text/80 hover:bg-primary/20 hover:text-text focus:bg-primary/20 focus:text-text'
                }`}
              >
                {opt.label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function FilterMenu({ genres, filters, onChange, onClear }) {
  const isDirty = hasActiveFilters(filters)

  const genreOptions = [
    { value: '', label: content.filters.genreAll },
    ...genres.map((genre) => ({
      value: String(genre.id),
      label: genre.name,
    })),
  ]

  const ratingOptions = [
    { value: 0, label: content.filters.ratingAny },
    ...RATING_THRESHOLDS.map((n) => ({
      value: n,
      label: content.filters.ratingOption(n),
    })),
  ]

  const sortOptions = [
    { value: SORT_OPTIONS.TRENDING, label: content.filters.sortTrending },
    { value: SORT_OPTIONS.TOP_RATED, label: content.filters.sortTopRated },
    { value: SORT_OPTIONS.RECENT, label: content.filters.sortRecent },
  ]

  return (
    <div
      role="group"
      aria-label={content.filters.ariaLabel}
      className="flex items-center gap-2 overflow-x-auto -mx-4 px-4 pb-1 md:mx-0 md:px-0 md:flex-wrap md:overflow-visible md:justify-end"
    >
      <FilterDropdown
        label={content.filters.genreLabel}
        options={genreOptions}
        value={String(filters.genreId)}
        defaultValue=""
        onChange={(value) => onChange({ ...filters, genreId: value })}
      />

      <FilterDropdown
        label={content.filters.ratingLabel}
        options={ratingOptions}
        value={filters.minRating}
        defaultValue={0}
        onChange={(value) =>
          onChange({ ...filters, minRating: Number(value) })
        }
      />

      <FilterDropdown
        label={content.filters.sortLabel}
        options={sortOptions}
        value={filters.sortBy}
        defaultValue={SORT_OPTIONS.TRENDING}
        onChange={(value) => onChange({ ...filters, sortBy: value })}
      />

      {isDirty && (
        <button
          type="button"
          onClick={onClear}
          className="px-3 py-1.5 text-sm text-text/60 hover:text-text whitespace-nowrap transition"
        >
          {content.filters.clearAll}
        </button>
      )}
    </div>
  )
}

export default FilterMenu
