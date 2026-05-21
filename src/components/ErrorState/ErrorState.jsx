import { content } from '../../constants/content'

function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <h2 className="text-xl md:text-2xl font-semibold text-text">
        {content.states.errorTitle}
      </h2>
      <p className="text-sm md:text-base text-text/70">
        {content.states.errorMessage}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-6 py-2.5 bg-primary text-text rounded-lg hover:opacity-90 transition"
        >
          {content.states.retry}
        </button>
      )}
    </div>
  )
}

export default ErrorState
