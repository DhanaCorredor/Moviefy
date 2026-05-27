import { Link, useNavigate, useParams } from 'react-router-dom'
import { content } from '../../constants/content'
import { ROUTES } from '../../constants/urls'
import { getPersonDetail } from '../../services/tmdb'
import useTmdbDetail from '../../hooks/useTmdbDetail'
import MovieGrid from '../../components/movies/MovieGrid/MovieGrid'
import Spinner from '../../components/Spinner/Spinner'
import ErrorState from '../../components/ErrorState/ErrorState'

function formatDate(isoDate) {
  if (!isoDate) return null
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex flex-col md:flex-row md:gap-3 text-sm md:text-base">
      <span className="text-text/60 md:w-44 shrink-0">{label}</span>
      <span className="text-text">{value}</span>
    </div>
  )
}

function PersonDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    data: person,
    loading,
    error,
    notFound,
    retry: handleRetry,
  } = useTmdbDetail(getPersonDetail, id)

  const handleBack = () => navigate(-1)

  if (loading) {
    return (
      <div className="px-4 py-12 md:px-8">
        <Spinner />
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-20 md:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-text">
          {content.personDetail.notFoundTitle}
        </h2>
        <p className="text-sm md:text-base text-text/70">
          {content.personDetail.notFoundMessage}
        </p>
        <Link
          to={ROUTES.EXPLORATION}
          className="px-6 py-2.5 bg-primary text-text rounded-lg hover:opacity-90 transition"
        >
          {content.personDetail.notFoundCta}
        </Link>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 py-12 md:px-8">
        <ErrorState onRetry={handleRetry} />
      </div>
    )
  }

  if (!person) return null

  const isDirector = person.knownForDepartment === 'Directing'

  const roleLabel = isDirector
    ? content.personDetail.roleDirector
    : content.personDetail.roleActor

  const actingSection = {
    title: content.personDetail.actingFilmographyTitle,
    credits: person.actingCredits,
  }
  const directingSection = {
    title: content.personDetail.directingFilmographyTitle,
    credits: person.directingCredits,
  }
  const primarySection = isDirector ? directingSection : actingSection
  const secondarySection = isDirector ? actingSection : directingSection

  return (
    <article className="flex flex-col gap-8 md:gap-12 px-4 py-6 md:px-8 md:py-10 w-full max-w-screen-2xl mx-auto">
      <button
        type="button"
        onClick={handleBack}
        className="self-start px-4 py-2 bg-surface text-text rounded-lg hover:opacity-90 transition text-sm"
      >
        ← {content.personDetail.backCta}
      </button>

      <header className="flex flex-col md:flex-row gap-6 md:gap-10">
        <div className="w-40 md:w-64 shrink-0 aspect-[2/3] rounded-lg overflow-hidden bg-surface shadow-2xl">
          {person.profileUrl ? (
            <img
              src={person.profileUrl}
              alt={content.persons.profileAlt(person.name)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-xs text-text/40">
              {content.persons.noProfile}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-1">
            <span className="text-xs md:text-sm uppercase tracking-wider text-primary">
              {roleLabel}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-text">
              {person.name}
            </h1>
          </div>

          <div className="flex flex-col gap-2">
            <InfoRow
              label={content.personDetail.bornLabel}
              value={formatDate(person.birthday)}
            />
            <InfoRow
              label={content.personDetail.diedLabel}
              value={formatDate(person.deathday)}
            />
            <InfoRow
              label={content.personDetail.placeLabel}
              value={person.placeOfBirth}
            />
          </div>
        </div>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-text">
          {content.personDetail.biographyTitle}
        </h2>
        <p className="text-sm md:text-base text-text/80 leading-relaxed whitespace-pre-line">
          {person.biography || content.personDetail.noBiography}
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-text">
          {primarySection.title}
        </h2>
        {primarySection.credits.length > 0 ? (
          <MovieGrid movies={primarySection.credits} />
        ) : (
          <p className="text-sm text-text/60">
            {content.personDetail.noCredits}
          </p>
        )}
      </section>

      {secondarySection.credits.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-bold text-text">
            {secondarySection.title}
          </h2>
          <MovieGrid movies={secondarySection.credits} />
        </section>
      )}
    </article>
  )
}

export default PersonDetailPage
