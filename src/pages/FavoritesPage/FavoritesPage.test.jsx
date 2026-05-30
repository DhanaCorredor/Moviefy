import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach } from 'vitest'
import FavoritesPage from './FavoritesPage'
import FavoritesProvider from '../../context/FavoritesProvider'
import * as favorites from '../../services/favorites'
import { content } from '../../constants/content'

const movie = {
  id: 1,
  title: 'Inception',
  posterUrl: null,
  releaseYear: '2010',
  rating: 8.4,
}

beforeEach(() => {
  localStorage.clear()
})

function renderPage() {
  return render(
    <MemoryRouter>
      <FavoritesProvider>
        <FavoritesPage />
      </FavoritesProvider>
    </MemoryRouter>,
  )
}

describe('FavoritesPage', () => {
  it('muestra el estado vacío cuando no hay favoritas', () => {
    renderPage()
    expect(screen.getByText(content.favorites.emptyTitle)).toBeInTheDocument()
  })

  it('lista las películas favoritas guardadas', () => {
    favorites.addFavorite(movie)
    renderPage()
    expect(screen.getByText('Inception')).toBeInTheDocument()
  })

  it('elimina una favorita desde la lista', () => {
    favorites.addFavorite(movie)
    renderPage()
    fireEvent.click(screen.getByText(content.favorites.removeCta))
    expect(screen.queryByText('Inception')).not.toBeInTheDocument()
    expect(screen.getByText(content.favorites.emptyTitle)).toBeInTheDocument()
  })
})
