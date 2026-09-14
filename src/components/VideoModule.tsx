'use client';

import styles from './VideoModule.module.scss';

interface VideoModuleProps {
    src?: string;
    title?: string;
    description?: string;
}

export default function VideoModule({
    src = 'https://www.youtube.com/embed/j3yWiO2NTv4',
    title = 'Glass Class Denver Video Preview',
    description = 'Check out this video to see highlights from a public Glass Blowing Experience!',
}: VideoModuleProps) {
    return (
        <section className={styles.videoModule}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.videoWrapper}>
                    <iframe
                        src={src}
                        title={title}
                        style={{ border: 'none' }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </section>
    );
}
