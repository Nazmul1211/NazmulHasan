import Image from 'next/image';
import styles from './Hero.module.css';
import Button from './Button';
import { HeroData, defaultPortfolioData } from '@/data/portfolioData';
import {
    SiNextdotjs,
    SiReact,
    SiNodedotjs,
    SiTypescript,
    SiPostgresql,
    SiPrisma,
    SiMongodb,
    SiDocker,
} from 'react-icons/si';
import {
    LuBox,
    LuUsers,
    LuChartBar,
    LuZap,
} from 'react-icons/lu';
import { FiMapPin, FiArrowRight, FiDownload, FiChevronDown } from 'react-icons/fi';

// Curated 8 core technologies — focused and professional without overflowing
const coreTechnologies = [
    { name: 'Next.js', icon: SiNextdotjs, color: 'currentColor' },
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    { name: 'Prisma', icon: SiPrisma, color: 'currentColor' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
];

export default function Hero({ data }: { data?: HeroData }) {
    const hero = data || defaultPortfolioData.hero;

    return (
        <section id="hero" className={styles.hero}>
            <div className={`container ${styles.container}`}>
                <div className={styles.mainGrid}>
                    {/* Left Column: Headline, Bio & Primary CTAs */}
                    <div className={styles.textContent}>
                        {/* Dual Status Chips */}
                        <div className={styles.chipRow}>
                            <div className={styles.statusPill}>
                                <span className={styles.statusDot}>
                                    <span className={styles.statusDotPing}></span>
                                </span>
                                <span className={styles.statusText}>Open to Opportunities</span>
                            </div>

                            <div className={styles.locationPill}>
                                <FiMapPin size={13} className={styles.locationIcon} />
                                <span>Based in Bangladesh</span>
                            </div>
                        </div>

                        {/* Heading & Subtitle */}
                        <div className={styles.titleBlock}>
                            <span className={styles.greeting}>Hi, I&apos;m</span>
                            <h1 className={styles.name}>
                                Nazmul <span className={styles.nameAccent}>Hasan</span>
                            </h1>
                            <h2 className={styles.roleHeadline}>
                                Software Engineer <span className={styles.roleDivider}>•</span> Full-Stack Developer
                            </h2>
                        </div>

                        <p className={styles.description}>
                            {hero.description || "Software Engineer building production-ready web applications, SaaS products, and scalable backend systems used by real users. Passionate about system design, performant architectures, and delivering real business impact."}
                        </p>

                        {/* Clear CTA Distinction: Primary Action vs Quieter Secondary */}
                        <div className={styles.actions}>
                            <Button href="#projects" variant="primary">
                                <span>View My Work</span>
                                <FiArrowRight size={16} />
                            </Button>
                            <a
                                href={hero.resumeUrl}
                                className={styles.resumeBtn}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                            >
                                <span>Download Resume</span>
                                <FiDownload size={14} className={styles.downloadArrow} />
                            </a>
                        </div>
                    </div>

                    {/* Right Column: One Unified Visual Composition (Photo + Overlapping Code Window) */}
                    <div className={styles.visualContainer}>
                        <div className={styles.portraitComposition}>
                            {/* Subtle ambient glow behind portrait */}
                            <div className={styles.ambientGlow} aria-hidden="true" />

                            {/* Portrait Card (~5% more compact) */}
                            <div className={styles.portraitCard}>
                                <div className={styles.portraitImgWrapper}>
                                    <Image
                                        src="/nazmulHasan.jpg"
                                        alt="Nazmul Hasan"
                                        width={320}
                                        height={320}
                                        className={styles.portraitImg}
                                        priority
                                    />
                                    <div className={styles.portraitOverlay} aria-hidden="true" />
                                </div>
                            </div>

                            {/* Overlapping Engineering Easter Egg Code Window */}
                            <div className={styles.codeCard}>
                                <div className={styles.codeCardHeader}>
                                    <div className={styles.codeDots}>
                                        <span className={styles.dotRed} />
                                        <span className={styles.dotYellow} />
                                        <span className={styles.dotGreen} />
                                    </div>
                                    <span className={styles.codeFilePath}>/about/engineer.ts</span>
                                </div>
                                <div className={styles.codeCardBody}>
                                    <div><span className={styles.cKeyword}>const</span> <span className={styles.cVar}>nazmul</span> = &#123;</div>
                                    <div>&nbsp;&nbsp;<span className={styles.cProp}>role</span>: <span className={styles.cStr}>&quot;Software Engineer&quot;</span>,</div>
                                    <div>&nbsp;&nbsp;<span className={styles.cProp}>specializes</span>: [<span className={styles.cStr}>&quot;Backend&quot;</span>, <span className={styles.cStr}>&quot;Full-Stack&quot;</span>, <span className={styles.cStr}>&quot;SaaS&quot;</span>],</div>
                                    <div>&nbsp;&nbsp;<span className={styles.cProp}>builds</span>: <span className={styles.cStr}>&quot;Production-ready systems&quot;</span>,</div>
                                    <div>&nbsp;&nbsp;<span className={styles.cProp}>scale</span>: <span className={styles.cStr}>&quot;Real users, real products&quot;</span>,</div>
                                    <div>&nbsp;&nbsp;<span className={styles.cProp}>status</span>: <span className={styles.cStr}>&quot;Open to Opportunities&quot;</span></div>
                                    <div>&#125;;</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Evidence Metrics Bar with Subtle Hierarchy */}
                <div className={styles.statsBar}>
                    <div className={styles.statItem}>
                        <div className={`${styles.statIconBox} ${styles.statBoxPurple}`}>
                            <LuBox size={20} />
                        </div>
                        <div className={styles.statText}>
                            <span className={styles.statNumber}>10+</span>
                            <span className={styles.statLabel}>Projects Shipped</span>
                        </div>
                    </div>

                    <div className={styles.statDivider} />

                    <div className={styles.statItem}>
                        <div className={`${styles.statIconBox} ${styles.statBoxBlue}`}>
                            <LuUsers size={20} />
                        </div>
                        <div className={styles.statText}>
                            <span className={`${styles.statNumber} ${styles.statNumberScale}`}>30K+</span>
                            <span className={styles.statLabel}>Monthly Users</span>
                        </div>
                    </div>

                    <div className={styles.statDivider} />

                    <div className={styles.statItem}>
                        <div className={`${styles.statIconBox} ${styles.statBoxCyan}`}>
                            <LuChartBar size={20} />
                        </div>
                        <div className={styles.statText}>
                            <span className={`${styles.statNumber} ${styles.statNumberScale}`}>100K+</span>
                            <span className={styles.statLabel}>Monthly Pageviews</span>
                        </div>
                    </div>

                    <div className={styles.statDivider} />

                    <div className={styles.statItem}>
                        <div className={`${styles.statIconBox} ${styles.statBoxIndigo}`}>
                            <LuZap size={20} />
                        </div>
                        <div className={styles.statText}>
                            <span className={styles.statNumber}>60%</span>
                            <span className={styles.statLabel}>Cost Reduced</span>
                        </div>
                    </div>
                </div>

                {/* Curated 8-Technology Strip + More Badge */}
                <div className={styles.trustedStrip}>
                    <span className={styles.trustedLabel}>TRUSTED TECHNOLOGIES</span>
                    <div className={styles.trustedDivider} />
                    <div className={styles.trustedLogos}>
                        {coreTechnologies.map((tech, i) => {
                            const TechIcon = tech.icon;
                            return (
                                <span key={i} className={styles.trustedTechBadge}>
                                    <span className={styles.trustedTechIcon} style={{ color: tech.color }}>
                                        <TechIcon size={15} />
                                    </span>
                                    <span className={styles.trustedTechName}>{tech.name}</span>
                                </span>
                            );
                        })}
                        <a href="#skills" className={styles.moreTechBadge} title="Explore all technologies & skills">
                            + more
                        </a>
                    </div>
                </div>

                {/* Understated Scroll to Explore Cue */}
                <div className={styles.scrollCueContainer}>
                    <a href="#projects" className={styles.scrollCue} aria-label="Scroll to explore projects">
                        <span>Scroll to explore</span>
                        <FiChevronDown size={14} className={styles.scrollArrow} />
                    </a>
                </div>
            </div>
        </section>
    );
}
