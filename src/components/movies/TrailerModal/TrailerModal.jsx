import { useEffect, useRef, useState } from 'react'
import { content } from '../../../constants/content'
import { getMovieDetail } from '../../../services/tmdb'
import { IconClose } from '../../icons/icons'

function TrailerModal({ movieId, movieTitle, onClose }) {
  const [state, setState] = useState({
    loading: true,
    trailerKey: null,
    error: false,
  })
  const closeButtonRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    getMovieDetail(movieId)
      .then((data) => {
        if (cancelled) return
        setState({
          loading: false,
          trailerKey: data.trailerKey,
          error: false,
        })
      })
      .catch(() => {
        if (cancelled) return
        setState({ loading: false, trailerKey: null, error: true })
      })

    return () => {
      cancelled = true
    }
  }, [movieId])

  useEffect(() => {
    closeButtonRef.current?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKey(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={content.movieDetail.trailerFrameTitle(movieTitle)}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-5xl aspect-video bg-surface rounded-lg overflow-hidden shadow-2xl"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={content.trailerModal.closeAriaLabel}
          className="absolute top-2 right-2 z-10 flex items-center justify-center h-9 w-9 rounded-full bg-black/60 text-text hover:bg-black/80 transition"
        >
          <IconClose className="h-5 w-5" />
        </button>

        {state.loading && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-text/70">
            {content.trailerModal.loading}
          </div>
        )}

        {!state.loading && state.error && (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-text/70">
            {content.trailerModal.errorMessage}
          </div>
        )}

        {!state.loading && !state.error && !state.trailerKey && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
            <h3 className="text-base md:text-lg font-semibold text-text">
              {content.trailerModal.noTrailerTitle}
            </h3>
            <p className="text-sm text-text/70">
              {content.trailerModal.noTrailerMessage}
            </p>
          </div>
        )}

        {!state.loading && state.trailerKey && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${state.trailerKey}?autoplay=1`}
            title={content.movieDetail.trailerFrameTitle(movieTitle)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        )}
      </div>
    </div>
  )
}

export default TrailerModal
