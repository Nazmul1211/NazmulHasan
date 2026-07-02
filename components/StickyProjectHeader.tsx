'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './StickyProjectHeader.module.css';

interface StickyProjectHeaderProps {
    title: string;
    liveUrl?: string;
}

export default function StickyProjectHeader({ title, liveUrl }: StickyProjectHeaderProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 350) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`${styles.stickyBar} ${visible ? styles.show : ''}`}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.left}>
                    <Link href="/#projects" className={styles.backLink}>
                        ← Projects
                    </Link>
                    <span className={styles.divider}>/</span>
                    <h3 className={styles.title}>{title}</h3>
                </div>
                {liveUrl && (
                    <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={styles.liveBtn}>
                        Visit Site ↗
                    </a>
                )}
            </div>
        </div>
    );
}
