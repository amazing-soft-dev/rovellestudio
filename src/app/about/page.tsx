import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Photo } from "@/components/photo";
import { images, stats, studio } from "@/content/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="bg-canvas pt-[114px] max-[1199px]:pt-[72px]">
      <section className="px-8 pb-16 max-[809px]:px-5">
        <div className="flex items-center justify-between text-[12px] font-medium tracking-[0.02em] text-muted uppercase">
          <p>(About) — The studio</p>
          <p>{studio.established}</p>
        </div>
        <h1 className="mt-8 flex flex-wrap items-baseline gap-x-6 text-[150px] leading-[0.88] font-bold tracking-[-0.06em] max-[1199px]:text-[96px] max-[809px]:text-[56px]">
          We are
          <span className="font-serif text-[168px] leading-none font-normal tracking-[-0.03em] italic max-[1199px]:text-[104px] max-[809px]:text-[64px]">
            Rovelle.
          </span>
        </h1>
        <div className="relative mt-8 h-[680px] overflow-hidden rounded-xl max-[809px]:h-[280px]">
          <Photo name={images.studio} alt="Warm sunlight bleeding through moving silhouettes" sizes="100vw" priority />
        </div>
      </section>

      <Rail label="(01) — Our principles">
        <p className="max-w-[760px] text-[28px] leading-[1.25] font-medium tracking-[-0.03em] max-[809px]:text-[22px]">
          {studio.principlesLead}
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {studio.principles.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-[15px] leading-[1.6]">
              {paragraph}
            </p>
          ))}
        </div>
      </Rail>

      <Rail label="(02) — In numbers">
        <div className="grid gap-x-16 sm:grid-cols-2">
          {stats.map((stat) => (
            <div key={stat.label} className="border-t border-line py-6">
              <p className="text-[12px] font-medium tracking-[0.02em] text-muted uppercase">{stat.label}</p>
              <p className="text-[168px] leading-none font-light tracking-[-0.07em] max-[809px]:text-[96px]">{stat.value}</p>
            </div>
          ))}
        </div>
      </Rail>
    </main>
  );
}

function Rail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="grid gap-8 px-8 py-16 xl:grid-cols-[490px_minmax(0,1fr)] max-[809px]:px-5">
      <p className="text-[12px] font-medium tracking-[0.02em] text-muted uppercase">{label}</p>
      <div>{children}</div>
    </section>
  );
}
