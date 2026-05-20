import { content } from '../../constants/content'

function ExplorationPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-background">
      <h1 className="mb-4 text-3xl font-bold text-text">{content.exploration.title}</h1>
      <p className="text-sm text-text/70">{content.exploration.placeholder}</p>
    </main>
  )
}

export default ExplorationPage
