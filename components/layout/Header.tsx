import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-blue-600 text-xl font-bold">暮らしAIアシスタント</span>
          <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full hidden sm:inline">
            無料・AI相談
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/disclaimer" className="text-slate-500 hover:text-slate-700 transition-colors">
            免責事項
          </Link>
        </nav>
      </div>
    </header>
  )
}
