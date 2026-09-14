import Link from 'next/link';
import styles from './Intro.module.scss';

interface IntroProps {
    title: string;
    children: React.ReactNode;
    ctaText?: string;
    ctaLink?: string;
    backgroundImage?: string;
}

export default function Intro({ title, children, ctaText, ctaLink, backgroundImage }: IntroProps) {
    // Conditional style for background
    const bgStyle = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {};

    const containerInfo = backgroundImage
        ? `${styles.intro} ${styles.hasBackground}`
        : styles.intro;

    return (
        <section className={containerInfo} style={bgStyle}>
            {/* Overlay if there is a background */}
            {backgroundImage && <div className={styles.overlay} />}

            <div className={`container ${styles.inner}`}>
                <h2>{title}</h2>
                <div className={styles.content}>{children}</div>
                {ctaText && ctaLink && (
                    <Link href={ctaLink} className={styles.btn}>
                        {ctaText}
                    </Link>
                )}
            </div>
        </section>
    );
}
