import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Forwards the request pathname so the root layout can set `<html lang>` correctly on the server. */
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
