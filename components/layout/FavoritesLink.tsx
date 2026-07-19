'use client'
import Link from 'next/link'
import { useFavorites } from '@/lib/useFavorites'

export default function FavoritesLink() {
  const { favorites } = useFavorites()
  return (
    <Link
      href="/favorites"
      className="relative text-slate-500 hover:text-slate-700 transition-colors text-sm flex items-center gap-1"
    >
      ★ お気に入り
      {favorites.length > 0 && (
        <span className="bg-amber-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
          {favorites.length}
        </span>
      )}
    </Link>
  )
}
