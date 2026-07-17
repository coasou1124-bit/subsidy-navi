export default function DisclaimerBanner() {
  return (
    <div className="border-l-4 border-red-500 bg-red-50 rounded-r-lg p-4">
      <div className="flex items-start gap-3">
        <span className="text-red-500 text-lg flex-shrink-0 mt-0.5">⚠️</span>
        <div>
          <p className="font-bold text-red-700 text-sm mb-1">
            このページは行政の公式情報ではありません
          </p>
          <ul className="space-y-0.5 text-xs text-red-600 leading-relaxed">
            <li>・掲載情報はAIが要約したものであり、正確性を保証するものではありません</li>
            <li>・「対象になる可能性があります」という参考情報の提供であり、受給を保証するものではありません</li>
            <li>・申請前に必ず下記の公式サイト、または窓口で最新情報をご確認ください</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
