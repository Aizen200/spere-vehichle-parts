import Link from "next/link";
import { company, photoCredits, telHref } from "@/data/site";
import { categories } from "@/data/products";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="h-px bg-linear-to-r from-transparent via-hivis to-transparent" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-hivis font-display text-sm font-extrabold text-ink">
              JEC
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">{company.name}</span>
          </div>
          <p className="mt-5 max-w-sm leading-relaxed text-white/55">{company.tagline}</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-hivis" /> ISO 9001:2015 certified
          </p>
        </div>
        <div className="md:col-span-3">
          <h3 className="text-xs font-semibold tracking-[0.18em] text-white/40 uppercase">Shop</h3>
          <ul className="mt-5 space-y-2.5 text-[15px] text-white/70">
            {categories.map((c) => (
              <li key={c}>
                <Link href={`/products?category=${encodeURIComponent(c)}`} className="transition-colors hover:text-hivis">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <h3 className="text-xs font-semibold tracking-[0.18em] text-white/40 uppercase">Contact</h3>
          <ul className="mt-5 space-y-2.5 text-[15px] text-white/70">
            {company.phones.map((p) => (
              <li key={p}>
                <a href={telHref(p)} className="transition-colors hover:text-hivis">{p}</a>
              </li>
            ))}
            {company.emails.map((e) => (
              <li key={e}>
                <a href={`mailto:${e}`} className="break-all transition-colors hover:text-hivis">{e}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl space-y-2 px-4 py-6 text-xs leading-relaxed text-white/35">
          <p>
            © {company.name}. Brand names and logos are trademarks of their respective owners, used only to indicate part
            compatibility and client relationships.
          </p>
          <p>
            Photos:{" "}
            {photoCredits.map((c, i) => (
              <span key={c.href}>
                {i > 0 && " · "}
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
                  {c.label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
