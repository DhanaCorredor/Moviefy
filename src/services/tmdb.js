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

function buildProfileUrl(profilePath) {
  if (!profilePath) return null
  return `${TMDB.IMAGE_BASE_URL}/${TMDB.PROFILE_SIZE}${profilePath}`
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

function normalizeMovieDetail(raw) {
  const cast = (raw.credits?.cast ?? [])
    .slice()
    .sort((a, b) => a.order - b.order)
    .slice(0, 10)
    .map((c) => ({
      id: c.id,
      name: c.name,
      character: c.character ?? '',
      profileUrl: buildProfileUrl(c.profile_path),
    }))

  const directors = (raw.credits?.crew ?? [])
    .filter((c) => c.job === 'Director')
    .map((c) => ({
      id: c.id,
      name: c.name,
      profileUrl: buildProfileUrl(c.profile_path),
    }))

  return {
    id: raw.id,
    title: raw.title,
    tagline: raw.tagline ?? '',
    overview: raw.overview ?? '',
    posterUrl: buildPosterUrl(raw.poster_path),
    backdropUrl: buildBackdropUrl(raw.backdrop_path),
    releaseYear: raw.release_date ? raw.release_date.slice(0, 4) : null,
    runtime: typeof raw.runtime === 'number' ? raw.runtime : null,
    rating:
      typeof raw.vote_average === 'number'
        ? Number(raw.vote_average.toFixed(1))
        : null,
    genres: Array.isArray(raw.genres)
      ? raw.genres.map((g) => ({ id: g.id, name: g.name }))
      : [],
    cast,
    directors,
  }
}

export async function getMovieDetail(movieId) {
  if (!API_KEY) {
    throw new Error('VITE_TMDB_API_KEY no está definida en .env')
  }

  const url = buildUrl(TMDB.ENDPOINTS.MOVIE_DETAIL(movieId), {
    append_to_response: 'credits',
  })
  const response = await fetch(url)

  if (response.status === 404) {
    const error = new Error(`TMDB movie ${movieId} not found`)
    error.status = 404
    throw error
  }

  if (!response.ok) {
    throw new Error(`TMDB error ${response.status}: ${response.statusText}`)
  }

  const data = await response.json()
  return normalizeMovieDetail(data)
}

export async function discoverMovies({
  page = 1,
  genreId,
  minRating = 0,
  sortBy = 'popularity.desc',
} = {}) {
  if (!API_KEY) {
    throw new Error('VITE_TMDB_API_KEY no está definida en .env')
  }

  const params = {
    page,
    include_adult: false,
    include_video: false,
    sort_by: sortBy,
  }
  if (genreId) params.with_genres = genreId
  if (minRating > 0) {
    params['vote_average.gte'] = minRating
    params['vote_count.gte'] = 200
  }

  const url = buildUrl(TMDB.ENDPOINTS.DISCOVER_MOVIES, params)
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

export async function searchMovies({ query, page = 1 } = {}) {
  if (!API_KEY) {
    throw new Error('VITE_TMDB_API_KEY no está definida en .env')
  }

  const trimmed = (query ?? '').trim()
  if (!trimmed) {
    return { page: 1, totalPages: 1, movies: [] }
  }

  const url = buildUrl(TMDB.ENDPOINTS.SEARCH_MOVIES, {
    query: trimmed,
    page,
    include_adult: false,
  })
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

function dedupeByMovieId(credits) {
  const seen = new Set()
  const result = []
  for (const credit of credits) {
    if (seen.has(credit.id)) continue
    seen.add(credit.id)
    result.push(credit)
  }
  return result
}

function sortByReleaseDateDesc(a, b) {
  const dateA = a.release_date || ''
  const dateB = b.release_date || ''
  if (dateA === dateB) return 0
  return dateA < dateB ? 1 : -1
}

function normalizePersonDetail(raw) {
  const rawCast = raw.movie_credits?.cast ?? []
  const rawCrew = raw.movie_credits?.crew ?? []

  const actingCredits = dedupeByMovieId(
    rawCast.slice().sort(sortByReleaseDateDesc),
  ).map((credit) => ({
    ...normalizeMovie(credit),
    character: credit.character ?? '',
  }))

  const directingCredits = dedupeByMovieId(
    rawCrew
      .filter((credit) => credit.job === 'Director')
      .sort(sortByReleaseDateDesc),
  ).map((credit) => normalizeMovie(credit))

  return {
    id: raw.id,
    name: raw.name,
    biography: raw.biography ?? '',
    birthday: raw.birthday ?? null,
    deathday: raw.deathday ?? null,
    placeOfBirth: raw.place_of_birth ?? '',
    knownForDepartment: raw.known_for_department ?? '',
    profileUrl: buildProfileUrl(raw.profile_path),
    actingCredits,
    directingCredits,
  }
}

export async function getPersonDetail(personId) {
  if (!API_KEY) {
    throw new Error('VITE_TMDB_API_KEY no está definida en .env')
  }

  const url = buildUrl(TMDB.ENDPOINTS.PERSON_DETAIL(personId), {
    append_to_response: 'movie_credits',
  })
  const response = await fetch(url)

  if (response.status === 404) {
    const error = new Error(`TMDB person ${personId} not found`)
    error.status = 404
    throw error
  }

  if (!response.ok) {
    throw new Error(`TMDB error ${response.status}: ${response.statusText}`)
  }

  const data = await response.json()
  return normalizePersonDetail(data)
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
