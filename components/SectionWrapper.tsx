'use client';

import { useEffect, useRef } from 'react';
import styles from './SectionWrapper.module.css';

interface SectionWrapperProps {
    children: React.ReactNode;
    id: string;
    title?: string;
    kicker?: string;
    subtitle?: string;
    className?: string;
}

const defaultKickers: Record<string, string> = {
    skills: 'Technical Stack & Systems',
    about: 'Background & Engineering Philosophy',
    projects: 'Featured Production Systems',
    experience: 'Professional Journey',
    education: 'Academic Foundation',
    contact: 'Get In Touch',
    blog: 'Technical Writings',
};

export default function SectionWrapper({
    children,
    id,
    title,
    kicker,
    subtitle,
    className = ''
}: SectionWrapperProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const displayKicker = kicker || defaultKickers[id] || title || '';

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
                {title && (
                    <div className={styles.header}>
                        <div className={styles.kickerBadge}>
                            <span className={styles.kickerDot}></span>
                            <span className={styles.kickerText}>{displayKicker}</span>
                        </div>
                        <h2 className={styles.title}>{title}</h2>
                        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                    </div>
                )}
                {children}
            </div>
        </section>
    );
}
