'use client';

import React from 'react';
import { Star } from 'lucide-react';
import styles from './ReviewsSection.module.scss';
import type { PlaceDetails } from '@/app/actions/reviews';

interface LiveReviewTrackerProps {
    details: PlaceDetails;
    onClick: () => void;
}

export default function LiveReviewTracker({ details, onClick }: LiveReviewTrackerProps) {
    const { rating, user_ratings_total } = details;

    return (
        <div className={styles.tracker} onClick={onClick}>
            <div className={styles.googleLogo}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                    />
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                    />
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                    />
                </svg>
            </div>

            <div className={styles.stats}>
                <span className={styles.rating}>{rating.toFixed(1)} ★</span>
                <span className={styles.count}>{user_ratings_total.toLocaleString()}+ reviews</span>
            </div>

            <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={12}
                        fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
                        className={i < Math.floor(rating) ? '' : 'opacity-30'}
                    />
                ))}
            </div>
        </div>
    );
}
