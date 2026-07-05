// app/blog/page.tsx — Server-side dynamic blog post listing

import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import styles from './blog.module.css';

export const metadata = {
    title: 'Blog | Nazmul Hasan',
    description: 'Technical articles and insights on web development, serverless architecture, and SaaS growth.',
};

export default async function BlogPage() {
    // Load published blog posts from DB
    const posts = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className="section-title">Blog & Insights</h1>
                <p className={styles.subtitle}>
                    Thoughts on software engineering, architecture, and building products.
                </p>
            </div>

            <div className={styles.grid}>
                {posts.map((post) => (
                    <article key={post.slug} className={styles.card}>
                        <Link href={`/blog/${post.slug}`} className={styles.imageLink}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className={styles.image}
                                />
                            </div>
                        </Link>
                        <div className={styles.content}>
                            <div className={styles.meta}>
                                <span className={styles.date}>{post.date}</span>
                                <span className={styles.dot}>•</span>
                                <span className={styles.readTime}>{post.readTime}</span>
                            </div>
                            <Link href={`/blog/${post.slug}`}>
                                <h2 className={styles.title}>{post.title}</h2>
                            </Link>
                            <p className={styles.excerpt}>{post.excerpt}</p>
                            <div className={styles.tags}>
                                {post.tags.slice(0, 3).map((tag) => (
                                    <span key={tag} className={styles.tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
