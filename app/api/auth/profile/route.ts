// app/api/auth/profile/route.ts — profile editor GET/PUT api endpoints

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { StatusCodes } from 'http-status-codes';
import prisma from '@/lib/prisma';
import { verifyJWT, ACCESS_COOKIE, USER_PAYLOAD_COOKIE, REFRESH_MAX_AGE, comparePassword } from '@/lib/auth';

export async function GET() {
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

        const admin = await prisma.admin.findUnique({
            where: { id: payload.adminId }
        });

        if (!admin) {
            return NextResponse.json(
                { error: 'Admin account not found' },
                { status: StatusCodes.NOT_FOUND }
            );
        }

        return NextResponse.json({
            success: true,
            username: admin.username,
            email: admin.email
        });
    } catch (error) {
        console.error('[AUTH/PROFILE_GET]', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}

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
        const { username, email, currentPassword } = body;

        if (!username || !email || !currentPassword) {
            return NextResponse.json(
                { error: 'Username, email, and current password are required' },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        // Fetch current admin
        const admin = await prisma.admin.findUnique({
            where: { id: payload.adminId }
        });

        if (!admin) {
            return NextResponse.json(
                { error: 'Admin account not found' },
                { status: StatusCodes.NOT_FOUND }
            );
        }

        // Verify password before updating profile
        const isCurrentValid = await comparePassword(currentPassword, admin.passwordHash);
        if (!isCurrentValid) {
            return NextResponse.json(
                { error: 'Incorrect current password' },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        // Check if new username or email are already taken by another admin
        const duplicate = await prisma.admin.findFirst({
            where: {
                OR: [
                    { username },
                    { email }
                ],
                NOT: {
                    id: admin.id
                }
            }
        });

        if (duplicate) {
            return NextResponse.json(
                { error: 'Username or Email is already in use' },
                { status: StatusCodes.CONFLICT }
            );
        }

        // Update database record
        const updatedAdmin = await prisma.admin.update({
            where: { id: admin.id },
            data: { username, email }
        });

        const response = NextResponse.json(
            { success: true, message: 'Profile updated successfully', username: updatedAdmin.username, email: updatedAdmin.email },
            { status: StatusCodes.OK }
        );

        // Update public user payload cookie
        response.cookies.set(USER_PAYLOAD_COOKIE, JSON.stringify({ username: updatedAdmin.username }), {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: REFRESH_MAX_AGE,
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('[AUTH/PROFILE]', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}
