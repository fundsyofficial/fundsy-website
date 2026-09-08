import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server-client";

/** Where a magic link lands.
 *
 *  Two shapes are accepted. Our own email template sends `token_hash`, which is
 *  one hop. A project still on Supabase's default template bounces through its
 *  verify endpoint and arrives with a PKCE `code` instead — handled too, so a
 *  hosted project works before anyone remembers to paste the template in. */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const next = searchParams.get("next") ?? "/admin";
  const supabase = await supabaseServer();

  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) redirect(next);
    console.error("[auth] otp verify failed", error.message);
    redirect("/admin/login?error=link");
  }

  const code = searchParams.get("code");
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) redirect(next);
    console.error("[auth] code exchange failed", error.message);
  }

  redirect("/admin/login?error=link");
}
