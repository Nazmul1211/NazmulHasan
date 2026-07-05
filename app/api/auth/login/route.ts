// app/api/auth/login/route.ts — login with access + refresh token flow

import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import prisma from '@/lib/prisma';
import { 
    comparePassword, 
    signAccessToken, 
    signRefreshToken, 
    ACCESS_COOKIE, 
    REFRESH_COOKIE, 
    USER_PAYLOAD_COOKIE,
    ACCESS_MAX_AGE,
    REFRESH_MAX_AGE 
} from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const emailOrUsername = body.emailOrUsername || body.username || '';
        const { password } = body;

        if (!emailOrUsername || !password) {
            return NextResponse.json(
                { error: 'Email/Username and password are required' },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        // Find admin by username or email
        const admin = await prisma.admin.findFirst({
            where: {
                OR: [
                    { username: emailOrUsername },
                    { email: emailOrUsername }
                ]
            }
        });
        if (!admin) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        // Verify password
        const isValid = await comparePassword(password, admin.passwordHash);
        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        // Issue access token and refresh token
        const accessToken = await signAccessToken({ username: admin.username, adminId: admin.id });
        const refreshToken = await signRefreshToken({ username: admin.username, adminId: admin.id });

        const response = NextResponse.json(
            { success: true, username: admin.username },
            { status: StatusCodes.OK }
        );

        const isProduction = process.env.NODE_ENV === 'production';

        // 1. Set short-lived Access Token cookie (httpOnly)
        response.cookies.set(ACCESS_COOKIE, accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'lax',
            maxAge: ACCESS_MAX_AGE,
            path: '/',
        });

        // 2. Set long-lived Refresh Token cookie (httpOnly)
        response.cookies.set(REFRESH_COOKIE, refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'lax',
            maxAge: REFRESH_MAX_AGE,
            path: '/',
        });

        // 3. Set client-readable User Payload cookie (NOT httpOnly)
        response.cookies.set(USER_PAYLOAD_COOKIE, JSON.stringify({ username: admin.username }), {
            secure: isProduction,
            sameSite: 'lax',
            maxAge: REFRESH_MAX_AGE,
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('[AUTH/LOGIN]', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}
