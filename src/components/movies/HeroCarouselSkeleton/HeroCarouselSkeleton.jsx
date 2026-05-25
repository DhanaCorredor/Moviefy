function HeroCarouselSkeleton({ dotsCount = 5 }) {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col gap-3 md:gap-4"
    >
      <div className="w-full aspect-[3/4] md:aspect-[21/9] md:max-h-[600px] bg-surface animate-pulse" />
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: dotsCount }).map((_, i) => (
          <div key={i} className="h-2 w-2 rounded-full bg-surface" />
        ))}
      </div>
    </div>
  )
}

export default HeroCarouselSkeleton
