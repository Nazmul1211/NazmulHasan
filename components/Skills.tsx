'use client';

import { useState } from 'react';
import styles from './Skills.module.css';
import SectionWrapper from './SectionWrapper';
import { SkillCategory } from '@/data/portfolioData';
import {
    SiNextdotjs,
    SiReact,
    SiTypescript,
    SiNodedotjs,
    SiExpress,
    SiPostgresql,
    SiPrisma,
    SiMongodb,
    SiRedis,
    SiTailwindcss,
    SiHtml5,
    SiJavascript,
    SiPython,
    SiCplusplus,
    SiDocker,
    SiVercel,
    SiCloudflare,
    SiGit,
    SiGithub,
    SiFigma,
    SiLinux,
} from 'react-icons/si';

interface TechItem {
    name: string;
    category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Languages' | 'Others';
    icon: React.ComponentType<{ size?: number; color?: string; className?: string }>;
    color: string;
}

const allTechCatalog: TechItem[] = [
    { name: 'Next.js', category: 'Frontend', icon: SiNextdotjs, color: 'currentColor' },
    { name: 'React', category: 'Frontend', icon: SiReact, color: '#61DAFB' },
    { name: 'TypeScript', category: 'Languages', icon: SiTypescript, color: '#3178C6' },
    { name: 'Node.js', category: 'Backend', icon: SiNodedotjs, color: '#5FA04E' },
    { name: 'Express.js', category: 'Backend', icon: SiExpress, color: 'currentColor' },
    { name: 'PostgreSQL', category: 'Database', icon: SiPostgresql, color: '#4169E1' },
    { name: 'Prisma', category: 'Database', icon: SiPrisma, color: 'currentColor' },
    { name: 'MongoDB', category: 'Database', icon: SiMongodb, color: '#47A248' },
    { name: 'Redis', category: 'Database', icon: SiRedis, color: '#DC382D' },
    { name: 'Tailwind CSS', category: 'Frontend', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'HTML/CSS', category: 'Frontend', icon: SiHtml5, color: '#E34F26' },
    { name: 'JavaScript', category: 'Languages', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'Python', category: 'Languages', icon: SiPython, color: '#3776AB' },
    { name: 'C++', category: 'Languages', icon: SiCplusplus, color: '#00599C' },
    { name: 'Docker', category: 'DevOps', icon: SiDocker, color: '#2496ED' },
    { name: 'Vercel', category: 'DevOps', icon: SiVercel, color: 'currentColor' },
    { name: 'Cloudflare', category: 'DevOps', icon: SiCloudflare, color: '#F38020' },
    { name: 'Git', category: 'DevOps', icon: SiGit, color: '#F05032' },
    { name: 'GitHub', category: 'Others', icon: SiGithub, color: 'currentColor' },
    { name: 'Figma', category: 'Others', icon: SiFigma, color: '#F24E1E' },
    { name: 'Linux', category: 'DevOps', icon: SiLinux, color: '#FCC624' },
];

export default function Skills({ data }: { data?: SkillCategory[] }) {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const filterTabs = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Languages', 'Others'];

    const filteredTech = selectedCategory === 'All'
        ? allTechCatalog
        : allTechCatalog.filter((t) => {
            if (selectedCategory === 'Database') {
                return t.category === 'Database' || t.name === 'PostgreSQL' || t.name === 'Prisma' || t.name === 'MongoDB' || t.name === 'Redis';
            }
            if (selectedCategory === 'Backend') {
                return t.category === 'Backend' || t.category === 'Database';
            }
            return t.category === selectedCategory;
        });

    return (
        <SectionWrapper
            id="skills"
            kicker="Technical Skills"
            title="Tools & Technologies"
            subtitle="The technologies I work with to build modern web applications."
        >
            {/* Category Filter Tabs at Top Right */}
            <div className={styles.filterBar}>
                <div className={styles.tabPills} role="tablist">
                    {filterTabs.map((tab) => (
                        <button
                            key={tab}
                            role="tab"
                            aria-selected={selectedCategory === tab}
                            className={`${styles.tabBtn} ${selectedCategory === tab ? styles.tabBtnActive : ''}`}
                            onClick={() => setSelectedCategory(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Compact Tech Grid with Real Larger Icons */}
            <div className={styles.techGrid}>
                {filteredTech.map((tech) => {
                    const IconComponent = tech.icon;
                    return (
                        <div key={tech.name} className={styles.techCard}>
                            <div className={styles.iconContainer} style={{ color: tech.color }}>
                                <IconComponent size={26} className={styles.techIcon} />
                            </div>
                            <span className={styles.techName}>{tech.name}</span>
                        </div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
}
