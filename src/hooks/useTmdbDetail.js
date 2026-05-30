import { useEffect, useState } from 'react'

function useTmdbDetail(fetcher, id) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [retryNonce, setRetryNonce] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      setNotFound(false)
      try {
        const result = await fetcher(id)
        if (cancelled) return
        setData(result)
      } catch (err) {
        if (cancelled) return
        if (err.status === 404) {
          setNotFound(true)
        } else {
          setError(err)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    window.scrollTo({ top: 0 })

    return () => {
      cancelled = true
    }
  }, [fetcher, id, retryNonce])

  const retry = () => setRetryNonce((n) => n + 1)

  return { data, loading, error, notFound, retry }
}

export default useTmdbDetail
