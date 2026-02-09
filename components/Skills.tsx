import styles from './Skills.module.css';
import SectionWrapper from './SectionWrapper';

const skillCategories = [
    {
        title: 'Core Stack (MERN)',
        skills: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose']
    },
    {
        title: 'Backend & RDBMS',
        skills: ['PostgreSQL', 'SQL', 'Redis (Caching)', 'Cron Jobs', 'Firebase', 'Supabase', 'Serverless']
    },
    {
        title: 'Frontend Ecosystem',
        skills: ['TypeScript', 'Tailwind CSS', 'Redux', 'Responsive Design', 'HTML5/CSS3']
    },
    {
        title: 'Languages',
        skills: ['JavaScript (ES6+)', 'Python', 'C++', 'Java']
    },
    {
        title: 'Tools & DevOps',
        skills: ['Git', 'Docker', 'GCP', 'Cloudflare R2', 'Vercel', 'CI/CD']
    }
];

export default function Skills() {
    return (
        <SectionWrapper id="skills" title="Technical Skills">
            <div className={styles.grid}>
                {skillCategories.map((category, index) => (
                    <div key={index} className={styles.card}>
                        <h3 className={styles.categoryTitle}>{category.title}</h3>
                        <div className={styles.skillList}>
                            {category.skills.map((skill, i) => (
                                <span key={i} className={styles.skillTag}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
