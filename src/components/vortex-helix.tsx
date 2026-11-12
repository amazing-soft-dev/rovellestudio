"use client";
"use no memo";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/content/site";

const TAU = Math.PI * 2;

export function VortexHelix() {
  const frame = useRef<HTMLDivElement>(null);
  const position = useRef(0);
  const velocity = useRef(0);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const [size, setSize] = useState({ w: 1200, h: 800 });
  const [pose, setPose] = useState(0);

  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    const measure = () => {
      const rect = node.getBoundingClientRect();
      setSize({ w: rect.width || 1200, h: rect.height || 800 });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;
    const loop = () => {
      if (!running) return;
      if (!reduced) {
        position.current += velocity.current;
        velocity.current *= 0.92;
        if (Math.abs(velocity.current) < 0.0008) {
          const target = Math.round(position.current);
          position.current += (target - position.current) * 0.12;
          velocity.current = 0;
        }
      }
      setPose(position.current);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      running = true;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    };
    start();
    const onWheel = (event: WheelEvent) => {
      if (reduced) return;
      event.preventDefault();
      velocity.current += event.deltaY * 0.00035;
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    const onHide = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else {
        start();
      }
    };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, []);

  const compact = size.w < 960;
  const strips = size.w < 600 ? 6 : 10;
  const radius = Math.max(60, Math.min(size.w * 0.28, size.h * 0.7));
  const perspective = radius * 3.6;
  const angle = TAU / 6.5;
  const span = angle * 0.95;
  const stripAngle = span / strips;
  const facet = 2 * radius * Math.tan(stripAngle / 2);
  const cardW = facet * strips;
  const cardH = cardW / 1.35;
  const pitch = cardH * 0.35;
  const count = projects.length;
  const active = mod(Math.round(pose), count);
  const windowSize = 5;
  const cards: { project: Project; index: number }[] = [];
  for (let offset = -windowSize; offset <= windowSize; offset += 1) {
    const index = Math.round(pose) + offset;
    cards.push({ project: projects[mod(index, count)]!, index });
  }

  return (
    <div ref={frame} className="relative h-full w-full">
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          perspective: `${perspective}px`,
          maskImage: "linear-gradient(to bottom, transparent 0%, #000 20%, #000 80%, transparent 100%)",
        }}
        onPointerDown={(event) => {
          drag.current = { x: event.clientX, moved: false };
          (event.currentTarget as HTMLDivElement).setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          const dx = event.clientX - drag.current.x;
          if (Math.abs(dx) > 2) drag.current.moved = true;
          position.current -= dx * 0.004;
          drag.current.x = event.clientX;
          velocity.current = -dx * 0.0004;
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
      >
        <div
          className="absolute top-1/2 left-1/2"
          style={{ transform: "rotateX(-10deg)", transformStyle: "preserve-3d" }}
        >
          {cards.map(({ project, index }) => (
            <Card
              key={`${project.slug}-${index}`}
              project={project}
              index={index}
              position={pose}
              strips={strips}
              angle={angle}
              stripAngle={stripAngle}
              facet={facet}
              cardW={cardW}
              cardH={cardH}
              pitch={pitch}
              radius={radius}
            />
          ))}
        </div>
      </div>
      <TitleStack active={active} compact={compact} />
    </div>
  );
}

function Card({
  project,
  index,
  position,
  strips,
  angle,
  stripAngle,
  facet,
  cardW,
  cardH,
  pitch,
  radius,
}: {
  project: Project;
  index: number;
  position: number;
  strips: number;
  angle: number;
  stripAngle: number;
  facet: number;
  cardW: number;
  cardH: number;
  pitch: number;
  radius: number;
}) {
  const base = (index - position) * angle;
  const depth = Math.cos(base);
  const back = depth < 0.15;
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={project.title}
      className="absolute block"
      style={{
        width: cardW,
        height: cardH,
        transform: `translate(-50%, -50%) translate3d(${Math.sin(base) * radius * 0.15}px, ${(index - position) * pitch * 0.08}px, 0)`,
        transformStyle: "preserve-3d",
        opacity: back ? 0.6 : 1,
        filter: back ? "blur(3px)" : undefined,
        pointerEvents: Math.abs(index - position) < 0.6 ? "auto" : "none",
      }}
    >
      {Array.from({ length: strips }, (_, strip) => {
        const local = base + (strip - (strips - 1) / 2) * stripAngle;
        return (
          <span
            key={strip}
            className="absolute top-0 overflow-hidden"
            style={{
              width: facet + 1,
              height: cardH,
              left: strip * facet,
              borderRadius: strip === 0 ? "10px 0 0 10px" : strip === strips - 1 ? "0 10px 10px 0" : 0,
              transform: `translateZ(${Math.cos(local) * radius * 0.35}px) rotateY(${local}rad)`,
              transformOrigin: "center center",
              backgroundImage: `url(/photos/${project.image})`,
              backgroundSize: `${cardW}px ${cardH}px`,
              backgroundPosition: `-${strip * facet}px 0`,
            }}
          />
        );
      })}
    </Link>
  );
}

function TitleStack({ active, compact }: { active: number; compact: boolean }) {
  const count = projects.length;
  const order = [2, 1, 0, -1, -2].map((offset) => mod(active - offset, count));
  return (
    <ol
      className={
        compact
          ? "absolute inset-x-5 bottom-16"
          : "absolute top-1/2 right-8 w-[280px] -translate-y-1/2"
      }
    >
      {order.map((index) => {
        const project = projects[index]!;
        const selected = index === active;
        const number = String(index + 1).padStart(2, "0");
        return (
          <li key={project.slug} className={selected ? "rounded-2xl bg-white/70 px-4 py-4" : "px-4 py-3"}>
            <Link href={`/work/${project.slug}`} className="block">
              <p className="text-[11px] font-medium tracking-[0.02em] text-muted uppercase">
                {compact && selected ? `${number}/0${count} — ` : ""}
                {project.category}
              </p>
              <p className="text-[26px] leading-none font-medium tracking-[-0.03em] uppercase">{project.title}</p>
              {selected ? <p className="mt-1 text-[11px] font-medium text-muted">{project.subtitle}</p> : null}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

function mod(value: number, count: number) {
  return ((value % count) + count) % count;
}
