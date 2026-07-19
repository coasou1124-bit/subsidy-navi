'use client'
import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'subsidy_favorites'
const SYNC_EVENT = 'favorites-changed'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const load = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        setFavorites(stored ? JSON.parse(stored) : [])
      } catch {}
      setLoaded(true)
    }
    load()
    window.addEventListener(SYNC_EVENT, load)
    return () => window.removeEventListener(SYNC_EVENT, load)
  }, [])

  const toggle = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        window.dispatchEvent(new CustomEvent(SYNC_EVENT))
      } catch {}
      return next
    })
  }, [])

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites])

  return { favorites, toggle, isFavorite, loaded }
}
