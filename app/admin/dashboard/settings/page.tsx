'use client';

import { useState, useEffect } from 'react';
import styles from '../../admin.module.css';
import { Settings, Save, Key, User, Mail, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

export default function SettingsSecurityPage() {
    // Profile settings states
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePassword, setProfilePassword] = useState('');
    const [profileError, setProfileError] = useState('');
    const [profileSuccess, setProfileSuccess] = useState('');
    const [profileLoading, setProfileLoading] = useState(false);

    // Password change states
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);

    // Visibility toggle states
    const [showProfilePassword, setShowProfilePassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Load current profile on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/auth/profile');
                if (res.ok) {
                    const data = await res.json();
                    setUsername(data.username || '');
                    setEmail(data.email || '');
                }
            } catch (err) {
                console.error('Error fetching admin profile:', err);
            }
        };
        fetchProfile();
    }, []);

    // Handle Profile Details update
    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileError('');
        setProfileSuccess('');
        setProfileLoading(true);

        try {
            const res = await fetch('/api/auth/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, currentPassword: profilePassword })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setProfileSuccess('Profile details updated successfully');
                setProfilePassword('');
            } else {
                setProfileError(data.error || 'Failed to update profile');
            }
        } catch (err) {
            console.error(err);
            setProfileError('An error occurred. Please try again.');
        } finally {
            setProfileLoading(false);
        }
    };

    // Handle Password Change update
    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        if (newPassword !== confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError('New password must be at least 6 characters long');
            return;
        }

        setPasswordLoading(true);

        try {
            const res = await fetch('/api/auth/password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setPasswordSuccess('Password updated successfully');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setPasswordError(data.error || 'Failed to update password');
            }
        } catch (err) {
            console.error(err);
            setPasswordError('An error occurred. Please try again.');
        } finally {
            setPasswordLoading(false);
        }
    };

    // Real-time password match calculations
    const showMatchStatus = confirmPassword.length > 0;
    const passwordsMatch = newPassword === confirmPassword;

    return (
        <div>
            <div className={styles.dashHeader}>
                <h1 className={styles.dashTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Settings size={24} style={{ color: 'var(--primary)' }} /> Settings & Security
                </h1>
                <p className={styles.dashSubtitle}>Manage your admin profile parameters, update login email, and change security credentials.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
                
                {/* Panel 1: Account Profile */}
                <div className={styles.editorCard} style={{ margin: 0 }}>
                    <div className={styles.editorSectionLabel} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <User size={16} /> Account Profile
                    </div>

                    {profileError && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius)', padding: '0.75rem 1rem', color: '#ef4444', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                            <AlertCircle size={16} />
                            <span>{profileError}</span>
                        </div>
                    )}

                    {profileSuccess && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 'var(--radius)', padding: '0.75rem 1rem', color: '#10b981', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                            <CheckCircle size={16} />
                            <span>{profileSuccess}</span>
                        </div>
                    )}

                    <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Username</label>
                            <input 
                                type="text" 
                                className={styles.fieldInput} 
                                value={username} 
                                onChange={e => setUsername(e.target.value)} 
                                placeholder="admin"
                                required 
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Admin Contact Email</label>
                            <input 
                                type="email" 
                                className={styles.fieldInput} 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                placeholder="mnhs1211@gmail.com"
                                required 
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Verify Current Password</label>
                            <div style={{ position: 'relative' }}>
                                <input 
                                    type={showProfilePassword ? 'text' : 'password'} 
                                    className={styles.fieldInput} 
                                    value={profilePassword} 
                                    onChange={e => setProfilePassword(e.target.value)} 
                                    placeholder="••••••••"
                                    style={{ paddingRight: '3rem' }}
                                    required 
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowProfilePassword(!showProfilePassword)}
                                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground-dim)', display: 'flex', alignItems: 'center', padding: 0 }}
                                >
                                    {showProfilePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className={`${styles.btn} ${styles.btnPrimary}`} 
                            disabled={profileLoading || !username || !email || !profilePassword}
                            style={{ marginTop: '0.5rem', alignSelf: 'flex-start' }}
                        >
                            <Save size={16} />
                            {profileLoading ? 'Saving...' : 'Save Profile'}
                        </button>
                    </form>
                </div>

                {/* Panel 2: Password Security */}
                <div className={styles.editorCard} style={{ margin: 0 }}>
                    <div className={styles.editorSectionLabel} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Key size={16} /> Security Credentials
                    </div>

                    {passwordError && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius)', padding: '0.75rem 1rem', color: '#ef4444', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                            <AlertCircle size={16} />
                            <span>{passwordError}</span>
                        </div>
                    )}

                    {passwordSuccess && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 'var(--radius)', padding: '0.75rem 1rem', color: '#10b981', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                            <CheckCircle size={16} />
                            <span>{passwordSuccess}</span>
                        </div>
                    )}

                    <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Current Password</label>
                            <div style={{ position: 'relative' }}>
                                <input 
                                    type={showCurrentPassword ? 'text' : 'password'} 
                                    className={styles.fieldInput} 
                                    value={currentPassword} 
                                    onChange={e => setCurrentPassword(e.target.value)} 
                                    placeholder="••••••••"
                                    style={{ paddingRight: '3rem' }}
                                    required 
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground-dim)', display: 'flex', alignItems: 'center', padding: 0 }}
                                >
                                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>New Password</label>
                            <div style={{ position: 'relative' }}>
                                <input 
                                    type={showNewPassword ? 'text' : 'password'} 
                                    className={styles.fieldInput} 
                                    value={newPassword} 
                                    onChange={e => setNewPassword(e.target.value)} 
                                    placeholder="•••••••• (Min 6 chars)"
                                    style={{ paddingRight: '3rem' }}
                                    required 
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground-dim)', display: 'flex', alignItems: 'center', padding: 0 }}
                                >
                                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Confirm New Password</label>
                            <div style={{ position: 'relative' }}>
                                <input 
                                    type={showConfirmPassword ? 'text' : 'password'} 
                                    className={styles.fieldInput} 
                                    value={confirmPassword} 
                                    onChange={e => setConfirmPassword(e.target.value)} 
                                    placeholder="••••••••"
                                    style={{ paddingRight: '3rem' }}
                                    required 
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground-dim)', display: 'flex', alignItems: 'center', padding: 0 }}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            
                            {/* Password Match Status indicator */}
                            {showMatchStatus && (
                                <div style={{ fontSize: '0.8rem', fontWeight: 600, marginTop: '0.4rem', color: passwordsMatch ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <span>{passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}</span>
                                </div>
                            )}
                        </div>

                        <button 
                            type="submit" 
                            className={`${styles.btn} ${styles.btnPrimary}`} 
                            disabled={passwordLoading || !currentPassword || !newPassword || !confirmPassword || !passwordsMatch}
                            style={{ marginTop: '0.5rem', alignSelf: 'flex-start' }}
                        >
                            <Key size={16} />
                            {passwordLoading ? 'Updating...' : 'Change Password'}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
