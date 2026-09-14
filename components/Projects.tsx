'use client';

import { useState } from 'react';
import styles from './Projects.module.css';
import SectionWrapper from './SectionWrapper';
import ProjectCard from './ProjectCard';
import { defaultPortfolioData, Project } from '@/data/portfolioData';

import { FiArrowRight, FiArrowUp } from 'react-icons/fi';

export default function Projects({ data }: { data?: Project[] }) {
    const projectsList = (data || defaultPortfolioData.projects).filter((p) => p.published !== false);
    const [showAll, setShowAll] = useState(false);

    // Top 3 flagship projects as the centerpiece
    const featuredProjects = projectsList.slice(0, 3);
    const displayedProjects = showAll ? projectsList : featuredProjects;

    return (
        <SectionWrapper
            id="projects"
            kicker="Featured Projects"
            title="Projects that create real impact"
            subtitle="A few of my recent projects used by thousands of people around the world."
        >
            <div className={styles.headerActionRow}>
                <button
                    className={styles.toggleAllBtn}
                    onClick={() => setShowAll(!showAll)}
                    aria-label={showAll ? 'Show fewer projects' : 'View all projects'}
                >
                    {showAll ? (
                        <>
                            <span>Show Featured Only</span>
                            <FiArrowUp size={14} />
                        </>
                    ) : (
                        <>
                            <span>View All Projects ({projectsList.length})</span>
                            <FiArrowRight size={14} />
                        </>
                    )}
                </button>
            </div>

            <div className={styles.grid}>
                {displayedProjects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </SectionWrapper>
    );
}
