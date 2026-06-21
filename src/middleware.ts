import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const protectedRoutes = ['/dashboard', '/activities', '/history', '/profile'];
const publicRoutes = ['/login', '/signup', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // Check if route is protected
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublic = publicRoutes.some(route => pathname.startsWith(route));

  // If protected route and no token, redirect to login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If public route and has token, redirect to dashboard
  if (isPublic && token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'secret');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch (error) {
      // Token invalid, allow access to public route
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|public).*)'],
};
