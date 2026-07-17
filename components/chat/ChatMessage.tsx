import type { ReactNode } from 'react'
import Link from 'next/link'
import type { ChatMessage as ChatMessageType } from '@/lib/chatFlow'
import ResultCard from './ResultCard'

function formatContent(content: string): ReactNode[] {
  const lines = content.split('\n')
  return lines.flatMap((line, lineIdx) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/)
    const lineNodes: ReactNode[] = parts.map((part, partIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={`${lineIdx}-${partIdx}`}>{part.slice(2, -2)}</strong>
      }
      return <span key={`${lineIdx}-${partIdx}`}>{part}</span>
    })
    if (lineIdx < lines.length - 1) {
      lineNodes.push(<br key={`br-${lineIdx}`} />)
    }
    return lineNodes
  })
}

export default function ChatMessage({
  message,
  onSend,
}: {
  message: ChatMessageType
  onSend?: (text: string) => void
}) {
  const isUser = message.role === 'user'

  return (
    <div className="space-y-4">
      {/* テキストバブル */}
      {message.content && (
        <div className={`flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end`}>
          {!isUser && (
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
              AI
            </div>
          )}
          <div
            className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm max-w-[85%] ${
              isUser
                ? 'bg-blue-600 text-white rounded-br-sm'
                : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'
            }`}
          >
            {formatContent(message.content)}
          </div>
        </div>
      )}

      {/* 制度カード */}
      {message.results && message.results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {message.results.map((result, idx) => (
            <ResultCard key={result.subsidy.id} result={result} rank={idx + 1} />
          ))}
        </div>
      )}

      {/* 見落としがちな制度 */}
      {message.missedSubsidies && message.missedSubsidies.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h4 className="text-sm font-bold text-amber-800 mb-3">
            ⚠️ あなたがまだ見落としているかもしれない制度
          </h4>
          <div className="space-y-2">
            {message.missedSubsidies.map(({ subsidy, reason }) => (
              <div
                key={subsidy.id}
                className="flex items-start gap-3 bg-white rounded-lg p-3 border border-amber-100"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{subsidy.name}</p>
                  <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">{reason}</p>
                </div>
                <Link
                  href={`/subsidies/${subsidy.id}`}
                  className="text-xs text-blue-600 hover:underline whitespace-nowrap flex-shrink-0 mt-0.5 font-medium"
                >
                  詳しく見る →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 次のおすすめ相談テーマ */}
      {message.nextConsultations && message.nextConsultations.length > 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <h4 className="text-sm font-bold text-slate-700 mb-3">
            💡 次におすすめの相談テーマ
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {message.nextConsultations.map((nc) => (
              <button
                key={nc.label}
                onClick={() => onSend?.(nc.quickReply)}
                className="bg-white border border-slate-200 rounded-xl p-3 text-left hover:bg-blue-50 hover:border-blue-300 transition-colors shadow-sm"
              >
                <span className="text-xl">{nc.emoji}</span>
                <p className="text-xs font-semibold text-slate-800 mt-1 leading-snug">{nc.label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed line-clamp-2">
                  {nc.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
