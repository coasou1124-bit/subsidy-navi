import { ImageResponse } from 'next/og'

export const alt = '暮らしAIアシスタント | 使える支援制度をAIが案内'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%)',
          padding: '60px',
        }}
      >
        <div style={{ fontSize: 52, fontWeight: 700, color: 'white', marginBottom: 20 }}>
          暮らしAIアシスタント
        </div>
        <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.85)', textAlign: 'center' }}>
          使える支援制度を AIが個別に案内
        </div>
        <div
          style={{
            marginTop: 40,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 12,
            padding: '12px 32px',
            fontSize: 20,
            color: 'white',
          }}
        >
          国・都道府県・市区町村の補助金をまとめて検索
        </div>
      </div>
    ),
    size,
  )
}
