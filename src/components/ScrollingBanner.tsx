import { getSiteConfig } from '@/data/settings';
import styles from './ScrollingBanner.module.scss';

export default async function ScrollingBanner() {
    const config = await getSiteConfig();
    const banner = config?.banner;

    if (!banner?.enabled || !banner?.text) return null;

    return (
        <section className={styles.banner} aria-label="Promotional announcement">
            <div
                className={styles.track}
                style={
                    {
                        '--duration-desktop': `${banner.speed || 30}s`,
                        '--duration-mobile': `${banner.mobileSpeed || 60}s`,
                    } as React.CSSProperties
                }
            >
                <div className={styles.group}>
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div className={styles.item} key={i}>
                            <span>{banner.text}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.group} aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div className={styles.item} key={i}>
                            <span>{banner.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
