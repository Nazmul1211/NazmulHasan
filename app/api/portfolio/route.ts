// app/api/portfolio/route.ts

import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import prisma from '@/lib/prisma';
import { defaultPortfolioData, PortfolioData } from '@/data/portfolioData';

export async function GET() {
    try {
        const records = await prisma.portfolioSection.findMany();

        // Map database records into a single PortfolioData object
        const mergedData: Partial<PortfolioData> = { ...defaultPortfolioData };

        records.forEach((record: { key: string; content: any }) => {
            const key = record.key as keyof PortfolioData;
            if (key in defaultPortfolioData) {
                // Safely assign database content
                (mergedData as any)[key] = record.content;
            }
        });

        return NextResponse.json(mergedData, { status: StatusCodes.OK });
    } catch (error) {
        console.error('[PORTFOLIO_ALL/GET]', error);
        // Fallback to default local data if database fails or is empty
        return NextResponse.json(defaultPortfolioData, { status: StatusCodes.OK });
    }
}
