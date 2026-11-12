"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/playground", label: "Playground" },
  { href: "/contact", label: "Contact" },
];

function current(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="pointer-events-auto hidden min-[1200px]:block">
        <div className="flex h-[114px] items-center justify-between px-8">
          <Logo />
          <nav aria-label="Primary" className="flex items-center gap-9">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current(pathname, item.href) ? "page" : undefined}
                className={`text-[16px] font-semibold tracking-[0.1em] uppercase ${
                  current(pathname, item.href) ? "underline underline-offset-[6px]" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-full bg-ink px-[34px] py-5 text-[18px] font-semibold tracking-[0.01em] text-canvas uppercase"
            >
              Book a call ↗
            </Link>
          </nav>
        </div>
        <div className="h-px bg-line" />
      </div>

      <div className="pointer-events-auto min-[1200px]:hidden">
        <div className="flex h-[72px] items-center justify-between bg-canvas px-5">
          <Logo />
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="rounded-full bg-ink px-4 py-2 text-[12px] font-semibold tracking-[0.08em] text-canvas uppercase"
            >
              Book a call ↗
            </Link>
            <button
              type="button"
              className="grid size-10 place-items-center"
              aria-expanded={open}
              aria-controls="phone-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
        {open ? (
          <nav id="phone-menu" aria-label="Primary" className="bg-canvas px-5 pb-6">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current(pathname, item.href) ? "page" : undefined}
                    className={`block py-1 text-[40px] leading-none font-semibold tracking-[-0.04em] ${
                      current(pathname, item.href) ? "underline underline-offset-4" : ""
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[12px] font-medium tracking-[0.02em] text-muted uppercase">
              <a href="mailto:hello@rovelle.studio">hello@rovelle.studio</a>
              <span>Warsaw, PL</span>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

function Logo() {
  return (
    <Link href="/" aria-label="Home" className="flex items-center gap-2">
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <path
          fill="currentColor"
          d="M9 0h4v6.2L16.8 2.4l2.8 2.8L15.8 9H22v4h-6.2l3.8 3.8-2.8 2.8L13 15.8V22H9v-6.2l-3.8 3.8-2.8-2.8L6.2 13H0V9h6.2L2.4 5.2 5.2 2.4 9 6.2V0Z"
        />
      </svg>
      <span className="text-[22px] font-semibold tracking-[-0.04em]">Rovelle</span>
    </Link>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">
      <path d="M0 1h18M0 6h18M0 11h18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M1 1l12 12M13 1 1 13" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
