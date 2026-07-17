import type { AISummary } from '@/types/subsidy'

export default function SubsidySummary({ summary }: { summary: AISummary }) {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-xs font-semibold text-green-700 mb-1">💴 支援金額の目安</p>
          <p className="text-sm font-bold text-green-800">{summary.amount}</p>
        </div>
        <div className="bg-amber-50 rounded-lg p-4">
          <p className="text-xs font-semibold text-amber-700 mb-1">📅 申請期限</p>
          <p className="text-sm font-bold text-amber-800">{summary.deadline}</p>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-xs font-semibold text-blue-700 mb-1">👤 対象になる可能性がある方</p>
        <p className="text-sm text-blue-900">{summary.targetPeople}</p>
      </div>

      <div className="border border-slate-100 rounded-lg p-4">
        <p className="text-xs font-semibold text-slate-600 mb-1">🏢 申請先</p>
        <p className="text-sm text-slate-800">{summary.applicationPlace}</p>
      </div>

      {summary.requiredDocuments.length > 0 && (
        <div className="border border-slate-100 rounded-lg p-4">
          <p className="text-xs font-semibold text-slate-600 mb-2">📄 主な必要書類</p>
          <ul className="space-y-1">
            {summary.requiredDocuments.map((doc, i) => (
              <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                <span className="text-slate-400 shrink-0">・</span>
                {doc}
              </li>
            ))}
          </ul>
        </div>
      )}

      {summary.notes.length > 0 && (
        <div className="bg-slate-50 rounded-lg p-4">
          <p className="text-xs font-semibold text-slate-600 mb-2">⚠️ 注意点</p>
          <ul className="space-y-1">
            {summary.notes.map((note, i) => (
              <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                <span className="text-slate-400 shrink-0">・</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {summary.estimatedApplicationTime && (
          <div className="border border-slate-100 rounded-lg p-4">
            <p className="text-xs font-semibold text-slate-600 mb-1">⏱ 申請にかかる時間の目安</p>
            <p className="text-sm text-slate-800">{summary.estimatedApplicationTime}</p>
          </div>
        )}
        {summary.difficulty != null && (
          <div className="border border-slate-100 rounded-lg p-4">
            <p className="text-xs font-semibold text-slate-600 mb-1">📊 申請の難易度</p>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-lg leading-none">
                {'★'.repeat(summary.difficulty)}
              </span>
              <span className="text-slate-200 text-lg leading-none">
                {'★'.repeat(5 - summary.difficulty)}
              </span>
              <span className="text-xs text-slate-500">
                {summary.difficulty <= 1 ? '簡単' : summary.difficulty <= 2 ? 'やや簡単' : summary.difficulty <= 3 ? '普通' : summary.difficulty <= 4 ? 'やや難しい' : '難しい'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
