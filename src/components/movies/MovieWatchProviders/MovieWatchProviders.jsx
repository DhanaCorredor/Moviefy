import { content } from '../../../constants/content'

function MovieWatchProviders({ providers }) {
  if (providers.length === 0) return null

  return (
    <section className="flex flex-col gap-3 w-full max-w-screen-2xl mx-auto px-4 md:px-8">
      <h2 className="text-xl md:text-2xl font-bold text-text">
        {content.movieDetail.watchTitle}
      </h2>
      <ul className="flex flex-wrap gap-3">
        {providers.map((provider) => (
          <li
            key={provider.id}
            title={provider.name}
            className="size-12 md:size-14 rounded-lg overflow-hidden bg-surface"
          >
            {provider.logoUrl && (
              <img
                src={provider.logoUrl}
                alt={content.movieDetail.watchProviderAlt(provider.name)}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            )}
          </li>
        ))}
      </ul>
      <p className="text-xs text-text/50">
        {content.movieDetail.watchAttribution}
      </p>
    </section>
  )
}

export default MovieWatchProviders
