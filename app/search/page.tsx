import SearchForm from '@/components/search/SearchForm'

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
