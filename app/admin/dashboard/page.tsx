'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../admin.module.css';
import { adminSections } from '@/lib/adminConfig';
import { defaultPortfolioData, PortfolioData } from '@/data/portfolioData';
import SectionIcon from '@/components/admin/SectionIcon';

export default function DashboardOverviewPage() {
    const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOverviewData = async () => {
            try {
                // Fetch portfolio data
                const resPort = await fetch('/api/portfolio');
                if (resPort.ok) {
                    const portData = await resPort.json();
                    setData(portData);
                }

                // Fetch messages to get unread count
                const resMessages = await fetch('/api/contact');
                if (resMessages.ok) {
                    const messagesData = await resMessages.json();
                    const unread = messagesData.filter((m: any) => !m.isRead).length;
                    setUnreadMessages(unread);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadOverviewData();
    }, []);

    const stats = [
        { label: 'Total Projects', value: data.projects?.length || 0 },
        { label: 'Skill Categories', value: data.skills?.length || 0 },
        { label: 'Experiences', value: data.experience?.length || 0 },
        { label: 'Unread Messages', value: unreadMessages },
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
                        <div style={{ fontSize: '2.25rem', fontWeight: 900, background: stat.label === 'Unread Messages' && stat.value > 0 ? 'linear-gradient(135deg, #ef4444, #f97316)' : 'linear-gradient(135deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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
                    Edit any section below and click <strong style={{ color: 'var(--primary)' }}>Save Changes</strong>. Your updates are saved directly in your remote <strong style={{ color: 'var(--accent)' }}>Neon PostgreSQL</strong> database.
                </p>
                <p style={{ fontSize: '0.92rem', color: 'var(--foreground-muted)', lineHeight: 1.7 }}>
                    Your live portfolio retrieves data dynamically from these API endpoints, meaning any change you make here will be immediately visible to your visitors.
                </p>
            </div>

            {/* Section Cards */}
            <div className={styles.overviewGrid}>
                {adminSections.map((section) => (
                    <Link key={section.key} href={`/admin/dashboard/${section.key}`} className={styles.overviewCard}>
                        <div className={styles.overviewCardIcon}>
                            <SectionIcon name={section.icon} size={32} />
                        </div>
                        <div className={styles.overviewCardLabel}>{section.label}</div>
                        <div className={styles.overviewCardDesc}>{section.description}</div>
                        <div className={styles.overviewCardArrow}>Edit →</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
