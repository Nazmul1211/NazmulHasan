'use client';

import { useState, useEffect } from 'react';
import styles from '../../admin.module.css';
import { defaultPortfolioData, Project } from '@/data/portfolioData';
import { FolderGit, Save, Download, RotateCcw, Star, Edit, Check, X, Plus, Trash2, GripVertical } from 'lucide-react';

export default function ProjectsEditorPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editData, setEditData] = useState<Partial<Project>>({});
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/api/portfolio/projects');
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const openEdit = (i: number) => {
        setEditingIndex(i);
        setEditData({ ...projects[i] });
    };

    const saveEdit = () => {
        if (editingIndex === null) return;
        
        let slug = editData.slug?.trim() || '';
        if (!slug && editData.title) {
            slug = editData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
        }

        // Validate unique slug
        const isDuplicate = projects.some((p, idx) => p.slug === slug && idx !== editingIndex);
        if (isDuplicate) {
            alert('A project with this URL slug already exists. Please choose a unique title or slug.');
            return;
        }

        const updated = [...projects];
        updated[editingIndex] = {
            ...projects[editingIndex],
            ...editData,
            slug,
            published: editData.published !== false
        } as Project;
        
        setProjects(updated);
        setEditingIndex(null);
    };

    const handleCreateProject = () => {
        const newProj: Project = {
            slug: '',
            title: '',
            description: '',
            fullDescription: '',
            techStack: [],
            liveUrl: '',
            githubUrl: '',
            challenges: [],
            futurePlans: [],
            featured: false,
            published: false // defaults to draft
        };
        
        setProjects(prev => [...prev, newProj]);
        openEdit(projects.length);
    };

    const handleDeleteProject = (index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const projectTitle = projects[index].title || 'Untitled Project';
        if (!confirm(`Are you sure you want to delete "${projectTitle}"?`)) return;
        setProjects(prev => prev.filter((_, i) => i !== index));
    };

    const handleSaveAll = async () => {
        try {
            const res = await fetch('/api/portfolio/projects', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projects)
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

    const handleExport = () => {
        const blob = new Blob([JSON.stringify(projects, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'projects.json'; a.click();
        URL.revokeObjectURL(url);
    };

    const toggleFeatured = (i: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const updated = [...projects];
        updated[i] = { ...updated[i], featured: !updated[i].featured };
        setProjects(updated);
    };

    // Drag and Drop Event Handlers
    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', index.toString());
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === index) return;
        setDragOverIndex(index);
    };

    const handleDrop = (e: React.DragEvent, targetIndex: number) => {
        e.preventDefault();
        setDragOverIndex(null);
        if (draggedIndex === null || draggedIndex === targetIndex) return;

        const updated = [...projects];
        const [draggedItem] = updated.splice(draggedIndex, 1);
        updated.splice(targetIndex, 0, draggedItem);

        setProjects(updated);
        setDraggedIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    if (loading) {
        return <div className={styles.loading}>Loading projects...</div>;
    }

    return (
        <div>
            <div className={styles.dashHeader} style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                    <h1 className={styles.dashTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <FolderGit size={24} style={{ color: 'var(--primary)' }} /> Projects
                    </h1>
                    <p className={styles.dashSubtitle}>Drag cards using the handles to reorder. Manage drafts, publish toggles, and edit project details.</p>
                </div>
                <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleCreateProject} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Plus size={16} /> Add New Project
                </button>
            </div>

            {/* Project list with drag-and-drop */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                {projects.map((project, i) => {
                    const isDraft = project.published === false;
                    const isOver = dragOverIndex === i;
                    const isDragging = draggedIndex === i;
                    
                    return (
                        <div 
                            key={project.slug || `new-${i}`} 
                            draggable
                            onDragStart={(e) => handleDragStart(e, i)}
                            onDragOver={(e) => handleDragOver(e, i)}
                            onDrop={(e) => handleDrop(e, i)}
                            onDragEnd={handleDragEnd}
                            className={styles.listCard}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                border: isOver ? '2px dashed var(--primary)' : '1px solid var(--border)',
                                opacity: isDragging ? 0.4 : 1,
                                transform: isOver ? 'scale(1.01)' : 'none',
                                transition: 'all 0.2s ease',
                                cursor: 'move'
                            }}
                        >
                            {/* Drag Grip Handle */}
                            <div style={{ padding: '0 0.5rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', cursor: 'grab' }}>
                                <GripVertical size={20} />
                            </div>

                            <div className={styles.listCardContent} style={{ flex: 1 }}>
                                <div className={styles.listCardTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {project.featured && <Star size={16} fill="var(--primary)" color="var(--primary)" />}
                                    <span style={{ fontWeight: 600 }}>{project.title || <em style={{ color: 'var(--text-muted)' }}>Untitled Project</em>}</span>
                                    
                                    {/* Publish Status Badges */}
                                    {isDraft ? (
                                        <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontWeight: 600 }}>
                                            Draft
                                        </span>
                                    ) : (
                                        <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontWeight: 600 }}>
                                            Published
                                        </span>
                                    )}
                                </div>
                                <div className={styles.listCardSub} style={{ marginTop: '0.2rem' }}>
                                    {project.techStack && project.techStack.length > 0 
                                        ? project.techStack.slice(0, 3).join(' · ') + (project.techStack.length > 3 ? ` +${project.techStack.length - 3} more` : '')
                                        : 'No tech stack defined'}
                                </div>
                            </div>
                            <div className={styles.listCardActions} style={{ display: 'flex', gap: '0.4rem' }}>
                                <button className={styles.iconBtn} onClick={(e) => toggleFeatured(i, e)} title={project.featured ? 'Unfeature' : 'Feature'}>
                                    <Star size={16} fill={project.featured ? 'var(--primary)' : 'none'} color={project.featured ? 'var(--primary)' : 'currentColor'} />
                                </button>
                                <button className={styles.iconBtn} onClick={() => openEdit(i)} title="Edit">
                                    <Edit size={16} />
                                </button>
                                <button className={`${styles.iconBtn} ${styles.btnDanger}`} onClick={(e) => handleDeleteProject(i, e)} title="Delete" style={{ padding: '0.35rem', borderRadius: 'var(--radius)' }}>
                                    <Trash2 size={16} style={{ color: '#ef4444' }} />
                                </button>
                            </div>
                        </div>
                    );
                })}

                {projects.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', border: '1px dashed var(--border)', borderRadius: 'var(--radius)', color: 'var(--text-muted)' }}>
                        No projects found. Click "Add New Project" to get started.
                    </div>
                )}
            </div>

            {/* Edit modal */}
            {editingIndex !== null && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '2rem', width: '100%', maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--foreground)' }}>
                            {projects[editingIndex].title ? `Edit: ${projects[editingIndex].title}` : 'Create New Project'}
                        </h2>
                        
                        {/* Title & Slug */}
                        <div className={styles.fieldRow}>
                            <div className={styles.field}>
                                <label className={styles.fieldLabel}>Title</label>
                                <input className={styles.fieldInput} placeholder="e.g. TuitionPort" value={editData.title ?? ''} onChange={e => setEditData(p => ({...p, title: e.target.value}))} />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.fieldLabel}>URL Slug (custom or auto-generated)</label>
                                <input className={styles.fieldInput} placeholder="e.g. tuitionport" value={editData.slug ?? ''} onChange={e => setEditData(p => ({...p, slug: e.target.value}))} />
                            </div>
                        </div>

                        {/* URLs */}
                        <div className={styles.fieldRow}>
                            <div className={styles.field}>
                                <label className={styles.fieldLabel}>Live Demo URL</label>
                                <input className={styles.fieldInput} placeholder="https://example.com" value={editData.liveUrl ?? ''} onChange={e => setEditData(p => ({...p, liveUrl: e.target.value}))} />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.fieldLabel}>GitHub URL (optional)</label>
                                <input className={styles.fieldInput} placeholder="https://github.com/username/project" value={editData.githubUrl ?? ''} onChange={e => setEditData(p => ({...p, githubUrl: e.target.value}))} />
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div className={styles.field} style={{ marginBottom: '1rem' }}>
                            <label className={styles.fieldLabel}>Tech Stack (comma-separated)</label>
                            <input className={styles.fieldInput} placeholder="Next.js, Node.js, PostgreSQL" value={editData.techStack?.join(', ') ?? ''} onChange={e => setEditData(p => ({...p, techStack: e.target.value.split(',').map(t => t.trim()).filter(Boolean)}))} />
                        </div>

                        {/* Descriptions */}
                        <div className={styles.field} style={{ marginBottom: '1rem' }}>
                            <label className={styles.fieldLabel}>Short Description (shows on cards)</label>
                            <textarea className={styles.fieldTextarea} rows={2} placeholder="Brief summary of the project" value={editData.description ?? ''} onChange={e => setEditData(p => ({...p, description: e.target.value}))} />
                        </div>
                        <div className={styles.field} style={{ marginBottom: '1rem' }}>
                            <label className={styles.fieldLabel}>Full Description (shows on details page)</label>
                            <textarea className={styles.fieldTextarea} rows={4} placeholder="Detailed project case study details" value={editData.fullDescription ?? ''} onChange={e => setEditData(p => ({...p, fullDescription: e.target.value}))} />
                        </div>

                        {/* Challenges & Plans */}
                        <div className={styles.field} style={{ marginBottom: '1rem' }}>
                            <label className={styles.fieldLabel}>Challenges Faced (one per line)</label>
                            <textarea className={styles.fieldTextarea} rows={3} placeholder="Challenge 1&#10;Challenge 2" value={editData.challenges?.join('\n') ?? ''} onChange={e => setEditData(p => ({...p, challenges: e.target.value.split('\n').map(x => x.trim()).filter(Boolean)}))} />
                        </div>
                        <div className={styles.field} style={{ marginBottom: '1.5rem' }}>
                            <label className={styles.fieldLabel}>Future Plans & Improvements (one per line)</label>
                            <textarea className={styles.fieldTextarea} rows={3} placeholder="Plan 1&#10;Plan 2" value={editData.futurePlans?.join('\n') ?? ''} onChange={e => setEditData(p => ({...p, futurePlans: e.target.value.split('\n').map(x => x.trim()).filter(Boolean)}))} />
                        </div>

                        {/* Publish Status Checkbox */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
                            <input 
                                type="checkbox" 
                                id="published" 
                                checked={editData.published !== false} 
                                onChange={e => setEditData(p => ({ ...p, published: e.target.checked }))}
                                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                            />
                            <label htmlFor="published" style={{ color: 'var(--foreground)', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', userSelect: 'none' }}>
                                Publish Project (Make visible on the landing page)
                            </label>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={saveEdit}>
                                <Check size={16} /> Save Project
                            </button>
                            <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => {
                                // If it was a newly created project with empty fields and cancelled, clean it up
                                if (editingIndex !== null && !projects[editingIndex].title && !projects[editingIndex].slug) {
                                    setProjects(prev => prev.filter((_, i) => i !== editingIndex));
                                }
                                setEditingIndex(null);
                            }}>
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
                    <button className={`${styles.btn} ${styles.btnDanger}`} onClick={() => {
                        if (confirm('Are you sure you want to reset all projects back to system defaults?')) {
                            setProjects(defaultPortfolioData.projects);
                        }
                    }}>
                        <RotateCcw size={16} /> Reset to Default
                    </button>
                </div>
                {saved && <span className={`${styles.toast} ${styles.toastSuccess}`}>✓ Saved!</span>}
            </div>
        </div>
    );
}
