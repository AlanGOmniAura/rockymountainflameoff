'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import styles from '../../app/thestudio/Studio.module.scss';

export default function StudioNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const links = [
        { href: '/thestudio/artists', label: 'Artists' },
        { href: '/thestudio/events', label: 'Events' },
        { href: '/thestudio/rentals', label: 'Rentals' },
        { href: '/thestudio/contact', label: 'Contact' },
    ];

    return (
        <nav className={styles.studioNav}>
            <Link href="/thestudio" className={styles.logo} onClick={() => setIsOpen(false)}>
                <Image src="/images/studio-logo.png" alt="Studio Logo" width={40} height={40} />
                <span>The Studio @ Glass Class Denver</span>
            </Link>

            {/* Desktop Links */}
            <div className={styles.navLinks}>
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={pathname === link.href ? styles.active : ''}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            {/* Mobile Toggle */}
            <button
                className={styles.mobileToggle}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
                <div className={styles.mobileLinks}>
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={pathname === link.href ? styles.active : ''}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
