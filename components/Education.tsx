import styles from './Education.module.css';
import SectionWrapper from './SectionWrapper';
import { defaultPortfolioData, EducationItem } from '@/data/portfolioData';
import { LuGraduationCap, LuLayers } from 'react-icons/lu';

const cseCoursework = [
    'Data Structures & Algorithms',
    'Database Systems',
    'OOP',
    'Operating Systems',
    'Computer Networks',
    'Software Engineering',
];

export default function Education({ data }: { data?: EducationItem[] }) {
    const educationList = data || defaultPortfolioData.education;
    const primaryEdu = educationList[0];

    return (
        <SectionWrapper
            id="education"
            kicker="Education"
            title="Academic Background"
            subtitle="Formal education that built my foundation."
        >
            <div className={styles.splitGrid}>
                {/* Left Card: Degree & University */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.iconBox}>
                            <LuGraduationCap size={22} color="#6366f1" />
                        </div>
                        <span className={styles.dateBadge}>{primaryEdu.date}</span>
                    </div>

                    <div className={styles.cardBody}>
                        <h3 className={styles.degreeTitle}>{primaryEdu.degree}</h3>
                        <div className={styles.schoolName}>{primaryEdu.school}</div>
                        <div className={styles.details}>{primaryEdu.details}</div>
                    </div>
                </div>

                {/* Right Card: Relevant Coursework */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.iconBox}>
                            <LuLayers size={22} color="#8b5cf6" />
                        </div>
                        <span className={styles.courseworkHeaderLabel}>Relevant Coursework</span>
                    </div>

                    <div className={styles.cardBody}>
                        <h3 className={styles.degreeTitle}>Core Knowledge</h3>
                        <div className={styles.courseworkPills}>
                            {cseCoursework.map((course, idx) => (
                                <span key={idx} className={styles.coursePill}>
                                    {course}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
