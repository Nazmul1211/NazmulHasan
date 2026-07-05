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

            <p>Consistency wins. It took 6 months of flat growth before the "hockey stick" curve happened. Keep shipping, keep optimizing, and the users will come.</p>
        `
    },
    {
        slug: 'mastering-database-transactions-prisma',
        title: 'Mastering Database Transactions in Prisma: Avoiding Race Conditions',
        excerpt: 'Database race conditions can corrupt ledger entries and double-book slots. Learn how to write secure interactive transactions in Prisma to prevent concurrency bugs.',
        date: 'Jul 6, 2026',
        readTime: '7 min read',
        tags: ['Prisma', 'Database', 'PostgreSQL', 'Concurrency'],
        image: '/images/blog/prisma-transactions.png',
        content: `
            <p>Imagine you are building a ticket booking platform or an e-commerce checkout. Two users concurrently click "Book Ticket" for the very last seat available. Without proper database transaction management, both checkouts might succeed, leading to a double-booking system failure. This is a classic <strong>race condition</strong>.</p>

            <h3>The Problem: Non-Transactional Concurrency</h3>
            <p>Consider the following naive code in a Next.js or Express handler:</p>
            <pre><code>const seat = await prisma.seat.findUnique({ where: { id } });
if (seat.isBooked) {
  throw new Error("Seat already taken!");
}
await prisma.seat.update({ 
  where: { id }, 
  data: { isBooked: true, userId } 
});</code></pre>
            <p>If two requests reach the server simultaneously, both might execute the <code>findUnique</code> read query before either executes the <code>update</code> write query. Both read requests see that the seat is free, and both attempt to overwrite it, resulting in data inconsistency.</p>

            <h3>The Solution: Interactive Transactions</h3>
            <p>Prisma provides a robust mechanism called <strong>Interactive Transactions</strong> using the <code>$transaction</code> helper. This groups your operations into a single ACID transaction block, ensuring that if any operation fails or if parallel changes violate constraints, the entire transaction rolls back.</p>
            <pre><code>await prisma.$transaction(async (tx) => {
  const seat = await tx.seat.findUnique({ 
    where: { id } 
  });
  
  if (seat.isBooked) {
    throw new Error("Seat already taken!");
  }
  
  return await tx.seat.update({
    where: { id },
    data: { isBooked: true, userId }
  });
});</code></pre>
            <p>In high-concurrency settings, you can go further by implementing pessimistic locking or database constraints. However, Prisma's interactive transactions provide the baseline safety net that every professional software architect needs to understand.</p>
        `
    },
    {
        slug: 'express-middleware-error-handling-pitfalls',
        title: 'Express.js Middleware Architecture: Common Error Handling Pitfalls',
        excerpt: 'A single unhandled promise rejection can crash your entire Node.js server. Discover the right way to design middleware and catch exceptions in Express.',
        date: 'Jul 4, 2026',
        readTime: '5 min read',
        tags: ['Express', 'Node.js', 'Error Handling', 'Middleware'],
        image: '/images/blog/express-middleware.png',
        content: `
            <p>Express.js is the backbone of millions of Node.js servers. Its simple middleware chain architecture makes it highly modular. However, it is surprisingly easy to make fatal mistakes in how you handle async errors inside middleware functions.</p>

            <h3>Pitfall 1: Leaking Stack Traces to the Client</h3>
            <p>When an error occurs, displaying raw database exceptions or stack traces to visitors is a major security risk. It exposes details of your schema and server directory structures to potential hackers.</p>
            <p>To avoid this, always register a <strong>Global Error Handler</strong> at the very end of your Express router configuration:</p>
            <pre><code>app.use((err, req, res, next) => {
  console.error(err.stack); // Log internally
  res.status(500).json({ 
    error: "Something went wrong! Please try again later." 
  });
});</code></pre>

            <h3>Pitfall 2: Silent Async Failures (The Server Freeze)</h3>
            <p>In older Express versions, throwing an error inside an <code>async</code> middleware function without catching it would lead to an unhandled promise rejection, which could hang the request forever or even crash the Node runtime. Even in modern runtimes, it causes memory leaks.</p>
            <p>Always wrap asynchronous tasks in try-catch blocks and pass the error to the <code>next</code> middleware callback:</p>
            <pre><code>app.get("/api/data", async (req, res, next) => {
  try {
    const data = await fetchExternalData();
    res.json(data);
  } catch (err) {
    next(err); // Hands over control to your global error middleware
  }
});</code></pre>
            <p>By enforcing global error boundaries and wrapping all async actions cleanly, you build resilient services that keep running smoothly even under unexpected network failures.</p>
        `
    },
    {
        slug: 'prisma-vs-raw-sql-performance',
        title: 'Prisma vs. Raw SQL: When to Drop the ORM for Performance',
        excerpt: 'While ORMs speed up development, they can produce highly inefficient SQL joins. Learn how to diagnose slow Prisma queries and write high-performance raw queries when it matters.',
        date: 'Jul 1, 2026',
        readTime: '8 min read',
        tags: ['Prisma', 'SQL', 'Performance', 'Database'],
        image: '/images/blog/orm-vs-sql.png',
        content: `
            <p>ORMs (Object-Relational Mappers) like Prisma have revolutionized how we interact with databases. They offer automatic type generation, query safety, and incredibly rapid development velocities. But as your application scales to millions of records, ORM abstractions can sometimes lead to severe performance bottlenecks.</p>

            <h3>The N+1 Query Problem</h3>
            <p>One of the most common pitfalls of ORMs is the <strong>N+1 Query Problem</strong>. This occurs when you query a list of records, and then execute another query for each individual record to retrieve its related tables.</p>
            <p>For instance, fetching 50 posts and queries for their comments can trigger 1 query for the posts plus 50 separate queries for the comments, totaling 51 trips to the database! Prisma handles relations relatively well by grouping queries, but complex nested includes can still lead to highly inefficient queries.</p>

            <h3>When to Write Raw SQL</h3>
            <p>For complex analytics, reporting queries, or bulk updates, it is often best to drop the ORM layer entirely and write optimized, hand-crafted raw SQL queries. Prisma lets you do this easily with the <code>$queryRaw</code> helper:</p>
            <pre><code>const popularCategories = await prisma.$queryRaw\`
  SELECT c.name, COUNT(p.id) as post_count
  FROM "Category" c
  JOIN "PostCategory" pc ON c.id = pc.categoryId
  JOIN "BlogPost" p ON pc.postId = p.id
  WHERE p.published = true
  GROUP BY c.name
  ORDER BY post_count DESC
  LIMIT 5;
\`;</code></pre>
            <p>By combining Prisma's clean CRUD utilities for normal page load actions and using optimized Raw SQL for complex data reports, you capture the best of both worlds: high development speed and blazing-fast response times.</p>
        `
    }
];

