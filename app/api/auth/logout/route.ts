// app/api/auth/logout/route.ts — clear access, refresh, and public payload tokens

import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { ACCESS_COOKIE, REFRESH_COOKIE, USER_PAYLOAD_COOKIE } from '@/lib/auth';

export async function POST() {
    try {
        const response = NextResponse.json(
            { success: true },
            { status: StatusCodes.OK }
        );

        // Delete all authentication cookies
        response.cookies.delete(ACCESS_COOKIE);
        response.cookies.delete(REFRESH_COOKIE);
        response.cookies.delete(USER_PAYLOAD_COOKIE);

        return response;
    } catch (error) {
        console.error('[AUTH/LOGOUT]', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
}
