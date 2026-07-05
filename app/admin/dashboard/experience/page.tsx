'use client';

import { useState, useEffect } from 'react';
import styles from '../../admin.module.css';
import { defaultPortfolioData, ExperienceItem } from '@/data/portfolioData';
import { PORTFOLIO_STORAGE_KEY } from '@/lib/adminConfig';

import { Briefcase, Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

export default function ExperienceEditorPage() {
    const [items, setItems] = useState<ExperienceItem[]>(defaultPortfolioData.experience);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/api/portfolio/experience');
                if (res.ok) {
                    const data = await res.json();
                    setItems(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const update = (i: number, field: keyof ExperienceItem, val: string | string[]) => {
        setItems(prev => prev.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
    };

    const handleSave = async () => {
        try {
            const res = await fetch('/api/portfolio/experience', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(items)
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

    const addItem = () => {
        setItems(prev => [...prev, { role: '', company: '', period: '', descriptions: [''] }]);
    };

    const removeItem = (i: number) => {
        setItems(prev => prev.filter((_, idx) => idx !== i));
    };

    return (
        <div>
            <div className={styles.dashHeader}>
                <h1 className={styles.dashTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Briefcase size={24} style={{ color: 'var(--primary)' }} /> Experience
                </h1>
                <p className={styles.dashSubtitle}>Edit your work history, roles, and responsibilities.</p>
            </div>

            {items.map((item, i) => (
                <div key={i} className={styles.editorCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                        <div className={styles.editorSectionLabel} style={{ marginBottom: 0 }}>Experience #{i + 1}</div>
                        <button className={`${styles.iconBtn} ${styles.iconBtnDanger}`} onClick={() => removeItem(i)} title="Remove">
                            <Trash2 size={16} />
                        </button>
                    </div>
                    <div className={styles.fieldRow}>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Role / Title</label>
                            <input className={styles.fieldInput} value={item.role} onChange={e => update(i, 'role', e.target.value)} />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Company</label>
                            <input className={styles.fieldInput} value={item.company} onChange={e => update(i, 'company', e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.field} style={{ marginBottom: '1rem' }}>
                        <label className={styles.fieldLabel}>Period</label>
                        <input className={styles.fieldInput} value={item.period} onChange={e => update(i, 'period', e.target.value)} placeholder="Jan 2023 – Present" style={{ maxWidth: '280px' }} />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.fieldLabel}>Responsibilities (one per line)</label>
                        <textarea className={styles.fieldTextarea} rows={5} value={item.descriptions.join('\n')} onChange={e => update(i, 'descriptions', e.target.value.split('\n'))} />
                    </div>
                </div>
            ))}

            <button className={`${styles.btn} ${styles.btnOutline}`} onClick={addItem} style={{ marginBottom: '1.5rem' }}>
                <Plus size={16} /> Add Experience
            </button>

            <div className={styles.actionBar}>
                <div className={styles.actionGroup}>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSave}>
                        <Save size={16} /> Save Changes
                    </button>
                    <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => setItems(defaultPortfolioData.experience)}>
                        <RotateCcw size={16} /> Reset
                    </button>
                </div>
                {saved && <span className={`${styles.toast} ${styles.toastSuccess}`}>✓ Saved!</span>}
            </div>
        </div>
    );
}
