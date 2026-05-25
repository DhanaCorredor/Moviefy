import { content } from '../../constants/content'
import { IconExternalLink } from '../../components/icons/icons'

function AboutPage() {
  return (
    <div className="flex flex-col gap-8 px-4 py-6 md:px-8 md:py-10 md:max-w-3xl md:mx-auto">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl md:text-5xl font-bold text-text">
          {content.about.title}
        </h1>
        <p className="text-base md:text-lg text-text/70 leading-relaxed">
          {content.about.intro}
        </p>
      </header>

      <section className="flex flex-col gap-4 p-6 md:p-8 bg-surface rounded-lg">
        <div className="flex items-center gap-4">
          <img
            src="/tmdb-logo.svg"
            alt=""
            className="h-10 md:h-12 w-auto"
          />
          <h2 className="text-xl md:text-2xl font-semibold text-text">
            {content.about.tmdbSectionTitle}
          </h2>
        </div>

        <p className="text-sm md:text-base text-text/80 leading-relaxed">
          {content.about.tmdbAttribution}
        </p>

        <a
          href={content.about.tmdbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start inline-flex items-center gap-2 px-5 py-2 bg-primary text-text font-medium rounded-lg hover:opacity-90 transition"
        >
          {content.about.tmdbVisitCta}
          <IconExternalLink className="h-4 w-4" />
        </a>
      </section>
    </div>
  )
}

export default AboutPage
