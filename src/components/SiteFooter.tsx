import Link from "next/link";
import { FOOTER, SOCIALS } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="ftr py-14">
      <div className="wrap grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
        <div>
          <Link className="logo" href="/" style={{ color: "var(--paper)" }}>
            fundsy<span style={{ color: "var(--signal)" }}>.</span>
          </Link>
          <p className="mt-3 text-sm max-w-xs" style={{ opacity: 0.8 }}>
            A student-run guide to living and studying in Dallas&ndash;Fort Worth for less.
          </p>
          <div className="flex gap-3 mt-5">
            <a className="btn btn-sm btn-sun" href={SOCIALS.instagram}>Instagram</a>
            <a className="btn btn-sm btn-mint" href={SOCIALS.linkedin}>LinkedIn</a>
          </div>
        </div>

        {FOOTER.map((col) => (
          <div key={col.heading}>
            <h2 className="text-sm mb-3" style={{ fontWeight: 700 }}>{col.heading}</h2>
            <ul className="text-sm space-y-2" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        className="wrap mt-12 pt-6 text-sm"
        style={{ borderTop: "1px solid rgba(255,255,255,.18)", opacity: 0.7 }}
      >
        &copy; {new Date().getFullYear()} Fundsy. Built by students in Dallas&ndash;Fort Worth.
      </div>
    </footer>
  );
}
