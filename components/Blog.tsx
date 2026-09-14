import styles from './Blog.module.css';
import SectionWrapper from './SectionWrapper';
import Link from 'next/link';
import prisma from '@/lib/prisma';

import { FiArrowRight } from 'react-icons/fi';

export default async function Blog() {
    // Show only the first 3 published posts on the homepage
    const recentPosts = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        take: 3
    });

    return (
        <SectionWrapper
            id="blog"
            kicker="Latest Writings"
            title="Technical Blog"
            subtitle="Thoughts, tutorials and lessons from my journey."
        >
            <div className={styles.headerActionRow}>
                <Link href="/blog" className={styles.viewAllBtn}>
                    <span>View All Posts</span>
                    <FiArrowRight size={14} />
                </Link>
            </div>

            <div className={styles.grid}>
                {recentPosts.map((post) => (
                    <article key={post.slug} className={styles.card}>
                        <div className={styles.meta}>
                            <span className={styles.date}>{post.date}</span>
                            <span className={styles.dot}>•</span>
                            <span className={styles.readTime}>{post.readTime}</span>
                        </div>

                        <h3 className={styles.title}>
                            <Link href={`/blog/${post.slug}`} className={styles.titleLink}>
                                {post.title}
                            </Link>
                        </h3>

                        <p className={styles.excerpt}>{post.excerpt}</p>

                        <div className={styles.cardFooter}>
                            <div className={styles.tags}>
                                {post.tags.slice(0, 3).map((tag) => (
                                    <span key={tag} className={styles.tag}>{tag}</span>
                                ))}
                            </div>

                            <Link
                                href={`/blog/${post.slug}`}
                                className={styles.circleArrowBtn}
                                aria-label={`Read article: ${post.title}`}
                            >
                                <FiArrowRight size={15} />
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </SectionWrapper>
    );
}
