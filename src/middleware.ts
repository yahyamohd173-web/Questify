import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const protectedRoutes = ['/dashboard', '/activities', '/history', '/profile', '/achievements', '/insights'];
const publicRoutes = ['/login', '/signup', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  const secret = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET;
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !token) return NextResponse.redirect(new URL('/login', request.url));

  if (isProtected && token && secret) {
    try {
      jwt.verify(token, secret);
    } catch {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.set('token', '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
      return response;
    }
  }

  if (isPublic && token && secret) {
    try {
      jwt.verify(token, secret);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch {
      // Invalid token: clear it and allow the public page.
      const response = NextResponse.next();
      response.cookies.set('token', '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ['/((?!api|_next|public).*)'] };
