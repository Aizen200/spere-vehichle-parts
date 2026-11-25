import Link from "next/link";
import { company, photoCredits, telHref } from "@/data/site";
import { categories } from "@/data/products";

export function Footer() {
  return (
    // On tall desktop screens the footer sticks to the bottom so the page lifts away to reveal it
    <div className="z-0 overflow-hidden bg-ink lg:[@media(min-height:760px)]:sticky lg:[@media(min-height:760px)]:bottom-0">
      <footer className="text-[15px] text-white/60">
        <div className="container-x grid gap-10 py-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-md bg-brand font-display text-base font-extrabold tracking-wide text-white">
                JEC
              </span>
              <span className="text-[17px] font-extrabold tracking-wide text-white uppercase">{company.name}</span>
            </div>
            <p className="mt-5 max-w-sm leading-relaxed">{company.tagline}</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-md bg-white/5 px-3 py-1.5 text-xs text-white/70 ring-1 ring-white/10">
              <span className="size-1.5 bg-brand" /> ISO 9001:2015 certified
            </p>
          </div>
          <div className="md:col-span-3">
            <h3 className="text-sm font-medium text-white">Shop</h3>
            <ul className="mt-4 space-y-2.5">
              {categories.map((c) => (
                <li key={c}>
                  <Link href={`/products?category=${encodeURIComponent(c)}`} className="transition-colors hover:text-white">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <h3 className="text-sm font-medium text-white">Contact</h3>
            <ul className="mt-4 space-y-2.5">
              {company.phones.map((p) => (
                <li key={p}>
                  <a href={telHref(p)} className="transition-colors hover:text-white">{p}</a>
                </li>
              ))}
              {company.emails.map((e) => (
                <li key={e}>
                  <a href={`mailto:${e}`} className="break-all transition-colors hover:text-white">{e}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container-x overflow-hidden" aria-hidden>
          <p className="-mb-[0.18em] font-display text-[34vw] leading-[0.8] font-extrabold tracking-tight text-white/[0.05] uppercase select-none lg:text-[24rem]">
            JEC
          </p>
        </div>

        <div className="border-t border-white/10">
          <div className="container-x space-y-2 py-6 text-xs leading-relaxed text-white/40">
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
    </div>
  );
}
