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
    SiVercel,
    SiCloudflare,
    SiGithub,
    SiX,
} from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import {
    LuLightbulb,
    LuCode,
    LuLayers,
    LuRocket,
    LuCpu,
    LuBox,
    LuUsers,
    LuChartBar,
    LuZap,
} from 'react-icons/lu';
import { FiMail, FiMapPin, FiArrowRight, FiDownload } from 'react-icons/fi';

const trustedTechnologies = [
    { name: 'Next.js', icon: SiNextdotjs, color: 'currentColor' },
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    { name: 'Prisma', icon: SiPrisma, color: 'currentColor' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'Vercel', icon: SiVercel, color: 'currentColor' },
    { name: 'Cloudflare', icon: SiCloudflare, color: '#F38020' },
];

const processSteps = [
    { icon: LuLightbulb, label: 'Ideas', color: '#8b5cf6' },
    { icon: LuCode, label: 'Code', color: '#6366f1' },
    { icon: LuLayers, label: 'Build', color: '#3b82f6' },
    { icon: LuRocket, label: 'Deploy', color: '#06b6d4' },
    { icon: LuCpu, label: 'Scale', color: '#10b981' },
];

export default function Hero({ data }: { data?: HeroData }) {
    const hero = data || defaultPortfolioData.hero;

    return (
        <section id="hero" className={styles.hero}>
            <div className={`container ${styles.container}`}>
                <div className={styles.mainGrid}>
                    {/* Left Column: Headline, Bio & CTAs */}
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
                            Computer Science graduate building production-ready web applications, SaaS products, and backend systems with real users. Passionate about solving real problems with clean code and modern technologies.
                        </p>

                        {/* Actions */}
                        <div className={styles.actions}>
                            <Button href="#projects" variant="primary">
                                <span>View My Work</span>
                                <FiArrowRight size={16} />
                            </Button>
                            <Button href={hero.resumeUrl} variant="outline" target="_blank" rel="noopener noreferrer" download>
                                <span>Download Resume</span>
                                <FiDownload size={15} className={styles.downloadArrow} />
                            </Button>
                        </div>

                        {/* Social Row with Real React Icons */}
                        <div className={styles.socials}>
                            <a href="https://github.com/nazmul1211" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                                <SiGithub size={18} />
                            </a>
                            <a href="https://www.linkedin.com/in/nazmulsajjad/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                                <FaLinkedin size={18} color="#0a66c2" />
                            </a>
                            <a href="mailto:nazmulhasansajjad@gmail.com" className={styles.socialLink} aria-label="Email">
                                <FiMail size={18} />
                            </a>
                            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter/X">
                                <SiX size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Portrait Card + Code Snippet + Process Rail */}
                    <div className={styles.visualContainer}>
                        <div className={styles.portraitComposition}>
                            {/* Sticker 1: Turn Ideas into Products with curved arrow */}
                            <div className={styles.stickerIdeasGroup}>
                                <div className={styles.stickerIdeas}>
                                    <span>Turn Ideas Into Products</span>
                                </div>
                                <svg className={styles.curvedArrow} width="36" height="36" viewBox="0 0 36 36" fill="none">
                                    <path d="M6 6 C 18 10, 24 18, 28 26 M 22 25 L 29 27 L 29 20" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            {/* Main Portrait Card */}
                            <div className={styles.portraitCard}>
                                <Image
                                    src="/nazmulHasan.jpg"
                                    alt="Nazmul Hasan"
                                    width={320}
                                    height={320}
                                    className={styles.portraitImg}
                                    priority
                                />
                            </div>

                            {/* Floating Note: Clean Code, Better Products, Happier Users */}
                            <div className={styles.cleanCodeNote}>
                                <span>Clean Code</span>
                                <span>Better Products</span>
                                <span>Happier Users</span>
                            </div>

                            {/* Floating Terminal Code Card */}
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
                                    <div>&nbsp;&nbsp;<span className={styles.cProp}>focus</span>: [<span className={styles.cStr}>&quot;Backend&quot;</span>, <span className={styles.cStr}>&quot;Full-Stack&quot;</span>, <span className={styles.cStr}>&quot;SaaS&quot;</span>],</div>
                                    <div>&nbsp;&nbsp;<span className={styles.cProp}>location</span>: <span className={styles.cStr}>&quot;Bangladesh&quot;</span>,</div>
                                    <div>&nbsp;&nbsp;<span className={styles.cProp}>status</span>: <span className={styles.cStr}>&quot;Open to Opportunities&quot;</span>,</div>
                                    <div>&nbsp;&nbsp;<span className={styles.cProp}>goal</span>: <span className={styles.cStr}>&quot;Build meaningful products&quot;</span></div>
                                    <div>&#125;;</div>
                                </div>
                            </div>
                        </div>

                        {/* Vertical Process Rail with React Icons */}
                        <div className={styles.processRail}>
                            {processSteps.map((step, idx) => {
                                const StepIcon = step.icon;
                                return (
                                    <div key={idx} className={styles.processItem}>
                                        <span className={styles.processIconBox} style={{ color: step.color }}>
                                            <StepIcon size={17} />
                                        </span>
                                        <span className={styles.processLabel}>{step.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Horizontal Metrics Bar with Real React Icons */}
                <div className={styles.statsBar}>
                    <div className={styles.statItem}>
                        <div className={`${styles.statIconBox} ${styles.statBoxPurple}`}>
                            <LuBox size={22} />
                        </div>
                        <div className={styles.statText}>
                            <span className={styles.statNumber}>10+</span>
                            <span className={styles.statLabel}>Projects Built</span>
                        </div>
                    </div>

                    <div className={styles.statDivider} />

                    <div className={styles.statItem}>
                        <div className={`${styles.statIconBox} ${styles.statBoxBlue}`}>
                            <LuUsers size={22} />
                        </div>
                        <div className={styles.statText}>
                            <span className={styles.statNumber}>30K+</span>
                            <span className={styles.statLabel}>Monthly Visitors</span>
                        </div>
                    </div>

                    <div className={styles.statDivider} />

                    <div className={styles.statItem}>
                        <div className={`${styles.statIconBox} ${styles.statBoxCyan}`}>
                            <LuChartBar size={22} />
                        </div>
                        <div className={styles.statText}>
                            <span className={styles.statNumber}>100K+</span>
                            <span className={styles.statLabel}>Monthly Pageviews</span>
                        </div>
                    </div>

                    <div className={styles.statDivider} />

                    <div className={styles.statItem}>
                        <div className={`${styles.statIconBox} ${styles.statBoxIndigo}`}>
                            <LuZap size={22} />
                        </div>
                        <div className={styles.statText}>
                            <span className={styles.statNumber}>60%</span>
                            <span className={styles.statLabel}>Cost Reduction</span>
                        </div>
                    </div>
                </div>

                {/* Trusted Technologies Strip with Real React Icons */}
                <div className={styles.trustedStrip}>
                    <span className={styles.trustedLabel}>TRUSTED TECHNOLOGIES</span>
                    <div className={styles.trustedDivider} />
                    <div className={styles.trustedLogos}>
                        {trustedTechnologies.map((tech, i) => {
                            const TechIcon = tech.icon;
                            return (
                                <span key={i} className={styles.trustedTechBadge}>
                                    <span className={styles.trustedTechIcon} style={{ color: tech.color }}>
                                        <TechIcon size={16} />
                                    </span>
                                    <span className={styles.trustedTechName}>{tech.name}</span>
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
