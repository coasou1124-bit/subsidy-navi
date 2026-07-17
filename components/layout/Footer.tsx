import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-4 bg-slate-700 rounded-lg p-4">
          <p className="text-sm font-semibold text-amber-300 mb-1">⚠️ 重要なお知らせ</p>
          <p className="text-xs leading-relaxed">
            このサービスは行政の公式サービスではありません。
            掲載している支援制度の情報はAIが要約したものであり、正確性・完全性を保証するものではありません。
            実際の申請にあたっては必ず公式サイトをご確認ください。
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs border-t border-slate-600 pt-4">
          <Link href="/" className="hover:text-white transition-colors">トップ</Link>
          <Link href="/disclaimer" className="hover:text-white transition-colors">免責事項</Link>
        </div>
        <p className="text-xs text-slate-500 mt-3">© 2025 暮らしAIアシスタント — 行政の公式サービスではありません</p>
      </div>
    </footer>
  )
}
