import { studio } from "@/content/site";

export default function HomePage() {
  return (
    <main className="relative h-dvh overflow-clip bg-canvas">
      <div className="absolute bottom-16 left-7 z-10 max-[959px]:bottom-auto max-[959px]:top-[88px] min-[1200px]:bottom-[150px]">
        <p className="mb-1 text-[28px] font-semibold tracking-[-0.03em] max-[809px]:text-[18px]">© 2019—26</p>
        <h1 className="text-[150px] leading-[0.88] font-bold tracking-[-0.06em] max-[1199px]:text-[96px] max-[809px]:text-[56px]">
          We design
        </h1>
        <p className="font-serif text-[168px] leading-[0.84] tracking-[-0.03em] italic max-[1199px]:text-[104px] max-[809px]:text-[64px]">
          what moves.
        </p>
      </div>
      <footer className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between border-t border-line px-8 py-4 text-[12px] font-medium tracking-[0.02em] text-muted uppercase max-[809px]:px-5">
        <span>© 2026 Rovelle Studio</span>
        <span className="text-right">{studio.location}</span>
      </footer>
    </main>
  );
}
