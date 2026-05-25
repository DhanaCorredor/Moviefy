import { TMDB } from '../constants/urls'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

function buildUrl(path, params = {}) {
  const url = new URL(`${TMDB.BASE_URL}${path}`)
  url.searchParams.set('api_key', API_KEY)
  url.searchParams.set('language', TMDB.LANGUAGE)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }
  return url.toString()
}

function buildPosterUrl(posterPath) {
  if (!posterPath) return null
  return `${TMDB.IMAGE_BASE_URL}/${TMDB.POSTER_SIZE}${posterPath}`
}

function buildBackdropUrl(backdropPath) {
  if (!backdropPath) return null
  return `${TMDB.IMAGE_BASE_URL}/${TMDB.BACKDROP_SIZE}${backdropPath}`
}

function normalizeMovie(raw) {
  return {
    id: raw.id,
    title: raw.title,
    posterUrl: buildPosterUrl(raw.poster_path),
    backdropUrl: buildBackdropUrl(raw.backdrop_path),
    releaseYear: raw.release_date ? raw.release_date.slice(0, 4) : null,
    rating: typeof raw.vote_average === 'number'
      ? Number(raw.vote_average.toFixed(1))
      : null,
    overview: raw.overview ?? '',
    genreIds: Array.isArray(raw.genre_ids) ? raw.genre_ids : [],
  }
}

export async function getTrending({ timeWindow = 'day', page = 1 } = {}) {
  if (!API_KEY) {
    throw new Error('VITE_TMDB_API_KEY no está definida en .env')
  }

  const url = buildUrl(TMDB.ENDPOINTS.TRENDING_MOVIES(timeWindow), { page })
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`TMDB error ${response.status}: ${response.statusText}`)
  }

  const data = await response.json()

  return {
    page: data.page,
    totalPages: data.total_pages ?? 1,
    movies: data.results.map(normalizeMovie),
  }
}

export async function getGenres() {
  if (!API_KEY) {
    throw new Error('VITE_TMDB_API_KEY no está definida en .env')
  }

  const url = buildUrl(TMDB.ENDPOINTS.GENRES_MOVIE_LIST)
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`TMDB error ${response.status}: ${response.statusText}`)
  }

  const data = await response.json()
  return data.genres
}
