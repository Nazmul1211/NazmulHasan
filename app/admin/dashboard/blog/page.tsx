// app/admin/dashboard/blog/page.tsx — Tech Blog management panel with Gutenberg-style rich toolbar, autocomplete slash commands, expandable fullscreen, and visual editor preview

'use client';

import { useState, useEffect } from 'react';
import styles from '../../admin.module.css';
import { 
    BookOpen, Plus, Pencil, Trash2, Save, X, Calendar, Clock, Tag,
    Heading2, Heading3, Type, Bold, Code, List, Link as LinkIcon, 
    Image as ImageIcon, Maximize2, Minimize2, Eye as EyeIcon, Edit3
} from 'lucide-react';

interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    tags: string[];
    image: string;
    content: string;
    published: boolean;
}

const SLASH_COMMANDS = [
    { label: 'Paragraph', start: '<p>', end: '</p>', description: 'Add normal body text block' },
    { label: 'Heading 2', start: '<h2>', end: '</h2>', description: 'Add main section title' },
    { label: 'Heading 3', start: '<h3>', end: '</h3>', description: 'Add minor subsection title' },
    { label: 'Bold Text', start: '<strong>', end: '</strong>', description: 'Add bold inline styling' },
    { label: 'Code Block', start: '<pre><code>', end: '</code></pre>', description: 'Add syntax highlighted code block' },
    { label: 'Bullet List', start: '<ul>\n  <li>', end: '</li>\n</ul>', description: 'Add unordered bullet list block' },
    { label: 'Hyperlink', start: '<a href="" target="_blank">', end: '</a>', description: 'Add custom anchor hyperlink' },
    { label: 'Embed Image', start: '<img src="', end: '" alt="" style="width: 100%; border-radius: 8px; margin: 1rem 0;" />', description: 'Embed dynamic image block' },
];

export default function BlogDashboardPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [editorTab, setEditorTab] = useState<'write' | 'preview'>('write');

    // Slash Autocomplete state
    const [slashMenuOpen, setSlashMenuOpen] = useState(false);
    const [slashMenuQuery, setSlashMenuQuery] = useState('');
    const [slashMenuIndex, setSlashMenuIndex] = useState(0);
    const [slashTriggerIndex, setSlashTriggerIndex] = useState(-1);

    // Form fields state
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [readTime, setReadTime] = useState('5 min read');
    const [tagsInput, setTagsInput] = useState('');
    const [image, setImage] = useState('/images/blog/default.png');
    const [published, setPublished] = useState(true);
    const [date, setDate] = useState('');

    // Load blog posts on mount
    const loadPosts = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/blog');
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            } else {
                setError('Failed to fetch blog posts');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred loading blog posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    // Generate slug from title
    const handleTitleChange = (val: string) => {
        setTitle(val);
        if (!editingPost) {
            const generatedSlug = val
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .trim()
                .replace(/\s+/g, '-');
            setSlug(generatedSlug);
        }
    };

    // Open create modal
    const handleOpenCreate = () => {
        setEditingPost(null);
        setTitle('');
        setSlug('');
        setExcerpt('');
        setContent('');
        setReadTime('5 min read');
        setTagsInput('');
        setImage('/images/blog/default.png');
        setPublished(true);
        setDate('');
        setIsFullscreen(false);
        setEditorTab('write');
        setSlashMenuOpen(false);
        setIsModalOpen(true);
    };

    // Open edit modal
    const handleOpenEdit = (post: BlogPost) => {
        setEditingPost(post);
        setTitle(post.title);
        setSlug(post.slug);
        setExcerpt(post.excerpt);
        setContent(post.content);
        setReadTime(post.readTime);
        setTagsInput(post.tags.join(', '));
        setImage(post.image);
        setPublished(post.published);
        setDate(post.date);
        setIsFullscreen(false);
        setEditorTab('write');
        setSlashMenuOpen(false);
        setIsModalOpen(true);
    };

    // Helper to insert tags at cursor
    const insertTag = (startTag: string, endTag: string) => {
        const textarea = document.getElementById('blog-content-textarea') as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selectedText = text.substring(start, end);
        const replacement = startTag + selectedText + endTag;

        setContent(text.substring(0, start) + replacement + text.substring(end));

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + startTag.length, start + startTag.length + selectedText.length);
        }, 50);
    };

    // Handle Textarea Change for Slash Suggestion
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setContent(val);

        const cursor = e.target.selectionStart;
        const textBeforeCursor = val.substring(0, cursor);
        const lastSlash = textBeforeCursor.lastIndexOf('/');

        if (lastSlash !== -1 && !textBeforeCursor.substring(lastSlash + 1).includes(' ') && !textBeforeCursor.substring(lastSlash + 1).includes('\n')) {
            const query = textBeforeCursor.substring(lastSlash + 1);
            setSlashMenuOpen(true);
            setSlashMenuQuery(query);
            setSlashTriggerIndex(lastSlash);
            setSlashMenuIndex(0);
        } else {
            setSlashMenuOpen(false);
        }
    };

    // Select Slash Command Action
    const selectSlashCommand = (cmd: typeof SLASH_COMMANDS[number]) => {
        const textarea = document.getElementById('blog-content-textarea') as HTMLTextAreaElement;
        if (!textarea) return;

        const cursor = textarea.selectionStart;
        const start = slashTriggerIndex;
        const replacement = cmd.start + cmd.end;
        
        const newContent = content.substring(0, start) + replacement + content.substring(cursor);
        setContent(newContent);
        setSlashMenuOpen(false);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + cmd.start.length, start + cmd.start.length);
        }, 50);
    };

    // Filter commands based on typed query
    const filteredCommands = SLASH_COMMANDS.filter(c => 
        c.label.toLowerCase().includes(slashMenuQuery.toLowerCase())
    );

    // Keyboard navigation inside slash dropdown menu
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (slashMenuOpen) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSlashMenuIndex((prev) => (prev + 1) % filteredCommands.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSlashMenuIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredCommands[slashMenuIndex]) {
                    selectSlashCommand(filteredCommands[slashMenuIndex]);
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                setSlashMenuOpen(false);
            }
        }
    };

    // Submit form
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const postTags = tagsInput
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t.length > 0);

        const payload = {
            title,
            slug,
            excerpt,
            content,
            tags: postTags,
            image,
            readTime,
            published,
            date: date || undefined
        };

        try {
            let res;
            if (editingPost) {
                res = await fetch(`/api/blog/${editingPost.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            } else {
                res = await fetch('/api/blog', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            }

            const result = await res.json();
            if (res.ok) {
                setSuccess(editingPost ? 'Post updated successfully' : 'Post created successfully');
                setIsModalOpen(false);
                loadPosts();
            } else {
                setError(result.error || 'Failed to save blog post');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred saving the blog post');
        }
    };

    // Delete post
    const handleDeletePost = async (id: number) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;
        setError('');
        setSuccess('');

        try {
            const res = await fetch(`/api/blog/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setSuccess('Post deleted successfully');
                loadPosts();
            } else {
                setError('Failed to delete blog post');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred deleting the blog post');
        }
    };

    return (
        <div>
            <div className={styles.dashHeader}>
                <h1 className={styles.dashTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <BookOpen size={24} style={{ color: 'var(--primary)' }} /> Tech Blog Posts
                </h1>
                <p className={styles.dashSubtitle}>Create, edit, and moderate your published developer articles and tutorials.</p>
                
                <button 
                    onClick={handleOpenCreate} 
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    style={{ marginTop: '1rem' }}
                >
                    <Plus size={16} /> Create New Post
                </button>
            </div>

            {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius)', padding: '0.75rem 1rem', color: '#ef4444', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 'var(--radius)', padding: '0.75rem 1rem', color: '#10b981', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                    <span>{success}</span>
                </div>
            )}

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--foreground-dim)' }}>
                    <div className={styles.spinner} style={{ margin: '0 auto 1rem' }} />
                    <p>Loading developer blog posts...</p>
                </div>
            ) : posts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1.5rem', background: 'var(--glass-bg)', border: '1px dashed var(--glass-border)', borderRadius: 'var(--radius)', color: 'var(--foreground-dim)' }}>
                    <BookOpen size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                    <p>No blog posts found. Create your first technical article!</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    {posts.map((post) => (
                        <div key={post.id} className={styles.editorCard} style={{ margin: 0, padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                            <div style={{ flex: 1, minWidth: '280px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>{post.title}</h3>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.6rem', borderRadius: '1rem', background: post.published ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)', color: post.published ? '#10b981' : '#ef4444' }}>
                                        {post.published ? 'Published' : 'Draft'}
                                    </span>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--foreground-dim)', margin: '0 0 0.5rem 0', lineBreak: 'anywhere' }}>
                                    <strong>Slug:</strong> /blog/{post.slug}
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: 'var(--foreground-muted)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={14} /> {post.date}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {post.readTime}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Tag size={14} /> {post.tags.slice(0, 3).join(', ')}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button 
                                    onClick={() => handleOpenEdit(post)} 
                                    className={`${styles.btn} ${styles.btnSecondary}`}
                                    style={{ padding: '0.5rem' }}
                                    title="Edit Post"
                                >
                                    <Pencil size={15} />
                                </button>
                                <button 
                                    onClick={() => handleDeletePost(post.id)} 
                                    className={`${styles.btn} ${styles.btnSecondary}`}
                                    style={{ padding: '0.5rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                                    title="Delete Post"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Dialog */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1100, padding: isFullscreen ? 0 : '1rem' }}>
                    <div className={styles.editorCard} style={{ 
                        margin: 0, 
                        width: '100%', 
                        maxWidth: isFullscreen ? '100vw' : '850px', 
                        height: isFullscreen ? '100vh' : '90vh', 
                        maxHeight: isFullscreen ? '100vh' : '90vh', 
                        borderRadius: isFullscreen ? 0 : 'var(--radius)',
                        overflowY: 'auto', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '1.25rem', 
                        padding: '2rem',
                        transition: 'all 0.25s ease'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                                {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
                            </h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <button 
                                    type="button" 
                                    onClick={() => setIsFullscreen(!isFullscreen)} 
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground-dim)', display: 'flex', alignItems: 'center' }}
                                    title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Mode'}
                                >
                                    {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                                </button>
                                <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground-dim)', display: 'flex', alignItems: 'center' }}>
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Mode Selector Tab */}
                        <div style={{ display: 'flex', gap: '0.25rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                            <button
                                type="button"
                                onClick={() => setEditorTab('write')}
                                className={styles.btn}
                                style={{
                                    background: editorTab === 'write' ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                                    color: editorTab === 'write' ? 'var(--primary)' : 'var(--foreground-dim)',
                                    borderColor: editorTab === 'write' ? 'var(--primary)' : 'transparent',
                                    padding: '0.4rem 1rem',
                                    fontSize: '0.85rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.35rem'
                                }}
                            >
                                <Edit3 size={14} /> Write Content
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditorTab('preview')}
                                className={styles.btn}
                                style={{
                                    background: editorTab === 'preview' ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                                    color: editorTab === 'preview' ? 'var(--primary)' : 'var(--foreground-dim)',
                                    borderColor: editorTab === 'preview' ? 'var(--primary)' : 'transparent',
                                    padding: '0.4rem 1rem',
                                    fontSize: '0.85rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.35rem'
                                }}
                            >
                                <EyeIcon size={14} /> Gutenberg Live Preview
                            </button>
                        </div>

                        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1, overflowY: 'auto' }}>
                            {editorTab === 'write' ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
                                    
                                    {/* Row 1: Title and Slug */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                                        <div className={styles.field}>
                                            <label className={styles.fieldLabel}>Post Title</label>
                                            <input 
                                                type="text" 
                                                className={styles.fieldInput} 
                                                value={title} 
                                                onChange={(e) => handleTitleChange(e.target.value)} 
                                                placeholder="e.g. Building microservices with NestJS"
                                                required 
                                            />
                                        </div>
                                        <div className={styles.field}>
                                            <label className={styles.fieldLabel}>URL Slug</label>
                                            <input 
                                                type="text" 
                                                className={styles.fieldInput} 
                                                value={slug} 
                                                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} 
                                                placeholder="e.g. building-microservices-nestjs"
                                                required 
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2: Tags, Read Time, Cover Image */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                                        <div className={styles.field}>
                                            <label className={styles.fieldLabel}>Tags (comma-separated)</label>
                                            <input 
                                                type="text" 
                                                className={styles.fieldInput} 
                                                value={tagsInput} 
                                                onChange={(e) => setTagsInput(e.target.value)} 
                                                placeholder="React, Next.js, Styling"
                                            />
                                        </div>
                                        <div className={styles.field}>
                                            <label className={styles.fieldLabel}>Read Time</label>
                                            <input 
                                                type="text" 
                                                className={styles.fieldInput} 
                                                value={readTime} 
                                                onChange={(e) => setReadTime(e.target.value)} 
                                                placeholder="e.g. 5 min read"
                                                required 
                                            />
                                        </div>
                                        <div className={styles.field}>
                                            <label className={styles.fieldLabel}>Cover Image URL</label>
                                            <input 
                                                type="text" 
                                                className={styles.fieldInput} 
                                                value={image} 
                                                onChange={(e) => setImage(e.target.value)} 
                                                placeholder="/images/blog/default.png"
                                            />
                                        </div>
                                    </div>

                                    {editingPost && (
                                        <div className={styles.field} style={{ maxWidth: '200px' }}>
                                            <label className={styles.fieldLabel}>Custom Date (optional)</label>
                                            <input 
                                                type="text" 
                                                className={styles.fieldInput} 
                                                value={date} 
                                                onChange={(e) => setDate(e.target.value)} 
                                                placeholder="e.g. Feb 5, 2026"
                                            />
                                        </div>
                                    )}

                                    {/* Row 3: Excerpt */}
                                    <div className={styles.field}>
                                        <label className={styles.fieldLabel}>Short Excerpt (shows in summary grids)</label>
                                        <textarea 
                                            className={styles.fieldInput} 
                                            rows={2}
                                            value={excerpt} 
                                            onChange={(e) => setExcerpt(e.target.value)} 
                                            placeholder="Brief summary of the article..."
                                            required 
                                        />
                                    </div>

                                    {/* Row 4: Expandable Content, Gutenberg Toolbar, and Slash Menu Autocomplete */}
                                    <div className={styles.field} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: isFullscreen ? '45vh' : '300px', position: 'relative' }}>
                                        <label className={styles.fieldLabel} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span>Content Body (Type <strong style={{ color: 'var(--primary)' }}>/</strong> for Gutenberg block triggers)</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--foreground-dim)' }}>Drag lower right corner to manually resize</span>
                                        </label>
                                        
                                        {/* Gutenberg Formatting Toolbar */}
                                        <div style={{ 
                                            display: 'flex', 
                                            flexWrap: 'wrap', 
                                            gap: '0.25rem', 
                                            background: 'rgba(0, 0, 0, 0.2)', 
                                            border: '1px solid var(--glass-border)', 
                                            borderBottom: 'none',
                                            borderRadius: 'var(--radius) var(--radius) 0 0', 
                                            padding: '0.5rem' 
                                        }}>
                                            <button type="button" onClick={() => insertTag('<h2>', '</h2>')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground-dim)', padding: '0.35rem', borderRadius: '4px', display: 'flex', alignItems: 'center' }} title="Heading 2"><Heading2 size={16} /></button>
                                            <button type="button" onClick={() => insertTag('<h3>', '</h3>')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground-dim)', padding: '0.35rem', borderRadius: '4px', display: 'flex', alignItems: 'center' }} title="Heading 3"><Heading3 size={16} /></button>
                                            <button type="button" onClick={() => insertTag('<p>', '</p>')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground-dim)', padding: '0.35rem', borderRadius: '4px', display: 'flex', alignItems: 'center' }} title="Paragraph"><Type size={16} /></button>
                                            <button type="button" onClick={() => insertTag('<strong>', '</strong>')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground-dim)', padding: '0.35rem', borderRadius: '4px', display: 'flex', alignItems: 'center' }} title="Bold Text"><Bold size={16} /></button>
                                            <button type="button" onClick={() => insertTag('<pre><code>', '</code></pre>')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground-dim)', padding: '0.35rem', borderRadius: '4px', display: 'flex', alignItems: 'center' }} title="Code Block"><Code size={16} /></button>
                                            <button type="button" onClick={() => insertTag('<ul>\n  <li>', '</li>\n</ul>')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground-dim)', padding: '0.35rem', borderRadius: '4px', display: 'flex', alignItems: 'center' }} title="Bullet List"><List size={16} /></button>
                                            <button type="button" onClick={() => insertTag('<a href="" target="_blank">', '</a>')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground-dim)', padding: '0.35rem', borderRadius: '4px', display: 'flex', alignItems: 'center' }} title="Hyperlink"><LinkIcon size={16} /></button>
                                            <button type="button" onClick={() => insertTag('<img src="', '" alt="" style="width: 100%; border-radius: 8px; margin: 1rem 0;" />')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--foreground-dim)', padding: '0.35rem', borderRadius: '4px', display: 'flex', alignItems: 'center' }} title="Embed Image"><ImageIcon size={16} /></button>
                                        </div>

                                        <textarea 
                                            id="blog-content-textarea"
                                            className={styles.fieldInput} 
                                            style={{ 
                                                fontFamily: 'var(--font-mono)', 
                                                fontSize: '0.85rem', 
                                                flex: 1, 
                                                borderRadius: '0 0 var(--radius) var(--radius)',
                                                borderTop: 'none',
                                                minHeight: '220px',
                                                resize: 'vertical'
                                            }}
                                            value={content} 
                                            onChange={handleContentChange}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Write your article markup. Type '/' to trigger Gutenberg block inserter..."
                                            required 
                                        />

                                        {/* Floating Slash Autocomplete Autoclose Suggestion Dropdown */}
                                        {slashMenuOpen && filteredCommands.length > 0 && (
                                            <div style={{
                                                position: 'absolute',
                                                left: '1.5rem',
                                                bottom: '3rem',
                                                width: '260px',
                                                background: 'var(--background)',
                                                border: '1px solid var(--glass-border)',
                                                borderRadius: 'var(--radius)',
                                                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)',
                                                zIndex: 1200,
                                                maxHeight: '220px',
                                                overflowY: 'auto',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                padding: '0.4rem'
                                            }}>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--foreground-muted)', fontWeight: 600, padding: '0.35rem 0.5rem', borderBottom: '1px solid var(--glass-border)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                    Gutenberg Blocks
                                                </div>
                                                {filteredCommands.map((cmd, i) => (
                                                    <button
                                                        key={cmd.label}
                                                        type="button"
                                                        onClick={() => selectSlashCommand(cmd)}
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'flex-start',
                                                            width: '100%',
                                                            padding: '0.5rem 0.75rem',
                                                            background: i === slashMenuIndex ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            textAlign: 'left',
                                                            color: i === slashMenuIndex ? 'var(--primary)' : 'var(--foreground)',
                                                            transition: 'background 0.1s ease'
                                                        }}
                                                        onMouseEnter={() => setSlashMenuIndex(i)}
                                                    >
                                                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{cmd.label}</span>
                                                        <span style={{ fontSize: '0.7rem', color: 'var(--foreground-dim)' }}>{cmd.description}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                /* Gutenberg live visual preview block */
                                <div style={{ 
                                    flex: 1, 
                                    overflowY: 'auto', 
                                    background: 'rgba(0,0,0,0.3)', 
                                    border: '1px solid var(--glass-border)', 
                                    borderRadius: 'var(--radius)', 
                                    padding: '2.5rem',
                                    minHeight: '400px'
                                }}>
                                    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--foreground-muted)', display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                            <span>{date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            <span>•</span>
                                            <span>{readTime}</span>
                                        </div>
                                        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--foreground)', lineHeight: 1.2, marginBottom: '1.25rem' }}>
                                            {title || 'Untitled Post'}
                                        </h1>
                                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                                            {tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0).map(tag => (
                                                <span key={tag} style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '1rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', fontWeight: 600 }}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        
                                        <div 
                                            className="blog-preview-content"
                                            style={{
                                                color: 'var(--foreground-dim)',
                                                fontSize: '1.05rem',
                                                lineHeight: 1.7,
                                            }}
                                            dangerouslySetInnerHTML={{ 
                                                __html: content || '<p style="color: var(--foreground-muted); font-style: italic;">No content written yet. Use the Write tab to add text.</p>' 
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Sticky Footer actions inside Modal */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--glass-border)', paddingTop: '1.25rem', marginTop: 'auto' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', userSelect: 'none' }}>
                                    <input 
                                        type="checkbox" 
                                        id="modal-published"
                                        checked={published}
                                        onChange={(e) => setPublished(e.target.checked)}
                                        style={{ width: '1.1rem', height: '1.1rem', cursor: 'pointer' }}
                                    />
                                    <label htmlFor="modal-published" style={{ fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>
                                        Publish directly (Drafts are hidden from homepage)
                                    </label>
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <button type="button" onClick={() => setIsModalOpen(false)} className={`${styles.btn} ${styles.btnSecondary}`}>
                                        Cancel
                                    </button>
                                    <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                                        <Save size={16} /> Save Post
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
