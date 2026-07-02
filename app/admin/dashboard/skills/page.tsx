'use client';

import { useState, useEffect } from 'react';
import styles from '../../admin.module.css';
import { defaultPortfolioData, SkillCategory } from '@/data/portfolioData';
import { PORTFOLIO_STORAGE_KEY } from '@/lib/adminConfig';

function loadData(): SkillCategory[] {
    if (typeof window === 'undefined') return defaultPortfolioData.skills;
    try {
        const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
        if (stored) return JSON.parse(stored).skills ?? defaultPortfolioData.skills;
    } catch { /* ignore */ }
    return defaultPortfolioData.skills;
}

function saveSection(data: unknown) {
    try {
        const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
        const all = stored ? JSON.parse(stored) : {};
        all.skills = data;
        localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(all));
    } catch { /* ignore */ }
}

export default function SkillsEditorPage() {
    const [skills, setSkills] = useState<SkillCategory[]>(defaultPortfolioData.skills);
    const [saved, setSaved] = useState(false);
    const [activeCat, setActiveCat] = useState(0);

    useEffect(() => { setSkills(loadData()); }, []);

    const updateSkillProficiency = (catIdx: number, skillIdx: number, value: number) => {
        setSkills(prev => prev.map((cat, ci) =>
            ci === catIdx ? {
                ...cat,
                skills: cat.skills.map((s, si) => si === skillIdx ? { ...s, proficiency: value } : s)
            } : cat
        ));
    };

    const updateSkillName = (catIdx: number, skillIdx: number, name: string) => {
        setSkills(prev => prev.map((cat, ci) =>
            ci === catIdx ? {
                ...cat,
                skills: cat.skills.map((s, si) => si === skillIdx ? { ...s, name } : s)
            } : cat
        ));
    };

    const removeSkill = (catIdx: number, skillIdx: number) => {
        setSkills(prev => prev.map((cat, ci) =>
            ci === catIdx ? { ...cat, skills: cat.skills.filter((_, si) => si !== skillIdx) } : cat
        ));
    };

    const addSkill = (catIdx: number) => {
        setSkills(prev => prev.map((cat, ci) =>
            ci === catIdx ? { ...cat, skills: [...cat.skills, { name: 'New Skill', proficiency: 70 }] } : cat
        ));
    };

    const handleSave = () => {
        saveSection(skills);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const currentCat = skills[activeCat];

    return (
        <div>
            <div className={styles.dashHeader}>
                <h1 className={styles.dashTitle}>🛠 Skills</h1>
                <p className={styles.dashSubtitle}>Adjust skill names and proficiency levels. Drag sliders to update percentages.</p>
            </div>

            {/* Category tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {skills.map((cat, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveCat(i)}
                        className={`${styles.btn} ${activeCat === i ? styles.btnPrimary : styles.btnOutline}`}
                        style={{ fontSize: '0.82rem', padding: '0.45rem 1rem' }}
                    >
                        {cat.title}
                    </button>
                ))}
            </div>

            {currentCat && (
                <div className={styles.editorCard}>
                    <div className={styles.editorSectionLabel}>{currentCat.title}</div>

                    {currentCat.skills.map((skill, si) => (
                        <div key={si} style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--glass-border)' }}>
                            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                                <input
                                    className={styles.fieldInput}
                                    value={skill.name}
                                    onChange={e => updateSkillName(activeCat, si, e.target.value)}
                                    style={{ maxWidth: '220px' }}
                                />
                                <button className={`${styles.iconBtn} ${styles.iconBtnDanger}`} onClick={() => removeSkill(activeCat, si)} title="Remove">✕</button>
                            </div>
                            <div className={styles.rangeRow}>
                                <input
                                    type="range"
                                    min={10}
                                    max={100}
                                    value={skill.proficiency}
                                    className={styles.rangeSlider}
                                    onChange={e => updateSkillProficiency(activeCat, si, Number(e.target.value))}
                                />
                                <span className={styles.rangeValue}>{skill.proficiency}%</span>
                            </div>
                        </div>
                    ))}

                    <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => addSkill(activeCat)}>
                        + Add Skill to {currentCat.title}
                    </button>
                </div>
            )}

            <div className={styles.actionBar}>
                <div className={styles.actionGroup}>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSave}>💾 Save Skills</button>
                    <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => setSkills(defaultPortfolioData.skills)}>↺ Reset</button>
                </div>
                {saved && <span className={`${styles.toast} ${styles.toastSuccess}`}>✓ Saved!</span>}
            </div>
        </div>
    );
}
