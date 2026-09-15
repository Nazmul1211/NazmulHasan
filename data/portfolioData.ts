// ============================================================
//  Central Portfolio Data — edit here or via /admin dashboard
// ============================================================

export interface Stat {
  value: string;
  label: string;
}

export interface Hobby {
  emoji: string;
  label: string;
}

export interface HeroData {
  name: string;
  roles: string[];
  description: string;
  resumeUrl: string;
  github: string;
  linkedin: string;
}

export interface AboutData {
  paragraphs: string[];
  stats: Stat[];
  hobbies: Hobby[];
}

export interface Skill {
  name: string;
  proficiency: number; // 0–100 (for DB backward-compat)
  level?: 'Core' | 'Advanced' | 'Proficient' | 'Working Knowledge' | 'Academic';
  tag?: string;
}

export interface SkillCategory {
  title: string;
  gradient: string; // CSS gradient string for bar color
  skills: Skill[];
}

export interface Project {
  slug: string;
  title: string;
  category?: string; // 'SaaS Platform' | 'Marketplace' | 'Web Application' | 'AI Platform'
  image?: string;
  description: string;
  fullDescription: string;
  techStack: string[];
  liveUrl: string;
  githubUrl?: string;
  challenges: string[];
  futurePlans: string[];
  featured: boolean;
  published: boolean;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  descriptions: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  details: string;
  date: string;
}

export interface ContactData {
  email: string;
  phone: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  contactText: string;
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  skills: SkillCategory[];
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
  contact: ContactData;
}

// ============================================================
//  DEFAULT DATA
// ============================================================

export const defaultPortfolioData: PortfolioData = {
  // ─── HERO ────────────────────────────────────────────────
  hero: {
    name: 'Nazmul Hasan',
    roles: ['Software Engineer', 'Full-Stack Developer'],
    description:
      'Software Engineer building production-ready web applications, SaaS products, and scalable backend systems used by real users. Passionate about system design, performant architectures, and delivering real business impact.',
    resumeUrl: '/Nazmul_Hasan_FullStack_Developer_Resume.pdf',
    github: 'https://github.com/nazmul1211',
    linkedin: 'https://www.linkedin.com/in/nazmulsajjad/',
  },

  // ─── ABOUT ───────────────────────────────────────────────
  about: {
    paragraphs: [
      "I am a Computer Science graduate and Full-Stack Software Engineer specializing in scalable architecture and database systems. Rather than basic tutorial stacks, I learned by engineering, deploying, and operating real-world products from scratch.",
      "I have developed and maintained 10+ production applications serving 30,000+ monthly visitors and handling 100,000+ monthly pageviews. My stack spans TypeScript, Next.js, Node.js, relational databases (PostgreSQL, Prisma), and cloud infrastructure.",
      "I bring rigorous CS fundamentals—algorithms, schema design, and system architecture—coupled with proven end-to-end product execution into high-impact teams.",
    ],
    stats: [
      { value: '10+', label: 'Projects Built' },
      { value: '30K+', label: 'Monthly Visitors' },
      { value: '100K+', label: 'Monthly Pageviews' },
      { value: '60%', label: 'Cost Reduction' },
    ],
    hobbies: [
      { emoji: '💡', label: 'Product Thinking' },
      { emoji: '⚡', label: 'Clean Architecture' },
      { emoji: '👥', label: 'User Centricity' },
      { emoji: '🚀', label: 'Continuous Learning' },
    ],
  },

  // ─── SKILLS ──────────────────────────────────────────────
  skills: [
    {
      title: 'Backend & Databases',
      gradient: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
      skills: [
        { name: 'Node.js', proficiency: 90, level: 'Core', tag: 'Runtime' },
        { name: 'Express.js', proficiency: 88, level: 'Core', tag: 'REST APIs' },
        { name: 'PostgreSQL', proficiency: 85, level: 'Proficient', tag: 'Relational' },
        { name: 'Prisma ORM', proficiency: 88, level: 'Proficient', tag: 'Data Modeling' },
        { name: 'MongoDB', proficiency: 84, level: 'Proficient', tag: 'NoSQL' },
        { name: 'Redis', proficiency: 75, level: 'Working Knowledge', tag: 'Caching' },
        { name: 'RESTful API Architecture', proficiency: 92, level: 'Core', tag: 'Architecture' },
      ],
    },
    {
      title: 'Languages',
      gradient: 'linear-gradient(90deg, #10b981, #06b6d4)',
      skills: [
        { name: 'TypeScript', proficiency: 92, level: 'Core', tag: 'Strict Typing' },
        { name: 'JavaScript (ES6+)', proficiency: 95, level: 'Core', tag: 'Full Stack' },
        { name: 'SQL', proficiency: 85, level: 'Proficient', tag: 'Queries & Joins' },
        { name: 'Python', proficiency: 75, level: 'Working Knowledge', tag: 'Scripting' },
        { name: 'C++', proficiency: 70, level: 'Academic', tag: 'DSA Core' },
      ],
    },
    {
      title: 'Frontend & Web Architecture',
      gradient: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
      skills: [
        { name: 'Next.js 16 (App Router)', proficiency: 94, level: 'Core', tag: 'SSR / Turbopack' },
        { name: 'React 19', proficiency: 95, level: 'Core', tag: 'UI Library' },
        { name: 'Tailwind CSS', proficiency: 92, level: 'Proficient', tag: 'Design Systems' },
        { name: 'State Management (Redux/Zustand)', proficiency: 82, level: 'Proficient', tag: 'State' },
        { name: 'Responsive & Accessible Web', proficiency: 92, level: 'Core', tag: 'WCAG / UX' },
      ],
    },
    {
      title: 'Cloud, DevOps & Tools',
      gradient: 'linear-gradient(90deg, #f59e0b, #ef4444)',
      skills: [
        { name: 'Git & GitHub', proficiency: 92, level: 'Core', tag: 'Version Control' },
        { name: 'Docker', proficiency: 78, level: 'Working Knowledge', tag: 'Containers' },
        { name: 'Vercel & Cloudflare R2', proficiency: 88, level: 'Proficient', tag: 'Edge / Storage' },
        { name: 'CI/CD Pipelines', proficiency: 76, level: 'Working Knowledge', tag: 'Automation' },
        { name: 'Postman', proficiency: 88, level: 'Proficient', tag: 'API Testing' },
        { name: 'Linux / Bash', proficiency: 80, level: 'Working Knowledge', tag: 'CLI' },
      ],
    },
    {
      title: 'Computer Science Fundamentals',
      gradient: 'linear-gradient(90deg, #ec4899, #8b5cf6)',
      skills: [
        { name: 'Data Structures & Algorithms', proficiency: 88, level: 'Core', tag: 'Problem Solving' },
        { name: 'Object-Oriented Programming (OOP)', proficiency: 90, level: 'Core', tag: 'Architecture' },
        { name: 'Database Normalization & Indexing', proficiency: 85, level: 'Proficient', tag: 'DBMS' },
        { name: 'Auth & Web Security (JWT, OAuth)', proficiency: 88, level: 'Proficient', tag: 'Security' },
      ],
    },
  ],

  // ─── PROJECTS ────────────────────────────────────────────
  projects: [
    {
      slug: 'gpa-calculator',
      title: 'GPA Calculator',
      category: 'SaaS Platform',
      description:
        'SEO-optimized educational platform with multiple calculators, study resources, and tools used by 20,000+ students monthly.',
      fullDescription:
        'GPA Calculator (gpacalculators.net) is a high-traffic SEO-optimized SaaS platform that provides comprehensive GPA calculation tools for students across different grading systems (4.0 scale, percentage, letter grade). The site has achieved #1 Google rankings for key search terms, attracting over 20,000 monthly organic users and generating sustainable ad revenue through Google AdSense and Mediavine.',
      techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Google AdSense'],
      liveUrl: 'https://gpacalculators.net',
      challenges: [
        'Achieving top Google rankings in a highly competitive search space by implementing advanced on-page SEO strategies.',
        'Optimizing Core Web Vitals (LCP, CLS, FID) to maintain 90+ PageSpeed scores despite ad placements.',
        'Supporting multiple international GPA calculation systems (US, UK, CGPA, percentage) with high accuracy.',
        'Building a scalable ad integration that balances revenue generation without degrading user experience.',
      ],
      futurePlans: [
        'Add a GPA prediction tool using historical grade data and AI trend analysis.',
        'Build university-specific GPA calculators for the top 500 global universities.',
        'Integrate a GPA goal planner that helps students calculate what grades they need to hit target GPAs.',
        'Launch a mobile app version with offline calculation capabilities.',
      ],
      featured: true,
      published: true,
    },
    {
      slug: 'tuitionport',
      title: 'TuitionPort',
      category: 'Marketplace',
      description:
        'Full-stack tutoring marketplace with authentication, booking, payment integration and dashboard.',
      fullDescription:
        'TuitionPort is a comprehensive tutoring marketplace that bridges the gap between students and qualified tutors. Built with a serverless architecture leveraging Neon PostgreSQL and Cloudflare R2, the platform offers real-time tutor matching, secure payment processing, session scheduling, and progress tracking. The platform has onboarded 1,000+ users and demonstrates how modern serverless technologies can dramatically reduce operational overhead.',
      techStack: ['Next.js', 'Node.js', 'PostgreSQL (Neon)', 'Cloudflare R2', 'Firebase Auth'],
      liveUrl: 'https://tuitionport.com',
      challenges: [
        'Designing an efficient tutor-student matching algorithm that balances availability, subject expertise, and location preferences.',
        'Implementing real-time session notifications and scheduling without overloading the serverless infrastructure.',
        'Ensuring data consistency across distributed Neon PostgreSQL nodes during peak usage periods.',
        'Managing media uploads (profile pictures, learning materials) securely and cost-efficiently via Cloudflare R2.',
      ],
      futurePlans: [
        'Integrate AI-powered tutor recommendations based on student learning patterns and past performance.',
        'Add live video sessions with whiteboard collaboration using WebRTC.',
        'Build a mobile app for iOS and Android using React Native.',
        'Implement a gamification system with badges and learning streaks to improve student retention.',
      ],
      featured: true,
      published: true,
    },
    {
      slug: 'rentnest',
      title: 'RentNest',
      category: 'Web Application',
      description:
        'Modern rental property management platform with tenant, landlord and admin dashboards.',
      fullDescription:
        'RentNest is an end-to-end property management platform built for modern rentals. It streamlines tenancy management, payment tracking, maintenance tickets, and lease lifecycle operations across dedicated tenant, landlord, and administrator dashboards.',
      techStack: ['Next.js', 'PostgreSQL', 'Tailwind CSS', 'Prisma ORM'],
      liveUrl: 'https://rentnest-client.vercel.app/',
      githubUrl: 'https://github.com/Nazmul1211/rentnest',
      challenges: [
        'Structuring role-based access control (RBAC) securely across tenants, landlords, and platform administrators.',
        'Designing a normalized relational schema in PostgreSQL to manage multi-unit properties and lease contracts.',
        'Building responsive dashboards with real-time status updates and analytics.',
      ],
      futurePlans: [
        'Integrate automated Stripe recurring payment schedules for monthly rent collection.',
        'Add in-app messaging and real-time maintenance requests dispatch.',
      ],
      featured: true,
      published: true,
    },
    {
      slug: 'flowditor',
      title: 'Flowditor',
      category: 'AI Platform',
      description:
        'AI automation platform integrating Tavily and Google AI Studio for content generation and WordPress publishing, reducing manual work by 85%.',
      fullDescription:
        'Flowditor is an AI-powered content automation platform that streamlines the entire content production workflow—from research to publishing. By integrating Tavily for real-time web research and Google AI Studio for intelligent content generation, Flowditor can autonomously draft, format, and publish articles directly to WordPress sites.',
      techStack: ['Next.js', 'Tavily API', 'Google AI Studio (Gemini)', 'Firebase', 'WordPress REST API'],
      liveUrl: 'https://flowditor.vercel.app',
      challenges: [
        'Rate-limiting and queuing AI API calls to stay within cost budgets while maintaining throughput.',
        'Handling inconsistent HTML output from AI models and normalizing it for WordPress compatibility.',
      ],
      futurePlans: [
        'Add support for Webflow, Ghost, and Medium publishing targets.',
        'Implement a content calendar with automated scheduling.',
      ],
      featured: true,
      published: true,
    },
    {
      slug: 'cheetahtype',
      title: 'CheetahType',
      category: 'Performance Tool',
      description:
        'High-performance typing test with real-time WPM/accuracy tracking, Firebase leaderboards, and Chart.js analytics dashboard.',
      fullDescription:
        'CheetahType is a competitive typing practice platform built for speed enthusiasts. The app features real-time WPM and accuracy tracking, multiple difficulty modes, a global Firebase leaderboard, and a personalized analytics dashboard powered by Chart.js.',
      techStack: ['Next.js', 'Firebase', 'Tailwind CSS', 'Chart.js', 'Framer Motion'],
      liveUrl: 'https://cheetahtype.com',
      challenges: [
        'Achieving sub-10ms keystroke response times for a smooth, competition-grade typing feel.',
        'Implementing fair real-time leaderboard updates without creating excessive Firebase read/write operations.',
      ],
      futurePlans: [
        'Add multiplayer real-time typing races with up to 10 simultaneous players.',
      ],
      featured: true,
      published: true,
    },
    {
      slug: 'volume-calculator',
      title: 'Volume Calculator',
      category: 'Educational Tool',
      description:
        'Multi-use educational tools website built with Next.js featuring various volume calculators for learning purposes.',
      fullDescription:
        'Volume Calculator (volumecalculator.co) is an educational tools platform offering a suite of precise volume calculators for geometric shapes—from basic cubes and spheres to complex prisms and cylinders.',
      techStack: ['Next.js', 'TypeScript', 'SEO', 'Vercel'],
      liveUrl: 'https://volumecalculator.co/',
      challenges: [
        'Ensuring mathematical precision across dozens of calculator formulas while maintaining a clean UX.',
      ],
      futurePlans: [
        'Add 3D visualization for each geometric shape to aid learning.',
      ],
      featured: false,
      published: true,
    },
    {
      slug: 'texteditor',
      title: 'TextEditor4U',
      category: 'PWA Tool',
      description:
        'Feature-rich online text editor with formatting, export (TXT, PDF, DOCX), cloud sync, and PWA support serving 5,000+ users.',
      fullDescription:
        'TextEditor4U is a fully-featured browser-based text editor built as a Progressive Web App (PWA). It offers rich text formatting, multiple export formats, cloud sync via Firebase, and offline support.',
      techStack: ['React.js', 'Firebase', 'Tailwind CSS', 'PWA', 'jsPDF'],
      liveUrl: 'https://texteditor4u.netlify.app/',
      challenges: [
        'Implementing reliable offline functionality and background sync using Service Workers.',
      ],
      futurePlans: [
        'Add collaborative real-time editing with presence indicators.',
      ],
      featured: false,
      published: true,
    },
    {
      slug: 'brand-shop',
      title: 'Brand Shop',
      category: 'E-Commerce',
      description:
        'Single-store eCommerce platform with product browsing, cart management, and user authentication.',
      fullDescription:
        'Brand Shop is a fully functional single-store eCommerce platform featuring product catalog browsing with category filtering, a shopping cart with quantity management, secure user authentication, and a clean responsive UI.',
      techStack: ['React.js', 'Tailwind CSS', 'DaisyUI', 'Express.js', 'MongoDB'],
      liveUrl: 'https://brand-shop-5e4ab.web.app/',
      githubUrl: 'https://github.com/Nazmul1211/brandshop-client',
      challenges: [
        'Implementing optimistic UI updates for cart operations while keeping server state in sync.',
      ],
      futurePlans: [
        'Integrate a payment gateway for real transactions.',
      ],
      featured: false,
      published: true,
    },
    {
      slug: 'bd-turf',
      title: 'BD Turf',
      category: 'Management Platform',
      description:
        'Turf Booking and Management Platform allowing users to browse, book, and manage turf reservations.',
      fullDescription:
        'BD Turf is a sports facility booking platform tailored for Bangladesh that allows users to browse turf availability, make time-slot reservations, and manage their bookings.',
      techStack: ['React.js', 'Express.js', 'MongoDB Atlas', 'Node.js'],
      liveUrl: 'https://bdturf.netlify.app/',
      githubUrl: 'https://github.com/Nazmul1211/Turf-Booking-System',
      challenges: [
        'Preventing double-booking through concurrent reservation requests with MongoDB transactions.',
      ],
      futurePlans: [
        'Add mobile payment support (bKash, Nagad).',
      ],
      featured: false,
      published: true,
    },
  ],

  // ─── EXPERIENCE ──────────────────────────────────────────
  experience: [
    {
      role: 'Software Engineer & Independent Developer',
      company: 'Self-Employed • Product Development & Client Work',
      period: 'Aug 2023 – Present',
      descriptions: [
        'Built and deployed 10+ production applications using Next.js, Node.js, and TypeScript.',
        'Developed SaaS products serving 30,000+ monthly users.',
        'Worked on client projects and WordPress websites.',
        'Handled full development cycle: architecture, database, deployment, SEO and maintenance.',
      ],
    },
    {
      role: 'WordPress Developer (Freelance)',
      company: 'Client Projects',
      period: '2020 – 2023',
      descriptions: [
        'Developed and maintained multiple WordPress websites for local and international clients.',
        'Worked on custom themes, plugins, SEO, and performance optimization.',
      ],
    },
  ],

  // ─── EDUCATION ───────────────────────────────────────────
  education: [
    {
      school: 'East Delta University',
      degree: 'B.Sc. in Computer Science & Engineering',
      details: 'CGPA: 3.12 / 4.00 • Chattogram, Bangladesh',
      date: 'Jan 2022 – Dec 2025',
    },
  ],

  // ─── CONTACT ─────────────────────────────────────────────
  contact: {
    email: 'nazmulhasansajjad@gmail.com',
    phone: '+8801867421211',
    whatsapp: '+8801867421211',
    github: 'https://github.com/nazmul1211',
    linkedin: 'https://www.linkedin.com/in/nazmulsajjad/',
    contactText:
      "I'm open to software engineering opportunities, technical collaborations, or just a friendly chat about technology.",
  },
};
