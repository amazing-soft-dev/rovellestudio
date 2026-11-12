import type { Metadata } from "next";
import { Photo } from "@/components/photo";
import { projects, studio } from "@/content/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-canvas px-8 pt-[126px] pb-6 max-[809px]:px-5 max-[809px]:pt-24">
      <div className="flex items-center justify-between text-[12px] font-medium tracking-[0.02em] text-muted uppercase">
        <p>(04) — Contact</p>
        <p className="flex items-center gap-2">
          <span className="size-[11px] rounded-full bg-ink" aria-hidden="true" />
          {studio.booking}
        </p>
      </div>
      <div className="mt-8 flex h-[140px] gap-3 overflow-hidden">
        {projects.map((project) => (
          <div key={project.slug} className="relative h-full w-[180px] shrink-0 overflow-hidden rounded-lg">
            <Photo name={project.image} alt="" sizes="180px" />
          </div>
        ))}
      </div>
      <div className="mt-10 grid flex-1 items-end gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <h1 className="text-[150px] leading-[0.86] font-bold tracking-[-0.06em] max-[1199px]:text-[96px] max-[809px]:text-[56px]">
          Got an idea?
          <span className="mt-2 block font-serif text-[168px] font-normal tracking-[-0.03em] italic max-[1199px]:text-[104px] max-[809px]:text-[64px]">
            Let’s make it move.
          </span>
        </h1>
        <p className="max-w-[280px] text-[15px] leading-[1.5]">{studio.contactNote}</p>
      </div>
      <div className="mt-10 grid gap-8 border-t border-line pt-6 md:grid-cols-2 xl:grid-cols-4">
        <Info label="(01) Email" value={studio.email} href={`mailto:${studio.email}`} />
        <Info label="(02) Phone" value={studio.phone} href={studio.phoneHref} />
        <div>
          <p className="text-[12px] font-medium tracking-[0.02em] text-muted uppercase">(03) Studio</p>
          <p className="mt-2 text-[26px] leading-tight font-medium tracking-[-0.025em]">
            {studio.address[0]}
            <br />
            {studio.address[1]}
          </p>
        </div>
        <div>
          <p className="text-[12px] font-medium tracking-[0.02em] text-muted uppercase">(04) Schedule</p>
          <a
            href={studio.scheduleHref}
            className="mt-3 inline-flex rounded-full bg-ink px-[34px] py-5 text-[18px] font-semibold tracking-[0.01em] text-canvas uppercase"
          >
            Schedule a call ↗
          </a>
          <p className="mt-3 text-[12px] tracking-[0.02em] text-muted uppercase">{studio.scheduleNote}</p>
        </div>
      </div>
      <footer className="mt-8 flex items-center justify-between text-[12px] font-medium tracking-[0.02em] text-muted uppercase">
        <span>© 2026 Rovelle Studio</span>
        <span className="max-[809px]:hidden">{studio.hours}</span>
        <span className="max-[809px]:hidden">{studio.location}</span>
      </footer>
    </main>
  );
}

function Info({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <div>
      <p className="text-[12px] font-medium tracking-[0.02em] text-muted uppercase">{label}</p>
      <a href={href} className="mt-2 block text-[26px] leading-tight font-medium tracking-[-0.025em]">
        {value}
      </a>
    </div>
  );
}
