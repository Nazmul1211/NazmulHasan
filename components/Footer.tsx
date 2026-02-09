import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.glowOrb}></div>
            <div className={`container ${styles.content}`}>
                <div className={styles.brand}>
                    <Link href="/" className={styles.logo}>
                        <span className="text-gradient">Nazmul Hasan</span>
                    </Link>
                    <p className={styles.tagline}>Building digital experiences that matter.</p>
                </div>

                <div className={styles.links}>
                    <div className={styles.linkGroup}>
                        <h4 className={styles.linkTitle}>Navigate</h4>
                        <Link href="#about" className={styles.link}>About</Link>
                        <Link href="#skills" className={styles.link}>Skills</Link>
                        <Link href="#projects" className={styles.link}>Projects</Link>
                        <Link href="#contact" className={styles.link}>Contact</Link>
                    </div>
                    <div className={styles.linkGroup}>
                        <h4 className={styles.linkTitle}>Connect</h4>
                        <a href="https://github.com/Nazmul1211" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
                        <a href="https://www.linkedin.com/in/mn-hasan/" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
                        <a href="mailto:mnhs1211@gmail.com" className={styles.link}>Email</a>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copy}>
                        &copy; {currentYear} Nazmul Hasan. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
