import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Rating from './Rating'
import { content } from '../../../constants/content'

describe('Rating', () => {
  it('permite asignar una puntuación del 1 al 10', () => {
    const onChange = vi.fn()
    render(<Rating value={null} onChange={onChange} />)
    const stars = screen.getAllByRole('button')
    fireEvent.click(stars[7])
    expect(onChange).toHaveBeenCalledWith(8)
  })

  it('muestra la puntuación personal actual', () => {
    render(<Rating value={7} onChange={() => {}} />)
    expect(
      screen.getByText(content.favorites.ratingValue(7)),
    ).toBeInTheDocument()
  })

  it('indica "Sin puntuar" cuando no hay puntuación', () => {
    render(<Rating value={null} onChange={() => {}} />)
    expect(screen.getByText(content.favorites.noRating)).toBeInTheDocument()
  })

  it('quita la puntuación al pulsar la estrella ya seleccionada', () => {
    const onChange = vi.fn()
    render(<Rating value={8} onChange={onChange} />)
    const stars = screen.getAllByRole('button')
    fireEvent.click(stars[7])
    expect(onChange).toHaveBeenCalledWith(null)
  })
})
