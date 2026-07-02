import styles from './Projects.module.css';
import SectionWrapper from './SectionWrapper';
import ProjectCard from './ProjectCard';
import { defaultPortfolioData } from '@/data/portfolioData';

const { projects } = defaultPortfolioData;

export default function Projects() {
    return (
        <SectionWrapper id="projects" title="Featured Projects">
            <div className={styles.grid}>
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </SectionWrapper>
    );
}
