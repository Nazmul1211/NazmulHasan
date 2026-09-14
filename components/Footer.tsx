'use client';

import Link from 'next/link';
import styles from './Footer.module.css';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import { FiMail, FiArrowUp } from 'react-icons/fi';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                {/* Top Row: Brand & Tagline, Navigation Links, Socials & Back to Top */}
                <div className={styles.topRow}>
                    <div className={styles.brandCol}>
                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoBracket}>&lt;</span>
                            <span className={styles.logoText}>nh.dev</span>
                            <span className={styles.logoBracket}>&nbsp;/&gt;</span>
                        </Link>
                        <span className={styles.taglineDivider}>&gt;</span>
                        <span className={styles.tagline}>Building products for a better tomorrow.</span>
                    </div>

                    <div className={styles.navRow}>
                        <Link href="#hero" className={styles.navLink}>Home</Link>
                        <Link href="#about" className={styles.navLink}>About</Link>
                        <Link href="#projects" className={styles.navLink}>Projects</Link>
                        <Link href="#experience" className={styles.navLink}>Experience</Link>
                        <Link href="#skills" className={styles.navLink}>Skills</Link>
                        <Link href="#education" className={styles.navLink}>Education</Link>
                        <Link href="#blog" className={styles.navLink}>Blog</Link>
                        <Link href="#contact" className={styles.navLink}>Contact</Link>
                    </div>

                    <div className={styles.actionCol}>
                        <a
                            href="https://github.com/nazmul1211"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialBtn}
                            aria-label="GitHub"
                        >
                            <SiGithub size={17} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/nazmulsajjad/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialBtn}
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin size={17} />
                        </a>
                        <a
                            href="mailto:nazmulhasansajjad@gmail.com"
                            className={styles.socialBtn}
                            aria-label="Email"
                        >
                            <FiMail size={17} />
                        </a>
                        <button
                            onClick={scrollToTop}
                            className={styles.backToTopBtn}
                            aria-label="Back to top"
                        >
                            <FiArrowUp size={16} />
                        </button>
                    </div>
                </div>

                {/* Bottom Row: Copyright */}
                <div className={styles.bottomRow}>
                    <p className={styles.copy}>
                        &copy; {currentYear} Nazmul Hasan. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
