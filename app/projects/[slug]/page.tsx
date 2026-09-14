import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import { defaultPortfolioData, Project } from '@/data/portfolioData';
import StickyProjectHeader from '@/components/StickyProjectHeader';
import { FiArrowLeft, FiGlobe, FiExternalLink, FiLock } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';
import { LuSparkles, LuLayers, LuFileText, LuShieldAlert, LuRocket } from 'react-icons/lu';

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

    // Prioritize high-resolution local image or fall back to Microlink API screenshot
    const displayImage = project.image || (project.liveUrl
        ? `https://api.microlink.io/?url=${encodeURIComponent(project.liveUrl)}&screenshot=true&meta=false&embed=screenshot.url`
        : null);

    const displayDomain = project.liveUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '') || project.title;

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
                    <FiArrowLeft size={16} />
                    <span>Back to Projects</span>
                </Link>

                {/* Header */}
                <header className={styles.header}>
                    {project.featured && (
                        <div className={styles.featuredBadge}>
                            <LuSparkles size={13} />
                            <span>Featured Project</span>
                        </div>
                    )}
                    <h1 className={styles.title}>{project.title}</h1>
                    <p className={styles.description}>{project.description}</p>

                    {/* CTA Links */}
                    <div className={styles.ctaRow}>
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`}>
                                <FiGlobe size={16} />
                                <span>Live Demo</span>
                            </a>
                        )}
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={`${styles.ctaBtn} ${styles.ctaBtnOutline}`}>
                                <SiGithub size={16} />
                                <span>GitHub Repository</span>
                            </a>
                        )}
                    </div>
                </header>

                {/* Modern Browser Frame Preview */}
                {displayImage && (
                    <div className={styles.browserFrame}>
                        <div className={styles.browserHeader}>
                            <div className={styles.browserDots}>
                                <span className={styles.dotRed} />
                                <span className={styles.dotYellow} />
                                <span className={styles.dotGreen} />
                            </div>
                            <div className={styles.browserUrlBar}>
                                <FiLock size={12} className={styles.lockIcon} />
                                <span className={styles.urlText}>{displayDomain}</span>
                            </div>
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.browserExternalLink}
                                    title="Open live site"
                                    aria-label="Open live site in new tab"
                                >
                                    <FiExternalLink size={13} />
                                </a>
                            )}
                        </div>
                        <div className={styles.screenshotWrap}>
                            <img
                                src={displayImage}
                                alt={`${project.title} preview`}
                                className={styles.screenshot}
                                loading="eager"
                            />
                        </div>
                    </div>
                )}

                {/* Tech Stack */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <LuLayers size={18} className={styles.sectionIcon} />
                        <span>Tech Stack & Architecture</span>
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
                        <LuFileText size={18} className={styles.sectionIcon} />
                        <span>About This Project</span>
                    </h2>
                    <div className={styles.card}>
                        <p className={styles.bodyText}>{project.fullDescription}</p>
                    </div>
                </section>

                {/* Challenges */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <LuShieldAlert size={18} className={styles.sectionIcon} />
                        <span>Key Engineering Challenges</span>
                    </h2>
                    <div className={styles.card}>
                        <ul className={styles.bulletList}>
                            {project.challenges.map((c, i) => (
                                <li key={i} className={styles.bulletItem}>
                                    <span className={styles.bullet} />
                                    <span>{c}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Future Plans */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <LuRocket size={18} className={styles.sectionIcon} />
                        <span>Future Roadmap & Improvements</span>
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
                        <FiArrowLeft size={15} />
                        <span>See all projects</span>
                    </Link>
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`}>
                            <span>Visit {project.title}</span>
                            <FiExternalLink size={15} />
                        </a>
                    )}
                </div>
            </div>
        </main>
    );
}
