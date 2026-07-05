// prisma/seed.ts

import bcrypt from 'bcryptjs';
import { defaultPortfolioData } from '../data/portfolioData';
import { blogPosts } from '../data/blogPosts';
import prisma from '../lib/prisma';

async function main() {
    console.log('🌱 Starting database seeding...');

    // 1. Seed Admin user
    const username = process.env.ADMIN_USERNAME || 'admin';
    const defaultPassword = 'portfolio@admin';
    
    // Hash password with bcrypt
    const passwordHash = await bcrypt.hash(defaultPassword, 12);

    const email = 'mnhs1211@gmail.com';
    console.log(`Setting up admin user: "${username}" (${email})...`);
    const admin = await prisma.admin.upsert({
        where: { username },
        update: {
            email,
            passwordHash: passwordHash,
        },
        create: {
            username,
            email,
            passwordHash: passwordHash,
        },
    });
    console.log('✓ Admin user ready.');

    // 2. Seed Portfolio Sections
    const sections = [
        { key: 'hero', content: defaultPortfolioData.hero },
        { key: 'about', content: defaultPortfolioData.about },
        { key: 'skills', content: defaultPortfolioData.skills },
        { key: 'projects', content: defaultPortfolioData.projects },
        { key: 'experience', content: defaultPortfolioData.experience },
        { key: 'education', content: defaultPortfolioData.education },
        { key: 'contact', content: defaultPortfolioData.contact },
    ];

    console.log('Seeding portfolio sections...');
    for (const section of sections) {
        await prisma.portfolioSection.upsert({
            where: { key: section.key },
            update: {
                content: section.content as any,
            },
            create: {
                key: section.key,
                content: section.content as any,
            },
        });
        console.log(`✓ Section "${section.key}" seeded.`);
    }

    // 3. Seed Blog Posts
    console.log('Seeding blog posts...');
    for (const post of blogPosts) {
        await prisma.blogPost.upsert({
            where: { slug: post.slug },
            update: {
                title: post.title,
                excerpt: post.excerpt,
                date: post.date,
                readTime: post.readTime,
                tags: post.tags,
                image: post.image,
                content: post.content,
            },
            create: {
                slug: post.slug,
                title: post.title,
                excerpt: post.excerpt,
                date: post.date,
                readTime: post.readTime,
                tags: post.tags,
                image: post.image,
                content: post.content,
            },
        });
        console.log(`✓ Blog post "${post.slug}" seeded.`);
    }

    console.log('🌿 Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
