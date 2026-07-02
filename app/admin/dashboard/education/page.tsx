'use client';

import { useState, useEffect } from 'react';
import styles from '../../admin.module.css';
import { defaultPortfolioData, EducationItem } from '@/data/portfolioData';
import { PORTFOLIO_STORAGE_KEY } from '@/lib/adminConfig';

import { GraduationCap, Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

function loadData(): EducationItem[] {
    if (typeof window === 'undefined') return defaultPortfolioData.education;
    try {
        const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
        if (stored) return JSON.parse(stored).education ?? defaultPortfolioData.education;
    } catch { /* ignore */ }
    return defaultPortfolioData.education;
}
function saveSection(data: unknown) {
    try {
        const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
        const all = stored ? JSON.parse(stored) : {};
        all.education = data;
        localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(all));
    } catch { /* ignore */ }
}

export default function EducationEditorPage() {
    const [items, setItems] = useState<EducationItem[]>(defaultPortfolioData.education);
    const [saved, setSaved] = useState(false);

    useEffect(() => { setItems(loadData()); }, []);

    const update = (i: number, field: keyof EducationItem, val: string) => {
        setItems(prev => prev.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
    };

    const handleSave = () => {
        saveSection(items);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const addItem = () => {
        setItems(prev => [...prev, { school: '', degree: '', details: '', date: '' }]);
    };

    const removeItem = (i: number) => {
        setItems(prev => prev.filter((_, idx) => idx !== i));
    };

    return (
        <div>
            <div className={styles.dashHeader}>
                <h1 className={styles.dashTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <GraduationCap size={24} style={{ color: 'var(--primary)' }} /> Education
                </h1>
                <p className={styles.dashSubtitle}>Edit your educational background, degrees, and institutions.</p>
            </div>

            {items.map((item, i) => (
                <div key={i} className={styles.editorCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                        <div className={styles.editorSectionLabel} style={{ marginBottom: 0 }}>Education #{i + 1}</div>
                        <button className={`${styles.iconBtn} ${styles.iconBtnDanger}`} onClick={() => removeItem(i)} title="Remove">
                            <Trash2 size={16} />
                        </button>
                    </div>
                    <div className={styles.fieldRow}>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>School / University</label>
                            <input className={styles.fieldInput} value={item.school} onChange={e => update(i, 'school', e.target.value)} />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Date Range</label>
                            <input className={styles.fieldInput} value={item.date} onChange={e => update(i, 'date', e.target.value)} placeholder="Jan 2022 – Dec 2025" />
                        </div>
                    </div>
                    <div className={styles.fieldRow}>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Degree / Certificate</label>
                            <input className={styles.fieldInput} value={item.degree} onChange={e => update(i, 'degree', e.target.value)} />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Details (CGPA, Location)</label>
                            <input className={styles.fieldInput} value={item.details} onChange={e => update(i, 'details', e.target.value)} placeholder="CGPA: 3.10/4.00 · Chittagong" />
                        </div>
                    </div>
                </div>
            ))}

            <button className={`${styles.btn} ${styles.btnOutline}`} onClick={addItem} style={{ marginBottom: '1.5rem' }}>
                <Plus size={16} /> Add Education Entry
            </button>

            <div className={styles.actionBar}>
                <div className={styles.actionGroup}>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSave}>
                        <Save size={16} /> Save Changes
                    </button>
                    <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => setItems(defaultPortfolioData.education)}>
                        <RotateCcw size={16} /> Reset
                    </button>
                </div>
                {saved && <span className={`${styles.toast} ${styles.toastSuccess}`}>✓ Saved!</span>}
            </div>
        </div>
    );
}
