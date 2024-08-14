import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup';
    const token = request.cookies.get("token")?.value || ''

    // user has token and trying to access login or signup it should redirected to home page
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/home', request.nextUrl));
    }

    // if user doesnt have token and trying to access protected paths(eg: profile, dashboard) it should redirected to login first
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

}

// protected paths
export const config = {
    matcher: [
        '/home',
        '/login',
        '/signup',
        '/profile',
    ]
}