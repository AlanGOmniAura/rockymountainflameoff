'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LiveReviewTracker from './LiveReviewTracker';
import ReviewModal from './ReviewModal';
import { getGoogleReviews, type PlaceDetails } from '@/app/actions/reviews';

export default function ReviewTrackerWrapper() {
    const [isOpen, setIsOpen] = useState(false);
    const [details, setDetails] = useState<PlaceDetails | null>(null);
    const pathname = usePathname();

    // Don't render on admin pages — avoids unnecessary API calls and declutters the UI
    const isAdmin = pathname?.startsWith('/admin');

    useEffect(() => {
        if (isAdmin) return;

        const fetchReviews = async () => {
            try {
                const data = await getGoogleReviews();
                if (data && !('error' in data)) {
                    setDetails(data as PlaceDetails);
                } else if (data && 'error' in data) {
                    console.error('API Diagnostic Error in Tracker:', data.error);
                }
            } catch (error) {
                console.error('Error fetching reviews in wrapper:', error);
            }
        };

        fetchReviews();

        // Listen for requests to open the modal from other components
        const handleOpenModal = () => setIsOpen(true);
        window.addEventListener('open-reviews-modal', handleOpenModal);

        return () => window.removeEventListener('open-reviews-modal', handleOpenModal);
    }, [isAdmin]);

    if (isAdmin || !details) return null;

    return (
        <aside aria-label="Google Reviews tracker">
            <LiveReviewTracker details={details} onClick={() => setIsOpen(true)} />
            {isOpen && <ReviewModal details={details} onClose={() => setIsOpen(false)} />}
        </aside>
    );
}

