// app/api/blog/[id]/route.ts — PUT / DELETE endpoints for blog management

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { StatusCodes } from 'http-status-codes';
import prisma from '@/lib/prisma';
import { verifyJWT, ACCESS_COOKIE } from '@/lib/auth';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(ACCESS_COOKIE)?.value;
        if (!token || !(await verifyJWT(token))) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        const resolvedParams = await params;
        const postId = parseInt(resolvedParams.id, 10);

        if (isNaN(postId)) {
            return NextResponse.json(
                { error: 'Invalid post ID' },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        const body = await request.json();
        const { title, slug, excerpt, content, tags, image, readTime, published, date } = body;

        if (!title || !slug || !content) {
            return NextResponse.json(
                { error: 'Title, slug, and content are required' },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        // Check if slug is taken by another post
        const existing = await prisma.blogPost.findFirst({
            where: {
                slug,
                NOT: { id: postId }
            }
        });

        if (existing) {
            return NextResponse.json(
                { error: 'A blog post with this slug already exists' },
                { status: StatusCodes.CONFLICT }
            );
        }

        const updatedPost = await prisma.blogPost.update({
            where: { id: postId },
            data: {
                title,
                slug,
                excerpt: excerpt || '',
                content,
                tags: Array.isArray(tags) ? tags : [],
                image: image || '/images/blog/default.png',
                readTime: readTime || '5 min read',
                published: typeof published === 'boolean' ? published : true,
                date: date || new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })
            }
        });

        return NextResponse.json(
            { success: true, data: updatedPost },
            { status: StatusCodes.OK }
        );
    } catch (error) {
        console.error('[BLOG/PUT]', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(ACCESS_COOKIE)?.value;
        if (!token || !(await verifyJWT(token))) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        const resolvedParams = await params;
        const postId = parseInt(resolvedParams.id, 10);

        if (isNaN(postId)) {
            return NextResponse.json(
                { error: 'Invalid post ID' },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        await prisma.blogPost.delete({
            where: { id: postId }
        });

        return NextResponse.json(
            { success: true, message: 'Blog post deleted successfully' },
            { status: StatusCodes.OK }
        );
    } catch (error) {
        console.error('[BLOG/DELETE]', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}
