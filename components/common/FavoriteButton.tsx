'use client'
import { useFavorites } from '@/lib/useFavorites'

export default function FavoriteButton({ subsidyId }: { subsidyId: string }) {
  const { isFavorite, toggle } = useFavorites()
  const saved = isFavorite(subsidyId)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(subsidyId)
      }}
      aria-label={saved ? 'お気に入りから削除' : 'お気に入りに追加'}
      className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors flex-shrink-0 text-base ${
        saved
          ? 'bg-amber-100 text-amber-500 hover:bg-amber-200'
          : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
      }`}
    >
      {saved ? '★' : '☆'}
    </button>
  )
}
