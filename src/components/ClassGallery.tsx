'use client';

import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Photo {
    id: string;
    name: string;
    src: string;
    thumbnail?: string;
}

interface ClassGalleryProps {
    photos: Photo[];
    title?: string;
}

export default function ClassGallery({ photos, title = 'Class Gallery' }: ClassGalleryProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll logic for mobile native slider
    useEffect(() => {
        if (!scrollContainerRef.current) return;

        const interval = setInterval(() => {
            const container = scrollContainerRef.current;
            if (container) {
                // Check if we're near the end of the scroll width
                if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
                    // Instantly rewind to start
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Scroll exactly one child's width (assuming all children have same width + gap)
                    // We take the offsetWidth of the first child element
                    const firstChild = container.firstElementChild as HTMLElement;
                    if (firstChild) {
                        const scrollAmount = firstChild.offsetWidth + 16; // 16px is gap-4
                        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                    }
                }
            }
        }, 3500); // match roughly with slick slider autoplaySpeed

        return () => clearInterval(interval);
    }, [photos.length]);

    if (!photos || photos.length === 0) return null;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        variableWidth: true,
        slidesToScroll: 1,
        autoplay: true,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToScroll: 1,
                    variableWidth: true,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToScroll: 1,
                    variableWidth: true,
                    centerMode: false,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <section className="bg-zinc-900 py-6">
            <div className="container mx-auto px-4">
                <h2 className="mb-4 text-center text-3xl font-bold text-white">{title}</h2>

                {/* DESKTOP VIEW: React Slick */}
                <div className="slider-container hidden overflow-hidden md:block">
                    <Slider {...settings}>
                        {photos.map((photo) => (
                            <div key={photo.id} className="px-2">
                                <div className="h-[350px] overflow-hidden rounded-lg border border-zinc-700 shadow-xl lg:h-[450px]">
                                    {/* Using standard img allows natural aspect ratio scaling without letterboxing */}
                                    <img
                                        src={photo.src}
                                        alt={photo.name}
                                        className="block h-full w-auto object-contain transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* MOBILE VIEW: Native CSS Scroll Snap */}
                <div
                    ref={scrollContainerRef}
                    className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:hidden"
                >
                    {photos.map((photo) => (
                        <div key={photo.id} className="h-[300px] shrink-0 snap-center">
                            <div className="h-full overflow-hidden rounded-lg border border-zinc-700 shadow-xl">
                                <img
                                    src={photo.src}
                                    alt={photo.name}
                                    className="block h-full w-auto object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                .slick-dots li button:before {
                    color: white;
                }
                .slick-dots li.slick-active button:before {
                    color: var(--primary);
                }
                .slick-prev:before,
                .slick-next:before {
                    color: white; /* Make arrows visible */
                }
                /* Hide scrollbar for mobile view but allow scrolling */
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
