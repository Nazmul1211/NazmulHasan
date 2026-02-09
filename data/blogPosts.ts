export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    tags: string[];
    image: string;
    content: string; // HTML or Markdown content
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'building-scalable-web-apps-serverless',
        title: 'Building Scalable Web Apps with Next.js & Serverless',
        excerpt: 'Learn how I built TuitionPort, a production-ready marketplace using Next.js with serverless architecture, reducing infrastructure costs by up to 60%.',
        date: 'Feb 5, 2026',
        readTime: '8 min read',
        tags: ['Next.js', 'Serverless', 'Architecture', 'Neon', 'Cloudflare'],
        image: '/images/blog/serverless-architecture.png',
        content: `
            <p>When I set out to build <strong>TuitionPort</strong>, a marketplace connecting over 1,000 students and tutors, I knew scalability and cost-efficiency were paramount. Traditional server-based architectures often lead to idle resource costs and scaling headaches. Here's how I leveraged a serverless stack to solve these problems.</p>

            <h3>The Stack</h3>
            <ul>
                <li><strong>Frontend & API:</strong> Next.js (deployed on Vercel)</li>
                <li><strong>Database:</strong> Neon (Serverless PostgreSQL)</li>
                <li><strong>Storage:</strong> Cloudflare R2</li>
                <li><strong>Authentication:</strong> Firebase Auth</li>
            </ul>

            <h3>Why Serverless?</h3>
            <p>The primary driver was cost and maintenance. With <strong>Neon</strong>, I only pay for active compute time. During low-traffic periods (like late nights), the database scales down to zero. This alone reduced our projected database costs by nearly 60% compared to a provisioned RDS instance.</p>

            <h3>Handling File Uploads efficiently</h3>
            <p>For a tuition platform, users need to upload profile pictures and verification documents. I chose <strong>Cloudflare R2</strong> because of its zero egress fees. Integrating it with Next.js API routes allowed us to build a secure, signed-url based upload system that is both fast and cheap.</p>

            <h3>The Result</h3>
            <p>TuitionPort now serves 30,000+ monthly active users with negligible idle costs. The pages load in under 1.5 seconds thanks to Vercel's edge network, and the database scales instantly during peak usage hours.</p>

            <p>This architecture proves that you don't need a massive DevOps team to build enterprise-grade scalable applications. You just need the right tools.</p>
        `
    },
    {
        title: 'Achieving 90+ PageSpeed Scores: A Complete Guide',
        slug: 'achieving-90-plus-pagespeed-scores',
        excerpt: 'Practical tips and techniques I use to optimize web applications for performance and achieve top PageSpeed scores, boosting SEO and user retention.',
        date: 'Jan 28, 2026',
        readTime: '6 min read',
        tags: ['Performance', 'SEO', 'Optimization', 'Web Vitals'],
        image: '/images/blog/performance.png',
        content: `
            <p>In today's web, performance isn't just a nice-to-have; it's a critical factor for SEO and user experience. Throughout my career, I've consistently achieved <strong>90+ PageSpeed Insight scores</strong> for my clients and personal projects. Here is my blueprint.</p>

            <h3>1. Image Optimization is Key</h3>
            <p>Images are often the heaviest resources. I always use the <code>next/image</code> component which automatically:</p>
            <ul>
                <li>Serves images in modern formats like WebP or AVIF.</li>
                <li>Resizes images based on the device viewport.</li>
                <li>Lazy loads images that are not in the initial viewport.</li>
            </ul>

            <h3>2. Dynamic Imports & Code Splitting</h3>
            <p>Next.js does a great job at splitting code by page, but you can go further. For heavy components (like a complex chart or a map) that aren't immediately visible, I use <code>next/dynamic</code> to load them lazily.</p>
            <pre><code>const HeavyChart = dynamic(() => import('./HeavyChart'), { 
  loading: () => <p>Loading...</p>,
  ssr: false 
})</code></pre>

            <h3>3. Font Optimization</h3>
            <p>Google Fonts can be blocking. Using <code>next/font</code> (introduced in Next.js 13/14) allows you to self-host Google fonts automatically with zero layout shift (CLS). This has been a game-changer for my Cumulative Layout Shift scores.</p>

            <h3>Conclusion</h3>
            <p>Optimizing for performance is an iterative process. By focusing on Core Web Vitals and leveraging the built-in optimization tools of Next.js, you can build sites that feel instant and rank higher on Google.</p>
        `
    },
    {
        title: 'From Zero to 25k Users: SaaS Growth Strategies',
        slug: 'zero-to-25k-users-saas-growth',
        excerpt: 'Sharing my journey of building and scaling multiple SaaS products like GPA Calculator, including SEO strategies and monetization insights.',
        date: 'Jan 15, 2026',
        readTime: '10 min read',
        tags: ['SaaS', 'Growth', 'Entrepreneurship', 'SEO'],
        image: '/images/blog/seo-growth.png',
        content: `
            <p>Building a product is hard. Getting users to use it is harder. My journey with <strong>GPA Calculator</strong> and other SaaS tools taught me invaluable lessons about growth and SEO. Here's how I scaled from 0 to <strong>25,000+ monthly active users</strong>.</p>

            <h3>The "Problem-First" Approach</h3>
            <p>I didn't start with a solution; I started with a problem. Students needed a simple, accurate, and fast way to calculate their GPAs. Existing tools were clunky and ad-ridden. I built a cleaner, faster alternative.</p>

            <h3>SEO is a Long Game</h3>
            <p>I focused heavily on <strong>Programmatic SEO</strong>. Instead of writing 100 blog posts manually, I identified patterns in user searches (e.g., "GPA calculator for [University Name]") and created dynamic pages targeting these long-tail keywords. This strategy helped me capture highly specific traffic with high intent.</p>

            <h3>Monetization Strategy</h3>
            <p>Once traffic hit a consistent level (around 10k monthly visits), I introduced monetization. </p>
            <ul>
                <li><strong>AdSense:</strong> Good for initial trickle revenue.</li>
                <li><strong>Mediavine (Journey):</strong> Once I hit the traffic requirements, switching to Mediavine increased my RPM (Revenue Per Mille) by nearly 300%.</li>
            </ul>

            <h3>Key Takeaway</h3>
            <p>Consistency wins. It took 6 months of flat growth before the "hockey stick" curve happened. Keep shipping, keep optimizing, and the users will come.</p>
        `
    }
];
