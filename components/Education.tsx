import styles from './Education.module.css';
import SectionWrapper from './SectionWrapper';
import { defaultPortfolioData } from '@/data/portfolioData';

const { education } = defaultPortfolioData;

export default function Education() {
    return (
        <SectionWrapper id="education" title="Education">
            <div className={styles.educationSection}>
                {education.map((edu, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.schoolInfo}>
                            <h3 className={styles.schoolName}>{edu.school}</h3>
                            <div className={styles.degree}>{edu.degree}</div>
                            <div className={styles.details}>{edu.details}</div>
                        </div>
                        <div className={styles.date}>{edu.date}</div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
