import { content } from '../../constants/content'

function Spinner() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-3 py-12"
    >
      <div className="size-10 rounded-full border-4 border-surface border-t-primary animate-spin" />
      <span className="text-sm text-text/70">{content.states.loading}</span>
    </div>
  )
}

export default Spinner
