import { useEffect, useMemo, useState } from 'react'
import { content } from '../../../constants/content'
import HeroSlide from '../HeroSlide/HeroSlide'
import TrailerModal from '../TrailerModal/TrailerModal'

const AUTO_ROTATE_MS = 5000

function HeroCarousel({ movies, genres = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [activeTrailer, setActiveTrailer] = useState(null)

  const genresById = useMemo(
    () => new Map(genres.map((g) => [g.id, g.name])),
    [genres]
  )

  useEffect(() => {
    if (isPaused || activeTrailer || movies.length <= 1) return

    const intervalId = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % movies.length)
    }, AUTO_ROTATE_MS)

    return () => clearInterval(intervalId)
  }, [isPaused, activeTrailer, movies.length])

  if (movies.length === 0) return null

  return (
    <section
      aria-label={content.hero.carouselAriaLabel}
      aria-roledescription={content.hero.carouselRoleDescription}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="flex flex-col gap-3 md:gap-4"
    >
      <div className="relative w-full aspect-[3/4] md:aspect-[21/9] md:max-h-[600px]">
        {movies.map((m, index) => {
          const isActive = index === currentIndex
          const firstGenreId = m.genreIds[0]
          const genreName = firstGenreId
            ? genresById.get(firstGenreId) ?? null
            : null
          return (
            <div
              key={m.id}
              aria-hidden={!isActive}
              inert={!isActive ? '' : undefined}
              className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                isActive
                  ? 'opacity-100 z-10'
                  : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <HeroSlide
                movie={m}
                genreName={genreName}
                onPlayTrailer={() =>
                  setActiveTrailer({ id: m.id, title: m.title })
                }
              />
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-center gap-2">
        {movies.map((m, index) => {
          const isActive = index === currentIndex
          return (
            <button
              key={m.id}
              type="button"
              aria-label={content.hero.goToSlideAriaLabel(index + 1)}
              aria-current={isActive}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                isActive
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-text/30 hover:bg-text/50'
              }`}
            />
          )
        })}
      </div>

      {activeTrailer && (
        <TrailerModal
          key={activeTrailer.id}
          movieId={activeTrailer.id}
          movieTitle={activeTrailer.title}
          onClose={() => setActiveTrailer(null)}
        />
      )}
    </section>
  )
}

export default HeroCarousel
