import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import FavoriteButton from './FavoriteButton'
import FavoritesProvider from '../../../context/FavoritesProvider'
import { content } from '../../../constants/content'

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

function renderButton() {
  return render(
    <FavoritesProvider>
      <FavoriteButton movie={movie} withLabel />
    </FavoritesProvider>,
  )
}

describe('FavoriteButton', () => {
  it('marca una película como favorita al pulsar', () => {
    renderButton()
    fireEvent.click(
      screen.getByRole('button', {
        name: content.favorites.addAriaLabel(movie.title),
      }),
    )
    expect(
      screen.getByRole('button', {
        name: content.favorites.removeAriaLabel(movie.title),
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(content.favorites.addedLabel)).toBeInTheDocument()
  })

  it('quita la película de favoritas al volver a pulsar', () => {
    renderButton()
    fireEvent.click(
      screen.getByRole('button', {
        name: content.favorites.addAriaLabel(movie.title),
      }),
    )
    fireEvent.click(
      screen.getByRole('button', {
        name: content.favorites.removeAriaLabel(movie.title),
      }),
    )
    expect(
      screen.getByRole('button', {
        name: content.favorites.addAriaLabel(movie.title),
      }),
    ).toBeInTheDocument()
  })
})
