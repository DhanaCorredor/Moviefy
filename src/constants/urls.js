export const ROUTES = {
  WELCOME: '/',
  EXPLORATION: '/exploration',
  FAVORITES: '/favorites',
  PROFILE: '/profile',
  ABOUT: '/about',
  MOVIE_DETAIL: '/movies/:id',
  ACTOR_DETAIL: '/actors/:id',
  DIRECTOR_DETAIL: '/directors/:id',
}

export const TMDB = {
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  POSTER_SIZE: 'w500',
  BACKDROP_SIZE: 'w1280',
  PROFILE_SIZE: 'w185',
  LANGUAGE: 'es-ES',
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
export const ACTOR_DETAIL_PATH = (id) => `/actors/${id}`
export const DIRECTOR_DETAIL_PATH = (id) => `/directors/${id}`
