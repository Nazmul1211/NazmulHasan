'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './ProjectCard.module.css';

interface ProjectProps {
    slug: string;
    title: string;
    description: string;
    techStack: string[];
    liveUrl?: string;
    githubUrl?: string;
    featured?: boolean;
}

export default function ProjectCard({ slug, title, description, techStack, liveUrl, githubUrl, featured }: ProjectProps) {
    const [imageError, setImageError] = useState(false);

    // Generate Microlink screenshot URL
    const screenshotUrl = liveUrl
        ? `https://api.microlink.io/?url=${encodeURIComponent(liveUrl)}&screenshot=true&meta=false&embed=screenshot.url`
        : null;

    return (
        <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
            {featured && <div className={styles.featuredBadge}>⭐ Featured</div>}
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
                        <span className={styles.placeholderInitials}>{title.substring(0, 2).toUpperCase()}</span>
                    </div>
                )}
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <div className={styles.tags}>
                    {techStack.slice(0, 4).map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                    {techStack.length > 4 && (
                        <span className={styles.tagMore}>+{techStack.length - 4}</span>
                    )}
                </div>
                <div className={styles.links}>
                    <Link href={`/projects/${slug}`} className={`${styles.link} ${styles.linkPrimary}`}>
                        View Details <span>→</span>
                    </Link>
                    {liveUrl && (
                        <Link href={liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.linkSecondary}`}>
                            Live <span>↗</span>
                        </Link>
                    )}
                    {githubUrl && githubUrl !== '#' && (
                        <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.linkSecondary}`}>
                            GitHub <span>↗</span>
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}
