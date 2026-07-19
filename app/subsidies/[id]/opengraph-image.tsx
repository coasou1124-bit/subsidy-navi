import { ImageResponse } from 'next/og'
import { getSubsidyById } from '@/data/index'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const subsidy = getSubsidyById(id)

  const title = subsidy?.name ?? '補助金・支援制度'
  const description = subsidy?.shortDescription ?? ''
  const amount = subsidy?.aiSummary.amount ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          padding: '60px',
        }}
      >
        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 22 }}>
          暮らしAIアシスタント
        </div>
        <div>
          <div
            style={{
              fontSize: 46,
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.3,
              marginBottom: 20,
            }}
          >
            {title}
          </div>
          {description ? (
            <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.85)', marginBottom: 24 }}>
              {description.length > 80 ? description.slice(0, 80) + '…' : description}
            </div>
          ) : null}
          {amount ? (
            <div
              style={{
                background: '#16a34a',
                borderRadius: 8,
                padding: '8px 20px',
                display: 'inline-flex',
                color: 'white',
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {amount}
            </div>
          ) : null}
        </div>
      </div>
    ),
    size,
  )
}
