'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './admin.module.css';
import { Eye, EyeOff, Lock, Mail, LogIn, AlertCircle, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailOrUsername, password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                router.push('/admin/dashboard');
            } else {
                setError(data.error || 'Incorrect email/username or password.');
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again later.');
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginPage}>
            {/* Back to Website Button */}
            <Link href="/" className={styles.backToHome}>
                <ArrowLeft size={16} />
                Back to Website
            </Link>

            <div className={styles.loginBg}>
                <div className={styles.loginBlob1} />
                <div className={styles.loginBlob2} />
            </div>

            <div className={styles.loginCard}>
                <div className={styles.loginHeader}>
                    <div className={styles.loginLogo}>
                        <span>NH</span>
                    </div>
                    <h1 className={styles.loginTitle}>Admin Login</h1>
                    <p className={styles.loginSubtitle}>Manage portfolio dynamic CMS tables</p>
                </div>

                {error && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: '0.5rem',
                        padding: '0.75rem 1rem',
                        color: '#ef4444',
                        fontSize: '0.85rem',
                        marginBottom: '1.25rem'
                    }}>
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className={styles.loginForm}>
                    {/* Email / Username Field */}
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Email or Username</label>
                        <div className={styles.inputWrap}>
                            <Mail className={styles.inputIcon} size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--foreground-dim)' }} />
                            <input
                                type="text"
                                value={emailOrUsername}
                                onChange={(e) => setEmailOrUsername(e.target.value)}
                                placeholder="Enter email or username"
                                className={styles.passwordInput}
                                style={{ paddingLeft: '3.25rem' }}
                                autoComplete="username"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Password</label>
                        <div className={styles.inputWrap} style={{ position: 'relative' }}>
                            <Lock className={styles.inputIcon} size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--foreground-dim)' }} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className={styles.passwordInput}
                                style={{ paddingLeft: '3.25rem', paddingRight: '3.25rem' }}
                                autoComplete="current-password"
                                required
                            />
                            {/* Eye Show / Hide Toggle Button */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '1.25rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--foreground-dim)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: 0
                                }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className={styles.loginBtn} disabled={loading || !emailOrUsername || !password} style={{ marginTop: '0.5rem' }}>
                        {loading ? (
                            <span className={styles.spinner} />
                        ) : (
                            <>
                                <LogIn size={18} />
                                Sign In
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
