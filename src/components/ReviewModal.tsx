'use client';

import React, { useEffect } from 'react';
import { X, Star } from 'lucide-react';
import styles from './ReviewsSection.module.scss';
import type { PlaceDetails, GoogleReview } from '@/app/actions/reviews';

interface ReviewModalProps {
    details: PlaceDetails;
    onClose: () => void;
}

export default function ReviewModal({ details, onClose }: ReviewModalProps) {
    const { reviews } = details;

    // Prevent scrolling behind modal
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={handleBackdropClick}>
            <div className={styles.modalContent}>
                <header className={styles.modalHeader}>
                    <h2>What People Are Saying</h2>
                    <button onClick={onClose} className={styles.closeBtn} aria-label="Close reviews">
                        <X size={24} aria-hidden="true" />
                    </button>
                </header>

                <div className={styles.reviewsList}>
                    {reviews && reviews.length > 0 ? (
                        reviews.map((review, index) => <ReviewCard key={index} review={review} />)
                    ) : (
                        <div className="py-10 text-center text-zinc-400">
                            No recent reviews found.
                        </div>
                    )}
                </div>

                <footer className={styles.modalFooter}>
                    <a
                        href="https://www.google.com/maps/place/?q=place_id:ChIJ7z7vP05-bIcRiDRE6uWreXs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.allReviewsBtn}
                    >
                        See all {details.user_ratings_total}+ reviews on Google Maps
                    </a>
                </footer>
            </div>
        </div>
    );
}

function ReviewCard({ review }: { review: GoogleReview }) {
    return (
        <div className={styles.reviewCard}>
            <div className={styles.reviewer}>
                <img src={review.profile_photo_url} alt="" aria-hidden="true" />
                <div>
                    <div className={styles.name}>{review.author_name}</div>
                    <div className={styles.time}>{review.relative_time_description}</div>
                </div>
            </div>

            <div className={styles.ratingRow}>
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        fill={i < review.rating ? 'currentColor' : 'none'}
                        className={i < review.rating ? '' : 'opacity-20'}
                    />
                ))}
            </div>

            <div className={styles.text}>"{review.text}"</div>
        </div>
    );
}
