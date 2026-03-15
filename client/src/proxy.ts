import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value || request.cookies.get('qh_token')?.value;
  const userCookie = request.cookies.get('qh_user')?.value;
  
  let userRole = null;
  if (userCookie) {
    try {
      const parsedUser = JSON.parse(userCookie);
      userRole = parsedUser.role;
    } catch {
      // ignore
    }
  }

  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/dashboard/admin');
  const isCandidateRoute = pathname.startsWith('/dashboard/candidate');

  if (isAdminRoute || isCandidateRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const isAdmin = userRole === 'admin' || userRole === 'super_admin';

    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL('/dashboard/candidate', request.url));
    }

    if (isCandidateRoute && isAdmin) {
      return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/admin/:path*', '/dashboard/candidate/:path*'],
};
