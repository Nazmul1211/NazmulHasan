import styles from './Experience.module.css';
import SectionWrapper from './SectionWrapper';
import { defaultPortfolioData } from '@/data/portfolioData';

const { experience } = defaultPortfolioData;

export default function Experience() {
    return (
        <SectionWrapper id="experience" title="Work Experience">
            <div className={styles.timeline}>
                {experience.map((exp, index) => (
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
