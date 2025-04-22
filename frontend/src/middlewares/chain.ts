import { getLocale } from "next-intl/server";
import { NextRequest, NextResponse } from "next/server";

// Chain middlewares
export function chainMiddleware(
  ...middlewares: Array<(request: NextRequest) => Promise<NextResponse | void>>
) {
  return async (request: NextRequest) => {
    for (const middleware of middlewares) {
      const response = await middleware(request);
      if (response) {
        return response; // Stop the chain if a middleware returns a response
      }
    }
    return NextResponse.next(); // Continue if no middleware interrupts
  };
}

// Admin Auth Middleware
export async function adminAuthMiddleware(request: NextRequest) {
  const locale = await getLocale(); // e.g., "en", "ar", etc.
  const pathname = request.nextUrl.pathname;
  const isLoginPath = pathname === `/${locale}/admin/login`;
  if (pathname.startsWith(`/${locale}/admin`) && !isLoginPath) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/admin/login`;
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next();
    }
  }
}
