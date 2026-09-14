'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Section.module.scss';
import { motion } from 'framer-motion';

interface SectionProps {
    title: string;
    subtitle?: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    linkHref: string;
    linkText: string;
    reversed?: boolean;
    parallaxBg?: string; // Optional Parallax Image
}

export default function Section({
    title,
    subtitle,
    description,
    imageSrc,
    imageAlt,
    linkHref,
    linkText,
    reversed = false,
    parallaxBg,
}: SectionProps) {
    // LOGIC: Mirrored Accent Layout (Inline for Reliability)
    const accentStyle: React.CSSProperties = {
        top: '-10px',
        left: reversed ? 'auto' : '-10px',
        right: reversed ? '-10px' : 'auto',
    };

    const sectionStyle = parallaxBg ? { backgroundImage: `url(${parallaxBg})` } : {};

    const containerClass = parallaxBg
        ? `${styles.section} ${styles.parallaxWrapper} ${reversed ? styles.reversed : ''}`
        : `${styles.section} ${reversed ? styles.reversed : ''}`;

    return (
        <section className={containerClass} style={sectionStyle}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.imageWrapper}>
                    <motion.div 
                        initial={{ opacity: 0, x: reversed ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, type: "spring" as const, bounce: 0.2 }}
                        className="w-full h-full flex items-center"
                        style={{ justifyContent: reversed ? 'flex-end' : 'flex-start' }}
                    >
                        <div className={styles.imageWrapper} style={{ flex: 'none' }}>
                            {/* Inner Wrapper: Fits content so accent hugs the image */}
                            <div style={{
                                position: 'relative',
                                width: 'fit-content',
                                overflow: 'hidden',
                                borderRadius: '4px'
                            }}>
                                {/* Explicit Accent Box */}
                                <div className={styles.accentFinal} style={accentStyle} />

                                {/* Standard Image: Respects the user's new uniform sizing */}
                                <img
                                    src={imageSrc}
                                    alt={imageAlt}
                                    className={styles.projectImage}
                                    style={{
                                        display: 'block',
                                        maxWidth: '100%',
                                        height: 'auto',
                                        ...(imageSrc?.includes('1_c6P4M535O5g2J7X1oa3edqZtBC2UGY9') ? {
                                            objectPosition: 'right center',
                                            transform: 'scale(1.08)',
                                            transformOrigin: 'right center'
                                        } : {})
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
                <div className={styles.contentWrapper}>
                    <motion.div
                        initial={{ opacity: 0, x: reversed ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2, type: "spring" as const, bounce: 0.2 }}
                        className="w-full"
                    >
                        <h2>{title}</h2>
                        {subtitle && <h3 className={styles.subtitle}>{subtitle}</h3>}
                        <div className={styles.description}>
                            {description.split('\n\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                        {linkText && (
                            <Link href={linkHref || '#'} className={styles.btn}>
                                {linkText}
                            </Link>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
