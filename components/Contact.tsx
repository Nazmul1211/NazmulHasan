'use client';

import { useState, useRef } from 'react';
import styles from './Contact.module.css';
import SectionWrapper from './SectionWrapper';
import { ContactData, defaultPortfolioData } from '@/data/portfolioData';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import { FiMail, FiSend, FiDownload, FiArrowRight, FiPhone } from 'react-icons/fi';

export default function Contact({ data }: { data?: ContactData }) {
    const contact = data || defaultPortfolioData.contact;
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [showForm, setShowForm] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });
    const formRef = useRef<HTMLDivElement>(null);

    const toggleForm = () => {
        setShowForm((prev) => !prev);
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const nameInput = formRef.current.querySelector('input[name="name"]') as HTMLInputElement;
                if (nameInput) nameInput.focus();
            }
        }, 100);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: `Portfolio Contact from ${formData.name}`,
                    message: formData.message,
                }),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setToast({
                    message: 'Message Sent Successfully! Nazmul will get back to you shortly.',
                    type: 'success',
                });
            } else {
                setStatus('error');
                setToast({
                    message: 'Failed to send message. Please email directly.',
                    type: 'error',
                });
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
            setToast({
                message: 'Connection error. Please check your network or email directly.',
                type: 'error',
            });
        }

        setTimeout(() => setStatus('idle'), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <SectionWrapper id="contact">
            <div className={styles.container}>

                {/* Banner Card matching Image 1 accurately */}
                <div className={styles.banner}>
                    {/* Background star dots */}
                    <div className={styles.starsBg} />

                    {/* Left Column: Headline, Bio & CTAs */}
                    <div className={styles.bannerLeft}>
                        <div className={styles.bannerKicker}>
                            <span>LET&apos;S CONNECT</span>
                        </div>
                        <h3 className={styles.bannerTitle}>
                            Let&apos;s build something amazing together.
                        </h3>
                        <p className={styles.bannerText}>
                            I&apos;m open to software engineering opportunities, technical collaborations, or just a friendly chat about technology.
                        </p>

                        <div className={styles.bannerCtas}>
                            <button
                                type="button"
                                className={styles.primaryCta}
                                onClick={toggleForm}
                            >
                                <FiSend size={15} />
                                <span>Send a Message</span>
                                <FiArrowRight size={14} />
                            </button>

                            <a
                                href="/Nazmul_Hasan_FullStack_Developer_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className={styles.secondaryCta}
                            >
                                <span>Download Resume</span>
                                <FiDownload size={15} />
                            </a>
                        </div>
                    </div>

                    {/* Middle Column: 4 Stacked Contact Channels */}
                    <div className={styles.bannerChannels}>
                        <a href={`mailto:${contact.email}`} className={styles.channelRow}>
                            <div className={styles.channelIconPurple}>
                                <FiMail size={16} />
                            </div>
                            <span className={styles.channelText}>{contact.email}</span>
                        </a>

                        <a
                            href={contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.channelRow}
                        >
                            <div className={styles.channelIconBlue}>
                                <FaLinkedin size={15} />
                            </div>
                            <span className={styles.channelText}>linkedin.com/in/nazmulsajjad</span>
                        </a>

                        <a
                            href={contact.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.channelRow}
                        >
                            <div className={styles.channelIconDark}>
                                <SiGithub size={16} />
                            </div>
                            <span className={styles.channelText}>github.com/nazmul1211</span>
                        </a>

                        <a
                            href={`tel:${contact.phone || '+8801867421211'}`}
                            className={styles.channelRow}
                        >
                            <div className={styles.channelIconGreen}>
                                <FiPhone size={15} />
                            </div>
                            <span className={styles.channelText}>
                                {contact.phone === '+8801867421211' ? '+880 1867-421211' : (contact.phone || '+880 1867-421211')}
                            </span>
                        </a>
                    </div>

                    {/* Right Column: Partial Luminous Rising Earth & Handwritten Callout */}
                    <div className={styles.bannerRight}>
                        <div className={styles.scriptCallout}>
                            <div className={styles.scriptText}>
                                <span>Open to</span>
                                <span>new opportunities</span>
                                <span>worldwide!</span>
                            </div>
                            <svg className={styles.scriptArrow} width="40" height="42" viewBox="0 0 40 42" fill="none">
                                <path
                                    d="M10 6 C 24 16, 28 26, 18 36 M 13 31 L 18 37 L 24 32"
                                    stroke="#93c5fd"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        {/* Partial Glowing Earth Globe */}
                        <div className={styles.earthContainer}>
                            <div className={styles.earthAtmosphereGlow} />
                            <div className={styles.earthSphere}>
                                <svg className={styles.earthSvg} viewBox="0 0 240 240" fill="none">
                                    <defs>
                                        <radialGradient id="earthGrad" cx="30%" cy="30%" r="70%">
                                            <stop offset="0%" stopColor="#38bdf8" />
                                            <stop offset="45%" stopColor="#1d4ed8" />
                                            <stop offset="80%" stopColor="#0f172a" />
                                            <stop offset="100%" stopColor="#020617" />
                                        </radialGradient>
                                    </defs>
                                    <circle cx="120" cy="120" r="110" fill="url(#earthGrad)" />
                                    {/* Grids */}
                                    <ellipse cx="120" cy="120" rx="110" ry="35" stroke="rgba(147, 197, 253, 0.35)" strokeWidth="1" strokeDasharray="3 3" />
                                    <ellipse cx="120" cy="120" rx="110" ry="75" stroke="rgba(147, 197, 253, 0.45)" strokeWidth="1" />
                                    <ellipse cx="120" cy="120" rx="35" ry="110" stroke="rgba(147, 197, 253, 0.35)" strokeWidth="1" strokeDasharray="3 3" />
                                    <ellipse cx="120" cy="120" rx="75" ry="110" stroke="rgba(147, 197, 253, 0.4)" strokeWidth="1" />
                                    <line x1="120" y1="10" x2="120" y2="230" stroke="rgba(147, 197, 253, 0.5)" strokeWidth="1.2" />
                                    <line x1="10" y1="120" x2="230" y2="120" stroke="rgba(147, 197, 253, 0.5)" strokeWidth="1.2" />

                                    {/* Continents & Bangladesh location */}
                                    <path d="M100 80 Q125 70 135 90 Q145 110 125 130 Q105 125 100 80 Z" fill="rgba(56, 189, 248, 0.35)" />
                                    <path d="M145 95 Q165 90 160 115 Q150 130 140 115 Z" fill="rgba(56, 189, 248, 0.28)" />
                                    <circle cx="138" cy="100" r="4" fill="#10b981" />
                                    <circle cx="138" cy="100" r="10" stroke="#10b981" strokeWidth="1.5" opacity="0.7">
                                        <animate attributeName="r" values="4;14" dur="2s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="120" cy="120" r="110" stroke="rgba(147, 197, 253, 0.65)" strokeWidth="1.5" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive Direct Message Form (Expandable) */}
                {showForm && (
                    <div className={styles.formSection} ref={formRef}>
                        <div className={styles.formCard}>
                            <div className={styles.formHeader}>
                                <div className={styles.formBadge}>DIRECT MESSAGE</div>
                                <h4 className={styles.formTitle}>Send a Quick Message</h4>
                                <p className={styles.formSubtitle}>
                                    Responses typically within 24 hours. Your message will be securely delivered.
                                </p>
                            </div>

                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name" className={styles.label}>
                                            Your Name <span className={styles.req}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className={styles.input}
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Alex Mercer"
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="email" className={styles.label}>
                                            Email Address <span className={styles.req}>*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className={styles.input}
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="alex@company.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="message" className={styles.label}>
                                        Message <span className={styles.req}>*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className={styles.textarea}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell me about your team, product idea, or project..."
                                        rows={4}
                                        required
                                    />
                                </div>

                                <div className={styles.formSubmitRow}>
                                    <button
                                        type="submit"
                                        className={styles.submitButton}
                                        disabled={status === 'sending'}
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <span className={styles.spinner} />
                                                <span>Sending message...</span>
                                            </>
                                        ) : (
                                            <>
                                                <FiSend size={15} />
                                                <span>Send Message</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>

            {/* Toast Notification */}
            {toast.type && (
                <div className={`${styles.toast} ${styles[toast.type]}`}>
                    <div className={styles.toastMessage}>{toast.message}</div>
                    <button className={styles.toastClose} onClick={() => setToast({ message: '', type: null })}>
                        ✕
                    </button>
                </div>
            )}
        </SectionWrapper>
    );
}
