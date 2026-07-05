// app/api/auth/password/route.ts — update administrative credentials safely

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { StatusCodes } from 'http-status-codes';
import prisma from '@/lib/prisma';
import { verifyJWT, ACCESS_COOKIE, comparePassword, hashPassword } from '@/lib/auth';

export async function PUT(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(ACCESS_COOKIE)?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        const payload = await verifyJWT(token);
        if (!payload) {
            return NextResponse.json(
                { error: 'Invalid session' },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        const body = await request.json();
        const { currentPassword, newPassword } = body;

        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { error: 'Current password and new password are required' },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        if (newPassword.length < 6) {
            return NextResponse.json(
                { error: 'New password must be at least 6 characters long' },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        // Fetch admin
        const admin = await prisma.admin.findUnique({
            where: { username: payload.username }
        });

        if (!admin) {
            return NextResponse.json(
                { error: 'Admin account not found' },
                { status: StatusCodes.NOT_FOUND }
            );
        }

        // Compare current password
        const isCurrentValid = await comparePassword(currentPassword, admin.passwordHash);
        if (!isCurrentValid) {
            return NextResponse.json(
                { error: 'Incorrect current password' },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        // Hash new password and update
        const newPasswordHash = await hashPassword(newPassword);
        await prisma.admin.update({
            where: { username: payload.username },
            data: { passwordHash: newPasswordHash }
        });

        return NextResponse.json(
            { success: true, message: 'Password updated successfully' },
            { status: StatusCodes.OK }
        );
    } catch (error) {
        console.error('[AUTH/PASSWORD]', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}
