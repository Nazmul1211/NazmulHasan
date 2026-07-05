// app/admin/dashboard/messages/page.tsx

'use client';

import { useState, useEffect } from 'react';
import styles from '../../admin.module.css';
import { MessageSquare, Mail, MailOpen, Trash2, Calendar, User, ArrowLeft, Send } from 'lucide-react';

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export default function MessagesInboxPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'unread'>('all');
    const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(null);

    const loadMessages = async () => {
        try {
            const res = await fetch('/api/contact');
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
            }
        } catch (err) {
            console.error('Error fetching messages:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMessages();
    }, []);

    const toggleReadStatus = async (msg: ContactMessage, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        try {
            const res = await fetch(`/api/messages/${msg.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isRead: !msg.isRead })
            });

            if (res.ok) {
                // Update local state
                const updatedMessages = messages.map(m => 
                    m.id === msg.id ? { ...m, isRead: !msg.isRead } : m
                );
                setMessages(updatedMessages);
                
                // Update active message modal details if open
                if (activeMessage && activeMessage.id === msg.id) {
                    setActiveMessage({ ...activeMessage, isRead: !msg.isRead });
                }
            }
        } catch (err) {
            console.error('Error updating read status:', err);
        }
    };

    const deleteMessage = async (id: number, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            const res = await fetch(`/api/messages/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setMessages(prev => prev.filter(m => m.id !== id));
                if (activeMessage?.id === id) {
                    setActiveMessage(null);
                }
            }
        } catch (err) {
            console.error('Error deleting message:', err);
        }
    };

    const filteredMessages = messages.filter(msg => {
        if (filter === 'unread') return !msg.isRead;
        return true;
    });

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div>
            <div className={styles.dashHeader}>
                <h1 className={styles.dashTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <MessageSquare size={24} style={{ color: 'var(--primary)' }} /> Inbox Messages
                </h1>
                <p className={styles.dashSubtitle}>Manage contact submissions, inquiries, and messages from your website.</p>
            </div>

            {activeMessage ? (
                // Message Detail View
                <div className={styles.editorCard}>
                    <button 
                        onClick={() => setActiveMessage(null)} 
                        className={`${styles.btn} ${styles.btnOutline}`}
                        style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                    >
                        <ArrowLeft size={16} /> Back to Inbox
                    </button>

                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.5rem' }}>
                                {activeMessage.subject}
                            </h2>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', color: 'var(--foreground-muted)', fontSize: '0.9rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                    <User size={14} /> <strong>{activeMessage.name}</strong> ({activeMessage.email})
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                    <Calendar size={14} /> {formatDate(activeMessage.createdAt)}
                                </span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <button 
                                onClick={(e) => toggleReadStatus(activeMessage, e)} 
                                className={`${styles.btn} ${styles.btnOutline}`} 
                                style={{ padding: '0.45rem 0.8rem', fontSize: '0.8rem' }}
                                title={activeMessage.isRead ? "Mark as Unread" : "Mark as Read"}
                            >
                                {activeMessage.isRead ? <Mail size={16} /> : <MailOpen size={16} />}
                                <span style={{ marginLeft: '0.4rem' }}>{activeMessage.isRead ? 'Mark Unread' : 'Mark Read'}</span>
                            </button>
                            <button 
                                onClick={(e) => deleteMessage(activeMessage.id, e)} 
                                className={`${styles.btn} ${styles.btnDanger}`} 
                                style={{ padding: '0.45rem 0.8rem', fontSize: '0.8rem' }}
                            >
                                <Trash2 size={16} />
                                <span style={{ marginLeft: '0.4rem' }}>Delete</span>
                            </button>
                        </div>
                    </div>

                    <div style={{ 
                        background: 'rgba(255,255,255,0.02)', 
                        border: '1px solid var(--glass-border)', 
                        borderRadius: 'var(--radius)', 
                        padding: '1.5rem', 
                        lineHeight: 1.6, 
                        whiteSpace: 'pre-wrap', 
                        color: 'var(--foreground)',
                        marginBottom: '1.5rem' 
                    }}>
                        {activeMessage.message}
                    </div>

                    <a 
                        href={`mailto:${activeMessage.email}?subject=RE: ${encodeURIComponent(activeMessage.subject)}`}
                        className={`${styles.btn} ${styles.btnPrimary}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
                    >
                        <Send size={16} /> Reply to Email
                    </a>
                </div>
            ) : (
                // Messages Inbox List
                <div>
                    {/* Filters */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <button 
                            onClick={() => setFilter('all')} 
                            className={`${styles.btn} ${filter === 'all' ? styles.btnPrimary : styles.btnOutline}`}
                            style={{ fontSize: '0.82rem', padding: '0.45rem 1rem' }}
                        >
                            All ({messages.length})
                        </button>
                        <button 
                            onClick={() => setFilter('unread')} 
                            className={`${styles.btn} ${filter === 'unread' ? styles.btnPrimary : styles.btnOutline}`}
                            style={{ fontSize: '0.82rem', padding: '0.45rem 1rem' }}
                        >
                            Unread ({messages.filter(m => !m.isRead).length})
                        </button>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--foreground-muted)' }}>
                            Loading messages...
                        </div>
                    ) : filteredMessages.length === 0 ? (
                        <div className={styles.editorCard} style={{ textAlign: 'center', padding: '4rem', color: 'var(--foreground-muted)' }}>
                            <Mail size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                            <p>No messages found in your inbox.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {filteredMessages.map((msg) => (
                                <div 
                                    key={msg.id} 
                                    className={styles.listCard}
                                    onClick={() => {
                                        setActiveMessage(msg);
                                        if (!msg.isRead) {
                                            toggleReadStatus(msg);
                                        }
                                    }}
                                    style={{ 
                                        cursor: 'pointer', 
                                        borderLeft: msg.isRead ? 'none' : '4px solid var(--primary)',
                                        background: msg.isRead ? 'rgba(255,255,255,0.01)' : 'rgba(99, 102, 241, 0.04)'
                                    }}
                                >
                                    <div className={styles.listCardContent}>
                                        <div className={styles.listCardTitle} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            <span style={{ fontWeight: msg.isRead ? 500 : 700 }}>{msg.name}</span>
                                            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>({msg.email})</span>
                                            <span style={{ fontSize: '0.75rem', opacity: 0.5, marginLeft: 'auto' }}>
                                                {formatDate(msg.createdAt)}
                                            </span>
                                        </div>
                                        <div className={styles.listCardSub} style={{ fontWeight: msg.isRead ? 400 : 600, color: 'var(--foreground)', marginTop: '0.25rem' }}>
                                            {msg.subject}
                                        </div>
                                        <div style={{ 
                                            fontSize: '0.85rem', 
                                            color: 'var(--foreground-muted)', 
                                            whiteSpace: 'nowrap', 
                                            overflow: 'hidden', 
                                            textOverflow: 'ellipsis',
                                            marginTop: '0.25rem'
                                        }}>
                                            {msg.message}
                                        </div>
                                    </div>
                                    <div className={styles.listCardActions}>
                                        <button 
                                            className={styles.iconBtn} 
                                            onClick={(e) => toggleReadStatus(msg, e)} 
                                            title={msg.isRead ? "Mark as Unread" : "Mark as Read"}
                                        >
                                            {msg.isRead ? <MailOpen size={16} /> : <Mail size={16} style={{ color: 'var(--primary)' }} />}
                                        </button>
                                        <button 
                                            className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                                            onClick={(e) => deleteMessage(msg.id, e)} 
                                            title="Delete Message"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
