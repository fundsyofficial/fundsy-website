import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware-client";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  /* Everything except static assets — the session cookie has to be refreshed
     on real page requests, not on every image. */
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets/).*)"],
};
