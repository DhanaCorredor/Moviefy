import { useCallback, useMemo, useState } from 'react'
import { FavoritesContext } from './FavoritesContext'
import * as favoritesService from '../services/favorites'

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() =>
    favoritesService.getFavorites(),
  )

  const favoriteIds = useMemo(
    () => new Set(favorites.map((favorite) => favorite.id)),
    [favorites],
  )

  const isFavorite = useCallback((id) => favoriteIds.has(id), [favoriteIds])

  const addFavorite = useCallback((movie) => {
    setFavorites(favoritesService.addFavorite(movie))
  }, [])

  const removeFavorite = useCallback((id) => {
    setFavorites(favoritesService.removeFavorite(id))
  }, [])

  const toggleFavorite = useCallback(
    (movie) => {
      setFavorites(
        favoriteIds.has(movie.id)
          ? favoritesService.removeFavorite(movie.id)
          : favoritesService.addFavorite(movie),
      )
    },
    [favoriteIds],
  )

  const setUserRating = useCallback((id, userRating) => {
    setFavorites(favoritesService.setUserRating(id, userRating))
  }, [])

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      setUserRating,
    }),
    [
      favorites,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      setUserRating,
    ],
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesProvider
