import Link from 'next/link';
import FareHarborLink from './FareHarborLink';
import styles from './Hero.module.scss';

export default function Hero() {
    // Using the text seen in user screenshots for authenticity
    return (
        <section className={styles.hero} style={{ backgroundImage: 'url(/images/hero-real.webp)' }}>
            <div className={styles.overlay}></div>
            <div className={styles.contentBox}>
                <h1>Family and Youth Glass Blowing Experiences</h1>
                <p>in a safe and fun environment.</p>
                <FareHarborLink
                    href="https://fareharbor.com/embeds/book/glassclassdenver/?full-items=yes&flow=955320"
                    className={styles.btn}
                    flow={955320}
                >
                    Book A Class
                </FareHarborLink>
            </div>
        </section>
    );
}
