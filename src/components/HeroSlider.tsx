'use client';

import Slider from 'react-slick';
import { useRef } from 'react';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './HeroSlider.module.scss';
import Link from 'next/link';

// Corrected Paths based on authentic legacy assets
const DEFAULT_SLIDES = [
    {
        image: '/images/hero-real.webp',
        title: "Denver's Premier Glass Blowing Experience",
        subtitle: 'in a Luxurious Air Conditioned Studio!',
        link: 'https://fareharbor.com/embeds/book/glassclassdenver/?full-items=yes&flow=955320',
        linkText: 'Book a Class',
    },
    {
        image: '/images/DSC_6524.webp',
        title: 'Family and Youth Glass Blowing Experiences',
        subtitle: 'in a safe and fun environment.',
        link: 'https://fareharbor.com/embeds/book/glassclassdenver/?full-items=yes&flow=955320',
        linkText: 'Book a Class',
    },
    {
        image: '/images/slider-real/couple-date.jpg', // Authenticated "Couple Date" Original
        title: "Denver's Best Date Night",
        subtitle: 'anniversaries, special occasions, just plain fun.',
        link: 'https://fareharbor.com/embeds/book/glassclassdenver/?full-items=yes&flow=955320',
        linkText: 'Book a Class',
    },
    {
        image: '/images/DSC_6551.webp',
        title: 'Official Partner of Denver University',
        subtitle: 'Providing Team Building Classes on demand.',
        link: '/contact',
        linkText: 'Contact Us For Event Bookings.',
    },
];

import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface Slide {
    image: string;
    title: string;
    subtitle: string;
    link: string;
    linkText?: string; // Optional because legacy didn't always have it
}

interface HeroSliderProps {
    items?: Slide[];
}

export default function HeroSlider({ items }: HeroSliderProps) {
    const sliderRef = useRef<Slider>(null);

    const slidesToRender = items || DEFAULT_SLIDES;

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500, // Slightly slower to allow reading new layout
        accessibility: true,
        arrows: false, // Custom arrows inside slide
        fade: true,
    };

    return (
        <section className={styles.heroSlider} aria-label="Featured classes slideshow">
            <Slider ref={sliderRef} {...settings}>
                {slidesToRender.map((slide, i) => (
                    <div key={i} className={styles.slide}>
                        {/* Next/Image replaces background-image CSS so browser preloads it immediately */}
                        <div className={styles.slideBg}>
                            <Image
                                src={slide.image}
                                alt=""
                                fill
                                className="object-cover object-top"
                                priority={i === 0}
                                sizes="100vw"
                                aria-hidden="true"
                            />
                        </div>
                        <div className={styles.slideContent}>
                            <div className={styles.contentBox}>
                                {/* Integrated Left Arrow */}
                                <button
                                    className={styles.internalArrow}
                                    onClick={() => sliderRef.current?.slickPrev()}
                                    aria-label="Previous slide"
                                    type="button"
                                >
                                    <ChevronLeft size={36} color="white" aria-hidden="true" />
                                </button>

                                <div className={styles.textStack}>
                                    <h2>{slide.title}</h2>
                                    <p>{slide.subtitle}</p>
                                    <Link href={slide.link || '#'} className={styles.cta}>
                                        {slide.linkText}
                                    </Link>
                                </div>

                                {/* Integrated Right Arrow */}
                                <button
                                    className={styles.internalArrow}
                                    onClick={() => sliderRef.current?.slickNext()}
                                    aria-label="Next slide"
                                    type="button"
                                >
                                    <ChevronRight size={36} color="white" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
}
