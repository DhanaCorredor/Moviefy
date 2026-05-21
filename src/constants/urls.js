export const ROUTES = {
  WELCOME: '/',
  EXPLORATION: '/exploration',
  FAVORITES: '/favorites',
  PROFILE: '/profile',
}

export const TMDB = {
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  POSTER_SIZE: 'w342',
  LANGUAGE: 'es-ES',
  ENDPOINTS: {
    TRENDING_MOVIES: (timeWindow) => `/trending/movie/${timeWindow}`,
  },
}
