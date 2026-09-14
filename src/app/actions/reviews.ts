'use server';

import { unstable_cache } from 'next/cache';
import { db } from '@/lib/firestore';

const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export interface GoogleReview {
    author_name: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
}

export interface PlaceDetails {
    name: string;
    rating: number;
    user_ratings_total: number;
    reviews: GoogleReview[];
}

// Internal helper to fetch directly from Google API
async function fetchFromGoogle(): Promise<PlaceDetails> {
    if (!PLACE_ID || !API_KEY) {
        throw new Error('Missing Google Place ID or API Key');
    }
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total&key=${API_KEY}`;
    const response = await fetch(url, { cache: 'no-store' });
    const data = await response.json();

    if (data.status !== 'OK') {
        throw new Error(`Google API Error: ${data.status} - ${data.error_message || ''}`);
    }

    return data.result as PlaceDetails;
}

// Database-backed caching implementation
async function _getGoogleReviewsInternal(): Promise<PlaceDetails | { error: string }> {
    console.log('[DEBUG] getGoogleReviews internal function running...');
    try {
        // 1. Try to read the cached data from Firestore
        const docRef = db.collection('app_content').doc('google_reviews');
        const doc = await docRef.get();
        const cachedRow = doc.exists ? doc.data() : null;

        // 30 days cache TTL (approximately once a month)
        const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000;
        const now = Date.now();

        if (cachedRow?.live_data && cachedRow.updated_at) {
            const updatedAtTime = new Date(cachedRow.updated_at).getTime();
            const ageMs = now - updatedAtTime;

            if (ageMs < CACHE_TTL_MS) {
                console.log(`[DEBUG] Google Reviews Database Cache Hit. Age: ${Math.round(ageMs / 1000 / 60 / 60 / 24)} days. Returning cached reviews.`);
                return cachedRow.live_data as PlaceDetails;
            }
            console.log(`[DEBUG] Google Reviews Database Cache Stale (Age: ${Math.round(ageMs / 1000 / 60 / 60 / 24)} days). Re-fetching from Google...`);
        } else {
            console.log('[DEBUG] Google Reviews Database Cache Miss. Fetching from Google...');
        }

        // 2. Fetch new data from Google
        try {
            const newDetails = await fetchFromGoogle();

            // 3. Upsert to Firestore
            await docRef.set({
                id: 'google_reviews',
                live_data: newDetails,
                updated_at: new Date().toISOString()
            }, { merge: true });

            console.log('[DEBUG] Successfully cached Google Reviews in Firestore.');

            return newDetails;
        } catch (fetchError) {
            console.error('[ERROR] Failed to fetch Google Reviews from API:', fetchError);

            // Stale fallback: if fetch fails but we have stale cache, use it!
            if (cachedRow?.live_data) {
                console.warn('[WARNING] Using stale Google Reviews cache as fallback.');
                return cachedRow.live_data as PlaceDetails;
            }

            throw fetchError;
        }
    } catch (error) {
        console.error('[ERROR] getGoogleReviews exception:', error);
        return {
            error: `Failed to fetch/cache reviews: ${error instanceof Error ? error.message : 'Unknown error'}`,
        };
    }
}

// Wrap the internal getter with Next.js unstable_cache (revalidate every 24 hours)
export async function getGoogleReviews(): Promise<PlaceDetails | { error: string }> {
    return await unstable_cache(
        async () => _getGoogleReviewsInternal(),
        ['google-reviews-data-cache'],
        {
            revalidate: 86400, // 24 hours (86400 seconds)
            tags: ['google-reviews']
        }
    )();
}

