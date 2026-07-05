import styles from './Education.module.css';
import SectionWrapper from './SectionWrapper';
import { defaultPortfolioData, EducationItem } from '@/data/portfolioData';

export default function Education({ data }: { data?: EducationItem[] }) {
    const educationList = data || defaultPortfolioData.education;

    return (
        <SectionWrapper id="education" title="Education">
            <div className={styles.educationSection}>
                {educationList.map((edu, index) => (
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
