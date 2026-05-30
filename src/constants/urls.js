export const ROUTES = {
  WELCOME: '/',
  EXPLORATION: '/exploration',
  FAVORITES: '/favorites',
  PROFILE: '/profile',
  MOVIE_DETAIL: '/movies/:id',
  PERSON_DETAIL: '/persons/:id',
}

export const TMDB = {
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  POSTER_SIZE: 'w500',
  BACKDROP_SIZE: 'w1280',
  PROFILE_SIZE: 'w185',
  LOGO_SIZE: 'w92',
  LANGUAGE: 'es-ES',
  WATCH_REGION: 'ES',
  ENDPOINTS: {
    TRENDING_MOVIES: (timeWindow) => `/trending/movie/${timeWindow}`,
    GENRES_MOVIE_LIST: '/genre/movie/list',
    MOVIE_DETAIL: (id) => `/movie/${id}`,
    SEARCH_MOVIES: '/search/movie',
    DISCOVER_MOVIES: '/discover/movie',
    PERSON_DETAIL: (id) => `/person/${id}`,
  },
}

export const MOVIE_DETAIL_PATH = (id) => `/movies/${id}`
export const PERSON_DETAIL_PATH = (id) => `/persons/${id}`

export const YOUTUBE_EMBED_URL = (key, { autoplay = false } = {}) =>
  `https://www.youtube-nocookie.com/embed/${key}${autoplay ? '?autoplay=1' : ''}`
