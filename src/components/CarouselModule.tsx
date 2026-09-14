'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'; // Ensure standard slick styling
import styles from './CarouselModule.module.scss';
import Image from 'next/image';

interface CarouselItem {
    image: string;
    // Legacy carousels didn't have titles visible in the provided HTML snippet, just images in thumb-wrap
    // but we can add alt text.
}

interface CarouselModuleProps {
    title: string;
    items: CarouselItem[];
}

export default function CarouselModule({ title, items }: CarouselModuleProps) {
    // If items is undefined/empty, we still want to render the section wrapper, so default to empty array
    const safeItems = items || [];

    const settings = {
        dots: false,
        infinite: safeItems.length > 3,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        accessibility: true,
        arrows: true,
        centerMode: false, // EXPLICIT
        variableWidth: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    centerMode: false, // EXPLICIT
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false, // EXPLICIT - NO PEEKING
                    arrows: false,
                },
            },
        ],
    };

    return (
        <section className={styles.carouselModule}>
            <div className={`container ${styles.inner}`}>
                <h2>{title}</h2>
                {/* DESKTOP VIEW: React Slick */}
                <div className="slider-wrapper hidden md:block">
                    <Slider {...settings}>
                        {safeItems.map((item, i) => (
                            <div key={i} className={styles.slideItem}>
                                <div className={styles.thumbWrap}>
                                    <Image
                                        src={item.image}
                                        alt={title}
                                        width={300}
                                        height={300}
                                        style={item.image?.includes('1_c6P4M535O5g2J7X1oa3edqZtBC2UGY9') ? {
                                            width: '100%',
                                            height: 'auto',
                                            objectPosition: 'right center',
                                            transform: 'scale(1.08)',
                                            transformOrigin: 'right center'
                                        } : { width: '100%', height: 'auto' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* MOBILE VIEW: Native CSS Scroll Snap */}
                <div className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:hidden">
                    {safeItems.map((item, i) => (
                        <div key={i} className="w-[85vw] max-w-[400px] shrink-0 snap-center">
                            <div className={styles.thumbWrap}>
                                <Image
                                    src={item.image}
                                    alt={title}
                                    width={300}
                                    height={300}
                                    style={item.image?.includes('1_c6P4M535O5g2J7X1oa3edqZtBC2UGY9') ? {
                                        width: '100%',
                                        height: 'auto',
                                        objectPosition: 'right center',
                                        transform: 'scale(1.08)',
                                        transformOrigin: 'right center'
                                    } : { width: '100%', height: 'auto' }}
                                    className="rounded-lg shadow-xl"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <style jsx global>{`
                    .hide-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .hide-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>
            </div>
        </section>
    );
}
