import styles from './About.module.css';
import SectionWrapper from './SectionWrapper';
import { defaultPortfolioData } from '@/data/portfolioData';

const { about } = defaultPortfolioData;

const getHobbyIcon = (label: string) => {
    const norm = label.toLowerCase();
    if (norm.includes('football') || norm.includes('sports')) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.hobbyIcon}>
                <circle cx="12" cy="12" r="10"/>
                <path d="m12 2-2.5 4.5L5 8.5 7.5 12 5 15.5l4.5 2 2.5 4.5 2.5-4.5 4.5-2-2.5-3.5 2.5-3.5-4.5-2z"/>
            </svg>
        );
    }
    if (norm.includes('reading') || norm.includes('book')) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.hobbyIcon}>
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
        );
    }
    if (norm.includes('travel') || norm.includes('plane')) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.hobbyIcon}>
                <path d="m22 2-10 10"/><path d="M22 2 15 22l-4-9-9-4Z"/>
            </svg>
        );
    }
    if (norm.includes('game') || norm.includes('gaming')) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.hobbyIcon}>
                <line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/>
                <line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/>
                <rect width="20" height="12" x="2" y="6" rx="3"/>
            </svg>
        );
    }
    if (norm.includes('music') || norm.includes('song')) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.hobbyIcon}>
                <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
            </svg>
        );
    }
    if (norm.includes('open source') || norm.includes('code') || norm.includes('git')) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.hobbyIcon}>
                <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/>
                <path d="M6 9a9 9 0 0 1 9 9"/>
            </svg>
        );
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.hobbyIcon}>
            <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
        </svg>
    );
};

export default function About() {
    return (
        <SectionWrapper id="about" title="About Me">
            <div className={styles.container}>
                {/* About Text */}
                <div className={styles.aboutText}>
                    <p className={styles.leadParagraph}>
                        I am a passionate <span className="highlight">MERN Stack Developer</span> with a strong foundation in
                        computer science principles and modern web application development.
                    </p>
                    <p className={styles.paragraph}>
                        With expertise spanning the full stack—from crafting pixel-perfect React frontends to architecting
                        scalable Node.js backends—I specialize in building products that not only work flawlessly but also
                        delight users. My entrepreneurial journey has taught me to balance technical excellence with business impact.
                    </p>
                    <p className={styles.paragraph}>
                        I&apos;ve built and scaled SaaS products from zero to <span className="highlight">25,000+ users</span>,
                        achieved <span className="highlight">#1 Google rankings</span>, and helped clients
                        reduce infrastructure costs by up to <span className="highlight">60%</span>.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className={styles.statsGrid}>
                    {about.stats.map((stat, i) => (
                        <div key={i} className={styles.statCard}>
                            <span className={styles.statValue}>{stat.value}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* Hobbies / Beyond Code */}
                <div className={styles.hobbiesSection}>
                    <h3 className={styles.hobbiesTitle}>Beyond the Code</h3>
                    <p className={styles.hobbiesSubtext}>
                        When I&apos;m not building apps, you&apos;ll find me:
                    </p>
                    <div className={styles.hobbiesGrid}>
                        {about.hobbies.map((hobby, i) => (
                            <div key={i} className={styles.hobbyCard}>
                                <div className={styles.iconContainer}>
                                    {getHobbyIcon(hobby.label)}
                                </div>
                                <span className={styles.hobbyLabel}>{hobby.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
