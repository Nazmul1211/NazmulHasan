import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '../../../data/blogPosts';
import styles from './post.module.css';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | Nazmul Hasan`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <article className={styles.article}>
            <div className={styles.hero}>
                <div className={styles.container}>
                    <Link href="/blog" className={styles.backLink}>
                        ← Back to Blog
                    </Link>
                    <div className={styles.meta}>
                        <span className={styles.date}>{post.date}</span>
                        <span className={styles.dot}>•</span>
                        <span className={styles.readTime}>{post.readTime}</span>
                    </div>
                    <h1 className={styles.title}>{post.title}</h1>
                    <div className={styles.tags}>
                        {post.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.imageContainer}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className={styles.image}
                        priority
                    />
                </div>
            </div>

            <div className={styles.container}>
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className={styles.author}>
                    <div className={styles.authorImage}>
                        <Image src="/nazmulHasan.jpg" alt="Nazmul Hasan" width={60} height={60} />
                    </div>
                    <div className={styles.authorInfo}>
                        <p className={styles.writtenBy}>Written by</p>
                        <h3 className={styles.authorName}>Nazmul Hasan</h3>
                        <p className={styles.authorBio}>Software Engineer & Entrepreneur</p>
                    </div>
                </div>
            </div>
        </article>
    );
}
