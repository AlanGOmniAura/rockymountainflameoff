import { db } from '@/lib/firestore';
import { unstable_cache } from 'next/cache';

async function _fetchSiteConfig() {
    const correctText =
        'Denver’s Coolest Glassblowing Studio! Our Average Studio Temperature is 74F. • ';
    const defaultSettings = {
        banner: { enabled: true, text: correctText, link: '/classes', speed: 60 },
        contact: {
            phone: '720-995-4742',
            email: 'info@glassclassdenver.com',
            address: '2830 S Elati St, Unit #4, Englewood, Co 80110',
            instagram: 'https://www.instagram.com/glassclassdenver/',
            facebook: 'https://www.facebook.com/glassclassdenver',
        },
    };

    try {
        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Firestore timeout')), 500)
        );
        const doc: any = await Promise.race([
            db.collection('app_content').doc('main').get(),
            timeout,
        ]);

        if (!doc.exists) {
            return defaultSettings;
        }

        const settings = doc.data()?.live_data?.settings;
        if (!settings) {
            return defaultSettings;
        }

        // Force update if it's the old default (legacy guard)
        if (settings.banner?.text === 'Welcome to Glass Class Denver!') {
            settings.banner.text = correctText;
        }

        return settings;
    } catch (error) {
        return defaultSettings;
    }
}

export async function getSiteConfig() {
    return await unstable_cache(async () => _fetchSiteConfig(), ['site-config-supabase'], {
        tags: ['site-config'],
    })();
}
