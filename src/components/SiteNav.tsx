"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Navigation — reference treatment: no visible nav bar.
 * A hamburger at the right of the header opens a 300px white drawer that
 * slides in from the right; the overlay dims the page. Links are the same
 * four anchors the reference uses (Home / Work / About / Contact).
 */
const links = [
  { label: "Home", href: "/" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const togglerRef = useRef<HTMLButtonElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (open) closeRef.current?.focus();
    else togglerRef.current?.focus();
  }, [open]);

  return (
    <>
      <button
        ref={togglerRef}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="site-drawer"
        disabled
        className="flex h-[43px] w-[23px] flex-col items-center justify-center gap-[5px] text-foreground opacity-0 pointer-events-none select-none"
      >
        <span className="block h-[1.5px] w-[23px] bg-current" />
        <span className="block h-[1.5px] w-[23px] bg-current" />
        <span className="block h-[1.5px] w-[23px] bg-current" />
      </button>

      {/* Overlay — reference: black 90%, slides in, click closes */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[1120] bg-black/90 transition-all duration-700 ease ${
          open
            ? "visible translate-x-0 opacity-100"
            : "invisible translate-x-[101%] opacity-0 delay-500"
        }`}
      />

      {/* Drawer — reference: 300px white panel, 0.7s ease, 500ms delay on open */}
      <aside
        id="site-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
        className={`fixed right-[15px] top-0 z-[1130] h-full w-[300px] max-w-full bg-white transition-transform duration-700 ease ${
          open ? "translate-x-0 delay-500" : "translate-x-[calc(101%+15px)]"
        }`}
      >
        <button
          ref={closeRef}
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-[23px] z-10 h-[30px] w-[30px] text-center text-2xl leading-[30px] text-black"
        >
          ×
        </button>

        <div className="px-5 py-5">
          <a
            href="/"
            onClick={() => setOpen(false)}
            className="text-xl font-bold tracking-tighter text-black"
          >
            Makuo Ifedike
          </a>
        </div>

        <nav className="mt-[25px]">
          <ul className="border-t border-black/10">
            {links.map((link) => (
              <li key={link.label} className="border-b border-black/10">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-[14px] text-[15px] font-semibold uppercase leading-6 text-[#404040] transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
