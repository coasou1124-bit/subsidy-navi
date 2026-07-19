'use client'
import { useState, useMemo } from 'react'
import type { SearchResult, SubsidyCategory } from '@/types/subsidy'
import { CATEGORY_LABELS, CATEGORY_ICONS } from '@/lib/constants'
import SubsidyCard from './SubsidyCard'

type SortKey = 'default' | 'amount' | 'difficulty'

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'default', label: 'マッチ度順' },
  { value: 'amount', label: '金額が多い順' },
  { value: 'difficulty', label: '申請しやすい順' },
]

function parseAmount(amount: string): number {
  const match = amount.replace(/,/g, '').match(/\d+/)
  return match ? parseInt(match[0], 10) : 0
}

export default function ResultsClient({ results }: { results: SearchResult[] }) {
  const [sort, setSort] = useState<SortKey>('default')
  const [category, setCategory] = useState<SubsidyCategory | 'all'>('all')

  const categories = useMemo(
    () => [...new Set(results.map((r) => r.subsidy.category))],
    [results],
  )

  const filtered = useMemo(() => {
    let list = category === 'all' ? results : results.filter((r) => r.subsidy.category === category)
    if (sort === 'amount') {
      list = [...list].sort(
        (a, b) => parseAmount(b.subsidy.aiSummary.amount) - parseAmount(a.subsidy.aiSummary.amount),
      )
    } else if (sort === 'difficulty') {
      list = [...list].sort(
        (a, b) => (a.subsidy.aiSummary.difficulty ?? 5) - (b.subsidy.aiSummary.difficulty ?? 5),
      )
    }
    return list
  }, [results, sort, category])

  return (
    <>
      {/* Sort / Filter bar */}
      <div className="bg-white rounded-xl border border-slate-100 p-4 mb-4 space-y-3">
        {/* Sort */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-slate-500 w-14 flex-shrink-0">並び替え</span>
          <div className="flex gap-1.5 flex-wrap">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSort(opt.value)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  sort === opt.value
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category filter */}
        {categories.length > 1 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-slate-500 w-14 flex-shrink-0">種類</span>
            <div className="flex gap-1.5 flex-wrap">
              <button
                onClick={() => setCategory('all')}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  category === 'all'
                    ? 'bg-slate-700 text-white border-slate-700'
                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                }`}
              >
                すべて
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    category === cat
                      ? 'bg-slate-700 text-white border-slate-700'
                      : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Count */}
      <p className="text-sm text-slate-500 mb-3">
        {filtered.length}件表示
        {category !== 'all' && `（全${results.length}件中）`}
      </p>

      {/* Cards */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((result) => (
            <SubsidyCard key={result.subsidy.id} result={result} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-slate-400 bg-white rounded-xl border border-slate-100">
          このカテゴリーに該当する制度がありません
        </div>
      )}
    </>
  )
}
