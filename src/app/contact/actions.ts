"use server";

import { randomUUID } from "node:crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  MAX_RESUME_BYTES,
  RESUME_TYPES,
  findSchema,
  partnershipSchema,
  questionSchema,
  resumeSchema,
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

export async function submitResume(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = resumeSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return invalid(parsed.error.flatten().fieldErrors as FieldErrors);

  const file = formData.get("resume");
  if (!(file instanceof File) || file.size === 0) {
    return invalid({ resume: ["Attach your resume so we have something to read."] });
  }
  /* The bucket enforces these too. Checking here as well means the student gets
     a sentence they can act on instead of a storage error. */
  if (file.size > MAX_RESUME_BYTES) {
    return invalid({ resume: ["That file is over 10 MB. A PDF export is usually much smaller."] });
  }
  if (!RESUME_TYPES.includes(file.type)) {
    return invalid({ resume: ["We can read PDF and Word files."] });
  }

  const supabase = supabaseAdmin();
  /* A random path, not the student's name: object paths end up in logs and
     signed URLs, and a name plus a school is identifying on its own. */
  const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "pdf";
  const path = `${new Date().getFullYear()}/${randomUUID()}.${ext}`;

  try {
    const upload = await supabase.storage
      .from("resumes")
      .upload(path, file, { contentType: file.type, upsert: false });
    if (upload.error) throw upload.error;

    const { error } = await supabase
      .from("resume_reviews")
      .insert({ ...parsed.data, resume_path: path });

    if (error) {
      /* Don't leave an orphaned file in the bucket if the row didn't land. */
      await supabase.storage.from("resumes").remove([path]);
      throw error;
    }
  } catch (e) {
    console.error("[resume_reviews] submit failed", e);
    return failed();
  }

  return {
    ok: true,
    message: "Your resume is with us. Reviews go out on Sundays, and we delete the file once we've sent you notes.",
  };
}
