'use client'
import Link from 'next/link'
import { getAllSubsidies } from '@/data/index'
import { useFavorites } from '@/lib/useFavorites'
import { CATEGORY_LABELS, CATEGORY_COLORS, CATEGORY_ICONS, PROVIDER_LABELS, PROVIDER_COLORS } from '@/lib/constants'
import FavoriteButton from '@/components/common/FavoriteButton'

export default function FavoritesPage() {
  const { favorites, loaded } = useFavorites()

  if (!loaded) {
    return <div className="max-w-3xl mx-auto px-4 py-10 text-center text-slate-400">読み込み中...</div>
  }

  const allSubsidies = getAllSubsidies()
  const savedSubsidies = allSubsidies.filter((s) => favorites.includes(s.id))

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-xl font-bold text-slate-800 mb-6">
        ★ お気に入り
        {savedSubsidies.length > 0 && (
          <span className="ml-2 text-sm font-normal text-slate-500">（{savedSubsidies.length}件）</span>
        )}
      </h1>

      {savedSubsidies.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-100">
          <p className="text-4xl mb-4">☆</p>
          <p className="text-slate-500 mb-6">まだお気に入りがありません</p>
          <p className="text-sm text-slate-400 mb-6">
            補助金カードの ☆ ボタンを押すと保存されます
          </p>
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            相談してみる →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {savedSubsidies.map((subsidy) => (
            <div
              key={subsidy.id}
              className="bg-white rounded-xl border border-slate-100 shadow-sm p-5"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-medium ${PROVIDER_COLORS[subsidy.providerLevel]}`}
                  >
                    {PROVIDER_LABELS[subsidy.providerLevel]}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-medium ${CATEGORY_COLORS[subsidy.category]}`}
                  >
                    {CATEGORY_ICONS[subsidy.category]} {CATEGORY_LABELS[subsidy.category]}
                  </span>
                </div>
                <FavoriteButton subsidyId={subsidy.id} />
              </div>

              <h2 className="font-bold text-slate-800 mb-1">{subsidy.name}</h2>
              <p className="text-sm text-slate-500 mb-3 line-clamp-2">{subsidy.shortDescription}</p>

              <div className="bg-green-50 rounded-lg px-3 py-2 mb-4">
                <span className="text-xs text-green-700 font-medium block mb-0.5">支援金額の目安</span>
                <p className="text-sm font-bold text-green-800">{subsidy.aiSummary.amount}</p>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/subsidies/${subsidy.id}`}
                  className="flex-1 text-center text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  詳しく見る
                </Link>
                <a
                  href={subsidy.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-sm border border-slate-300 hover:bg-slate-100 text-slate-600 py-2 rounded-lg transition-colors bg-white"
                >
                  公式サイト →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
