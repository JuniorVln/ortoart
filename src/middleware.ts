import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Allow login page
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Allow API routes for auth
  if (pathname.startsWith("/admin/api")) {
    return NextResponse.next();
  }

  // Allow static assets under /admin
  if (pathname.includes(".")) {
    return NextResponse.next();
  }

  // Check for session cookie
  const sessionCookie = request.cookies.get("__Secure-authjs.session-token")
    ?? request.cookies.get("authjs.session-token");

  if (!sessionCookie) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
