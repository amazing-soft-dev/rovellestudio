import type { Metadata } from "next";
import { playground, studio } from "@/content/site";

export const metadata: Metadata = { title: "Playground" };

export default function PlaygroundPage() {
  return (
    <main className="bg-canvas min-[1000px]:grid min-[1000px]:grid-cols-[400px_minmax(0,1fr)]">
      <aside className="sticky top-0 flex min-h-dvh flex-col justify-between px-8 pt-[140px] pb-8 max-[999px]:static max-[999px]:min-h-0 max-[999px]:px-5 max-[999px]:pt-28">
        <div>
          <p className="text-[240px] leading-none font-light tracking-[-0.06em] max-[809px]:text-[120px]">{playground.length}</p>
          <p className="text-[12px] font-medium tracking-[0.02em] text-muted uppercase">(Explorations)</p>
        </div>
        <div className="max-w-[320px]">
          <p className="text-[15px] leading-[1.5]">{studio.playgroundNote}</p>
          <p className="mt-8 text-[12px] font-medium tracking-[0.02em] text-muted uppercase">© 2026 Rovelle Studio — Warsaw, PL</p>
        </div>
      </aside>
      <section className="relative min-h-dvh px-4 pt-[140px] max-[999px]:min-h-[40vh] max-[999px]:px-5 max-[999px]:pt-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[120px] bg-gradient-to-b from-canvas to-transparent" />
        <div className="pointer-events-none sticky bottom-0 z-10 h-[120px] bg-gradient-to-t from-canvas to-transparent" />
      </section>
    </main>
  );
}
