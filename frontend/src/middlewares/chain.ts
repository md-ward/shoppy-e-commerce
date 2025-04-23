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
export async function adminAuthMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // If no locale is present, rewrite with default "en" locale
  if (!pathname.startsWith("/ar") && !pathname.startsWith("/en")) {
    const defaultLocale = await getLocale(); // e.g., returns "en"
    console.log({ defaultLocale });

    const rewrittenPath = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(new URL(rewrittenPath, request.url));
  }

  const token = request.cookies.get("AdToken");
  // Admin path check (excluding /login page)
  if (
    pathname.match(/^\/(en|ar)\/admin(\/.*)?$/) &&
    !pathname.endsWith("/login") &&
    !token
  ) {
    const locale = pathname.startsWith("/ar") ? "ar" : "en";
    return NextResponse.redirect(
      new URL(`/${locale}/admin/login`, request.url),
    );
  }
}
