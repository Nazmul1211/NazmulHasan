'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContext}`}>
                <Link href="/" className={styles.logo}>
                    <span className="text-gradient">NH</span>
                </Link>

                {/* Desktop Links */}
                <div className={styles.navRight}>
                    <div className={styles.links}>
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className={styles.link}>
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
                        className={styles.mobileLink}
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
