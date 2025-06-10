import { auth } from "@/lib/auth";

export default auth(async (req) => {
  const { pathname } = req.nextUrl;

  const isRoot = pathname === "/";
  const isApiAuth = pathname.startsWith("/api/auth");
  const isAuthError = pathname === "/auth/error";
  const isAuthPage =
    (pathname === "/auth" || pathname.startsWith("/auth/")) && !isAuthError;

  if (!req.auth) {
    // Allow unauthenticated access to /, /api/auth, and /auth (except /auth/error)
    if (isRoot || isApiAuth || isAuthPage) {
      return;
    }
    // Block /auth/error for unauthenticated users
    if (isAuthError) {
      const newUrl = new URL("/api/auth/signin", req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
    // Redirect all other unauthenticated requests to sign in
    const newUrl = new URL("/api/auth/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  } else {
    if (req.nextUrl.pathname !== "/auth/error") {
      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/oauth/validate`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: req.headers.get("cookie") || "",
          },
        }
      );

      const isUser = await userResponse.json();

      if (!isUser.found) {
        const newUrl = new URL("/auth/error", req.nextUrl.origin);
        return Response.redirect(newUrl);
      }
    }

    // If authenticated, block / and /auth/** except /auth/error
    if (isRoot || isAuthPage) {
      const newUrl = new URL("/files", req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
    // Allow /auth/error and all other authenticated requests
    return;
  }
});

export const config = {
  matcher: [
    "/((?!api/oauth|auth/access|api/auth|_next/static|_next/image|icon.svg).*)",
  ],
};
