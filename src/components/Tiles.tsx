'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Tiles.module.scss';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Tile {
    title: string;
    image: string;
    link: string;
}

const TILES: Tile[] = [
    {
        title: 'Glass Blowing Experience',
        image: '/images/tiles/experience.webp',
        link: '/classes/experience',
    },
    {
        title: 'Couples Glass Blowing Date',
        image: '/api/image-proxy?id=1JqUMQR-0xvu7uobetu6uOAWNTvlm18H0',
        link: '/classes/couples',
    },
    { title: 'Glass Blowing 101', image: '/images/tiles/101.jpg', link: '/classes/101' },
    {
        title: 'Youth Glass Blowing Class',
        image: '/api/image-proxy?id=1VWuB9yn-jHB6Cb_O-vwr75cevrloeB9O',
        link: '/classes/youth',
    },
    {
        title: 'Private/Family Glass Party',
        image: '/images/tiles/birthday.jpg',
        link: '/classes/party',
    },
    {
        title: 'Celebration of Life',
        image: '/api/image-proxy?id=1_c6P4M535O5g2J7X1oa3edqZtBC2UGY9',
        link: '/classes/celebration-of-life',
    },
    {
        title: 'Holiday Ornament Glass Class',
        image: '/images/tiles/holiday.jpg',
        link: '/classes/ornament',
    },
    {
        title: 'Team Building Events',
        image: '/images/tiles/team.jpg',
        link: '/classes/team-building',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const tileVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring' as const, stiffness: 90, damping: 15 },
    },
};

interface TilesProps {
    items?: Tile[];
}

export default function Tiles({ items = TILES }: TilesProps) {
    const displayTiles = items && items.length > 0 ? items : TILES;

    return (
        <motion.section
            className={styles.tileGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
        >
            {displayTiles.map((tile, i) => (
                <motion.div variants={tileVariants} key={i} className="h-full w-full block">
                    <Link href={tile.link || '#'} className={`${styles.tileCard} block w-full h-full`}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={tile.image}
                                alt=""
                                aria-hidden="true"
                                fill
                                className={styles.tileImage}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={tile.image?.includes('1_c6P4M535O5g2J7X1oa3edqZtBC2UGY9') ? {
                                    objectPosition: 'right center',
                                    transform: 'scale(1.08)',
                                    transformOrigin: 'right center'
                                } : {}}
                            />
                        </div>
                        <div className={styles.tileContent}>
                            <h3 className={styles.title}>
                                <span>{tile.title}</span>
                                <ArrowRight className={styles.arrow} />
                            </h3>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </motion.section>
    );
}
