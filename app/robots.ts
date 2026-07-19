import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kurashi-ai.jp'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/results', '/favorites'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
