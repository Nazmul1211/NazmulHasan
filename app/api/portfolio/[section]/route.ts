// app/api/portfolio/[section]/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { StatusCodes } from 'http-status-codes';
import prisma from '@/lib/prisma';
import { defaultPortfolioData, PortfolioData } from '@/data/portfolioData';
import { verifyJWT, ACCESS_COOKIE } from '@/lib/auth';

// Helper to check valid sections
const VALID_SECTIONS = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'] as const;
type SectionType = typeof VALID_SECTIONS[number];

export async function GET(
    request: Request,
    { params }: { params: Promise<{ section: string }> }
) {
    try {
        const resolvedParams = await params;
        const section = resolvedParams.section;

        if (!VALID_SECTIONS.includes(section as SectionType)) {
            return NextResponse.json(
                { error: `Invalid section: ${section}` },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        // Get from DB
        const record = await prisma.portfolioSection.findUnique({
            where: { key: section }
        });

        if (record) {
            return NextResponse.json(record.content, { status: StatusCodes.OK });
        }

        // Fallback to default local data if not found in DB
        const fallbackData = defaultPortfolioData[section as keyof PortfolioData];
        return NextResponse.json(fallbackData, { status: StatusCodes.OK });
    } catch (error) {
        console.error(`[PORTFOLIO/GET] ${error}`);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ section: string }> }
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
        const section = resolvedParams.section;

        if (!VALID_SECTIONS.includes(section as SectionType)) {
            return NextResponse.json(
                { error: `Invalid section: ${section}` },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        const body = await request.json();

        // Upsert section content in database
        const record = await prisma.portfolioSection.upsert({
            where: { key: section },
            update: { content: body },
            create: { key: section, content: body }
        });

        return NextResponse.json(
            { success: true, key: record.key, content: record.content },
            { status: StatusCodes.OK }
        );
    } catch (error) {
        console.error(`[PORTFOLIO/PUT] ${error}`);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}
