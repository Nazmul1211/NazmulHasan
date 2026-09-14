import Link from 'next/link';
import styles from './About.module.css';
import SectionWrapper from './SectionWrapper';
import { AboutData, defaultPortfolioData } from '@/data/portfolioData';
import { LuLightbulb, LuCode, LuUsers, LuRocket } from 'react-icons/lu';
import { FiArrowRight } from 'react-icons/fi';

const aboutPillars = [
    {
        icon: LuLightbulb,
        color: '#8b5cf6',
        bg: 'rgba(139, 92, 246, 0.12)',
        title: 'Product Thinking',
        description: 'I enjoy turning ideas into real products that solve genuine problems.',
    },
    {
        icon: LuCode,
        color: '#6366f1',
        bg: 'rgba(99, 102, 241, 0.12)',
        title: 'Clean & Scalable Code',
        description: 'Write maintainable, testable and scalable applications.',
    },
    {
        icon: LuUsers,
        color: '#3b82f6',
        bg: 'rgba(59, 130, 246, 0.12)',
        title: 'User Focused',
        description: 'Build products that create real value for users.',
    },
    {
        icon: LuRocket,
        color: '#a855f7',
        bg: 'rgba(168, 85, 247, 0.12)',
        title: 'Continuous Learning',
        description: 'Always learning new technologies and improving every day.',
    },
];

export default function About({ data }: { data?: AboutData }) {
    const about = data || defaultPortfolioData.about;
    const cleanText = (str: string) => str.replace(/\*\*/g, '');
    const paragraphs = about.paragraphs?.map(cleanText) || [
        "I am a Computer Science graduate and Full-Stack Software Engineer with strong foundations in software architecture, database engineering, and modern web systems. Rather than staying confined to basic tutorial stacks, I learned by engineering, deploying, and operating real-world products from scratch.",
        "Over the past several years, I have developed and maintained 10+ production applications serving 30,000+ active users and handling over 100,000+ monthly visits. My engineering toolkit spans TypeScript, Next.js, Node.js, relational databases (PostgreSQL, Prisma), distributed caching, and cloud infrastructure.",
        "I bring rigorous CS fundamentals (algorithms, relational schema design, system architecture) coupled with proven end-to-end product delivery into a high-impact engineering team."
    ];

    return (
        <SectionWrapper
            id="about"
            kicker="About Me"
            title="More than just code"
            subtitle="Bridging Computer Science foundations with scalable full-stack product execution."
        >
            <div className={styles.splitGrid}>
                {/* Left Column: Story + Action */}
                <div className={styles.leftCol}>
                    <p className={styles.storyText}>{paragraphs[0]}</p>
                    {paragraphs[1] && (
                        <p className={styles.secondaryText}>{paragraphs[1]}</p>
                    )}
                    {paragraphs[2] && (
                        <p className={styles.secondaryText}>{paragraphs[2]}</p>
                    )}

                    <div className={styles.actionRow}>
                        <Link href="#contact" className={styles.knowMeBtn}>
                            <span>Get to Know Me</span>
                            <FiArrowRight size={15} />
                        </Link>
                    </div>
                </div>

                {/* Right Column: 2x2 Pillars Grid */}
                <div className={styles.rightCol}>
                    <div className={styles.pillarsGrid}>
                        {aboutPillars.map((item, idx) => {
                            const IconComp = item.icon;
                            return (
                                <div key={idx} className={styles.pillarCard}>
                                    <div className={styles.pillarIconBox} style={{ backgroundColor: item.bg, color: item.color }}>
                                        <IconComp size={22} />
                                    </div>
                                    <h4 className={styles.pillarTitle}>{item.title}</h4>
                                    <p className={styles.pillarDesc}>{item.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className={styles.accentNote}>
                        <span>Better Developers Build a Brighter Tomorrow</span>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
