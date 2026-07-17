'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { FamilyStructure, EmploymentType, SubsidyCategory } from '@/types/subsidy'
import {
  FAMILY_LABELS,
  EMPLOYMENT_LABELS,
  INCOME_RANGES,
  CONCERNS_OPTIONS,
  PREFECTURES,
} from '@/lib/constants'

interface FormState {
  age: string
  prefecture: string
  familyStructure: FamilyStructure
  hasChildren: boolean
  childrenCount: string
  employment: EmploymentType
  incomeRange: string
  concerns: SubsidyCategory[]
}

export default function SearchForm() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({
    age: '',
    prefecture: '',
    familyStructure: 'single',
    hasChildren: false,
    childrenCount: '1',
    employment: 'employed',
    incomeRange: '200-400',
    concerns: [],
  })

  const toggleConcern = (value: SubsidyCategory) => {
    setForm((prev) => ({
      ...prev,
      concerns: prev.concerns.includes(value)
        ? prev.concerns.filter((c) => c !== value)
        : [...prev.concerns, value],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      age: form.age,
      pref: form.prefecture,
      family: form.familyStructure,
      children: form.hasChildren ? '1' : '0',
      childCount: form.childrenCount,
      employment: form.employment,
      income: form.incomeRange,
      concerns: form.concerns.join(','),
    })
    router.push(`/results?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section 1: 基本情報 */}
      <section>
        <h2 className="text-base font-bold text-slate-800 mb-4 pb-2 border-b border-slate-200">
          基本情報
        </h2>
        <div className="space-y-5">
          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              年齢 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="120"
                required
                value={form.age}
                onChange={(e) => setForm((p) => ({ ...p, age: e.target.value }))}
                className="w-24 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="例：35"
              />
              <span className="text-slate-600 text-sm">歳</span>
            </div>
          </div>

          {/* Prefecture */}
          <div>
            <label htmlFor="prefecture-select" className="block text-sm font-medium text-slate-700 mb-1">
              お住まいの都道府県 <span className="text-red-500">*</span>
            </label>
            <select
              id="prefecture-select"
              required
              value={form.prefecture}
              onChange={(e) => setForm((p) => ({ ...p, prefecture: e.target.value }))}
              className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm w-48"
            >
              <option value="">選択してください</option>
              {PREFECTURES.map((pref) => (
                <option key={pref} value={pref}>
                  {pref}
                </option>
              ))}
            </select>
          </div>

          {/* Family structure */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              家族構成 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.entries(FAMILY_LABELS) as [FamilyStructure, string][]).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, familyStructure: value }))}
                  className={`px-3 py-2 rounded-lg border text-sm transition-colors text-left ${
                    form.familyStructure === value
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Children */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">子どもの有無</label>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setForm((p) => ({ ...p, hasChildren: false }))}
                className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                  !form.hasChildren
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
                }`}
              >
                いない
              </button>
              <button
                type="button"
                onClick={() => setForm((p) => ({ ...p, hasChildren: true }))}
                className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                  form.hasChildren
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
                }`}
              >
                いる
              </button>
              {form.hasChildren && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={form.childrenCount}
                    onChange={(e) => setForm((p) => ({ ...p, childrenCount: e.target.value }))}
                    className="w-16 border border-slate-300 rounded-lg px-2 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-slate-600 text-sm">人</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 仕事・収入 */}
      <section>
        <h2 className="text-base font-bold text-slate-800 mb-4 pb-2 border-b border-slate-200">
          仕事・収入
        </h2>
        <div className="space-y-5">
          {/* Employment */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">現在の状況</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.entries(EMPLOYMENT_LABELS) as [EmploymentType, string][]).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, employment: value }))}
                  className={`px-3 py-2 rounded-lg border text-sm transition-colors text-left ${
                    form.employment === value
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Income */}
          <div>
            <label htmlFor="income-select" className="block text-sm font-medium text-slate-700 mb-2">
              世帯年収の目安
            </label>
            <select
              id="income-select"
              value={form.incomeRange}
              onChange={(e) => setForm((p) => ({ ...p, incomeRange: e.target.value }))}
              className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
            >
              {INCOME_RANGES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Section 3: 困っていること */}
      <section>
        <h2 className="text-base font-bold text-slate-800 mb-1 pb-2 border-b border-slate-200">
          困っていること・知りたいこと
        </h2>
        <p className="text-xs text-slate-500 mb-4">複数選択できます（選択しない場合は全件表示）</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CONCERNS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleConcern(opt.value)}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg border text-sm transition-colors ${
                form.concerns.includes(opt.value)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400'
              }`}
            >
              <span className="text-xl">{opt.icon}</span>
              <span className="text-xs text-center leading-tight">{opt.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-base transition-colors"
        >
          支援制度を探す →
        </button>
      </div>
    </form>
  )
}
