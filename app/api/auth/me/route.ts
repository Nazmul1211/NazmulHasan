// app/api/auth/me/route.ts — retrieve authenticated user payload with silent refresh fallback

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { StatusCodes } from 'http-status-codes';
import { 
    verifyJWT, 
    signAccessToken, 
    ACCESS_COOKIE, 
    REFRESH_COOKIE, 
    USER_PAYLOAD_COOKIE, 
    ACCESS_MAX_AGE,
    REFRESH_MAX_AGE 
} from '@/lib/auth';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get(ACCESS_COOKIE)?.value;
        const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;

        let payload = accessToken ? await verifyJWT(accessToken) : null;

        // If access token is expired, fall back to check refresh token
        if (!payload && refreshToken) {
            const refreshPayload = await verifyJWT(refreshToken);
            if (refreshPayload) {
                // Re-issue a new access token dynamically
                const newAccessToken = await signAccessToken({
                    username: refreshPayload.username,
                    adminId: refreshPayload.adminId
                });

                const response = NextResponse.json(
                    { success: true, username: refreshPayload.username },
                    { status: StatusCodes.OK }
                );

                const isProduction = process.env.NODE_ENV === 'production';

                // Set access cookie
                response.cookies.set(ACCESS_COOKIE, newAccessToken, {
                    httpOnly: true,
                    secure: isProduction,
                    sameSite: 'lax',
                    maxAge: ACCESS_MAX_AGE,
                    path: '/',
                });

                // Set public payload cookie
                response.cookies.set(USER_PAYLOAD_COOKIE, JSON.stringify({ username: refreshPayload.username }), {
                    secure: isProduction,
                    sameSite: 'lax',
                    maxAge: REFRESH_MAX_AGE,
                    path: '/',
                });

                return response;
            }
        }

        if (!payload) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: StatusCodes.UNAUTHORIZED }
            );
        }

        return NextResponse.json(
            { success: true, username: payload.username },
            { status: StatusCodes.OK }
        );
    } catch (error) {
        console.error('[AUTH/ME]', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}
