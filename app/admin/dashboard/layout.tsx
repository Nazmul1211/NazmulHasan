'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../admin.module.css';
import { ADMIN_SESSION_KEY, adminSections } from '@/lib/adminConfig';
import ThemeToggle from '@/components/ThemeToggle';
import SectionIcon from '@/components/admin/SectionIcon';
import { ExternalLink, LogOut, LayoutDashboard } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const auth = sessionStorage.getItem(ADMIN_SESSION_KEY);
        if (auth !== 'authenticated') {
            router.replace('/admin');
        }
    }, [router]);

    const handleLogout = () => {
        sessionStorage.removeItem(ADMIN_SESSION_KEY);
        router.push('/admin');
    };

    return (
        <div className={styles.dashLayout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.sidebarLogo}>
                        <div className={styles.logoIcon}>NH</div>
                        <div>
                            <div className={styles.logoText}>Portfolio Admin</div>
                            <div className={styles.logoSub}>Content Manager</div>
                        </div>
                    </div>
                </div>

                <nav className={styles.sidebarNav}>
                    <Link
                        href="/admin/dashboard"
                        className={`${styles.sidebarLink} ${pathname === '/admin/dashboard' ? styles.sidebarLinkActive : ''}`}
                    >
                        <LayoutDashboard size={18} />
                        Overview
                    </Link>

                    <div style={{ height: '1px', background: 'var(--glass-border)', margin: '0.5rem 0' }} />

                    {adminSections.map((section) => (
                        <Link
                            key={section.key}
                            href={`/admin/dashboard/${section.key}`}
                            className={`${styles.sidebarLink} ${pathname === `/admin/dashboard/${section.key}` ? styles.sidebarLinkActive : ''}`}
                        >
                            <SectionIcon name={section.icon} size={18} />
                            {section.label}
                        </Link>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.4rem 0.75rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--foreground-muted)', fontWeight: 600 }}>Theme Mode</span>
                        <ThemeToggle />
                    </div>
                    
                    <Link href="/" target="_blank" className={styles.sidebarFooterLink}>
                        <ExternalLink size={16} />
                        View Portfolio
                    </Link>
                    <button onClick={handleLogout} className={styles.sidebarFooterLink} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.dashMain}>
                {children}
            </main>
        </div>
    );
}
