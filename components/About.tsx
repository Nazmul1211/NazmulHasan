import styles from './About.module.css';
import SectionWrapper from './SectionWrapper';

const education = [
    {
        school: 'East Delta University',
        degree: 'B.Sc. in Computer Science & Engineering',
        details: 'CGPA: 3.10/4.00 • Chattogram, Bangladesh',
        date: 'Jan. 2022 – Dec. 2025'
    },
    {
        school: 'Chattogram Govt. Model School & College',
        degree: 'Higher Secondary Certificate (HSC)',
        details: 'GPA: 5.00/5.00 • Chattogram, Bangladesh',
        date: 'Jun. 2017 – May 2019'
    }
];

export default function About() {
    return (
        <SectionWrapper id="about" title="About Me">
            <div className={styles.container}>
                {/* About Text */}
                <div className={styles.aboutText}>
                    <p className={styles.paragraph}>
                        I am a passionate <span className={styles.highlight}>MERN Stack Developer</span> with a strong foundation in
                        computer science principles and modern web application development.
                    </p>
                    <p className={styles.paragraph}>
                        With expertise spanning the full stack—from crafting pixel-perfect React frontends to architecting
                        scalable Node.js backends—I specialize in building products that not only work flawlessly but also
                        delight users. My entrepreneurial journey has taught me to balance technical excellence with
                        business impact.
                    </p>
                    <p className={styles.paragraph}>
                        I&apos;ve built and scaled SaaS products from zero to <span className={styles.highlight}>25,000+ users</span>,
                        achieved <span className={styles.highlight}>#1 Google rankings</span>, and helped clients
                        reduce infrastructure costs by up to <span className={styles.highlight}>60%</span>.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <span className={styles.statValue}>15+</span>
                        <span className={styles.statLabel}>Production Apps</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statValue}>30k+</span>
                        <span className={styles.statLabel}>Monthly Users</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statValue}>90+</span>
                        <span className={styles.statLabel}>PageSpeed Score</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statValue}>60%</span>
                        <span className={styles.statLabel}>Cost Reduction</span>
                    </div>
                </div>

                {/* Education Section */}
                <div className={styles.educationSection}>
                    <h3 className={styles.educationTitle}>Education</h3>
                    <div className={styles.educationList}>
                        {education.map((edu, index) => (
                            <div key={index} className={styles.eduCard}>
                                <div className={styles.eduInfo}>
                                    <h4 className={styles.schoolName}>{edu.school}</h4>
                                    <p className={styles.degree}>{edu.degree}</p>
                                    <p className={styles.details}>{edu.details}</p>
                                </div>
                                <span className={styles.date}>{edu.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
