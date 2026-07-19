import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'お気に入り',
  description: 'お気に入りに保存した補助金・支援制度の一覧です。',
  robots: { index: false, follow: false },
}

export default function FavoritesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
