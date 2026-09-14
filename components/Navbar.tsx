'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import { FiMail } from 'react-icons/fi';

const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    useEffect(() => {
        const handleScroll = () => {
            // Scroll progress
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
            setScrollProgress(progress);
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const sectionIds = navLinks.map((l) => l.href.slice(1));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <nav className={`${styles.navbar} ${isScrolled || isOpen ? styles.scrolled : ''}`}>
            {/* Scroll Progress Bar */}
            <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className={`container ${styles.navContext}`}>
                <div className={styles.logoGroup}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoBracket}>&lt;</span>
                        <span className="text-gradient">nh.dev</span>
                        <span className={styles.logoBracket}>&nbsp;/&gt;</span>
                    </Link>
                    <span className={styles.headerArrow}>&gt;</span>
                </div>

                {/* Desktop Links */}
                <div className={styles.navRight}>
                    <div className={styles.links}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`${styles.link} ${activeSection === link.href.slice(1) ? styles.activeLink : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className={styles.navSocials}>
                        <a
                            href="https://github.com/nazmul1211"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.navSocialBtn}
                            aria-label="GitHub"
                        >
                            <SiGithub size={16} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/nazmulsajjad/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.navSocialBtn}
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin size={16} />
                        </a>
                        <a
                            href="mailto:nazmulhasansajjad@gmail.com"
                            className={styles.navSocialBtn}
                            aria-label="Email"
                        >
                            <FiMail size={16} />
                        </a>
                    </div>

                    <ThemeToggle />

                    <a
                        href="/Nazmul_Hasan_FullStack_Developer_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cvButton}
                        download
                    >
                        <span>Resume</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={styles.menuButton}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                >
                    <span className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}>
                <div className={styles.mobileLinksContainer}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`${styles.mobileLink} ${activeSection === link.href.slice(1) ? styles.activeMobileLink : ''}`}
                            onClick={closeMenu}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className={styles.mobileDivider} />

                <div className={styles.mobileSocials}>
                    <a
                        href="https://github.com/nazmul1211"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.mobileSocialBtn}
                        aria-label="GitHub"
                    >
                        <SiGithub size={17} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/nazmulsajjad/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.mobileSocialBtn}
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin size={17} />
                    </a>
                    <a
                        href="mailto:nazmulhasansajjad@gmail.com"
                        className={styles.mobileSocialBtn}
                        aria-label="Email"
                    >
                        <FiMail size={17} />
                    </a>
                </div>

                <a
                    href="/Nazmul_Hasan_FullStack_Developer_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mobileCvButton}
                    download
                    onClick={closeMenu}
                >
                    <span>Download Resume</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                </a>
                <div className={styles.mobileTheme}>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
