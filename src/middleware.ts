import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

const PUBLIC_PATHS = [
  "/",
  "/welcome",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/onboarding",
  "/chapters",
  "/study",
  "/practice",
  "/mock-exam",
  "/pricing",
  "/faq",
  "/language",
  "/provincial",
  "/contact",
  "/about",
  "/blog",
];

const PUBLIC_API_PATHS = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
  "/api/faqs",
  "/api/languages",
  "/api/provinces",
  "/api/pricing",
  "/api/banners",
  "/api/testimonials",
  "/api/blogs",
  "/api/app-settings",
  "/api/topics",
  "/api/chapters",
  "/api/questions",
  "/api/mock-tests",
  "/api/categories",
  "/api/blog-categories",
  "/api/contact-messages",
  "/api/site-contacts",
  "/api/site-stats",
  "/api/stripe-public-key",
  "/api/stripe-webhook",
];

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) return true;
  if (PUBLIC_API_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) return true;
  // Static assets
  if (pathname.startsWith("/_next/")) return true;
  if (pathname.startsWith("/static/")) return true;
  if (pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|json)$/)) return true;
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Check auth token
  const token = request.cookies.get("token")?.value;
  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = await verifyToken(token);
  if (!user) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow users to access their own profile endpoint: /api/users/{theirId}
  const userSelfMatch = pathname.match(/^\/api\/users\/(\d+)\/$/);
  if (userSelfMatch && Number(userSelfMatch[1]) === user.userId) {
    return NextResponse.next();
  }

  // Admin-only paths. NOTE: /api/subscriptions and /api/subscriptions/current are
  // intentionally NOT admin-gated — their handlers call getAuthUser() and scope to
  // the caller's own userId, so any logged-in user must reach them (otherwise paid
  // users get 403 and never see their active subscription). Admin's global view is
  // /api/admin/subscription-stats.
  const adminPaths = ["/users", "/api/users", "/api/payments", "/api/activity-logs", "/admin", "/api/admin"];
  const isAdminPath = adminPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (isAdminPath && user.role !== "admin") {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.redirect(new URL("/app", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
