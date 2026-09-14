'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Instagram, Mail } from 'lucide-react';
import styles from './Navbar.module.scss';
import FareHarborLink from './FareHarborLink';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header id="head" className={styles.navbar}>
            <div className={styles.headerInner}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/images/logo-clean.png"
                        alt="Glass Class Denver Logo"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 300px"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.desktopNav}>
                    <ul className={styles.navWrapper}>
                        <li>
                            <Link href="/#hero">Home</Link>
                        </li>
                        <li>
                            <Link href="/#poster">Poster</Link>
                        </li>
                        <li>
                            <Link href="/#gallery">Gallery</Link>
                        </li>
                        <li>
                            <Link href="/#location">Location</Link>
                        </li>
                        <li className={styles.actionItem}>
                            <FareHarborLink
                                href="https://fareharbor.com/embeds/book/glassclassdenver/?full-items=yes&flow=955320"
                                flow={955320}
                            >
                                Book Classes
                            </FareHarborLink>
                        </li>
                    </ul>

                    {/* Social Icons inside Nav like legacy */}
                    <div className={styles.social}>
                        <a
                            href="https://www.instagram.com/glassclassdenver/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Glass Class Denver on Instagram"
                        >
                            <Instagram size={24} aria-hidden="true" />
                        </a>
                        <Link href="/contact" aria-label="Contact us">
                            <Mail size={24} aria-hidden="true" />
                        </Link>
                    </div>
                </nav>

                {/* Mobile Actions (Visible when closed) */}
                <div className={styles.mobileActions}>
                    <FareHarborLink
                        href="https://fareharbor.com/embeds/book/glassclassdenver/?full-items=yes&flow=1527674"
                        className={styles.mobileOutlineBtn}
                        flow={1527674}
                    >
                        GIFT CARDS
                    </FareHarborLink>
                    <FareHarborLink
                        href="https://fareharbor.com/embeds/book/glassclassdenver/?full-items=yes&flow=955320"
                        className={styles.mobileOutlineBtn}
                        flow={955320}
                    >
                        BOOK NOW
                    </FareHarborLink>
                    <a
                        href="https://www.instagram.com/glassclassdenver/"
                        target="_blank"
                        className={styles.mobileIcon}
                        aria-label="Glass Class Denver on Instagram"
                    >
                        <Instagram size={20} aria-hidden="true" />
                    </a>
                    <Link href="/contact" className={styles.mobileIcon} aria-label="Contact us">
                        <Mail size={20} aria-hidden="true" />
                    </Link>
                    <button
                        className={styles.menuBtn}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        type="button"
                    >
                        {isOpen ? <X size={32} aria-hidden="true" /> : <Menu size={32} aria-hidden="true" />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isOpen && (
                    <div className={styles.mobileNavOverlay}>
                        <ul className={styles.mobileNav}>
                            <li>
                                <Link href="/#hero" onClick={() => setIsOpen(false)}>
                                    HOME
                                </Link>
                            </li>
                            <li>
                                <Link href="/#poster" onClick={() => setIsOpen(false)}>
                                    EVENT POSTER
                                </Link>
                            </li>
                            <li>
                                <Link href="/#gallery" onClick={() => setIsOpen(false)}>
                                    PHOTO GALLERY
                                </Link>
                            </li>
                            <li>
                                <Link href="/#location" onClick={() => setIsOpen(false)}>
                                    LOCATION & INFO
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}
