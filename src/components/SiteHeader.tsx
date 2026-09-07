"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { NAV, NAV_MOBILE } from "@/lib/site";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const drawerId = useId();
  const close = () => setOpen(false);

  /* Escape closes it too, since the drawer traps a lot of the viewport on mobile. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="hdr">
      <div className="wrap hdr-row">
        <Link className="logo" href="/">
          fundsy<span>.</span>
        </Link>

        <nav className="nav" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link className="btn btn-pink btn-sm" href="/contact#share">
            Share a find
          </Link>
        </nav>

        <button
          className="burger"
          aria-controls={drawerId}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div className="drawer" id={drawerId} data-open={open}>
        <div className="wrap">
          {NAV_MOBILE.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              onClick={close}
            >
              {item.label}
            </Link>
          ))}
          <Link className="btn btn-pink btn-sm" href="/contact#share" onClick={close}>
            Share a find
          </Link>
        </div>
      </div>
    </header>
  );
}
