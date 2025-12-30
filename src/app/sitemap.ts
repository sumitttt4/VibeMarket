import { MetadataRoute } from 'next'
import { getVibes } from '@/app/actions'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://vibemarket.tech' // Update with your actual domain

    // Get all vibes for dynamic routes
    const vibes = await getVibes()

    const vibeUrls = vibes.map((vibe) => ({
        url: `${baseUrl}/vibe/${vibe.id}`,
        lastModified: new Date(vibe.created_at || Date.now()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/submit`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...vibeUrls,
    ]
}
