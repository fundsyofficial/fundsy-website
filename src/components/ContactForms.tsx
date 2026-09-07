"use client";

import { useEffect, useRef, useState } from "react";

/** One page, four purposes, so nobody has to guess which page their message
 *  belongs on. Deep links work: /contact#resume opens the resume panel.
 *
 *  Phase 4: each panel gets its own server action writing to Supabase, and the
 *  resume panel uploads to a private bucket. Nothing submits yet — the forms
 *  deliberately have no action so a half-built endpoint can't silently eat a
 *  student's message. */

const PANELS = [
  { id: "share", label: "Share a find" },
  { id: "general", label: "General question" },
  { id: "partner", label: "Partner with us" },
  { id: "resume", label: "Resume help" },
] as const;

type PanelId = (typeof PANELS)[number]["id"];

export default function ContactForms() {
  const [active, setActive] = useState<PanelId>("share");
  const [fileName, setFileName] = useState<string | null>(null);
  const headingRefs = useRef<Record<string, HTMLHeadingElement | null>>({});
  const registerHeading = (id: PanelId, el: HTMLHeadingElement | null) => {
    headingRefs.current[id] = el;
  };

  /* Deep links and back/forward both select the right panel. */
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace("#", "") as PanelId;
      if (PANELS.some((p) => p.id === id)) setActive(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const select = (id: PanelId) => {
    setActive(id);
    /* Move focus to the panel heading so a keyboard user lands in the form,
       not back at the top of the page. */
    requestAnimationFrame(() => headingRefs.current[id]?.focus());
  };

  return (
    <div>
      <div className="seg mb-8" role="tablist" aria-label="What are you contacting us about?">
        {PANELS.map((p) => (
          <button
            key={p.id}
            role="tab"
            id={p.id}
            aria-selected={active === p.id}
            aria-controls={`panel-${p.id}`}
            onClick={() => select(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <Panel id="share" active={active} registerHeading={registerHeading} title="Know something we should share?"
        blurb="Scholarships, discounts, free events, a restaurant that quietly takes student IDs — if it saves a DFW student money, we want it. A student on our team checks every submission before it goes on the board.">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="s-find">What&rsquo;s the find?</label>
          <input className="input" id="s-find" name="find_name" placeholder="Name of the scholarship, discount, event or place" />
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
        </div>
        <div>
          <label className="label" htmlFor="s-city">Where is it?</label>
          <input className="input" id="s-city" name="city" placeholder="Arlington, Denton, online…" />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="s-link">Link, if there is one</label>
          <input className="input" id="s-link" name="link" type="url" placeholder="https://" />
          <p className="hint">An Instagram handle or a phone number works just as well.</p>
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="s-detail">Tell us how it works</label>
          <textarea className="textarea" id="s-detail" name="details" placeholder="Who qualifies, what you need to bring, any deadline you know about." />
        </div>
        <div>
          <label className="label" htmlFor="s-email">Your email</label>
          <input className="input" id="s-email" name="email" type="email" placeholder="you@school.edu" />
        </div>
        <div>
          <label className="label" htmlFor="s-school">Your school <span style={{ fontWeight: 400, color: "var(--ink-soft)" }}>(optional)</span></label>
          <input className="input" id="s-school" name="school" placeholder="UT Arlington" />
        </div>
        <div className="sm:col-span-2">
          <label className="check"><input type="checkbox" name="credit" /><span>Credit me on the listing if you post it.</span></label>
        </div>
        <Submit label="Send it in" note="We read everything, even when we can’t post it." />
      </Panel>

      <Panel id="general" active={active} registerHeading={registerHeading} title="Ask us anything"
        blurb="Questions about a listing, a broken link, joining as an ambassador, or how any of this works. If you’re stuck on something and don’t know who to ask, start here.">
        <div>
          <label className="label" htmlFor="g-name">Your name</label>
          <input className="input" id="g-name" name="name" placeholder="First and last" />
        </div>
        <div>
          <label className="label" htmlFor="g-email">Your email</label>
          <input className="input" id="g-email" name="email" type="email" placeholder="you@school.edu" />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="g-topic">What&rsquo;s this about?</label>
          <select className="select" id="g-topic" name="topic" defaultValue="A question about a listing">
            <option>A question about a listing</option>
            <option>Something on the site is broken</option>
            <option>Becoming a campus ambassador</option>
            <option>Press or an interview</option>
            <option>Something else</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="g-msg">Your message</label>
          <textarea className="textarea" id="g-msg" name="message" placeholder="As much or as little detail as you like." />
        </div>
        <Submit label="Send message" note="Replies usually land within two or three days." />
      </Panel>

      <Panel id="partner" active={active} registerHeading={registerHeading} title="Partner with Fundsy"
        blurb="We work with DFW businesses, campus offices and nonprofits that want to reach students honestly. Spotlights are free for small businesses. Tell us who you are and what you’d like to offer students, and we’ll come back with what we can do.">
        <div>
          <label className="label" htmlFor="p-org">Business or organisation</label>
          <input className="input" id="p-org" name="organisation" placeholder="Ceci’s Coffee" />
        </div>
        <div>
          <label className="label" htmlFor="p-contact">Who should we reply to?</label>
          <input className="input" id="p-contact" name="contact_name" placeholder="Name and role" />
        </div>
        <div>
          <label className="label" htmlFor="p-email">Email</label>
          <input className="input" id="p-email" name="email" type="email" placeholder="hello@yourbusiness.com" />
        </div>
        <div>
          <label className="label" htmlFor="p-site">Website or Instagram</label>
          <input className="input" id="p-site" name="website" placeholder="@yourbusiness" />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="p-type">What kind of partnership?</label>
          <select className="select" id="p-type" name="partner_type" defaultValue="A free small business spotlight">
            <option>A free small business spotlight</option>
            <option>A student discount you&rsquo;d like listed</option>
            <option>An event or campus pop-up</option>
            <option>Posting a job or internship</option>
            <option>Something else</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="p-msg">What would you like students to know?</label>
          <textarea className="textarea" id="p-msg" name="message" placeholder="What you offer, where you are, and anything students get." />
        </div>
        <Submit label="Send partnership request" note="Amy handles partnerships and replies personally." />
      </Panel>

      <Panel id="resume" active={active} registerHeading={registerHeading} title="Send us your resume"
        blurb="Upload it and one of us will read it properly and write back with notes — what’s working, what to cut, and how to describe the job you actually did. It’s free, it takes us about a week, and only the Fundsy team sees your file.">
        <div>
          <label className="label" htmlFor="r-name">Your name</label>
          <input className="input" id="r-name" name="name" placeholder="First and last" />
        </div>
        <div>
          <label className="label" htmlFor="r-email">Your email</label>
          <input className="input" id="r-email" name="email" type="email" placeholder="you@school.edu" />
        </div>
        <div>
          <label className="label" htmlFor="r-school">School</label>
          <input className="input" id="r-school" name="school" placeholder="UT Dallas" />
        </div>
        <div>
          <label className="label" htmlFor="r-year">Year</label>
          <select className="select" id="r-year" name="year" defaultValue="First year">
            <option>First year</option><option>Sophomore</option><option>Junior</option>
            <option>Senior</option><option>Graduate student</option><option>Recent graduate</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <span className="label">Your resume</span>
          <label className="drop" htmlFor="r-file">
            <span className="h3" style={{ display: "block", marginBottom: 6 }}>Choose a file, or drop it here</span>
            <span className="meta">{fileName ? `${fileName} — ready to send` : "PDF or Word, up to 10 MB"}</span>
            <input
              type="file"
              id="r-file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
            />
          </label>
          <p className="hint">Files are stored privately and deleted once we&rsquo;ve sent you notes.</p>
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="r-goal">What are you applying for?</label>
          <textarea className="textarea" id="r-goal" name="goal" style={{ minHeight: 110 }}
            placeholder="A specific role, an industry, or just ‘anything paid this summer’ — all useful to know." />
        </div>
        <div className="sm:col-span-2">
          <label className="check"><input type="checkbox" name="consent" /><span>I&rsquo;m okay with the Fundsy team reading and storing this file until my review is done.</span></label>
        </div>
        <Submit label="Send my resume" note="Reviews go out on Sundays." />
      </Panel>
    </div>
  );
}

function Panel({
  id, active, registerHeading, title, blurb, children,
}: {
  id: PanelId;
  active: PanelId;
  registerHeading: (id: PanelId, el: HTMLHeadingElement | null) => void;
  title: string;
  blurb: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card p-7 md:p-9" id={`panel-${id}`} role="tabpanel" aria-labelledby={id} hidden={active !== id}>
      <h2
        className="h2 mb-3"
        tabIndex={-1}
        style={{ outline: "none" }}
        ref={(el) => registerHeading(id, el)}
      >
        {title}
      </h2>
      <p className="prose mb-8" style={{ color: "var(--ink-soft)" }}>{blurb}</p>
      <form className="grid sm:grid-cols-2 gap-5" onSubmit={(e) => e.preventDefault()}>
        {children}
      </form>
    </section>
  );
}

function Submit({ label, note }: { label: string; note: string }) {
  return (
    <div className="sm:col-span-2 flex flex-wrap items-center gap-5 pt-1">
      <button className="btn btn-pink" type="submit">{label}</button>
      <span className="meta">{note}</span>
    </div>
  );
}
