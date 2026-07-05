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
  proficiency: number; // 0–100
}

export interface SkillCategory {
  title: string;
  gradient: string; // CSS gradient string for bar color
  skills: Skill[];
}

export interface Project {
  slug: string;
  title: string;
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
    roles: ['Software Engineer', 'Full Stack Developer', 'Tech Enthusiast', 'Problem Solver'],
    description:
      'A passionate Full Stack Engineer specializing in building accessible, pixel-perfect, and performant web experiences. Merging technical expertise with an entrepreneurial mindset to create impactful digital solutions.',
    resumeUrl: '/Resume_NazmulHasan.pdf',
    github: 'https://github.com/Nazmul1211',
    linkedin: 'https://www.linkedin.com/in/mn-hasan/',
  },

  // ─── ABOUT ───────────────────────────────────────────────
  about: {
    paragraphs: [
      'I am a passionate **MERN Stack Developer** with a strong foundation in computer science principles and modern web application development.',
      'With expertise spanning the full stack—from crafting pixel-perfect React frontends to architecting scalable Node.js backends—I specialize in building products that not only work flawlessly but also delight users. My entrepreneurial journey has taught me to balance technical excellence with business impact.',
      "I've built and scaled SaaS products from zero to **25,000+ users**, achieved **#1 Google rankings**, and helped clients reduce infrastructure costs by up to **60%**.",
    ],
    stats: [
      { value: '15+', label: 'Production Apps' },
      { value: '30k+', label: 'Monthly Users' },
      { value: '90+', label: 'PageSpeed Score' },
      { value: '60%', label: 'Cost Reduction' },
    ],
    hobbies: [
      { emoji: '⚽', label: 'Football' },
      { emoji: '📚', label: 'Reading' },
      { emoji: '✈️', label: 'Traveling' },
      { emoji: '🎮', label: 'Gaming' },
      { emoji: '🌐', label: 'Open Source' },
    ],
  },

  // ─── SKILLS ──────────────────────────────────────────────
  skills: [
    {
      title: 'Core Stack (MERN)',
      gradient: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
      skills: [
        { name: 'React.js', proficiency: 95 },
        { name: 'Next.js', proficiency: 92 },
        { name: 'Node.js', proficiency: 88 },
        { name: 'Express.js', proficiency: 85 },
        { name: 'MongoDB', proficiency: 82 },
        { name: 'Mongoose', proficiency: 80 },
      ],
    },
    {
      title: 'Backend & RDBMS',
      gradient: 'linear-gradient(90deg, #ec4899, #f97316)',
      skills: [
        { name: 'PostgreSQL', proficiency: 78 },
        { name: 'Prisma', proficiency: 82 },
        { name: 'Firebase', proficiency: 85 },
        { name: 'Supabase', proficiency: 72 },
        { name: 'Redis', proficiency: 70 },
        { name: 'Serverless', proficiency: 80 },
      ],
    },
    {
      title: 'Frontend Ecosystem',
      gradient: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
      skills: [
        { name: 'TypeScript', proficiency: 90 },
        { name: 'Tailwind CSS', proficiency: 92 },
        { name: 'HTML5 / CSS3', proficiency: 96 },
        { name: 'Redux', proficiency: 78 },
        { name: 'Responsive Design', proficiency: 94 },
      ],
    },
    {
      title: 'Languages',
      gradient: 'linear-gradient(90deg, #10b981, #06b6d4)',
      skills: [
        { name: 'JavaScript (ES6+)', proficiency: 95 },
        { name: 'Python', proficiency: 72 },
        { name: 'C++', proficiency: 65 },
        { name: 'Java', proficiency: 60 },
      ],
    },
    {
      title: 'Tools & DevOps',
      gradient: 'linear-gradient(90deg, #f59e0b, #ef4444)',
      skills: [
        { name: 'Git', proficiency: 90 },
        { name: 'Docker', proficiency: 70 },
        { name: 'GCP', proficiency: 68 },
        { name: 'Vercel', proficiency: 88 },
        { name: 'Cloudflare R2', proficiency: 75 },
        { name: 'CI/CD', proficiency: 72 },
      ],
    },
  ],

  // ─── PROJECTS ────────────────────────────────────────────
  projects: [
    {
      slug: 'tuitionport',
      title: 'TuitionPort',
      description:
        'Full-stack marketplace connecting 1,000+ students and tutors with serverless architecture, reducing infrastructure costs by 60%.',
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
      slug: 'flowditor',
      title: 'Flowditor',
      description:
        'AI automation platform integrating Tavily and Google AI Studio for content generation and WordPress publishing, reducing manual work by 85%.',
      fullDescription:
        'Flowditor is an AI-powered content automation platform that streamlines the entire content production workflow—from research to publishing. By integrating Tavily for real-time web research and Google AI Studio for intelligent content generation, Flowditor can autonomously draft, format, and publish articles directly to WordPress sites. The platform has reduced manual content production time by 85% for its users.',
      techStack: ['Next.js', 'Tavily API', 'Google AI Studio (Gemini)', 'Firebase', 'WordPress REST API'],
      liveUrl: 'https://flowditor.vercel.app',
      challenges: [
        'Rate-limiting and queuing AI API calls to stay within cost budgets while maintaining throughput.',
        'Handling inconsistent HTML output from AI models and normalizing it for WordPress compatibility.',
        'Building a reliable retry mechanism for failed WordPress publish requests.',
        'Designing a workflow builder UI that is intuitive for non-technical users.',
      ],
      futurePlans: [
        'Add support for Webflow, Ghost, and Medium publishing targets.',
        'Implement a content calendar with automated scheduling.',
        'Add SEO optimization suggestions powered by keyword analysis.',
        'Build team collaboration features with role-based access control.',
      ],
      featured: true,
      published: true,
    },
    {
      slug: 'gpa-calculator',
      title: 'GPA Calculator',
      description:
        'SEO-optimized SaaS platform serving 20,000+ monthly users with #1 Google ranking, monetized via AdSense and Mediavine.',
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
      slug: 'volume-calculator',
      title: 'Volume Calculator',
      description:
        'Multi-use educational tools website built with Next.js featuring various volume calculators for learning purposes.',
      fullDescription:
        'Volume Calculator (volumecalculator.co) is an educational tools platform offering a suite of precise volume calculators for geometric shapes—from basic cubes and spheres to complex prisms and cylinders. Designed for students, engineers, and educators, the site provides instant calculations with step-by-step explanations and is fully SEO-optimized to attract organic search traffic.',
      techStack: ['Next.js', 'TypeScript', 'SEO', 'Vercel'],
      liveUrl: 'https://volumecalculator.co/',
      challenges: [
        'Ensuring mathematical precision across dozens of calculator formulas while maintaining a clean UX.',
        'Building SEO-rich content pages for each calculator type without sacrificing page performance.',
        'Designing a responsive layout that works well for complex formula displays on small screens.',
      ],
      futurePlans: [
        'Add 3D visualization for each geometric shape to aid learning.',
        'Support unit conversion (cubic feet, liters, gallons) within each calculator.',
        'Create an API endpoint for developers to use the calculator logic programmatically.',
      ],
      featured: false,
      published: true,
    },
    {
      slug: 'cheetahtype',
      title: 'CheetahType',
      description:
        'High-performance typing test with real-time WPM/accuracy tracking, Firebase leaderboards, and Chart.js analytics dashboard.',
      fullDescription:
        'CheetahType is a competitive typing practice platform built for speed enthusiasts. The app features real-time WPM and accuracy tracking, multiple difficulty modes, a global Firebase leaderboard, and a personalized analytics dashboard powered by Chart.js. Users can track their progress over time, compete with others, and view detailed keystroke analysis to identify and improve on weak spots.',
      techStack: ['Next.js', 'Firebase', 'Tailwind CSS', 'Chart.js', 'Framer Motion'],
      liveUrl: 'https://cheetahtype.com',
      challenges: [
        'Achieving sub-10ms keystroke response times for a smooth, competition-grade typing feel.',
        'Implementing fair real-time leaderboard updates without creating excessive Firebase read/write operations.',
        'Designing the analytics dashboard to display meaningful performance trends even with limited historical data.',
        'Generating varied, high-quality typing passages that are neither too easy nor frustratingly difficult.',
      ],
      futurePlans: [
        'Add multiplayer real-time typing races with up to 10 simultaneous players.',
        'Implement AI-generated personalized practice passages targeting a user\'s most frequent typos.',
        'Add competitive typing leagues with weekly tournaments and prizes.',
        'Build a browser extension for passive typing practice on any website.',
      ],
      featured: true,
      published: true,
    },
    {
      slug: 'texteditor',
      title: 'TextEditor4U',
      description:
        'Feature-rich online text editor with formatting, export (TXT, PDF, DOCX), cloud sync, and PWA support serving 5,000+ users.',
      fullDescription:
        'TextEditor4U is a fully-featured browser-based text editor built as a Progressive Web App (PWA). It offers rich text formatting, multiple export formats (TXT, PDF, DOCX), cloud sync via Firebase, offline support, and a clean distraction-free writing environment. With 5,000+ users, it serves writers, students, and professionals who need a reliable, no-install writing tool.',
      techStack: ['React.js', 'Firebase', 'Tailwind CSS', 'PWA', 'jsPDF', 'docx.js'],
      liveUrl: 'https://texteditor4u.netlify.app/',
      challenges: [
        'Implementing reliable offline functionality and background sync using Service Workers in a React app.',
        'Handling cross-browser compatibility for rich text formatting, particularly for Safari on iOS.',
        'Generating accurate PDF and DOCX exports that faithfully preserve the document formatting.',
        'Managing real-time cloud sync without overwriting local edits during connection drops.',
      ],
      futurePlans: [
        'Add collaborative real-time editing with presence indicators (Google Docs-style).',
        'Implement AI writing assistant with grammar correction and sentence enhancement suggestions.',
        'Add support for Markdown preview mode alongside the rich text editor.',
        'Build a template library with 100+ professional document templates.',
      ],
      featured: true,
      published: true,
    },
    {
      slug: 'brand-shop',
      title: 'Brand Shop',
      description:
        'Single-store eCommerce platform with product browsing, cart management, and user authentication.',
      fullDescription:
        'Brand Shop is a fully functional single-store eCommerce platform featuring product catalog browsing with category filtering, a shopping cart with quantity management, secure user authentication, and a clean responsive UI. Built as a full-stack MERN application with RESTful API architecture.',
      techStack: ['React.js', 'Tailwind CSS', 'DaisyUI', 'Express.js', 'MongoDB'],
      liveUrl: 'https://brand-shop-5e4ab.web.app/',
      githubUrl: 'https://github.com/Nazmul1211/brandshop-client',
      challenges: [
        'Implementing optimistic UI updates for cart operations while keeping server state in sync.',
        'Building a secure JWT-based authentication flow that handles token refresh gracefully.',
        'Designing a flexible product schema in MongoDB to support diverse product attributes.',
      ],
      futurePlans: [
        'Integrate a payment gateway (Stripe or SSLCommerz) for real transactions.',
        'Add an admin panel for inventory management and order processing.',
        'Implement product reviews and ratings with verified-purchase gating.',
      ],
      featured: false,
      published: true,
    },
    {
      slug: 'bd-turf',
      title: 'BD Turf',
      description:
        'Turf Booking and Management Platform allowing users to browse, book, and manage turf reservations.',
      fullDescription:
        'BD Turf is a sports facility booking platform tailored for Bangladesh that allows users to browse turf availability, make time-slot reservations, and manage their bookings. The platform features a real-time availability calendar, user profile management, and an admin interface for facility owners to manage their listings.',
      techStack: ['React.js', 'Express.js', 'MongoDB Atlas', 'Node.js'],
      liveUrl: 'https://bdturf.netlify.app/',
      githubUrl: 'https://github.com/Nazmul1211/Turf-Booking-System',
      challenges: [
        'Preventing double-booking through concurrent reservation requests with MongoDB transactions.',
        'Building a real-time calendar UI that clearly shows available and booked time slots.',
        'Handling timezone differences for users booking across different regions of Bangladesh.',
      ],
      futurePlans: [
        'Add mobile payment support (bKash, Nagad) for seamless Bangladeshi transactions.',
        'Implement SMS notifications for booking confirmations and reminders.',
        'Build a review system for turf quality ratings to help users make informed choices.',
      ],
      featured: false,
      published: true,
    },
    {
      slug: 'ph-tube',
      title: 'PH Tube',
      description:
        'Video platform clone built with pure vanilla technologies demonstrating core web fundamentals.',
      fullDescription:
        'PH Tube is a YouTube-inspired video browsing platform built entirely with vanilla HTML, CSS, and JavaScript—no frameworks or libraries. It demonstrates a deep understanding of core web fundamentals including DOM manipulation, fetch API for dynamic content loading, and responsive CSS layouts without any build tools.',
      techStack: ['HTML5', 'CSS3', 'JavaScript'],
      liveUrl: 'https://tubular-caramel-adaca6.netlify.app/',
      challenges: [
        'Implementing complex UI interactions (search, filtering, modal playback) without any framework abstractions.',
        'Managing application state and DOM updates efficiently in pure JavaScript.',
        'Building a fully responsive video grid layout using only CSS Grid and Flexbox.',
      ],
      futurePlans: [
        'Refactor to React for better component architecture and state management.',
        'Add a backend with Node.js for actual video upload and storage.',
        'Implement real-time view counts and comments using WebSockets.',
      ],
      featured: false,
      published: true,
    },
    {
      slug: 'summer-sale',
      title: 'Summer Sale',
      description: "E-commerce promo site with dynamic coupon system. Use code SELL200 for discounts!",
      fullDescription:
        "Summer Sale is a promotional e-commerce landing page featuring a dynamic product catalog, a coupon code system, and an interactive shopping cart. Built to demonstrate advanced JavaScript event handling, DOM manipulation, and real-time price calculation with discount logic. Use promo code SELL200 to see the discount system in action.",
      techStack: ['JavaScript', 'HTML5', 'CSS3', 'Event-Driven Architecture'],
      liveUrl: 'https://jazzy-druid-539c43.netlify.app/',
      challenges: [
        'Building a coupon validation system that handles edge cases like expired codes and minimum purchase requirements.',
        'Implementing a real-time cart total that updates instantly with quantity changes and applied discounts.',
        'Creating smooth UI transitions and animations using pure CSS without performance overhead.',
      ],
      futurePlans: [
        'Integrate with a proper backend to support real inventory management.',
        'Add multiple currency support for international customers.',
        'Implement A/B testing for different promotional banner designs.',
      ],
      featured: false,
      published: true,
    },
  ],

  // ─── EXPERIENCE ──────────────────────────────────────────
  experience: [
    {
      role: 'Software Engineer & Entrepreneur',
      company: 'Self-Employed (Freelance & Product Development)',
      period: 'Aug. 2023 – Present',
      descriptions: [
        'Built and deployed 15+ production web applications using React, Next.js, Node.js, and TypeScript, serving 30,000+ monthly users.',
        'Developed client projects including TuitionPort marketplace using serverless architecture (Neon, Cloudflare R2, Firebase).',
        'Achieved 90+ PageSpeed scores and first-page Google rankings, generating 25,000+ monthly organic visitors.',
        'Monetized platforms via Google AdSense and Mediavine; managed WordPress websites with comprehensive content strategy.',
      ],
    },
  ],

  // ─── EDUCATION ───────────────────────────────────────────
  education: [
    {
      school: 'East Delta University',
      degree: 'B.Sc. in Computer Science & Engineering',
      details: 'CGPA: 3.10/4.00 • Chattogram, Bangladesh',
      date: 'Jan. 2022 – Dec. 2025',
    },
    {
      school: 'Chattogram Govt. Model School & College',
      degree: 'Higher Secondary Certificate (HSC)',
      details: 'GPA: 5.00/5.00 • Chattogram, Bangladesh',
      date: 'Jun. 2017 – May 2019',
    },
  ],

  // ─── CONTACT ─────────────────────────────────────────────
  contact: {
    email: 'mnhs1211@gmail.com',
    phone: '+8801867421211',
    whatsapp: '+8801867421211',
    github: 'https://github.com/Nazmul1211',
    linkedin: 'https://www.linkedin.com/in/mn-hasan/',
    contactText:
      "Have a project in mind or want to discuss modern web technologies? I'm always open to discussing new projects, creative ideas or opportunities.",
  },
};
