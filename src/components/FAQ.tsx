'use client';

import { useState } from 'react';
import styles from './FAQ.module.scss';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string; // Changed to string for JSON compatibility
}

interface FAQProps {
    items?: FAQItem[];
}

const DEFAULT_FAQS: FAQItem[] = [
    {
        question: 'What is the glass blowing process?',
        answer: 'Glass blowing is a traditional method of shaping molten glass into various objects using a combination of breath, tools, and techniques. The process typically involves preparation, coloring, shaping, blowing, detailing, and annealing (cooling). At Glass Class Denver we simplify the process so anyone can create a beautiful piece.',
    },
    {
        question: 'What is an Opal Add On?',
        answer: 'You may choose to use Gilson opals by enclosing them in glass and incorporating them into your project. Encasing the opal magnifies its appearance and creates a stunning, glittering centerpiece. We have colors like fire black, cotton candy, and blood orange.',
    },
    {
        question: 'What can we make in our class blowing class?',
        answer: 'Projects include: Air plant terrariums, plant watering globes, marbles, pendants, pipes, shot glasses, and candle holders. We are always adding new projects and are open to unique ideas!',
    },
];

export default function FAQ({ items }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const displayItems = items && items.length > 0 ? items : DEFAULT_FAQS;

    const toggle = (i: number) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <section className={styles.faqSection}>
            <div className="container">
                <h2 className={styles.title}>Glass Blowing Class FAQs</h2>
                <div className={styles.list}>
                    {displayItems.map((faq, i) => (
                        <div key={i} className={styles.item}>
                            <div className={styles.question} onClick={() => toggle(i)}>
                                {faq.question}
                                <span className={styles.icon}>
                                    {openIndex === i ? <Minus /> : <Plus />}
                                </span>
                            </div>
                            {openIndex === i && (
                                <div className={styles.answer}>
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
