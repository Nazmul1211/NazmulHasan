'use client';

import { useState, useEffect } from 'react';
import styles from '../../admin.module.css';
import { defaultPortfolioData, Project } from '@/data/portfolioData';
import { PORTFOLIO_STORAGE_KEY } from '@/lib/adminConfig';
import { FolderGit, Save, Download, RotateCcw, Star, Edit, Check, X } from 'lucide-react';

function loadData(): Project[] {
    if (typeof window === 'undefined') return defaultPortfolioData.projects;
    try {
        const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
        if (stored) return JSON.parse(stored).projects ?? defaultPortfolioData.projects;
    } catch { /* ignore */ }
    return defaultPortfolioData.projects;
}

function saveSection(data: unknown) {
    try {
        const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
        const all = stored ? JSON.parse(stored) : {};
        all.projects = data;
        localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(all));
    } catch { /* ignore */ }
}

export default function ProjectsEditorPage() {
    const [projects, setProjects] = useState<Project[]>(defaultPortfolioData.projects);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editData, setEditData] = useState<Partial<Project>>({});
    const [saved, setSaved] = useState(false);

    useEffect(() => { setProjects(loadData()); }, []);

    const openEdit = (i: number) => {
        setEditingIndex(i);
        setEditData({ ...projects[i] });
    };

    const saveEdit = () => {
        if (editingIndex === null) return;
        const updated = [...projects];
        updated[editingIndex] = { ...projects[editingIndex], ...editData } as Project;
        setProjects(updated);
        setEditingIndex(null);
    };

    const handleSaveAll = () => {
        saveSection(projects);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const handleExport = () => {
        const blob = new Blob([JSON.stringify(projects, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'projects.json'; a.click();
        URL.revokeObjectURL(url);
    };

    const toggleFeatured = (i: number) => {
        const updated = [...projects];
        updated[i] = { ...updated[i], featured: !updated[i].featured };
        setProjects(updated);
    };

    return (
        <div>
            <div className={styles.dashHeader}>
                <h1 className={styles.dashTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <FolderGit size={24} style={{ color: 'var(--primary)' }} /> Projects
                </h1>
                <p className={styles.dashSubtitle}>Edit project details, links, and featured status. Click Edit to open the full editor for a project.</p>
            </div>

            {/* Project list */}
            {projects.map((project, i) => (
                <div key={project.slug} className={styles.listCard}>
                    <div className={styles.listCardContent}>
                        <div className={styles.listCardTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            {project.featured && <Star size={16} fill="var(--primary)" color="var(--primary)" />}
                            {project.title}
                        </div>
                        <div className={styles.listCardSub}>
                            {project.techStack.slice(0, 3).join(' · ')} {project.techStack.length > 3 ? `+${project.techStack.length - 3} more` : ''}
                        </div>
                    </div>
                    <div className={styles.listCardActions}>
                        <button className={styles.iconBtn} onClick={() => toggleFeatured(i)} title={project.featured ? 'Unfeature' : 'Feature'}>
                            <Star size={16} fill={project.featured ? 'var(--primary)' : 'none'} color={project.featured ? 'var(--primary)' : 'currentColor'} />
                        </button>
                        <button className={styles.iconBtn} onClick={() => openEdit(i)} title="Edit">
                            <Edit size={16} />
                        </button>
                    </div>
                </div>
            ))}

            {/* Edit modal */}
            {editingIndex !== null && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '2rem', width: '100%', maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--foreground)' }}>
                            Edit: {projects[editingIndex].title}
                        </h2>
                        <div className={styles.fieldRow}>
                            <div className={styles.field}>
                                <label className={styles.fieldLabel}>Title</label>
                                <input className={styles.fieldInput} value={editData.title ?? ''} onChange={e => setEditData(p => ({...p, title: e.target.value}))} />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.fieldLabel}>Live URL</label>
                                <input className={styles.fieldInput} value={editData.liveUrl ?? ''} onChange={e => setEditData(p => ({...p, liveUrl: e.target.value}))} />
                            </div>
                        </div>
                        <div className={styles.fieldRow}>
                            <div className={styles.field}>
                                <label className={styles.fieldLabel}>GitHub URL (optional)</label>
                                <input className={styles.fieldInput} value={editData.githubUrl ?? ''} onChange={e => setEditData(p => ({...p, githubUrl: e.target.value}))} />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.fieldLabel}>Tech Stack (comma-separated)</label>
                                <input className={styles.fieldInput} value={editData.techStack?.join(', ') ?? ''} onChange={e => setEditData(p => ({...p, techStack: e.target.value.split(',').map(t => t.trim()).filter(Boolean)}))} />
                            </div>
                        </div>
                        <div className={styles.field} style={{ marginBottom: '1rem' }}>
                            <label className={styles.fieldLabel}>Short Description (for card)</label>
                            <textarea className={styles.fieldTextarea} rows={2} value={editData.description ?? ''} onChange={e => setEditData(p => ({...p, description: e.target.value}))} />
                        </div>
                        <div className={styles.field} style={{ marginBottom: '1rem' }}>
                            <label className={styles.fieldLabel}>Full Description (for detail page)</label>
                            <textarea className={styles.fieldTextarea} rows={4} value={editData.fullDescription ?? ''} onChange={e => setEditData(p => ({...p, fullDescription: e.target.value}))} />
                        </div>
                        <div className={styles.field} style={{ marginBottom: '1rem' }}>
                            <label className={styles.fieldLabel}>Challenges (one per line)</label>
                            <textarea className={styles.fieldTextarea} rows={4} value={editData.challenges?.join('\n') ?? ''} onChange={e => setEditData(p => ({...p, challenges: e.target.value.split('\n').map(x => x.trim()).filter(Boolean)}))} />
                        </div>
                        <div className={styles.field} style={{ marginBottom: '1.5rem' }}>
                            <label className={styles.fieldLabel}>Future Plans (one per line)</label>
                            <textarea className={styles.fieldTextarea} rows={4} value={editData.futurePlans?.join('\n') ?? ''} onChange={e => setEditData(p => ({...p, futurePlans: e.target.value.split('\n').map(x => x.trim()).filter(Boolean)}))} />
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={saveEdit}>
                                <Check size={16} /> Save Project
                            </button>
                            <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => setEditingIndex(null)}>
                                <X size={16} /> Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.actionBar}>
                <div className={styles.actionGroup}>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSaveAll}>
                        <Save size={16} /> Save All Projects
                    </button>
                    <button className={`${styles.btn} ${styles.btnOutline}`} onClick={handleExport}>
                        <Download size={16} /> Export JSON
                    </button>
                    <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => setProjects(defaultPortfolioData.projects)}>
                        <RotateCcw size={16} /> Reset
                    </button>
                </div>
                {saved && <span className={`${styles.toast} ${styles.toastSuccess}`}>✓ Saved!</span>}
            </div>
        </div>
    );
}
