'use client';

import { useState, useEffect } from 'react';
import styles from '../../admin.module.css';
import { defaultPortfolioData, HeroData } from '@/data/portfolioData';
import { PORTFOLIO_STORAGE_KEY } from '@/lib/adminConfig';

import { Sparkles, Save, Download, RotateCcw } from 'lucide-react';

export default function HeroEditorPage() {
    const [data, setData] = useState<HeroData>(defaultPortfolioData.hero);
    const [rolesText, setRolesText] = useState('');
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/api/portfolio/hero');
                if (res.ok) {
                    const d = await res.json();
                    setData(d);
                    setRolesText(d.roles.join('\n'));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleSave = async () => {
        const updated = { ...data, roles: rolesText.split('\n').map(r => r.trim()).filter(Boolean) };
        try {
            const res = await fetch('/api/portfolio/hero', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated)
            });
            if (res.ok) {
                setSaved(true);
                setTimeout(() => setSaved(false), 2500);
            } else {
                alert('Failed to save changes');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to save changes');
        }
    };

    const handleReset = () => {
        setData(defaultPortfolioData.hero);
        setRolesText(defaultPortfolioData.hero.roles.join('\n'));
    };

    const handleExport = () => {
        const updated = { ...data, roles: rolesText.split('\n').map(r => r.trim()).filter(Boolean) };
        const blob = new Blob([JSON.stringify(updated, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'hero.json'; a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <div className={styles.dashHeader}>
                <h1 className={styles.dashTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Sparkles size={24} style={{ color: 'var(--primary)' }} /> Hero Section
                </h1>
                <p className={styles.dashSubtitle}>Edit your name, role titles, description, and links.</p>
            </div>

            <div className={styles.editorCard}>
                <div className={styles.editorSectionLabel}>Basic Info</div>
                <div className={styles.fieldRow}>
                    <div className={styles.field}>
                        <label className={styles.fieldLabel}>Full Name</label>
                        <input className={styles.fieldInput} value={data.name} onChange={e => setData(p => ({...p, name: e.target.value}))} placeholder="Nazmul Hasan" />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.fieldLabel}>Resume URL</label>
                        <input className={styles.fieldInput} value={data.resumeUrl} onChange={e => setData(p => ({...p, resumeUrl: e.target.value}))} placeholder="/Resume.pdf" />
                    </div>
                </div>

                <div className={`${styles.field} ${styles.fieldFull}`} style={{ marginBottom: '1.25rem' }}>
                    <label className={styles.fieldLabel}>Description</label>
                    <textarea className={styles.fieldTextarea} value={data.description} onChange={e => setData(p => ({...p, description: e.target.value}))} />
                </div>

                <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label className={styles.fieldLabel}>Role Titles (one per line)</label>
                    <textarea className={styles.fieldTextarea} value={rolesText} onChange={e => setRolesText(e.target.value)} rows={4} placeholder="Software Engineer&#10;Full Stack Developer" />
                </div>
            </div>

            <div className={styles.editorCard}>
                <div className={styles.editorSectionLabel}>Social Links</div>
                <div className={styles.fieldRow}>
                    <div className={styles.field}>
                        <label className={styles.fieldLabel}>GitHub URL</label>
                        <input className={styles.fieldInput} value={data.github} onChange={e => setData(p => ({...p, github: e.target.value}))} placeholder="https://github.com/..." />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.fieldLabel}>LinkedIn URL</label>
                        <input className={styles.fieldInput} value={data.linkedin} onChange={e => setData(p => ({...p, linkedin: e.target.value}))} placeholder="https://linkedin.com/in/..." />
                    </div>
                </div>
            </div>

            <div className={styles.actionBar}>
                <div className={styles.actionGroup}>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSave}>
                        <Save size={16} /> Save Changes
                    </button>
                    <button className={`${styles.btn} ${styles.btnOutline}`} onClick={handleExport}>
                        <Download size={16} /> Export JSON
                    </button>
                    <button className={`${styles.btn} ${styles.btnDanger}`} onClick={handleReset}>
                        <RotateCcw size={16} /> Reset to Default
                    </button>
                </div>
                {saved && <span className={`${styles.toast} ${styles.toastSuccess}`}>✓ Saved successfully!</span>}
            </div>
        </div>
    );
}
