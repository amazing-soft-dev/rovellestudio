import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ServiceList } from "@/components/accordions";
import { ClientMarquee } from "@/components/client-marquee";
import { Photo } from "@/components/photo";
import { awards, images, stats, studio } from "@/content/site";

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

      <section className="py-16">
        <p className="px-8 pb-6 text-[12px] font-medium tracking-[0.02em] text-muted uppercase max-[809px]:px-5">
          (03) — Selected clients
        </p>
        <ClientMarquee />
      </section>

      <Rail
        label="(04) — Services"
        note="Four disciplines, one studio — so the brand, the product and the motion all come from the same hands."
      >
        <ServiceList />
      </Rail>

      <Rail
        label="(05) — Recognition"
        note="Awards are nice. But they only happen when great clients trust the process and give brave work room to exist."
      >
        <h2 className="text-[104px] leading-none font-bold tracking-[-0.055em] max-[809px]:text-[56px]">Our awards</h2>
        <ul className="mt-8">
          {awards.map((award) => (
            <li key={award.name} className="grid grid-cols-[1.2fr_1fr_auto] gap-4 border-t border-line py-4 text-[16px] max-[809px]:grid-cols-1">
              <span className="font-semibold tracking-[0.1em] uppercase">{award.name}</span>
              <span>{award.category}</span>
              <span className="font-semibold tracking-[0.1em]">{award.count}</span>
            </li>
          ))}
        </ul>
      </Rail>
    </main>
  );
}

function Rail({
  label,
  note,
  children,
}: {
  label: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-8 px-8 py-16 xl:grid-cols-[490px_minmax(0,1fr)] max-[809px]:px-5">
      <div>
        <p className="text-[12px] font-medium tracking-[0.02em] text-muted uppercase">{label}</p>
        {note ? <p className="mt-4 max-w-[280px] text-[15px] leading-[1.45]">{note}</p> : null}
      </div>
      <div>{children}</div>
    </section>
  );
}
