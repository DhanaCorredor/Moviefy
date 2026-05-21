import { content } from '../../constants/content'

function UnderConstruction() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-6 md:px-12 text-center">
      <h1 className="mb-4 md:mb-6 text-3xl md:text-5xl font-bold text-text">
        {content.underConstruction.title}
      </h1>
      <p className="text-sm md:text-base text-text/70">
        {content.underConstruction.message}
      </p>
    </section>
  )
}

export default UnderConstruction
