"use client";

import { createContext, useActionState, useContext, useEffect, useRef } from "react";
import { submitFind, type ActionState } from "@/app/contact/actions";
import type { FieldErrors } from "@/lib/schemas";
import { SOCIALS } from "@/lib/site";

/** The one form left on the site.
 *
 *  Everything conversational goes to email now. A find is different: it has a
 *  category, a link and a deadline, and those come back inconsistently when
 *  people write them in prose. The structure is the reason this stayed. */
export default function ShareFindForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(submitFind, null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitted = useRef<FormData | null>(null);

  /* React resets an uncontrolled form once its action completes. Right on
     success, wrong on failure — nobody should lose a paragraph over a typo in
     one field. */
  useEffect(() => {
    if (!state || state.ok || !submitted.current || !formRef.current) return;
    for (const [key, value] of submitted.current.entries()) {
      if (typeof value !== "string") continue;
      const field = formRef.current.elements.namedItem(key);
      if (!field) continue;
      if (field instanceof HTMLInputElement && field.type === "checkbox") {
        field.checked = value === "on";
      } else if (
        field instanceof HTMLInputElement ||
        field instanceof HTMLTextAreaElement ||
        field instanceof HTMLSelectElement
      ) {
        field.value = value;
      }
    }
  }, [state]);

  if (state?.ok) {
    return (
      <div className="note note-mint" role="status">
        <p className="text-[.9375rem]">{state.message}</p>
      </div>
    );
  }

  return (
    <>
      {state && !state.ok && <p className="form-error mb-6" role="alert">{state.message}</p>}

      <FormContext.Provider value={{ errors: state?.fieldErrors, pending }}>
        <form
          ref={formRef}
          className="grid sm:grid-cols-2 gap-5"
          action={(formData) => {
            submitted.current = formData;
            formAction(formData);
          }}
        >
          <div className="sm:col-span-2">
            <label className="label" htmlFor="s-find">What&rsquo;s the find?</label>
            <input className="input" id="s-find" name="find_name"
                   placeholder="Name of the scholarship, discount, event or place" />
            <FieldError name="find_name" />
          </div>

          <div>
            <label className="label" htmlFor="s-cat">Which section does it belong in?</label>
            <select className="select" id="s-cat" name="category" defaultValue="Student resources">
              <option>Student resources</option>
              <option>Opportunities</option>
              <option>Savings + student discounts</option>
              <option>Small business spotlight</option>
              <option>Not sure — you decide</option>
            </select>
            <FieldError name="category" />
          </div>

          <div>
            <label className="label" htmlFor="s-city">Where is it?</label>
            <input className="input" id="s-city" name="city" placeholder="Arlington, Denton, online…" />
            <FieldError name="city" />
          </div>

          <div className="sm:col-span-2">
            <label className="label" htmlFor="s-link">Link, if there is one</label>
            <input className="input" id="s-link" name="link" type="url" placeholder="https://" />
            <FieldError name="link" />
            <p className="hint">An Instagram handle or a phone number works just as well.</p>
          </div>

          <div className="sm:col-span-2">
            <label className="label" htmlFor="s-detail">Tell us how it works</label>
            <textarea className="textarea" id="s-detail" name="details"
                      placeholder="Who qualifies, what you need to bring, any deadline you know about." />
            <FieldError name="details" />
          </div>

          <div>
            <label className="label" htmlFor="s-email">Your email</label>
            <input className="input" id="s-email" name="email" type="email" placeholder="you@school.edu" />
            <FieldError name="email" />
          </div>

          <div>
            <label className="label" htmlFor="s-school">
              Your school <span style={{ fontWeight: 400, color: "var(--ink-soft)" }}>(optional)</span>
            </label>
            <input className="input" id="s-school" name="school" placeholder="UT Arlington" />
            <FieldError name="school" />
          </div>

          <div className="sm:col-span-2">
            <label className="check">
              <input type="checkbox" name="credit" />
              <span>Credit me on the listing if you post it.</span>
            </label>
          </div>

          <div className="sm:col-span-2 flex flex-wrap items-center gap-5 pt-1">
            <button className="btn btn-pink" type="submit" disabled={pending}>
              {pending ? "Sending…" : "Send it in"}
            </button>
            <span className="meta">
              Or just email it to{" "}
              <a className="lnk" href={`mailto:${SOCIALS.email}?subject=A%20find%20for%20Fundsy`}>
                {SOCIALS.email}
              </a>.
            </span>
          </div>
        </form>
      </FormContext.Provider>
    </>
  );
}

const FormContext = createContext<{ errors?: FieldErrors; pending: boolean }>({ pending: false });

function FieldError({ name }: { name: string }) {
  const { errors } = useContext(FormContext);
  const message = errors?.[name]?.[0];
  if (!message) return null;
  return <p className="field-error">{message}</p>;
}
