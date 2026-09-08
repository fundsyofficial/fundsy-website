import type { Metadata } from "next";
import Link from "next/link";
import { signOut } from "./actions";
import { supabaseServer } from "@/lib/supabase/server-client";

export const metadata: Metadata = {
  title: "Admin",
  /* Never index the editor. */
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="wrap py-10 md:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6"
           style={{ borderBottom: "1px solid var(--ink-hair)" }}>
        <div className="flex flex-wrap items-baseline gap-4">
          <Link className="h3" href="/admin" style={{ textDecoration: "none" }}>Fundsy admin</Link>
          <Link className="lnk text-sm" href="/">View the site</Link>
        </div>
        {user && (
          <form action={signOut} className="flex items-center gap-4">
            <span className="meta">{user.email}</span>
            <button className="btn btn-plain btn-sm" type="submit">Sign out</button>
          </form>
        )}
      </div>
      {children}
    </div>
  );
}
