"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const LABELS: Record<string, string> = {
  "/": "Work",
  "/about": "About",
  "/playground": "Playground",
  "/contact": "Contact",
};

const COVER = "cubic-bezier(0.45, 0, 0.2, 1)";
const REVEAL = "cubic-bezier(0.65, 0, 0.35, 1)";

export function PageWipe() {
  const router = useRouter();
  const routerRef = useRef(router);
  const svgRef = useRef<SVGSVGElement>(null);
  const busy = useRef(false);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    routerRef.current = router;
  }, [router]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (busy.current || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const next = url.pathname + url.search + url.hash;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      event.preventDefault();
      event.stopPropagation();
      void run(next);
    };

    async function run(href: string) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const path = href.split(/[?#]/)[0] || "/";
      busy.current = true;
      setLabel(LABELS[path] ?? "Rovelle");
      setActive(true);
      if (reduced) {
        routerRef.current.push(href);
        setActive(false);
        busy.current = false;
        return;
      }
      await frames(2);
      await animatePaths(1, 0, 1150, COVER);
      routerRef.current.push(href);
      await wait(300);
      await animatePaths(0, -1, 1100, REVEAL);
      setActive(false);
      busy.current = false;
    }

    function animatePaths(from: number, to: number, duration: number, easing: string) {
      const paths = [...(svgRef.current?.querySelectorAll("path") ?? [])];
      return Promise.all(
        paths.map((path, index) => {
          const delay = Math.floor(index / 2) * 90;
          return path
            .animate([{ strokeDashoffset: from }, { strokeDashoffset: to }], {
              duration,
              delay,
              easing,
              fill: "forwards",
            })
            .finished.catch(() => undefined);
        }),
      );
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <div className={`pointer-events-none fixed inset-0 z-50 ${active ? "visible" : "invisible"}`} aria-hidden="true">
      <svg ref={svgRef} className="h-full w-full" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <Wave y={170} reverse={false} />
        <Wave y={500} reverse />
        <Wave y={830} reverse={false} />
      </svg>
      <p className="absolute inset-0 grid place-items-center font-serif text-[72px] tracking-[-0.02em] text-canvas italic">{label}</p>
    </div>
  );
}

function Wave({ y, reverse }: { y: number; reverse: boolean }) {
  const d = reverse
    ? `M -80 ${y + 12} C 480 ${y - 18} 1120 ${y + 24} 1680 ${y - 8}`
    : `M 1680 ${y} C 1120 ${y + 16} 480 ${y - 20} -80 ${y + 10}`;
  return (
    <>
      <path d={d} stroke="#EEE5D9" strokeWidth="420" fill="none" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1} />
      <path d={d} stroke="#141414" strokeWidth="480" fill="none" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1} />
    </>
  );
}

function frames(count: number) {
  return new Promise<void>((resolve) => {
    const step = (left: number) => {
      if (left <= 0) resolve();
      else requestAnimationFrame(() => step(left - 1));
    };
    step(count);
  });
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
