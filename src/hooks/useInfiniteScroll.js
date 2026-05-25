import { useEffect, useRef } from 'react'

function useInfiniteScroll({ onLoadMore, enabled, rootMargin = '300px' }) {
  const sentinelRef = useRef(null)
  const callbackRef = useRef(onLoadMore)
  callbackRef.current = onLoadMore

  useEffect(() => {
    if (!enabled) return
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callbackRef.current()
        }
      },
      { rootMargin }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [enabled, rootMargin])

  return sentinelRef
}

export default useInfiniteScroll
