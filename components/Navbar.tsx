'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
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
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            {/* Scroll Progress Bar */}
            <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className={`container ${styles.navContext}`}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoBracket}>&lt;</span>
                    <span className="text-gradient">nh.dev</span>
                    <span className={styles.logoBracket}>&nbsp;/&gt;</span>
                </Link>

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
                    <ThemeToggle />
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
                <div className={styles.mobileTheme}>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
