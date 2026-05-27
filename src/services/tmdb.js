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

function buildImageUrl(path, size) {
  if (!path) return null
  return `${TMDB.IMAGE_BASE_URL}/${size}${path}`
}

async function tmdbFetch(path, params = {}, { notFoundResource } = {}) {
  if (!API_KEY) {
    throw new Error('VITE_TMDB_API_KEY no está definida en .env')
  }

  const response = await fetch(buildUrl(path, params))

  if (notFoundResource && response.status === 404) {
    const error = new Error(`TMDB ${notFoundResource} not found`)
    error.status = 404
    throw error
  }

  if (!response.ok) {
    throw new Error(`TMDB error ${response.status}: ${response.statusText}`)
  }

  return response.json()
}

function normalizeMovie(raw) {
  return {
    id: raw.id,
    title: raw.title,
    posterUrl: buildImageUrl(raw.poster_path, TMDB.POSTER_SIZE),
    backdropUrl: buildImageUrl(raw.backdrop_path, TMDB.BACKDROP_SIZE),
    releaseYear: raw.release_date ? raw.release_date.slice(0, 4) : null,
    rating: typeof raw.vote_average === 'number'
      ? Number(raw.vote_average.toFixed(1))
      : null,
    overview: raw.overview ?? '',
    genreIds: Array.isArray(raw.genre_ids) ? raw.genre_ids : [],
  }
}

function pickWatchProviders(rawWatchProviders) {
  const flatrate =
    rawWatchProviders?.results?.[TMDB.WATCH_REGION]?.flatrate ?? []
  return flatrate
    .slice()
    .sort((a, b) => a.display_priority - b.display_priority)
    .map((p) => ({
      id: p.provider_id,
      name: p.provider_name,
      logoUrl: buildImageUrl(p.logo_path, TMDB.LOGO_SIZE),
    }))
}

function pickTrailerKey(rawVideos) {
  const videos = rawVideos?.results ?? []
  const trailer =
    videos.find(
      (v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official,
    ) ??
    videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ??
    videos.find((v) => v.site === 'YouTube' && v.type === 'Teaser')
  return trailer?.key ?? null
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
      profileUrl: buildImageUrl(c.profile_path, TMDB.PROFILE_SIZE),
    }))

  const directors = (raw.credits?.crew ?? [])
    .filter((c) => c.job === 'Director')
    .map((c) => ({
      id: c.id,
      name: c.name,
      profileUrl: buildImageUrl(c.profile_path, TMDB.PROFILE_SIZE),
    }))

  return {
    id: raw.id,
    title: raw.title,
    tagline: raw.tagline ?? '',
    overview: raw.overview ?? '',
    posterUrl: buildImageUrl(raw.poster_path, TMDB.POSTER_SIZE),
    backdropUrl: buildImageUrl(raw.backdrop_path, TMDB.BACKDROP_SIZE),
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
    trailerKey: pickTrailerKey(raw.videos),
    watchProviders: pickWatchProviders(raw['watch/providers']),
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
    profileUrl: buildImageUrl(raw.profile_path, TMDB.PROFILE_SIZE),
    actingCredits,
    directingCredits,
  }
}

function toMoviesPage(data) {
  return {
    page: data.page,
    totalPages: data.total_pages ?? 1,
    movies: data.results.map(normalizeMovie),
  }
}

export async function getTrending({ timeWindow = 'day', page = 1 } = {}) {
  const data = await tmdbFetch(TMDB.ENDPOINTS.TRENDING_MOVIES(timeWindow), {
    page,
  })
  return toMoviesPage(data)
}

export async function getMovieDetail(movieId) {
  const data = await tmdbFetch(
    TMDB.ENDPOINTS.MOVIE_DETAIL(movieId),
    { append_to_response: 'credits,videos,watch/providers' },
    { notFoundResource: `movie ${movieId}` },
  )
  return normalizeMovieDetail(data)
}

export async function discoverMovies({
  page = 1,
  genreId,
  minRating = 0,
  sortBy = 'popularity.desc',
} = {}) {
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

  const data = await tmdbFetch(TMDB.ENDPOINTS.DISCOVER_MOVIES, params)
  return toMoviesPage(data)
}

export async function searchMovies({ query, page = 1 } = {}) {
  const trimmed = (query ?? '').trim()
  if (!trimmed) {
    return { page: 1, totalPages: 1, movies: [] }
  }

  const data = await tmdbFetch(TMDB.ENDPOINTS.SEARCH_MOVIES, {
    query: trimmed,
    page,
    include_adult: false,
  })
  return toMoviesPage(data)
}

export async function getPersonDetail(personId) {
  const data = await tmdbFetch(
    TMDB.ENDPOINTS.PERSON_DETAIL(personId),
    { append_to_response: 'movie_credits' },
    { notFoundResource: `person ${personId}` },
  )
  return normalizePersonDetail(data)
}

export async function getGenres() {
  const data = await tmdbFetch(TMDB.ENDPOINTS.GENRES_MOVIE_LIST)
  return data.genres
}
