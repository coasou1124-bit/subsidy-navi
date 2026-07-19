'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import ChatMessage from './ChatMessage'
import { createInitialState, processUserInput, type ChatState } from '@/lib/chatFlow'

export default function ChatWindow() {
  const [state, setState] = useState<ChatState>(createInitialState)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const hasScrolledToResults = useRef(false)

  useEffect(() => {
    const hasResults = state.messages.some((m) => m.results && m.results.length > 0)
    if (hasResults && !hasScrolledToResults.current) {
      hasScrolledToResults.current = true
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } else if (!hasResults) {
      hasScrolledToResults.current = false
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [state.messages, isTyping])

  const handleSend = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || isTyping) return
      setInput('')
      setIsTyping(true)
      await new Promise<void>((resolve) => setTimeout(resolve, 700))
      setState((prev) => processUserInput(prev, trimmed))
      setIsTyping(false)
    },
    [isTyping],
  )

  const lastAssistantMsg = [...state.messages].reverse().find((m) => m.role === 'assistant')
  const quickReplies = !isTyping ? lastAssistantMsg?.quickReplies : undefined

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Messages — 内部スクロール */}
      <div className="flex-1 overflow-y-auto py-6 min-h-0">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          {state.messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onSend={handleSend}
              resultsRef={msg.results && msg.results.length > 0 ? resultsRef : undefined}
            />
          ))}

          {isTyping && (
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                AI
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1 items-center h-4">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* クイック返信 */}
      {quickReplies && quickReplies.length > 0 && (
        <div className="border-t border-slate-200 bg-slate-50 py-3">
          <div className="max-w-3xl mx-auto px-4 flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => handleSend(reply)}
                className="bg-white border border-blue-300 text-blue-700 text-sm px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors shadow-sm"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 入力エリア */}
      <div className="border-t border-slate-200 bg-white px-4 py-3">
        <div className="flex gap-2 max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend(input)
              }
            }}
            placeholder="相談内容を入力してください..."
            disabled={isTyping}
            className="flex-1 border border-slate-300 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-400"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isTyping}
            aria-label="送信"
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors flex-shrink-0 font-bold"
          >
            ↑
          </button>
        </div>
        <p className="text-xs text-slate-400 text-center mt-2">
          このサービスは行政の公式サービスではありません。情報は必ず公式サイトでご確認ください。
        </p>
      </div>
    </div>
  )
}
