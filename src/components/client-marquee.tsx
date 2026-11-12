"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/content/site";

export function ClientMarquee() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = root.current;
    const row = track.current;
    if (!node || !row) return;
    const observer = new IntersectionObserver(([entry]) => {
      row.style.animationPlayState = entry?.isIntersecting ? "running" : "paused";
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const names = [...projects, ...projects];
  return (
    <div ref={root} className="overflow-hidden">
      <div ref={track} className="marquee-track flex w-max gap-8 animate-[marquee_28s_linear_infinite]">
        {names.map((project, index) => (
          <span key={`${project.slug}-${index}`} className="flex items-center gap-8">
            <span className="text-[56px] font-bold tracking-[-0.05em]">{project.title}</span>
            <span className="font-serif text-[44px] text-muted italic">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
