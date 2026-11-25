import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** Light page header shared by inner pages: breadcrumb, condensed title, intro and a framed photo. */
export function PageHero({
  crumb,
  title,
  intro,
  image,
  imageAlt,
  badge,
}: {
  crumb: string;
  title: ReactNode;
  intro: ReactNode;
  image: string;
  imageAlt: string;
  badge?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-b from-[#e3e5e5] via-[#eeefef] to-paper">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-80" aria-hidden />
      <div className="container-x grid items-center gap-10 py-12 lg:grid-cols-[1.2fr_1fr] lg:gap-14 lg:py-16">
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="fade-up text-sm text-ink/55">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-ink/80">{crumb}</span>
          </nav>
          <h1 className="mt-5 text-[clamp(3rem,6.4vw,5.6rem)] leading-[0.88] text-ink">{title}</h1>
          <div className="fade-up mt-6 max-w-xl text-lg leading-relaxed text-ink/70" style={d(250)}>
            {intro}
          </div>
        </div>
        <div className="fade-up relative" style={d(200)}>
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg bg-brand sm:translate-x-4 sm:translate-y-4" aria-hidden />
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-[0_40px_80px_-40px_rgba(23,28,32,0.6)] ring-1 ring-black/5">
            <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="animate-kenburns object-cover" />
          </div>
          {badge}
        </div>
      </div>
      <div className="hazard h-1.5" aria-hidden />
    </section>
  );
}

/** Dark call-to-action card used at the bottom of inner pages. */
export function PageCta({ title, body, children }: { title: ReactNode; body: ReactNode; children: ReactNode }) {
  return (
    <section className="container-x pt-4 pb-12 sm:pb-16">
      <div className="relative overflow-hidden rounded-lg bg-ink text-white">
        <div className="hazard h-2" aria-hidden />
        <div className="grid gap-8 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <h2 className="text-5xl leading-[0.92] sm:text-6xl">{title}</h2>
            <p className="mt-4 max-w-lg text-lg text-white/65">{body}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 *:first:col-span-2 lg:ml-auto lg:w-full lg:max-w-sm">{children}</div>
        </div>
      </div>
    </section>
  );
}
