'use client';

import { useState } from 'react';
import styles from './Skills.module.css';
import SectionWrapper from './SectionWrapper';
import { defaultPortfolioData } from '@/data/portfolioData';

const { skills } = defaultPortfolioData;

export default function Skills() {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);

    return (
        <SectionWrapper id="skills" title="Technical Skills">
            <div className={styles.grid}>
                {skills.map((category, index) => (
                    <div
                        key={index}
                        className={`${styles.card} ${activeCategory === index ? styles.cardActive : ''}`}
                        onMouseEnter={() => setActiveCategory(index)}
                        onMouseLeave={() => setActiveCategory(null)}
                    >
                        <div className={styles.categoryHeader}>
                            <div className={styles.categoryDot} style={{ background: category.gradient }} />
                            <h3 className={styles.categoryTitle}>{category.title}</h3>
                        </div>
                        <div className={styles.skillList}>
                            {category.skills.map((skill, i) => (
                                <div key={i} className={styles.skillItem}>
                                    <div className={styles.skillMeta}>
                                        <span className={styles.skillName}>{skill.name}</span>
                                        <span className={styles.skillPercent}>{skill.proficiency}%</span>
                                    </div>
                                    <div className={styles.barTrack}>
                                        <div
                                            className={styles.barFill}
                                            style={{
                                                '--target': `${skill.proficiency}%`,
                                                background: category.gradient,
                                                animationDelay: `${i * 80}ms`,
                                            } as React.CSSProperties}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
