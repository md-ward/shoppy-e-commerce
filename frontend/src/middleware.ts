import createMiddleware from "next-intl/middleware";
import { adminAuthMiddleware, chainMiddleware } from "./middlewares/chain";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

// ✅ Correct usage: pass each middleware as a separate argument
export const middleware = chainMiddleware(
  async (request: NextRequest) => {
    request.headers.set("x-current-path", request.nextUrl.pathname);
  },
  adminAuthMiddleware,
  async (request) => createMiddleware(routing)(request),
);

export const config = {
  // Match all pathnames except for:
  // - … if they start with `/api`, `/trpc`, `/_next`, or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
