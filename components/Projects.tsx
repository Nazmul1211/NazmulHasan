import styles from './Projects.module.css';
import SectionWrapper from './SectionWrapper';
import ProjectCard from './ProjectCard';

const projects = [
    // Featured Projects from Resume
    {
        title: 'TuitionPort',
        description: 'Full-stack marketplace connecting 1,000+ students and tutors with serverless architecture, reducing infrastructure costs by 60%.',
        tags: ['Next.js', 'Node.js', 'Neon', 'Cloudflare R2', 'Firebase'],
        link: 'https://tuitionport.com',
    },
    {
        title: 'Flowditor',
        description: 'AI automation platform integrating Tavily and Google AI Studio for content generation and WordPress publishing, reducing manual work by 85%.',
        tags: ['Next.js', 'Tavily API', 'Google AI Studio', 'Firebase'],
        link: 'https://flowditor.vercel.app',
    },
    {
        title: 'GPA Calculator',
        description: 'SEO-optimized SaaS platform serving 20,000+ monthly users with #1 Google ranking, monetized via AdSense and Mediavine.',
        tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
        link: 'https://gpacalculators.net',
    },
    {
        title: 'Volume Calculator',
        description: 'Multi-use educational tools website built with Next.js featuring various volume calculators for learning purposes.',
        tags: ['Next.js', 'TypeScript', 'SEO'],
        link: 'https://volumecalculator.co/',
    },
    {
        title: 'CheetahType',
        description: 'High-performance typing test with real-time WPM/accuracy tracking, Firebase leaderboards, and Chart.js analytics dashboard.',
        tags: ['Next.js', 'Firebase', 'Tailwind CSS', 'Chart.js'],
        link: 'https://cheetahtype.com',
    },
    {
        title: 'TextEditor.info',
        description: 'Feature-rich online text editor with formatting, export (TXT, PDF, DOCX), cloud sync, and PWA support serving 5,000+ users.',
        tags: ['React.js', 'Firebase', 'Tailwind CSS', 'PWA'],
        link: 'https://texteditor.info',
    },
    // Additional Projects
    {
        title: 'Brand Shop',
        description: 'Single-store eCommerce platform with product browsing, cart management, and user authentication.',
        tags: ['React.js', 'Tailwind CSS', 'DaisyUI', 'Express.js', 'MongoDB'],
        link: 'https://brand-shop-5e4ab.web.app/',
        github: 'https://github.com/Nazmul1211/brandshop-client',
    },
    {
        title: 'BD Turf',
        description: 'Turf Booking and Management Platform allowing users to browse, book, and manage turf reservations.',
        tags: ['React.js', 'Express.js', 'MongoDB Atlas'],
        link: 'https://bdturf.netlify.app/',
        github: 'https://github.com/Nazmul1211/Turf-Booking-System',
    },
    {
        title: 'PH Tube',
        description: 'Video platform clone built with pure vanilla technologies demonstrating core web fundamentals.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        link: 'https://tubular-caramel-adaca6.netlify.app/',
    },
    {
        title: 'Summer Sale',
        description: 'E-commerce promo site with dynamic coupon system. Use code SELL200 for discounts!',
        tags: ['JavaScript', 'Event Management'],
        link: 'https://jazzy-druid-539c43.netlify.app/',
    },
];

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
