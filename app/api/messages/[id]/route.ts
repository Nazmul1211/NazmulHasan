// app/api/messages/[id]/route.ts

import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import prisma from '@/lib/prisma';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const messageId = parseInt(resolvedParams.id, 10);

        if (isNaN(messageId)) {
            return NextResponse.json(
                { error: 'Invalid message ID' },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        const body = await request.json();
        const { isRead } = body;

        if (typeof isRead !== 'boolean') {
            return NextResponse.json(
                { error: 'isRead status must be a boolean' },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        const updated = await prisma.contactMessage.update({
            where: { id: messageId },
            data: { isRead }
        });

        return NextResponse.json(
            { success: true, message: 'Message updated successfully', data: updated },
            { status: StatusCodes.OK }
        );
    } catch (error) {
        console.error('[MESSAGES/PATCH]', error);
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
        const resolvedParams = await params;
        const messageId = parseInt(resolvedParams.id, 10);

        if (isNaN(messageId)) {
            return NextResponse.json(
                { error: 'Invalid message ID' },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        await prisma.contactMessage.delete({
            where: { id: messageId }
        });

        return NextResponse.json(
            { success: true, message: 'Message deleted successfully' },
            { status: StatusCodes.OK }
        );
    } catch (error) {
        console.error('[MESSAGES/DELETE]', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}
