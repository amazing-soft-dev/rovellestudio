"use client";

import { useEffect, useState } from "react";
import { Photo } from "@/components/photo";
import { playground, type PlayItem } from "@/content/site";

export function Masonry() {
  const [open, setOpen] = useState<PlayItem | null>(null);
  const [columns, setColumns] = useState(4);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const measure = () => {
      const width = window.innerWidth;
      setColumns(width < 600 ? 2 : width < 1000 ? 3 : 4);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const onScroll = () => setShift(window.scrollY * 0.08);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copies = [...playground, ...playground];
  const lanes: PlayItem[][] = Array.from({ length: columns }, () => []);
  copies.forEach((item, index) => {
    lanes[index % columns]!.push(item);
  });

  return (
    <>
      <div
        className="flex items-start gap-4 max-[599px]:gap-2.5"
        style={{ transform: `translateY(${shift}px)` }}
      >
        {lanes.map((lane, laneIndex) => (
          <div key={laneIndex} className="flex min-w-0 flex-1 flex-col gap-4 max-[599px]:gap-2.5">
            {lane.map((item, index) => (
              <button
                key={`${item.slug}-${index}`}
                type="button"
                className="vtx-masonry-card rounded-[10px] bg-card p-3 text-left max-[599px]:p-1.5"
                onClick={() => setOpen(item)}
              >
                <span
                  className={`relative block overflow-hidden rounded-[4px] ${
                    item.ratio === "portrait" ? "aspect-[2/3]" : item.ratio === "landscape" ? "aspect-[3/2]" : "aspect-square"
                  }`}
                >
                  <Photo name={item.image} alt={item.title} sizes="(min-width: 1000px) 22vw, 45vw" />
                  <span className="absolute inset-x-0 bottom-0 bg-ink/60 p-3 text-canvas min-[600px]:hidden">
                    <span className="block text-[11px] tracking-[0.08em] uppercase">{item.category}</span>
                    <span className="text-[16px]">{item.title}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>
      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/94 p-8 text-canvas" role="dialog" aria-modal="true" aria-label={open.title}>
          <button type="button" className="absolute top-6 right-6 text-[12px] tracking-[0.12em] uppercase" onClick={() => setOpen(null)}>
            Close
          </button>
          <div className="relative h-[70vh] w-full max-w-4xl">
            <Photo name={open.image} alt={open.title} sizes="80vw" className="object-contain" />
          </div>
          <p className="mt-4 text-center">
            <span className="block text-[12px] tracking-[0.12em] uppercase">{open.category}</span>
            <span className="font-serif text-[40px] italic">{open.title}</span>
          </p>
        </div>
      ) : null}
    </>
  );
}
