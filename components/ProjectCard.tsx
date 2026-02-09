'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './ProjectCard.module.css';

interface ProjectProps {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string;
}

export default function ProjectCard({ title, description, tags, link, github }: ProjectProps) {
    const [imageError, setImageError] = useState(false);

    // Generate Microlink screenshot URL
    const screenshotUrl = link
        ? `https://api.microlink.io/?url=${encodeURIComponent(link)}&screenshot=true&meta=false&embed=screenshot.url`
        : null;

    return (
        <article className={styles.card}>
            <div className={styles.imageContainer}>
                {screenshotUrl && !imageError ? (
                    <img
                        src={screenshotUrl}
                        alt={`${title} preview`}
                        className={styles.screenshot}
                        onError={() => setImageError(true)}
                        loading="lazy"
                    />
                ) : (
                    <div className={styles.imagePlaceholder}>
                        {title.substring(0, 2).toUpperCase()}
                    </div>
                )}
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <div className={styles.tags}>
                    {tags.map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                </div>
                <div className={styles.links}>
                    {link && (
                        <Link href={link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                            Live Demo <span>→</span>
                        </Link>
                    )}
                    {github && github !== '#' && (
                        <Link href={github} target="_blank" rel="noopener noreferrer" className={styles.link}>
                            GitHub <span>↗</span>
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}
