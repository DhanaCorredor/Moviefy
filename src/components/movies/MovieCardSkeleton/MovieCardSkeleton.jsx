function MovieCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col gap-2 animate-pulse"
    >
      <div className="aspect-[2/3] rounded-lg bg-surface" />
      <div className="flex flex-col gap-1.5 px-0.5">
        <div className="h-4 w-3/4 rounded bg-surface" />
        <div className="h-3 w-1/2 rounded bg-surface" />
      </div>
    </div>
  )
}

export default MovieCardSkeleton
