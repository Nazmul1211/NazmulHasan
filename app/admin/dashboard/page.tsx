'use client';

import Link from 'next/link';
import styles from '../admin.module.css';
import { adminSections } from '@/lib/adminConfig';
import { defaultPortfolioData } from '@/data/portfolioData';

export default function DashboardOverviewPage() {
    const stats = [
        { label: 'Total Projects', value: defaultPortfolioData.projects.length },
        { label: 'Skill Categories', value: defaultPortfolioData.skills.length },
        { label: 'Experiences', value: defaultPortfolioData.experience.length },
        { label: 'Education Entries', value: defaultPortfolioData.education.length },
    ];

    return (
        <div>
            <div className={styles.dashHeader}>
                <h1 className={styles.dashTitle}>Dashboard Overview</h1>
                <p className={styles.dashSubtitle}>
                    Manage all your portfolio content from one place. Click a section to start editing.
                </p>
            </div>

            {/* Stats row */}
            <div className={styles.overviewGrid} style={{ marginBottom: '1rem' }}>
                {stats.map((stat) => (
                    <div key={stat.label} className={styles.editorCard} style={{ textAlign: 'center', marginBottom: 0 }}>
                        <div style={{ fontSize: '2.25rem', fontWeight: 900, background: 'linear-gradient(135deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {stat.value}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--foreground-muted)', marginTop: '0.25rem' }}>
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Info box */}
            <div className={styles.editorCard} style={{ marginBottom: '2rem', border: '1px solid rgba(99,102,241,0.25)' }}>
                <div className={styles.editorSectionLabel}>How it works</div>
                <p style={{ fontSize: '0.92rem', color: 'var(--foreground-muted)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                    Edit any section below and click <strong style={{ color: 'var(--primary)' }}>Save Changes</strong>. Your changes are instantly stored in the browser&apos;s localStorage for local preview.
                </p>
                <p style={{ fontSize: '0.92rem', color: 'var(--foreground-muted)', lineHeight: 1.7 }}>
                    To make changes permanent and deploy them, click <strong style={{ color: 'var(--primary)' }}>Export Data</strong> (available in each section) to download a JSON file, copy the values into <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', background: 'rgba(99,102,241,0.1)', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', color: 'var(--primary)' }}>data/portfolioData.ts</code>, then redeploy.
                </p>
            </div>

            {/* Section Cards */}
            <div className={styles.overviewGrid}>
                {adminSections.map((section) => (
                    <Link key={section.key} href={`/admin/dashboard/${section.key}`} className={styles.overviewCard}>
                        <div className={styles.overviewCardIcon}>{section.icon}</div>
                        <div className={styles.overviewCardLabel}>{section.label}</div>
                        <div className={styles.overviewCardDesc}>{section.description}</div>
                        <div className={styles.overviewCardArrow}>Edit →</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
