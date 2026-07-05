'use client';

import { useState, useEffect } from 'react';
import styles from '../../admin.module.css';
import { defaultPortfolioData, AboutData } from '@/data/portfolioData';
import { PORTFOLIO_STORAGE_KEY } from '@/lib/adminConfig';

import { User, Save, RotateCcw } from 'lucide-react';

export default function AboutEditorPage() {
    const [data, setData] = useState<AboutData>(defaultPortfolioData.about);
    const [parasText, setParasText] = useState('');
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/api/portfolio/about');
                if (res.ok) {
                    const d = await res.json();
                    setData(d);
                    setParasText(d.paragraphs.join('\n\n'));
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
        const updated = {
            ...data,
            paragraphs: parasText.split('\n\n').map(p => p.trim()).filter(Boolean),
        };
        try {
            const res = await fetch('/api/portfolio/about', {
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

    const updateStat = (i: number, field: 'value' | 'label', val: string) => {
        const stats = [...data.stats];
        stats[i] = { ...stats[i], [field]: val };
        setData(p => ({ ...p, stats }));
    };

    const updateHobby = (i: number, field: 'emoji' | 'label', val: string) => {
        const hobbies = [...data.hobbies];
        hobbies[i] = { ...hobbies[i], [field]: val };
        setData(p => ({ ...p, hobbies }));
    };

    return (
        <div>
            <div className={styles.dashHeader}>
                <h1 className={styles.dashTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <User size={24} style={{ color: 'var(--primary)' }} /> About Me
                </h1>
                <p className={styles.dashSubtitle}>Edit your bio paragraphs, stats, and hobbies.</p>
            </div>

            <div className={styles.editorCard}>
                <div className={styles.editorSectionLabel}>Bio Paragraphs</div>
                <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label className={styles.fieldLabel}>Paragraphs (separate with blank line)</label>
                    <textarea className={styles.fieldTextarea} rows={8} value={parasText} onChange={e => setParasText(e.target.value)} />
                </div>
            </div>

            <div className={styles.editorCard}>
                <div className={styles.editorSectionLabel}>Stats</div>
                {data.stats.map((stat, i) => (
                    <div key={i} className={styles.fieldRow} style={{ marginBottom: '0.75rem' }}>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Value #{i + 1}</label>
                            <input className={styles.fieldInput} value={stat.value} onChange={e => updateStat(i, 'value', e.target.value)} placeholder="15+" />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Label #{i + 1}</label>
                            <input className={styles.fieldInput} value={stat.label} onChange={e => updateStat(i, 'label', e.target.value)} placeholder="Production Apps" />
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.editorCard}>
                <div className={styles.editorSectionLabel}>Hobbies / Beyond Code</div>
                {data.hobbies.map((hobby, i) => (
                    <div key={i} className={styles.fieldRow} style={{ marginBottom: '0.75rem' }}>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Hobby #{i + 1}</label>
                            <input className={styles.fieldInput} value={hobby.label} onChange={e => updateHobby(i, 'label', e.target.value)} placeholder="Football" />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Icon Category</label>
                            <select 
                                className={styles.fieldSelect} 
                                value={hobby.label} 
                                onChange={e => updateHobby(i, 'label', e.target.value)}
                            >
                                <option value="Football">Football / Sports</option>
                                <option value="Reading">Reading / Books</option>
                                <option value="Traveling">Traveling / Airplane</option>
                                <option value="Gaming">Gaming / Controller</option>
                                <option value="Open Source">Open Source / Code</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.actionBar}>
                <div className={styles.actionGroup}>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSave}>
                        <Save size={16} /> Save Changes
                    </button>
                    <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => { setData(defaultPortfolioData.about); setParasText(defaultPortfolioData.about.paragraphs.join('\n\n')); }}>
                        <RotateCcw size={16} /> Reset
                    </button>
                </div>
                {saved && <span className={`${styles.toast} ${styles.toastSuccess}`}>✓ Saved!</span>}
            </div>
        </div>
    );
}
