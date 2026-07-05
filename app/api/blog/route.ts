// app/api/blog/route.ts — dynamic blog dynamic list/creator endpoints

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { StatusCodes } from 'http-status-codes';
import prisma from '@/lib/prisma';
import { verifyJWT, ACCESS_COOKIE } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        const cookieStore = await cookies();
        const token = cookieStore.get(ACCESS_COOKIE)?.value;
        const isAdmin = token ? !!(await verifyJWT(token)) : false;

        if (slug) {
            // Find single post by slug
            const post = await prisma.blogPost.findUnique({
                where: { slug }
            });

            if (!post || (!post.published && !isAdmin)) {
                return NextResponse.json(
                    { error: 'Blog post not found' },
                    { status: StatusCodes.NOT_FOUND }
                );
            }

            return NextResponse.json(post, { status: StatusCodes.OK });
        }

        // Find all posts
        const posts = await prisma.blogPost.findMany({
            where: isAdmin ? {} : { published: true },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(posts, { status: StatusCodes.OK });
    } catch (error) {
        console.error('[BLOG/GET]', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(ACCESS_COOKIE)?.value;
        if (!token || !(await verifyJWT(token))) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        const body = await request.json();
        const { title, slug, excerpt, content, tags, image, readTime, published } = body;

        if (!title || !slug || !content) {
            return NextResponse.json(
                { error: 'Title, slug, and content are required' },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        // Check if slug unique
        const existing = await prisma.blogPost.findUnique({
            where: { slug }
        });

        if (existing) {
            return NextResponse.json(
                { error: 'A blog post with this slug already exists' },
                { status: StatusCodes.CONFLICT }
            );
        }

        const newPost = await prisma.blogPost.create({
            data: {
                title,
                slug,
                excerpt: excerpt || '',
                content,
                tags: Array.isArray(tags) ? tags : [],
                image: image || '/images/blog/default.png',
                readTime: readTime || '5 min read',
                published: typeof published === 'boolean' ? published : true,
                date: new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })
            }
        });

        return NextResponse.json(
            { success: true, data: newPost },
            { status: StatusCodes.CREATED }
        );
    } catch (error) {
        console.error('[BLOG/POST]', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}
