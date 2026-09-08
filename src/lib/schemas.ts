import { z } from "zod";

/** Validation runs on the server, not just in the browser. Anything the forms
 *  promise students — that consent is required, that a resume is a PDF or Word
 *  file under 10 MB — has to hold even if the request never came from our page. */

const email = z.string().trim().min(1, "We need an email to write back to.").email("That doesn't look like an email address.");
const required = (label: string) => z.string().trim().min(1, `${label} is needed.`);
const optional = z.string().trim().optional().or(z.literal("")).transform((v) => v || null);

/* FormData sends "on" for a ticked box and omits the field entirely otherwise,
   so neither z.boolean() nor z.coerce.boolean() reads a checkbox correctly. */
const truthyCheckbox = (v: unknown) => v === "on" || v === "true" || v === true;
const checkbox = z.preprocess(truthyCheckbox, z.boolean());

export const findSchema = z.object({
  find_name: required("A name for the find"),
  category: required("A section"),
  city: optional,
  link: z.string().trim().url("Links need to start with http:// or https://").or(z.literal("")).transform((v) => v || null),
  details: optional,
  email,
  school: optional,
  /* An unchecked box sends nothing at all; a checked one sends "on". */
  credit: checkbox,
});

export const questionSchema = z.object({
  name: required("Your name"),
  email,
  topic: required("A topic"),
  message: required("A message"),
});

export const partnershipSchema = z.object({
  organisation: required("The business or organisation name"),
  contact_name: required("A name to reply to"),
  email,
  website: optional,
  partner_type: required("A partnership type"),
  message: optional,
});

export const MAX_RESUME_BYTES = 10 * 1024 * 1024;
export const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const resumeSchema = z.object({
  name: required("Your name"),
  email,
  school: required("Your school"),
  year: required("Your year"),
  goal: optional,
  /* The checkbox is not a formality. Without it we have no permission to store
     the file, and the database rejects the row anyway. */
  consent: z.preprocess(
    truthyCheckbox,
    z.literal(true, { message: "We can only store your file if you tick the consent box." }),
  ),
});

export type FieldErrors = Record<string, string[]>;
