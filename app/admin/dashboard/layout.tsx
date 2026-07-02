'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../admin.module.css';
import { ADMIN_SESSION_KEY, adminSections } from '@/lib/adminConfig';

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
                        <span className={styles.sidebarIcon}>🏠</span>
                        Overview
                    </Link>

                    <div style={{ height: '1px', background: 'var(--glass-border)', margin: '0.5rem 0' }} />

                    {adminSections.map((section) => (
                        <Link
                            key={section.key}
                            href={`/admin/dashboard/${section.key}`}
                            className={`${styles.sidebarLink} ${pathname === `/admin/dashboard/${section.key}` ? styles.sidebarLinkActive : ''}`}
                        >
                            <span className={styles.sidebarIcon}>{section.icon}</span>
                            {section.label}
                        </Link>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <Link href="/" target="_blank" className={styles.sidebarFooterLink}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/>
                        </svg>
                        View Portfolio
                    </Link>
                    <button onClick={handleLogout} className={styles.sidebarFooterLink} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
                        </svg>
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
