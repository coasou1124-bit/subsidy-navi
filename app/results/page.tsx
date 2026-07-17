import Link from 'next/link'
import { getAllSubsidies } from '@/data/index'
import { filterSubsidies } from '@/lib/filterSubsidies'
import SubsidyCard from '@/components/results/SubsidyCard'
import type { UserProfile, FamilyStructure, EmploymentType, SubsidyCategory } from '@/types/subsidy'
import { FAMILY_LABELS, EMPLOYMENT_LABELS } from '@/lib/constants'

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams

  const profile: UserProfile = {
    age: Number(params.age) || 30,
    prefecture: String(params.pref || '全国'),
    city: String(params.city || ''),
    familyStructure: (params.family as FamilyStructure) || 'single',
    hasChildren: params.children === '1',
    childrenCount: Number(params.childCount) || 0,
    employment: (params.employment as EmploymentType) || 'employed',
    incomeRange: String(params.income || '200-400'),
    concerns: params.concerns
      ? String(params.concerns)
          .split(',')
          .filter(Boolean) as SubsidyCategory[]
      : [],
  }

  const results = filterSubsidies(profile, getAllSubsidies())

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Disclaimer banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-sm text-amber-800">
        <strong>⚠️ ご注意：</strong>
        このサービスは行政の公式サービスではありません。
        以下は「対象になる<strong>可能性がある</strong>」制度の一覧です。
        必ず公式サイトで詳細をご確認ください。
      </div>

      {/* Profile summary */}
      <div className="bg-white rounded-xl border border-slate-100 p-4 mb-6">
        <p className="text-xs font-medium text-slate-500 mb-2">検索条件</p>
        <div className="flex flex-wrap gap-2">
          {profile.prefecture && profile.prefecture !== '全国' && (
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-medium">
              📍 {profile.prefecture}
            </span>
          )}
          {profile.age > 0 && (
            <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded">
              {profile.age}歳
            </span>
          )}
          <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded">
            {FAMILY_LABELS[profile.familyStructure]}
          </span>
          {profile.hasChildren && (
            <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded">
              子ども{profile.childrenCount}人
            </span>
          )}
          <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded">
            {EMPLOYMENT_LABELS[profile.employment]}
          </span>
        </div>
        <Link href="/search" className="text-blue-600 text-xs hover:underline mt-2 inline-block">
          ← 条件を変更する
        </Link>
      </div>

      {/* Results count */}
      <h1 className="text-lg font-bold text-slate-800 mb-4">
        {results.length > 0
          ? `${results.length}件の制度が見つかりました`
          : '条件に合う制度が見つかりませんでした'}
      </h1>

      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((result) => (
            <SubsidyCard key={result.subsidy.id} result={result} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-500 bg-white rounded-xl border border-slate-100">
          <p className="mb-2 text-lg">😔</p>
          <p className="mb-4">条件を変えて再度お試しください。</p>
          <Link href="/search" className="text-blue-600 hover:underline">
            ← 条件を変更する
          </Link>
        </div>
      )}
    </div>
  )
}
