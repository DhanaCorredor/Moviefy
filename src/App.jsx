import { content } from './constants/content'

function App() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-primary">
          {content.app.title}
        </h1>
        <p className="text-text/70">{content.app.subtitle}</p>
      </header>
    </main>
  )
}

export default App
