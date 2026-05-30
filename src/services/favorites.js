const STORAGE_KEY = 'moviefy:favorites'

function readStore() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return {}
  return JSON.parse(raw)
}

function writeStore(store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

function toFavorite(movie) {
  return {
    id: movie.id,
    title: movie.title,
    posterUrl: movie.posterUrl ?? null,
    releaseYear: movie.releaseYear ?? null,
    rating: movie.rating ?? null,
    userRating: null,
    addedAt: Date.now(),
  }
}

export function getFavorites() {
  const store = readStore()
  return Object.values(store).sort((a, b) => b.addedAt - a.addedAt)
}

export function isFavorite(id) {
  const store = readStore()
  return Boolean(store[id])
}

export function addFavorite(movie) {
  const store = readStore()
  if (!store[movie.id]) {
    store[movie.id] = toFavorite(movie)
    writeStore(store)
  }
  return getFavorites()
}

export function removeFavorite(id) {
  const store = readStore()
  delete store[id]
  writeStore(store)
  return getFavorites()
}

export function setUserRating(id, userRating) {
  const store = readStore()
  const favorite = store[id]
  if (favorite) {
    favorite.userRating = userRating
    writeStore(store)
  }
  return getFavorites()
}
