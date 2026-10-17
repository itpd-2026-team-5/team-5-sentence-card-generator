import { useCallback, useEffect, useState } from 'react'

const read = () => location.hash.replace(/^#/, '') || '/'

/** A tiny hash router, so every screen has a link you can open or share.
 *  Returns the path and its query, such as `/study` and `decks=1,2`. */
export function useRoute(): [string, URLSearchParams, (to: string) => void] {
  const [route, setRoute] = useState(read)
  useEffect(() => {
    const onChange = () => setRoute(read())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  const go = useCallback((to: string) => {
    location.hash = to
  }, [])
  const [path, query = ''] = route.split('?')
  return [path, new URLSearchParams(query), go]
}
