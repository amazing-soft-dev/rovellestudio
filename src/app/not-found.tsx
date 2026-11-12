import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-canvas px-8 pt-24 text-center">
      <div>
        <p className="text-[12px] font-medium tracking-[0.12em] text-muted uppercase">Missing</p>
        <h1 className="mt-4 text-[72px] leading-none font-bold tracking-[-0.05em]">That page is not here.</h1>
        <Link href="/" className="mt-8 inline-block text-[12px] font-semibold tracking-[0.1em] uppercase underline">
          All work
        </Link>
      </div>
    </main>
  );
}
