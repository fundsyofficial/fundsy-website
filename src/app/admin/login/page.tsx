"use client";

import { useActionState } from "react";
import { sendMagicLink, type LoginState } from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(sendMagicLink, null);

  return (
    <div style={{ maxWidth: 460 }}>
      <h1 className="h2 mb-3">Sign in</h1>
      <p className="prose mb-7" style={{ color: "var(--ink-soft)" }}>
        We&rsquo;ll email you a link. No password to remember or lose.
      </p>

      {state?.ok ? (
        <div className="note note-mint" role="status">
          <p className="text-[.9375rem]">{state.message}</p>
        </div>
      ) : (
        <form action={formAction} className="grid gap-5">
          {state && !state.ok && (
            <p className="form-error" role="alert">{state.message}</p>
          )}
          <div>
            <label className="label" htmlFor="email">Your email</label>
            <input className="input" id="email" name="email" type="email" autoComplete="email"
                   placeholder="amy@fundsy.org" required />
          </div>
          <div>
            <button className="btn btn-pink" type="submit" disabled={pending}>
              {pending ? "Sending…" : "Email me a link"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
