export const ROUTES = {
  WELCOME: '/',
  EXPLORATION: '/exploration',
  FAVORITES: '/favorites',
  PROFILE: '/profile',
  ABOUT: '/about',
}

export const TMDB = {
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  POSTER_SIZE: 'w342',
  BACKDROP_SIZE: 'w1280',
  LANGUAGE: 'es-ES',
  ENDPOINTS: {
    TRENDING_MOVIES: (timeWindow) => `/trending/movie/${timeWindow}`,
    GENRES_MOVIE_LIST: '/genre/movie/list',
  },
}

export const MOVIE_DETAIL_PATH = (id) => `/movies/${id}`
