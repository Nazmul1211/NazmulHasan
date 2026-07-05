// middleware.ts — JWT access/refresh token validation and silent token refresh logic

import { NextResponse, type NextRequest } from 'next/server';
import { 
    verifyJWT, 
    signAccessToken, 
    ACCESS_COOKIE, 
    REFRESH_COOKIE, 
    USER_PAYLOAD_COOKIE,
    ACCESS_MAX_AGE 
} from '@/lib/auth';

const PROTECTED_DASHBOARD = '/admin/dashboard';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isDashboardRoute = pathname.startsWith(PROTECTED_DASHBOARD);
    const isApiRoute = pathname.startsWith('/api/');
    
    // API routes that are PUBLIC (no authentication checks needed)
    const isPublicLogin = pathname === '/api/auth/login';
    const isPublicContactSubmit = pathname === '/api/contact' && request.method === 'POST';

    // ── Bypass checks for public API routes ───────────────────────
    if (isApiRoute && (isPublicLogin || isPublicContactSubmit)) {
        return NextResponse.next();
    }

    // ── Authentication Check for protected routes ──────────────────
    if (isDashboardRoute || isApiRoute) {
        const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
        const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;

        // 1. Try validating short-lived access token first
        if (accessToken) {
            const accessPayload = await verifyJWT(accessToken);
            if (accessPayload) {
                // Token is valid, proceed
                return NextResponse.next();
            }
        }

        // 2. If access token is expired/missing, check long-lived refresh token
        if (refreshToken) {
            const refreshPayload = await verifyJWT(refreshToken);
            
            if (refreshPayload) {
                // Silent refresh: Issue a new access token on the fly
                const newAccessToken = await signAccessToken({
                    username: refreshPayload.username,
                    adminId: refreshPayload.adminId
                });

                // Generate response (page redirect or API response)
                let response = NextResponse.next();
                
                // Set the new access token cookie in the response
                response.cookies.set(ACCESS_COOKIE, newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    path: '/',
                    maxAge: ACCESS_MAX_AGE
                });

                // Set user payload cookie so client JS can read status easily
                response.cookies.set(USER_PAYLOAD_COOKIE, JSON.stringify({ username: refreshPayload.username }), {
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    path: '/',
                    maxAge: ACCESS_MAX_AGE
                });

                return response;
            }
        }

        // 3. Fallback: Both tokens are invalid or expired
        if (isDashboardRoute) {
            const response = NextResponse.redirect(new URL('/admin', request.url));
            response.cookies.delete(ACCESS_COOKIE);
            response.cookies.delete(REFRESH_COOKIE);
            response.cookies.delete(USER_PAYLOAD_COOKIE);
            return response;
        }

        if (isApiRoute) {
            return NextResponse.json({ error: 'Unauthorized or token expired' }, { status: 401 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/dashboard/:path*',
        '/api/:path*',
    ],
};
