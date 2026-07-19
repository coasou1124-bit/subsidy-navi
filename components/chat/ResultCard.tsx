import Link from 'next/link'
import type { SearchResult } from '@/types/subsidy'
import { CATEGORY_LABELS, CATEGORY_ICONS, CATEGORY_COLORS, PROVIDER_LABELS } from '@/lib/constants'
import FavoriteButton from '@/components/common/FavoriteButton'

interface Props {
  result: SearchResult
  rank: number
}

function Stars({ n }: { n: number }) {
  return (
    <span>
      <span className="text-amber-400">{'★'.repeat(n)}</span>
      <span className="text-slate-200">{'★'.repeat(5 - n)}</span>
    </span>
  )
}

function getRemainingDays(deadlineDate?: string): number | null {
  if (!deadlineDate) return null
  return Math.ceil((new Date(deadlineDate).getTime() - Date.now()) / 86400000)
}

function DetailRow({
  label,
  value,
  colorClass,
  clamp,
}: {
  label: string
  value: string
  colorClass?: string
  clamp?: boolean
}) {
  return (
    <div className="flex gap-2 text-xs leading-relaxed">
      <span className="text-slate-400 w-[4.5rem] flex-shrink-0">{label}</span>
      <span className={`flex-1 ${colorClass ?? 'text-slate-700'} ${clamp ? 'line-clamp-2' : ''}`}>
        {value}
      </span>
    </div>
  )
}

export default function ResultCard({ result, rank }: Props) {
  const { subsidy, matchReasons } = result
  const docs = subsidy.aiSummary.requiredDocuments ?? []
  const remainingDays = getRemainingDays(subsidy.aiSummary.deadlineDate)
  const { difficulty, estimatedApplicationTime } = subsidy.aiSummary

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
      <div className="px-4 pt-4 pb-3 flex-1 space-y-3">
        {/* ヘッダー */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-5 h-5 bg-blue-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center flex-shrink-0">
              {rank}
            </span>
            <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${CATEGORY_COLORS[subsidy.category]}`}>
              {CATEGORY_ICONS[subsidy.category]} {CATEGORY_LABELS[subsidy.category]}
            </span>
            <span className="text-[10px] text-slate-400">{PROVIDER_LABELS[subsidy.providerLevel]}</span>
          </div>
          <FavoriteButton subsidyId={subsidy.id} />
        </div>

        <h3 className="font-bold text-slate-800 text-sm leading-snug">{subsidy.name}</h3>

        {/* なぜ対象になるか */}
        {matchReasons.length > 0 && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
            <p className="text-[10px] font-semibold text-blue-600 mb-0.5">なぜあなたが対象になる可能性があるか</p>
            <p className="text-xs text-blue-900 leading-relaxed">{matchReasons[0]}</p>
            <p className="text-[10px] text-blue-400 mt-1.5">※詳細は必ず公式サイトでご確認ください</p>
          </div>
        )}

        {/* 詳細情報 */}
        <dl className="space-y-1.5">
          {subsidy.aiSummary.amount && (
            <DetailRow label="受取金額" value={subsidy.aiSummary.amount} colorClass="text-green-700 font-semibold" />
          )}
          {subsidy.aiSummary.targetPeople && (
            <DetailRow label="対象者" value={subsidy.aiSummary.targetPeople} clamp />
          )}
          {subsidy.aiSummary.deadline && (
            <div className="flex gap-2 text-xs leading-relaxed">
              <span className="text-slate-400 w-[4.5rem] flex-shrink-0">申請期限</span>
              <span className="flex-1 flex items-center gap-1.5 flex-wrap">
                <span className="text-amber-700 font-medium">{subsidy.aiSummary.deadline}</span>
                {remainingDays !== null && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      remainingDays <= 30
                        ? 'bg-red-100 text-red-700'
                        : remainingDays <= 90
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    残り{remainingDays}日
                  </span>
                )}
              </span>
            </div>
          )}
          {docs.length > 0 && (
            <DetailRow label="必要書類" value={docs.join('、')} clamp />
          )}
        </dl>

        {/* 申請時間 / 難易度 */}
        <div className="pt-1.5 border-t border-slate-100 space-y-1">
          {estimatedApplicationTime && (
            <div className="flex items-start gap-1.5">
              <span className="text-[10px] text-slate-400 flex-shrink-0 mt-0.5">申請時間</span>
              <span className="text-[11px] text-slate-700 font-medium leading-relaxed">
                {estimatedApplicationTime}
              </span>
            </div>
          )}
          {difficulty != null && (
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-slate-400 flex-shrink-0">難易度</span>
              <Stars n={difficulty} />
            </div>
          )}
        </div>
      </div>

      {/* アクションボタン */}
      <div className="border-t border-slate-100 px-4 py-3 flex gap-2 bg-slate-50">
        <Link
          href={`/subsidies/${subsidy.id}`}
          className="flex-1 text-center text-xs bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
        >
          詳しく見る
        </Link>
        <a
          href={subsidy.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center text-xs border border-slate-300 hover:bg-slate-100 text-slate-600 py-2 rounded-lg transition-colors bg-white"
        >
          公式サイト →
        </a>
      </div>
    </div>
  )
}
