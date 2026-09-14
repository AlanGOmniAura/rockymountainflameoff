import React from 'react';
import { getGoogleReviews, type PlaceDetails } from '@/app/actions/reviews';
import ReviewsCarousel from './ReviewsCarousel';

export default async function ReviewsSection() {
    const data = await getGoogleReviews();

    if (data && 'error' in data) {
        return (
            <div
                style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    backgroundColor: '#1a0000',
                    borderTop: '1px solid #ff4444',
                }}
            >
                <p style={{ color: '#ff8080', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    Google API Connection Error
                </p>
                <p
                    style={{
                        color: '#ffaaaa',
                        fontSize: '0.9rem',
                        maxWidth: '600px',
                        margin: '1rem auto',
                    }}
                >
                    {data.error}
                </p>
            </div>
        );
    }

    const details = data as PlaceDetails;

    if (!details || !details.reviews || details.reviews.length === 0) {
        return (
            <div
                style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    backgroundColor: '#111',
                    borderTop: '1px solid #333',
                }}
            >
                <p style={{ color: '#ff8c00', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    Google Reviews Connection Active
                </p>
                <p style={{ color: '#a1a1aa', fontSize: '1rem', fontStyle: 'italic' }}>
                    &ldquo;Currently syncing latest student testimonials...&rdquo;
                </p>
            </div>
        );
    }

    return <ReviewsCarousel details={details} />;
}
