import { updateSession } from "@/utils/supabase/middleware";
import { NextResponse } from "next/server";
import { getProfile, isAuthenticated } from "./utils/authWrapper";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

const unprotectedRoutes = ["/login", "/sign-up"];

export async function middleware(request) {
  const authStatus = await isAuthenticated();

  if (!authStatus) {
    if (request.nextUrl.pathname.startsWith("/api")) {
      return new Response("Not Authorized", { status: 401 });
    }

    if (!unprotectedRoutes.includes(request.nextUrl.pathname)) {
      const absoluteURL = new URL("/login", request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  } else {
    const profileStatus = await getProfile(authStatus);

    console.log(authStatus, profileStatus);

    if (
      !profileStatus &&
      !request.nextUrl.pathname.startsWith("/create-profile") &&
      !request.nextUrl.pathname.startsWith("/api/profiles")
    ) {
      const profileURL = new URL("/create-profile", request.nextUrl.origin);
      return NextResponse.redirect(profileURL.toString());
    }
  }

  return await updateSession(request);
}
