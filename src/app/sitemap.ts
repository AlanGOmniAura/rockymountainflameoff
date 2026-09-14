import type { MetadataRoute } from 'next';
import { getContent } from '@/app/actions/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const content = await getContent();
    const slugs = Object.keys(content.classDetails || {});

    const classUrls: MetadataRoute.Sitemap = slugs.map((slug) => ({
        url: `https://glassclassdenver.com/classes/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    return [
        {
            url: 'https://glassclassdenver.com',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: 'https://glassclassdenver.com/classes',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: 'https://glassclassdenver.com/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: 'https://glassclassdenver.com/contact',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: 'https://glassclassdenver.com/rentals',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: 'https://glassclassdenver.com/events',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        ...classUrls,
    ];
}
