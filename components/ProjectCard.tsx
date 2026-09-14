'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './ProjectCard.module.css';
import { FiArrowRight } from 'react-icons/fi';

interface ProjectProps {
    slug: string;
    title: string;
    category?: string;
    image?: string;
    description: string;
    techStack: string[];
    liveUrl?: string;
    githubUrl?: string;
    featured?: boolean;
}

export default function ProjectCard({
    slug,
    title,
    category,
    image,
    description,
    techStack,
    liveUrl,
    githubUrl,
    featured,
}: ProjectProps) {
    const [imageError, setImageError] = useState(false);

    // Fallback category if not specified
    const displayCategory = category || (featured ? 'Featured System' : 'Web Application');

    // Image source: local image if specified, otherwise Microlink screenshot
    const displayImage = image || (liveUrl
        ? `https://api.microlink.io/?url=${encodeURIComponent(liveUrl)}&screenshot=true&meta=false&embed=screenshot.url`
        : null);

    return (
        <article className={styles.card}>
            {/* Top Bar over Screenshot: Category & Live Badge */}
            <div className={styles.imageWrapper}>
                <div className={styles.badgeRow}>
                    <span className={styles.categoryBadge}>{displayCategory}</span>
                    {liveUrl && (
                        <span className={styles.liveBadge}>
                            <span className={styles.liveDot} />
                            Live
                        </span>
                    )}
                </div>

                {/* Image Screenshot or Fallback */}
                {displayImage && !imageError ? (
                    <img
                        src={displayImage}
                        alt={`${title} preview`}
                        className={styles.screenshot}
                        onError={() => setImageError(true)}
                        loading="lazy"
                    />
                ) : (
                    <div className={styles.fallbackPreview}>
                        <div className={styles.fallbackPattern} />
                        <span className={styles.fallbackMonogram}>{title.slice(0, 2).toUpperCase()}</span>
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className={styles.content}>
                <h3 className={styles.title}>
                    <Link href={`/projects/${slug}`} className={styles.titleLink}>
                        {title}
                    </Link>
                </h3>

                <p className={styles.description}>{description}</p>

                {/* Footer Row: Tags & Arrow Link Button */}
                <div className={styles.cardFooter}>
                    <div className={styles.tags}>
                        {techStack.slice(0, 3).map((tag) => (
                            <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                        {techStack.length > 3 && (
                            <span className={styles.tagMore}>+{techStack.length - 3}</span>
                        )}
                    </div>

                    <Link
                        href={`/projects/${slug}`}
                        className={styles.circleArrowBtn}
                        aria-label={`View ${title} case study`}
                    >
                        <FiArrowRight size={15} />
                    </Link>
                </div>
            </div>
        </article>
    );
}
