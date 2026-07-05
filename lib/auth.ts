// lib/auth.ts — Access & Refresh JWT Token and Password utilities

import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import bcrypt from 'bcryptjs';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET ?? 'fallback-dev-secret-change-in-prod-32chars'
);

export const ACCESS_COOKIE = 'nh_access_token';
export const REFRESH_COOKIE = 'nh_refresh_token';
export const USER_PAYLOAD_COOKIE = 'nh_user_payload';

export const ACCESS_MAX_AGE = 15 * 60; // 15 minutes in seconds
export const REFRESH_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

export interface AdminJWTPayload extends JWTPayload {
    username: string;
    adminId: number;
}

// ─── JWT Signing Utilities ───────────────────────────────────

export async function signAccessToken(payload: { username: string; adminId: number }): Promise<string> {
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('15m') // 15 mins short-lived access token
        .sign(JWT_SECRET);
}

export async function signRefreshToken(payload: { username: string; adminId: number }): Promise<string> {
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d') // 7 days long-lived refresh token
        .sign(JWT_SECRET);
}

export async function verifyJWT(token: string): Promise<AdminJWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as AdminJWTPayload;
    } catch {
        return null;
    }
}

// ─── Password Hashing Utilities ──────────────────────────────

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}
