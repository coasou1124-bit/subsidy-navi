import Link from 'next/link'
import type { SearchResult } from '@/types/subsidy'
import {
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  PROVIDER_LABELS,
  PROVIDER_COLORS,
} from '@/lib/constants'
import FavoriteButton from '@/components/common/FavoriteButton'

export default function SubsidyCard({ result }: { result: SearchResult }) {
  const { subsidy, matchReasons } = result
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs px-2 py-0.5 rounded font-medium shrink-0 ${PROVIDER_COLORS[subsidy.providerLevel]}`}
          >
            {PROVIDER_LABELS[subsidy.providerLevel]}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded font-medium ${CATEGORY_COLORS[subsidy.category]}`}>
            {CATEGORY_ICONS[subsidy.category]} {CATEGORY_LABELS[subsidy.category]}
          </span>
        </div>
        <FavoriteButton subsidyId={subsidy.id} />
      </div>

      <h2 className="text-base font-bold text-slate-800 mb-1">{subsidy.name}</h2>
      <p className="text-sm text-slate-500 mb-3 line-clamp-2">{subsidy.shortDescription}</p>

      <div className="bg-green-50 rounded-lg px-3 py-2 mb-3">
        <span className="text-xs text-green-700 font-medium block mb-0.5">支援金額の目安</span>
        <p className="text-sm font-bold text-green-800">{subsidy.aiSummary.amount}</p>
      </div>

      {matchReasons.length > 0 && (
        <p className="text-xs text-blue-600 mb-3">✓ {matchReasons[0]}</p>
      )}

      <div className="flex flex-wrap gap-1 mb-4">
        {subsidy.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={`/subsidies/${subsidy.id}`}
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
      >
        詳しく見る →
      </Link>
    </div>
  )
}
