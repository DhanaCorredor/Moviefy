import { content } from '../../constants/content'

function PersonImage({
  person,
  className = '',
  imgClassName = '',
  fallbackClassName = 'text-xs',
}) {
  return (
    <div className={className}>
      {person.profileUrl ? (
        <img
          src={person.profileUrl}
          alt={content.persons.profileAlt(person.name)}
          loading="lazy"
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      ) : (
        <div
          className={`flex items-center justify-center w-full h-full text-text/40 ${fallbackClassName}`}
        >
          {content.persons.noProfile}
        </div>
      )}
    </div>
  )
}

export default PersonImage
