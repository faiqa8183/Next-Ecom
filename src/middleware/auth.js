// middleware/auth.js

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  // Not logged in at all
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Logged in, but not an admin trying to access admin route
  if (isAdminRoute && token.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url)); // Or an "unauthorized" page
  }

  // Allowed
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/protected/:path*"], // Adjust based on your protected paths
};
// middleware/auth.js

// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//   const { pathname } = req.nextUrl;

//   const isAdminRoute = pathname.startsWith("/admin");

//   if (!token) {
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }

//   if (isAdminRoute && token.role !== "admin") {
//     return NextResponse.redirect(new URL("/products", req.url)); // or /unauthorized
//   }

//   return NextResponse.next();
// }

// export const config = {
//     matcher: ["/admin/:path*"], // ONLY protect /admin
//   };
  