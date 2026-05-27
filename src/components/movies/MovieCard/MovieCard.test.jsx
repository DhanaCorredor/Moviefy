import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import MovieCard from './MovieCard'

function renderCard(movie) {
  return render(
    <MemoryRouter>
      <MovieCard movie={movie} />
    </MemoryRouter>
  )
}

describe('MovieCard', () => {
  // Scenario: Mostrar el título de la película
  // Given una película con título "Inception"
  // When se renderiza la card
  // Then el título "Inception" aparece en pantalla
  it('Muestra el título de la película', () => {
    renderCard({
      id: 1,
      title: 'Inception',
      posterUrl: 'https://image.tmdb.org/poster.jpg',
      releaseYear: 2010,
      rating: 8.4,
    })

    expect(screen.getByText('Inception')).toBeInTheDocument()
  })

  // Scenario: Mostrar el año de estreno
  // Given una película con año 2010
  // When se renderiza la card
  // Then el año "2010" aparece en pantalla
  it('Muestra el año de estreno', () => {
    renderCard({
      id: 1,
      title: 'Inception',
      posterUrl: 'https://image.tmdb.org/poster.jpg',
      releaseYear: 2010,
      rating: 8.4,
    })

    expect(screen.getByText('2010')).toBeInTheDocument()
  })

  // Scenario: Mostrar mensaje cuando la película no tiene póster
  // Given una película sin posterUrl
  // When se renderiza la card
  // Then aparece el texto "Sin cartel" en lugar de la imagen
  it('Muestra "Sin cartel" cuando la película no tiene póster', () => {
    renderCard({
      id: 1,
      title: 'Película sin póster',
      posterUrl: null,
      releaseYear: 2024,
      rating: 7.0,
    })

    expect(screen.getByText('Sin cartel')).toBeInTheDocument()
  })
})
