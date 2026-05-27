import { Link } from 'react-router-dom'
import { content } from '../../../constants/content'
import { PERSON_DETAIL_PATH } from '../../../constants/urls'
import PersonImage from '../../PersonImage/PersonImage'

function DirectorCard({ person }) {
  return (
    <Link
      to={PERSON_DETAIL_PATH(person.id)}
      className="group flex items-center gap-3"
    >
      <PersonImage
        person={person}
        className="size-14 md:size-16 rounded-full overflow-hidden bg-surface shrink-0"
        fallbackClassName="text-[10px]"
      />
      <p className="text-sm md:text-base font-semibold text-text group-hover:text-primary transition-colors">
        {person.name}
      </p>
    </Link>
  )
}

function MovieDirectorsList({ directors }) {
  return (
    <section className="flex flex-col gap-4 w-full max-w-screen-2xl mx-auto px-4 md:px-8">
      <h2 className="text-xl md:text-2xl font-bold text-text">
        {content.movieDetail.directorTitle}
      </h2>
      {directors.length > 0 ? (
        <div className="flex flex-wrap gap-4 md:gap-6">
          {directors.map((person) => (
            <DirectorCard key={person.id} person={person} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-text/60">{content.movieDetail.noDirector}</p>
      )}
    </section>
  )
}

export default MovieDirectorsList
