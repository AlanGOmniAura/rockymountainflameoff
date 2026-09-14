import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone, Instagram } from 'lucide-react';
import styles from './Footer.module.scss';
import FareHarborLink from './FareHarborLink';
import { getSiteConfig } from '@/data/settings';

export default async function Footer() {
    const currentYear = new Date().getFullYear();
    const config = await getSiteConfig();
    const contact = config.contact || {};

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    {/* Column 1: Brand & About */}
                    <div className={styles.col}>
                        <Link href="/" className={styles.logoLink} aria-label="Glass Class Denver — Home">
                            <Image
                                src="/images/logo-clean.png"
                                alt=""
                                aria-hidden="true"
                                width={120}
                                height={120}
                                className={styles.logo}
                                unoptimized={true}
                            />
                        </Link>
                        <p className={styles.tagline}>Denver's premier glass blowing experience.</p>
                        <div className={styles.social}>
                            <a
                                href={
                                    contact.instagram ||
                                    'https://www.instagram.com/glassclassdenver/?hl=en'
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <Instagram size={24} aria-hidden="true" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className={styles.col}>
                        <h3 className={styles.heading}>Explore</h3>
                        <ul className={styles.links}>
                            <li>
                                <Link href="/#hero">Home</Link>
                            </li>
                            <li>
                                <Link href="/#poster">Event Poster</Link>
                            </li>
                            <li>
                                <Link href="/#gallery">Live Gallery</Link>
                            </li>
                            <li>
                                <Link href="/#location">Location & Info</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Book & Contact */}
                    <div className={styles.col}>
                        <h3 className={styles.heading}>Visit Us</h3>
                        <ul className={styles.contact}>
                            <li>
                                <MapPin size={18} className={styles.icon} aria-hidden="true" />
                                <a
                                    href="https://maps.google.com/?q=2830 S Elati St, Unit %234, Englewood, Co 80110"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {contact.address ||
                                        '2830 S Elati St, Unit #4, Englewood, Co 80110'}
                                </a>
                            </li>
                            <li>
                                <Phone size={18} className={styles.icon} aria-hidden="true" />
                                <a href={`tel:${contact.phone?.replace(/[^0-9]/g, '')}`}>
                                    {contact.phone || '(720) 995-4742'}
                                </a>
                            </li>
                            <li>
                                <Mail size={18} className={styles.icon} aria-hidden="true" />
                                <Link href="/contact">
                                    {contact.email || 'info@glassclassdenver.com'}
                                </Link>
                            </li>
                        </ul>

                        <div className={styles.actions}>
                            <FareHarborLink
                                href="https://fareharbor.com/embeds/book/glassclassdenver/?full-items=yes"
                                className="button-primary"
                            >
                                Book Now
                            </FareHarborLink>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <p>&copy; {currentYear} Rocky Mountain Flame Off. Hosted by Glass Class Denver. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
