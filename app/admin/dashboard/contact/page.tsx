'use client';

import { useState, useEffect } from 'react';
import styles from '../../admin.module.css';
import { defaultPortfolioData, ContactData } from '@/data/portfolioData';
import { PORTFOLIO_STORAGE_KEY } from '@/lib/adminConfig';

function loadData(): ContactData {
    if (typeof window === 'undefined') return defaultPortfolioData.contact;
    try {
        const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
        if (stored) return JSON.parse(stored).contact ?? defaultPortfolioData.contact;
    } catch { /* ignore */ }
    return defaultPortfolioData.contact;
}

function saveSection(section: string, data: unknown) {
    try {
        const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
        const all = stored ? JSON.parse(stored) : {};
        all[section] = data;
        localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(all));
    } catch { /* ignore */ }
}

export default function ContactEditorPage() {
    const [data, setData] = useState<ContactData>(defaultPortfolioData.contact);
    const [saved, setSaved] = useState(false);

    useEffect(() => { setData(loadData()); }, []);

    const handleSave = () => {
        saveSection('contact', data);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const handleReset = () => setData(defaultPortfolioData.contact);

    const handleExport = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'contact.json'; a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <div className={styles.dashHeader}>
                <h1 className={styles.dashTitle}>📬 Contact Section</h1>
                <p className={styles.dashSubtitle}>Update your email, phone, WhatsApp, and social profile links.</p>
            </div>

            <div className={styles.editorCard}>
                <div className={styles.editorSectionLabel}>Contact Info</div>
                <div className={styles.fieldRow}>
                    <div className={styles.field}>
                        <label className={styles.fieldLabel}>Email Address</label>
                        <input className={styles.fieldInput} type="email" value={data.email} onChange={e => setData(p => ({...p, email: e.target.value}))} placeholder="you@example.com" />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.fieldLabel}>Phone Number</label>
                        <input className={styles.fieldInput} type="tel" value={data.phone} onChange={e => setData(p => ({...p, phone: e.target.value}))} placeholder="+880 1XXX-XXXXXX" />
                    </div>
                </div>
                <div className={styles.fieldRow}>
                    <div className={styles.field}>
                        <label className={styles.fieldLabel}>WhatsApp Number</label>
                        <input className={styles.fieldInput} type="tel" value={data.whatsapp} onChange={e => setData(p => ({...p, whatsapp: e.target.value}))} placeholder="+880 1XXX-XXXXXX" />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.fieldLabel}>GitHub URL</label>
                        <input className={styles.fieldInput} value={data.github} onChange={e => setData(p => ({...p, github: e.target.value}))} placeholder="https://github.com/..." />
                    </div>
                </div>
                <div className={styles.fieldRow}>
                    <div className={styles.field}>
                        <label className={styles.fieldLabel}>LinkedIn URL</label>
                        <input className={styles.fieldInput} value={data.linkedin} onChange={e => setData(p => ({...p, linkedin: e.target.value}))} placeholder="https://linkedin.com/in/..." />
                    </div>
                </div>
                <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label className={styles.fieldLabel}>Contact Section Text</label>
                    <textarea className={styles.fieldTextarea} value={data.contactText} onChange={e => setData(p => ({...p, contactText: e.target.value}))} />
                </div>
            </div>

            <div className={styles.actionBar}>
                <div className={styles.actionGroup}>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSave}>💾 Save Changes</button>
                    <button className={`${styles.btn} ${styles.btnOutline}`} onClick={handleExport}>📥 Export JSON</button>
                    <button className={`${styles.btn} ${styles.btnDanger}`} onClick={handleReset}>↺ Reset to Default</button>
                </div>
                {saved && <span className={`${styles.toast} ${styles.toastSuccess}`}>✓ Saved to localStorage!</span>}
            </div>
        </div>
    );
}
