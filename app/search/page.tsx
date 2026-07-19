import type { Metadata } from 'next'
import SearchForm from '@/components/search/SearchForm'

export const metadata: Metadata = {
  title: '支援制度を探す',
  description:
    '年齢・家族構成・お住まいの地域などを入力して、あなたに合う補助金・支援制度を探せます。',
}

export default function SearchPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">支援制度を探す</h1>
        <p className="text-slate-500 text-sm">
          あなたの状況を入力すると、対象になる可能性のある制度を表示します。
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <SearchForm />
      </div>
    </div>
  )
}
