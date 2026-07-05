// app/api/contact/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { StatusCodes } from 'http-status-codes';
import prisma from '@/lib/prisma';
import { verifyJWT, ACCESS_COOKIE } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        // Store contact message in DB
        const savedMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                subject: subject || 'No Subject',
                message
            }
        });

        return NextResponse.json(
            { success: true, message: 'Message stored successfully', data: savedMessage },
            { status: StatusCodes.CREATED }
        );
    } catch (error) {
        console.error('[CONTACT/POST]', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(ACCESS_COOKIE)?.value;
        if (!token || !(await verifyJWT(token))) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        // Fetch all messages sorted by date descending
        const messages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(messages, { status: StatusCodes.OK });
    } catch (error) {
        console.error('[CONTACT/GET]', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}
