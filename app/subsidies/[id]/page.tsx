import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSubsidyById } from '@/data/index'
import SubsidySummary from '@/components/detail/SubsidySummary'
import DisclaimerBanner from '@/components/detail/DisclaimerBanner'
import {
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  PROVIDER_LABELS,
  PROVIDER_COLORS,
} from '@/lib/constants'
import FavoriteButton from '@/components/common/FavoriteButton'

export default async function SubsidyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const subsidy = getSubsidyById(id)

  if (!subsidy) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/results" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
        ← 一覧に戻る
      </Link>

      <DisclaimerBanner />

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 mt-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
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

        <div className="flex items-start justify-between gap-3 mb-1">
          <h1 className="text-2xl font-bold text-slate-800">{subsidy.name}</h1>
          <FavoriteButton subsidyId={subsidy.id} />
        </div>
        <p className="text-slate-500 text-sm mb-2">提供：{subsidy.providerName}</p>
        <p className="text-slate-600 mb-6 leading-relaxed">{subsidy.shortDescription}</p>

        <SubsidySummary summary={subsidy.aiSummary} />

        {/* Official URL */}
        <div className="mt-6 border-t border-slate-100 pt-6">
          <p className="text-sm font-semibold text-slate-700 mb-3">
            📌 公式サイトで詳細を確認する（申請はこちらから）
          </p>
          <a
            href={subsidy.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            公式サイトへ →
          </a>
          <p className="text-xs text-slate-400 mt-2">
            最終更新：{subsidy.lastUpdated} ／ 情報は変更される場合があります
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Link href="/search" className="text-blue-600 hover:underline text-sm">
          ← 条件を変えて再検索する
        </Link>
      </div>
    </div>
  )
}
