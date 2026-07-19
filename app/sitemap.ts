import type { MetadataRoute } from 'next'
import { getAllSubsidies } from '@/data/index'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kurashi-ai.jp'

export default function sitemap(): MetadataRoute.Sitemap {
  const subsidies = getAllSubsidies()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  const subsidyPages: MetadataRoute.Sitemap = subsidies.map((subsidy) => ({
    url: `${SITE_URL}/subsidies/${subsidy.id}`,
    lastModified: new Date(subsidy.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...subsidyPages]
}
