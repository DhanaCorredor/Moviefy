import { Link } from 'react-router-dom'
import { content } from '../../../constants/content'
import { PERSON_DETAIL_PATH } from '../../../constants/urls'
import PersonImage from '../../PersonImage/PersonImage'

function CastCard({ person }) {
  return (
    <Link
      to={PERSON_DETAIL_PATH(person.id)}
      className="group flex flex-col gap-2 w-28 md:w-36 shrink-0"
    >
      <PersonImage
        person={person}
        className="aspect-[2/3] rounded-lg overflow-hidden bg-surface transition-shadow group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
        imgClassName="group-hover:scale-105 transition-transform duration-200"
      />
      <div className="flex flex-col gap-0.5 px-0.5">
        <p className="text-xs md:text-sm font-semibold text-text line-clamp-2 group-hover:text-primary transition-colors">
          {person.name}
        </p>
        {person.character && (
          <p className="text-[10px] md:text-xs text-text/60 line-clamp-2">
            {person.character}
          </p>
        )}
      </div>
    </Link>
  )
}

function MovieCastList({ cast }) {
  return (
    <section className="flex flex-col gap-4 w-full max-w-screen-2xl mx-auto px-4 md:px-8">
      <h2 className="text-xl md:text-2xl font-bold text-text">
        {content.movieDetail.castTitle}
      </h2>
      {cast.length > 0 ? (
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          {cast.map((person) => (
            <CastCard key={person.id} person={person} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-text/60">{content.movieDetail.noCast}</p>
      )}
    </section>
  )
}

export default MovieCastList
