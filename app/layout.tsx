import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kurashi-ai.jp'
const SITE_NAME = '暮らしAIアシスタント'
const SITE_DESCRIPTION =
  'AIがあなたの状況をヒアリングし、使える可能性のある国・自治体の支援制度を個別に案内します。なぜ対象になるかの理由も説明。行政の公式サービスではありません。'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | 使える支援制度をAIが案内`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | 使える支援制度をAIが案内`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | 使える支援制度をAIが案内`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
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
