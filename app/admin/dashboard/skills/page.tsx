'use client';

import { useState, useEffect } from 'react';
import styles from '../../admin.module.css';
import { defaultPortfolioData, SkillCategory } from '@/data/portfolioData';
import { PORTFOLIO_STORAGE_KEY } from '@/lib/adminConfig';

import { Wrench, Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

export default function SkillsEditorPage() {
    const [skills, setSkills] = useState<SkillCategory[]>(defaultPortfolioData.skills);
    const [saved, setSaved] = useState(false);
    const [activeCat, setActiveCat] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/api/portfolio/skills');
                if (res.ok) {
                    const data = await res.json();
                    setSkills(data);
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
        try {
            const res = await fetch('/api/portfolio/skills', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(skills)
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

    const updateSkillTag = (catIdx: number, skillIdx: number, tag: string) => {
        setSkills(prev => prev.map((cat, ci) =>
            ci === catIdx ? {
                ...cat,
                skills: cat.skills.map((s, si) => si === skillIdx ? { ...s, tag } : s)
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
            ci === catIdx ? { ...cat, skills: [...cat.skills, { name: 'New Skill', proficiency: 85, tag: 'Core' }] } : cat
        ));
    };

    const currentCat = skills[activeCat];

    const getLevelText = (p: number) => {
        if (p >= 88) return 'Core';
        if (p >= 78) return 'Proficient';
        if (p >= 65) return 'Working Knowledge';
        return 'Academic';
    };

    return (
        <div>
            <div className={styles.dashHeader}>
                <h1 className={styles.dashTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Wrench size={24} style={{ color: 'var(--primary)' }} /> Skills & Stack Matrix
                </h1>
                <p className={styles.dashSubtitle}>Manage technical competencies, categories, and proficiency tiers (displayed as Core / Proficient / Working Knowledge on portfolio).</p>
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
                            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                <input
                                    className={styles.fieldInput}
                                    value={skill.name}
                                    placeholder="Skill Name"
                                    onChange={e => updateSkillName(activeCat, si, e.target.value)}
                                    style={{ maxWidth: '200px' }}
                                />
                                <input
                                    className={styles.fieldInput}
                                    value={skill.tag || ''}
                                    placeholder="Tag (e.g. Runtime, Relational)"
                                    onChange={e => updateSkillTag(activeCat, si, e.target.value)}
                                    style={{ maxWidth: '180px' }}
                                />
                                <span style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.76rem',
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '9999px',
                                    background: 'rgba(99, 102, 241, 0.15)',
                                    color: '#818cf8',
                                    border: '1px solid rgba(99, 102, 241, 0.3)'
                                }}>
                                    Tier: {getLevelText(skill.proficiency)}
                                </span>
                                <button className={`${styles.iconBtn} ${styles.iconBtnDanger}`} onClick={() => removeSkill(activeCat, si)} title="Remove">
                                    <Trash2 size={16} />
                                </button>
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
                                <span className={styles.rangeValue}>{getLevelText(skill.proficiency)} ({skill.proficiency}%)</span>
                            </div>
                        </div>
                    ))}

                    <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => addSkill(activeCat)}>
                        <Plus size={16} /> Add Skill to {currentCat.title}
                    </button>
                </div>
            )}

            <div className={styles.actionBar}>
                <div className={styles.actionGroup}>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSave}>
                        <Save size={16} /> Save Skills
                    </button>
                    <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => setSkills(defaultPortfolioData.skills)}>
                        <RotateCcw size={16} /> Reset
                    </button>
                </div>
                {saved && <span className={`${styles.toast} ${styles.toastSuccess}`}>✓ Saved!</span>}
            </div>
        </div>
    );
}
