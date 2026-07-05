import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import { defaultPortfolioData, Project } from '@/data/portfolioData';
import StickyProjectHeader from '@/components/StickyProjectHeader';

interface PageProps {
    params: Promise<{ slug: string }>;
}

import prisma from '@/lib/prisma';

export const revalidate = 0;

async function getProject(slug: string): Promise<Project | null> {
    try {
        const record = await prisma.portfolioSection.findUnique({
            where: { key: 'projects' }
        });
        const projects: Project[] = record ? (record.content as any) : defaultPortfolioData.projects;
        const found = projects.find((p) => p.slug === slug);
        if (found && found.published === false) return null;
        return found || null;
    } catch {
        const found = defaultPortfolioData.projects.find((p) => p.slug === slug);
        if (found && found.published === false) return null;
        return found || null;
    }
}

export async function generateStaticParams() {
    try {
        const record = await prisma.portfolioSection.findUnique({
            where: { key: 'projects' }
        });
        const projects: Project[] = record ? (record.content as any) : defaultPortfolioData.projects;
        return projects.map((p) => ({ slug: p.slug }));
    } catch {
        return defaultPortfolioData.projects.map((p) => ({ slug: p.slug }));
    }
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const project = await getProject(slug);
    if (!project) return { title: 'Project Not Found' };
    return {
        title: `${project.title} — Nazmul Hasan`,
        description: project.description,
    };
}

export default async function ProjectDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) notFound();

    return (
        <main className={styles.main}>
            <StickyProjectHeader title={project.title} liveUrl={project.liveUrl} />
            {/* Background blobs */}
            <div className={styles.bg}>
                <div className={styles.blob1} />
                <div className={styles.blob2} />
            </div>

            <div className={`container ${styles.inner}`}>
                {/* Back Button */}
                <Link href="/#projects" className={styles.backLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Back to Projects
                </Link>

                {/* Header */}
                <header className={styles.header}>
                    {project.featured && (
                        <span className={styles.featuredBadge}>⭐ Featured Project</span>
                    )}
                    <h1 className={styles.title}>{project.title}</h1>
                    <p className={styles.description}>{project.description}</p>

                    {/* CTA Links */}
                    <div className={styles.ctaRow}>
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                                Live Demo
                            </a>
                        )}
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={`${styles.ctaBtn} ${styles.ctaBtnOutline}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                GitHub (Client)
                            </a>
                        )}
                    </div>
                </header>

                {/* Screenshot preview */}
                {project.liveUrl && (
                    <div className={styles.screenshotWrap}>
                        <img
                            src={`https://api.microlink.io/?url=${encodeURIComponent(project.liveUrl)}&screenshot=true&meta=false&embed=screenshot.url`}
                            alt={`${project.title} screenshot`}
                            className={styles.screenshot}
                            loading="lazy"
                        />
                        <div className={styles.screenshotOverlay} />
                    </div>
                )}

                {/* Tech Stack */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>🛠</span> Tech Stack
                    </h2>
                    <div className={styles.stackGrid}>
                        {project.techStack.map((tech) => (
                            <span key={tech} className={styles.stackBadge}>{tech}</span>
                        ))}
                    </div>
                </section>

                {/* Full Description */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>📋</span> About This Project
                    </h2>
                    <div className={styles.card}>
                        <p className={styles.bodyText}>{project.fullDescription}</p>
                    </div>
                </section>

                {/* Challenges */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>⚡</span> Challenges Faced
                    </h2>
                    <div className={styles.card}>
                        <ul className={styles.bulletList}>
                            {project.challenges.map((c, i) => (
                                <li key={i} className={styles.bulletItem}>
                                    <span className={styles.bullet} />
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Future Plans */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionIcon}>🚀</span> Future Plans & Improvements
                    </h2>
                    <div className={styles.plansGrid}>
                        {project.futurePlans.map((plan, i) => (
                            <div key={i} className={styles.planCard}>
                                <div className={styles.planNumber}>{String(i + 1).padStart(2, '0')}</div>
                                <p className={styles.planText}>{plan}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Bottom CTA */}
                <div className={styles.bottomCta}>
                    <Link href="/#projects" className={styles.backLink}>
                        ← See all projects
                    </Link>
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`}>
                            Visit {project.title} ↗
                        </a>
                    )}
                </div>
            </div>
        </main>
    );
}
