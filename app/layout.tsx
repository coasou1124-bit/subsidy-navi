import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: '暮らしAIアシスタント | 使える支援制度をAIが案内',
  description:
    'AIがあなたの状況をヒアリングし、使える可能性のある国・自治体の支援制度を個別に案内します。なぜ対象になるかの理由も説明。行政の公式サービスではありません。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
