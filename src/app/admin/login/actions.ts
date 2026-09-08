"use server";

import { headers } from "next/headers";
import { supabaseServer } from "@/lib/supabase/server-client";

export type LoginState = { ok: boolean; message: string } | null;

export async function sendMagicLink(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email) return { ok: false, message: "Enter the email address you use for Fundsy." };

  const origin = (await headers()).get("origin") ?? "http://localhost:3000";
  const supabase = await supabaseServer();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/confirm`,
      /* No self-signup: an address has to already exist as a user. */
      shouldCreateUser: false,
    },
  });

  if (error) {
    console.error("[login] magic link failed", error);
    /* Deliberately vague. Telling a stranger which addresses exist is a way of
       handing them a list of accounts to attack. */
    return {
      ok: true,
      message: "If that address can edit Fundsy, a sign-in link is on its way. It expires in an hour.",
    };
  }

  return {
    ok: true,
    message: "Check your email — the sign-in link expires in an hour.",
  };
}
