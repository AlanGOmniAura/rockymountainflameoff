import styles from './Gallery.module.scss';
import Image from 'next/image';

const IMAGES = [
    '/images/gallery/group.jpg',
    '/images/gallery/artwork.jpg',
    '/images/gallery/ornament.jpg',
    '/images/gallery/marble-date.jpg',
    '/images/gallery/marble.jpg',
    '/images/gallery/private.jpg',
    '/api/image-proxy?id=1_c6P4M535O5g2J7X1oa3edqZtBC2UGY9',
    '/images/gallery/denver.jpg',
    '/images/gallery/classes-denver.jpg',
    '/images/gallery/made-in-class.jpg',
];

export default function Gallery() {
    return (
        <section className={styles.gallerySection}>
            <div className="container">
                <h2 className={styles.heading}>Student Glass Art Pieces & Events</h2>
                <div className={styles.grid}>
                    {IMAGES.map((src, i) => (
                        <div key={i} className={styles.item}>
                            <Image
                                src={src}
                                alt="Student Glass Art"
                                width={300}
                                height={300}
                                style={src?.includes('1_c6P4M535O5g2J7X1oa3edqZtBC2UGY9') ? {
                                    width: '100%',
                                    height: 'auto',
                                    objectPosition: 'right center',
                                    transform: 'scale(1.08)',
                                    transformOrigin: 'right center'
                                } : { width: '100%', height: 'auto' }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
