import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const adminToken = req.cookies.get('adminToken')?.value;

  // If no adminToken exists, redirect to the login page
  if (!adminToken) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  // Add logic to validate the token against Supabase if needed
  // const isValid = validateTokenWithSupabase(adminToken);
  // if (!isValid) {
  //   return NextResponse.redirect(new URL('/admin/login', req.url));
  // }

  // Allow the request to continue
  return NextResponse.next();
}

// Define the routes the middleware should apply to
export const config = {
  matcher: ['/admin/:path*'], // Protect all routes under /admin/
};
