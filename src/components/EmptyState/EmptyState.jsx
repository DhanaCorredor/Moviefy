import { content } from '../../constants/content'

function EmptyState({ title, message }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      <h2 className="text-xl md:text-2xl font-semibold text-text">
        {title ?? content.states.emptyTitle}
      </h2>
      <p className="text-sm md:text-base text-text/70">
        {message ?? content.states.emptyMessage}
      </p>
    </div>
  )
}

export default EmptyState
