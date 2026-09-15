import styles from './Education.module.css';
import SectionWrapper from './SectionWrapper';
import { defaultPortfolioData, EducationItem } from '@/data/portfolioData';
import { LuGraduationCap, LuLayers, LuSparkles } from 'react-icons/lu';

const systemsCoursework = [
    'Data Structures & Algorithms',
    'Operating Systems',
    'Computer Networks',
];

const engineeringCoursework = [
    'Database Systems (RDBMS)',
    'Object-Oriented Programming (OOP)',
    'Software Architecture & SDLC',
];

export default function Education({ data }: { data?: EducationItem[] }) {
    const educationList = data || defaultPortfolioData.education;
    const primaryEdu = educationList[0];

    return (
        <SectionWrapper
            id="education"
            kicker="Education"
            title="Academic Background"
            subtitle="Computer Science foundations underpinning real-world software engineering."
        >
            <div className={styles.splitGrid}>
                {/* Left Card: Degree, Institution & Capstone Emphasis */}
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

                        <div className={styles.focusBlock}>
                            <div className={styles.focusHeader}>
                                <LuSparkles size={14} className={styles.focusIcon} />
                                <span className={styles.focusLabel}>Core Engineering Focus</span>
                            </div>
                            <p className={styles.focusText}>
                                Grounded in algorithm analysis, normalized relational database design, concurrency, and scalable software systems.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Card: Structured Curriculum Categories */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.iconBox}>
                            <LuLayers size={22} color="#8b5cf6" />
                        </div>
                        <span className={styles.courseworkHeaderLabel}>Curriculum Breakdown</span>
                    </div>

                    <div className={styles.cardBody}>
                        <div className={styles.courseGroup}>
                            <span className={styles.groupTitle}>Systems & Theory</span>
                            <div className={styles.courseworkPills}>
                                {systemsCoursework.map((course, idx) => (
                                    <span key={idx} className={styles.coursePill}>
                                        {course}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className={styles.courseGroup}>
                            <span className={styles.groupTitle}>Software & Architecture</span>
                            <div className={styles.courseworkPills}>
                                {engineeringCoursework.map((course, idx) => (
                                    <span key={idx} className={styles.coursePill}>
                                        {course}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
