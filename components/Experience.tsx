import styles from './Experience.module.css';
import SectionWrapper from './SectionWrapper';
import { defaultPortfolioData, ExperienceItem } from '@/data/portfolioData';
import { LuBriefcase } from 'react-icons/lu';
import { SiWordpress } from 'react-icons/si';
import { FiArrowRight } from 'react-icons/fi';

export default function Experience({ data }: { data?: ExperienceItem[] }) {
    const experienceList = data || defaultPortfolioData.experience;

    return (
        <SectionWrapper
            id="experience"
            kicker="Experience"
            title="My Journey"
            subtitle="Turning ideas into real products, one step at a time."
        >
            <div className={styles.headerActionRow}>
                <a
                    href={defaultPortfolioData.hero.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.viewResumeBtn}
                    download
                >
                    <span>View Full Resume</span>
                    <FiArrowRight size={14} />
                </a>
            </div>

            <div className={styles.timelineContainer}>
                <div className={styles.spineLine} />
                <div className={styles.timelineList}>
                    {experienceList.map((exp, index) => {
                        const isWp = exp.role.toLowerCase().includes('wordpress');

                        return (
                            <div key={index} className={styles.timelineItem}>
                                <div className={styles.nodeWrapper}>
                                    <div className={styles.nodeGlow}>
                                        <div className={styles.nodeCore} />
                                    </div>
                                    <div className={styles.nodeConnector} />
                                </div>

                                <div className={styles.card}>
                                    <div className={styles.cardTop}>
                                        <div className={styles.roleHeader}>
                                            <div className={styles.iconBox}>
                                                {isWp ? (
                                                    <SiWordpress size={24} color="#21759B" />
                                                ) : (
                                                    <LuBriefcase size={22} color="#6366f1" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className={styles.roleTitle}>{exp.role}</h3>
                                                <div className={styles.companyTitle}>{exp.company}</div>
                                            </div>
                                        </div>

                                        <span className={styles.periodBadge}>{exp.period}</span>
                                    </div>

                                    <ul className={styles.bulletList}>
                                        {exp.descriptions.map((desc, dIdx) => (
                                            <li key={dIdx}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </SectionWrapper>
    );
}
