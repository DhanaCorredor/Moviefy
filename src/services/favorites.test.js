import { describe, it, expect, beforeEach } from 'vitest'
import * as favorites from './favorites'

const movie = {
  id: 1,
  title: 'Inception',
  posterUrl: 'https://image.tmdb.org/t/p/w500/inception.jpg',
  releaseYear: '2010',
  rating: 8.4,
}

beforeEach(() => {
  localStorage.clear()
})

describe('favorites service', () => {
  it('no hay favoritas al principio', () => {
    expect(favorites.getFavorites()).toEqual([])
  })

  it('marca una película como favorita y la persiste en localStorage', () => {
    favorites.addFavorite(movie)
    expect(favorites.isFavorite(1)).toBe(true)
    expect(favorites.getFavorites()).toHaveLength(1)
  })

  it('no duplica una película que ya es favorita', () => {
    favorites.addFavorite(movie)
    favorites.addFavorite(movie)
    expect(favorites.getFavorites()).toHaveLength(1)
  })

  it('quita una película de favoritas', () => {
    favorites.addFavorite(movie)
    favorites.removeFavorite(1)
    expect(favorites.isFavorite(1)).toBe(false)
    expect(favorites.getFavorites()).toEqual([])
  })

  it('asigna una puntuación personal del 1 al 10 a una favorita', () => {
    favorites.addFavorite(movie)
    favorites.setUserRating(1, 9)
    expect(favorites.getFavorites()[0].userRating).toBe(9)
  })

  it('no puntúa una película que no es favorita', () => {
    favorites.setUserRating(99, 5)
    expect(favorites.getFavorites()).toEqual([])
  })
})
