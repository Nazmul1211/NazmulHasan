import styles from './Education.module.css';
import SectionWrapper from './SectionWrapper';

export default function Education() {
    return (
        <SectionWrapper id="education" title="Education">
            <div className={styles.educationSection}>
                <div className={styles.card}>
                    <div className={styles.schoolInfo}>
                        <h3 className={styles.schoolName}>East Delta University</h3>
                        <div className={styles.degree}>Bachelor of Science in Computer Science and Engineering</div>
                        <div className={styles.details}>
                            CGPA: 3.10/4.0 • Chattogram, Bangladesh
                        </div>
                    </div>
                    <div className={styles.date}>Jan. 2022 – Dec. 2025</div>
                </div>

                <div className={styles.card}>
                    <div className={styles.schoolInfo}>
                        <h3 className={styles.schoolName}>Chattogram Govt. Model School & College</h3>
                        <div className={styles.degree}>Higher Secondary Certificate (HSC)</div>
                        <div className={styles.details}>
                            GPA: 5.00/5.00 • Chattogram, Bangladesh
                        </div>
                    </div>
                    <div className={styles.date}>Jun. 2017 – May 2019</div>
                </div>
            </div>
        </SectionWrapper>
    );
}
