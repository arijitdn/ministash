import { auth } from "@/lib/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isRoot = pathname === "/";
  const isApiAuth = pathname.startsWith("/api/auth");
  const isAuthPage = pathname === "/auth" || pathname.startsWith("/auth/");

  if (!req.auth) {
    // Allow unauthenticated access to /, /api/auth, and /auth/**
    if (isRoot || isApiAuth || isAuthPage) {
      return;
    }
    // Redirect all other unauthenticated requests to sign in
    const newUrl = new URL("/api/auth/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  } else {
    // If authenticated, block / and /auth/**
    if (isRoot || isAuthPage) {
      const newUrl = new URL("/files", req.nextUrl.origin); // or wherever you want to redirect
      return Response.redirect(newUrl);
    }
    // Allow all other authenticated requests
    return;
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|icon.svg).*)"],
};
