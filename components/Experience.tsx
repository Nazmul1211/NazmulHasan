import styles from './Experience.module.css';
import SectionWrapper from './SectionWrapper';

const experiences = [
    {
        role: 'Software Engineer & Entrepreneur',
        company: 'Self-Employed (Freelance & Product Development)',
        period: 'Aug. 2023 – Present',
        descriptions: [
            'Built and deployed 15+ production web applications using React, Next.js, Node.js, and TypeScript, serving 30,000+ monthly users.',
            'Developed client projects including TuitionPort marketplace using serverless architecture (Neon, Cloudflare R2, Firebase).',
            'Achieved 90+ PageSpeed scores and first-page Google rankings, generating 25,000+ monthly organic visitors.',
            'Monetized platforms via Google AdSense and Mediavine; managed WordPress websites with comprehensive content strategy.'
        ]
    }
];

export default function Experience() {
    return (
        <SectionWrapper id="experience" title="Work Experience">
            <div className={styles.timeline}>
                {experiences.map((exp, index) => (
                    <div key={index} className={styles.item}>
                        <div className={styles.card}>
                            <div className={styles.header}>
                                <div>
                                    <h3 className={styles.role}>{exp.role}</h3>
                                    <div className={styles.company}>{exp.company}</div>
                                </div>
                                <div className={styles.period}>{exp.period}</div>
                            </div>
                            <ul className={styles.description}>
                                {exp.descriptions.map((desc, i) => (
                                    <li key={i}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
