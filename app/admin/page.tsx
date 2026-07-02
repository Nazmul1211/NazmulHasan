'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';
import { ADMIN_PASSWORD, ADMIN_SESSION_KEY } from '@/lib/adminConfig';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate a small delay for UX
        setTimeout(() => {
            if (password === ADMIN_PASSWORD) {
                sessionStorage.setItem(ADMIN_SESSION_KEY, 'authenticated');
                router.push('/admin/dashboard');
            } else {
                setError('Incorrect password. Please try again.');
                setLoading(false);
            }
        }, 600);
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginBg}>
                <div className={styles.loginBlob1} />
                <div className={styles.loginBlob2} />
            </div>

            <div className={styles.loginCard}>
                <div className={styles.loginHeader}>
                    <div className={styles.loginLogo}>
                        <span>NH</span>
                    </div>
                    <h1 className={styles.loginTitle}>Admin Dashboard</h1>
                    <p className={styles.loginSubtitle}>Enter your password to manage portfolio content</p>
                </div>

                <form onSubmit={handleLogin} className={styles.loginForm}>
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Password</label>
                        <div className={styles.inputWrap}>
                            <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                className={styles.passwordInput}
                                autoComplete="current-password"
                                required
                            />
                        </div>
                        {error && <p className={styles.errorMsg}>{error}</p>}
                    </div>

                    <button type="submit" className={styles.loginBtn} disabled={loading || !password}>
                        {loading ? (
                            <span className={styles.spinner} />
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/>
                                </svg>
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                <p className={styles.loginFootnote}>
                    Default password: <code>portfolio@admin</code> — change it in <code>lib/adminConfig.ts</code>
                </p>
            </div>
        </div>
    );
}
