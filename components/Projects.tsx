import styles from './Projects.module.css';
import SectionWrapper from './SectionWrapper';
import ProjectCard from './ProjectCard';
import { defaultPortfolioData, Project } from '@/data/portfolioData';

export default function Projects({ data }: { data?: Project[] }) {
    const projectsList = (data || defaultPortfolioData.projects).filter(p => p.published !== false);

    return (
        <SectionWrapper id="projects" title="Featured Projects">
            <div className={styles.grid}>
                {projectsList.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </SectionWrapper>
    );
}
