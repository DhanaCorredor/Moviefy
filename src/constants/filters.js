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

export const RATING_THRESHOLDS = [5, 6, 7, 8, 9]
