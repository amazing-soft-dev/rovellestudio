"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
          </nav>
        </div>
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
