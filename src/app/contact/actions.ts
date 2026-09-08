"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  findSchema,
  partnershipSchema,
  questionSchema,
  type FieldErrors,
} from "@/lib/schemas";

export type ActionState = {
  ok: boolean;
  message: string;
  fieldErrors?: FieldErrors;
} | null;

/** Anything that goes wrong past validation is logged server-side and shown to
 *  the student as a plain "it didn't send" with a way to reach us. They should
 *  never see a Postgres error, and they should never be told it worked when it
 *  didn't. */
function failed(): ActionState {
  return {
    ok: false,
    message:
      "Something went wrong sending that. Nothing was saved — try again, or email hello@fundsy.org and we'll pick it up there.",
  };
}

function invalid(fieldErrors: FieldErrors): ActionState {
  return { ok: false, message: "Have a look at the highlighted fields.", fieldErrors };
}

export async function submitFind(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = findSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error.flatten().fieldErrors as FieldErrors);

  try {
    const { error } = await supabaseAdmin().from("finds").insert(parsed.data);
    if (error) throw error;
  } catch (e) {
    console.error("[finds] insert failed", e);
    return failed();
  }
  return { ok: true, message: "Got it. A student on the team reads every one of these — thank you." };
}

export async function submitQuestion(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = questionSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error.flatten().fieldErrors as FieldErrors);

  try {
    const { error } = await supabaseAdmin().from("questions").insert(parsed.data);
    if (error) throw error;
  } catch (e) {
    console.error("[questions] insert failed", e);
    return failed();
  }
  return { ok: true, message: "Sent. Amy or Ryan will write back, usually within two or three days." };
}

export async function submitPartnership(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = partnershipSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error.flatten().fieldErrors as FieldErrors);

  try {
    const { error } = await supabaseAdmin().from("partnership_requests").insert(parsed.data);
    if (error) throw error;
  } catch (e) {
    console.error("[partnership_requests] insert failed", e);
    return failed();
  }
  return { ok: true, message: "Thank you — Amy handles partnerships and will reply personally." };
}
