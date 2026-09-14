'use client';

import React from 'react';
import Slider from 'react-slick';
import { Star } from 'lucide-react';
import type { PlaceDetails } from '@/app/actions/reviews';
import styles from './ReviewsSection.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ReviewsCarouselProps {
    details: PlaceDetails;
}

export default function ReviewsCarousel({ details }: ReviewsCarouselProps) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        accessibility: true, // Fix Lighthouse accessibility error!
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section className={styles.reviewsSection}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2>What Students Are Saying</h2>
                    <div className={styles.subtext}>
                        <span className={styles.rating}>{details.rating} ★</span>
                        <span>
                            Average based on {details.user_ratings_total.toLocaleString()}+ reviews
                            on Google
                        </span>
                    </div>
                </div>

                <div className={styles.carouselContainer}>
                    <div className="reviews-carousel">
                        <Slider {...settings}>
                            {details.reviews.map((review, i) => (
                                <div key={i}>
                                    <div
                                        className={styles.inPageCard}
                                        onClick={() => {
                                            window.dispatchEvent(
                                                new CustomEvent('open-reviews-modal')
                                            );
                                        }}
                                    >
                                        <div className={styles.reviewer}>
                                            <img
                                                src={review.profile_photo_url}
                                                alt=""
                                                aria-hidden="true"
                                            />
                                            <div className={styles.name}>{review.author_name}</div>
                                        </div>
                                        <div className={styles.ratingRow}>
                                            {[...Array(5)].map((_, starI) => (
                                                <Star
                                                    key={starI}
                                                    size={14}
                                                    fill={
                                                        starI < review.rating
                                                            ? 'currentColor'
                                                            : 'none'
                                                    }
                                                    className={
                                                        starI < review.rating ? '' : 'opacity-20'
                                                    }
                                                />
                                            ))}
                                        </div>
                                        <div className={styles.text}>"{review.text}"</div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
}
