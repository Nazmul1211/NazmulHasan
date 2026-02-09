'use client';

import { useEffect, useRef } from 'react';
import styles from './SectionWrapper.module.css';

interface SectionWrapperProps {
    children: React.ReactNode;
    id: string;
    title: string;
    subtitle?: string;
    className?: string;
}

export default function SectionWrapper({
    children,
    id,
    title,
    subtitle,
    className = ''
}: SectionWrapperProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id={id} className={`${styles.section} ${className}`}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.badge}>{`< ${title} />`}</span>
                    <h2 className={styles.title}>{title}</h2>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>
                {children}
            </div>
        </section>
    );
}
