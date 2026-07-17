import ChatWindow from '@/components/chat/ChatWindow'

export default function HomePage() {
  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 3.5rem)' }}>
      <ChatWindow />
    </div>
  )
}
