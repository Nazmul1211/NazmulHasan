import styles from './Blog.module.css';
import SectionWrapper from './SectionWrapper';
import Link from 'next/link';
import { blogPosts } from '../data/blogPosts';

export default function Blog() {
    // Show only the first 3 posts on the homepage
    const recentPosts = blogPosts.slice(0, 3);

    return (
        <SectionWrapper id="blog" title="Blog">
            <div className={styles.grid}>
                {recentPosts.map((post) => (
                    <article key={post.slug} className={styles.card}>
                        <div className={styles.meta}>
                            <span className={styles.date}>{post.date}</span>
                            <span className={styles.dot}>•</span>
                            <span className={styles.readTime}>{post.readTime}</span>
                        </div>
                        <h3 className={styles.title}>{post.title}</h3>
                        <p className={styles.excerpt}>{post.excerpt}</p>
                        <div className={styles.tags}>
                            {post.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className={styles.tag}>{tag}</span>
                            ))}
                        </div>
                        <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                            Read Article <span>→</span>
                        </Link>
                    </article>
                ))}
            </div>
            <div className={styles.viewAll}>
                <Link href="/blog" className={styles.viewAllLink}>
                    View All Posts <span>→</span>
                </Link>
            </div>
        </SectionWrapper>
    );
}
