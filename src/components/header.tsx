"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, telHref, whatsappHref } from "@/data/site";
import { Icons } from "./icons";

const nav = [
  { href: "/products", label: "Shop parts" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const sectionIds = ["contact"];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the home-page section currently in view
  useEffect(() => {
    if (!onHome) return;
    const els = sectionIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setSection(e.target.id);
          else setSection((cur) => (cur === e.target.id ? null : cur));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? onHome && href === `/#${section}` : pathname.startsWith(href);

  return (
    <>
      {/* Utility strip */}
      <div className="relative z-50 hidden bg-ink text-[12px] text-white/60 lg:block">
        <div className="container-x flex h-9 items-center justify-between gap-6">
          <p className="flex items-center gap-2">
            <span className="size-1.5 bg-brand" aria-hidden />
            ISO 9001:2015 certified · Multi-brand forklift spare parts across India
          </p>
          <div className="flex items-center gap-5">
            <a href={`mailto:${company.emails[0]}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
              <Icons.mail className="size-3.5" /> {company.emails[0]}
            </a>
            <span className="h-3 w-px bg-white/15" aria-hidden />
            <a
              href={whatsappHref("Hi JEC, I need a forklift spare part.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              WhatsApp us <Icons.arrow className="size-3" />
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b bg-white transition-shadow duration-300 ${
          scrolled || open ? "border-line shadow-[0_10px_30px_-18px_rgba(23,28,32,0.35)]" : "border-line/70"
        }`}
      >
        <div className="container-x flex h-[76px] items-stretch justify-between gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <Link href="/" className="group inline-flex items-center gap-3 justify-self-start" onClick={() => setOpen(false)}>
            <span className="relative grid size-11 place-items-center overflow-hidden rounded-md bg-brand font-display text-lg font-extrabold tracking-wide text-white transition-transform duration-300 group-hover:-rotate-6">
              JEC
              <span className="hazard absolute inset-x-0 bottom-0 h-1 opacity-60" aria-hidden />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[22px] font-bold tracking-wide text-ink uppercase">Jay Engineering</span>
              <span className="mt-0.5 block text-[10px] font-semibold tracking-[0.24em] text-steel uppercase">
                Forklift parts &amp; service
              </span>
            </span>
          </Link>

          <nav className="hidden items-stretch gap-1 lg:flex" aria-label="Main">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex items-center gap-2 px-4 font-display text-[17px] font-semibold tracking-[0.06em] whitespace-nowrap uppercase transition-colors ${
                    active ? "text-ink" : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-4 -bottom-px h-[3px] origin-left bg-brand transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    aria-hidden
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
            <a
              href={telHref(company.phones[0])}
              className="group hidden items-stretch overflow-hidden rounded-md text-[14px] font-medium shadow-sm sm:inline-flex"
            >
              <span className="grid w-10 place-items-center bg-brand text-white transition-colors group-hover:bg-brand-dark">
                <Icons.phone className="size-4" />
              </span>
              <span className="flex flex-col justify-center bg-ink px-4 py-1.5 leading-tight text-white transition-colors group-hover:bg-graphite">
                <span className="text-[10px] font-semibold tracking-[0.14em] text-white/50 uppercase">Call us</span>
                {company.phones[0]}
              </span>
            </a>
            <button
              type="button"
              className="grid size-11 place-items-center self-center rounded-md bg-ink text-white lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 h-0.5 w-5 bg-white transition-all duration-300 ${open ? "top-[5px] rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-0.5 w-5 bg-white transition-all duration-300 ${open ? "top-[5px] -rotate-45" : "top-2.5"}`} />
              </span>
            </button>
          </div>
        </div>

        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-out-expo lg:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <nav className="overflow-hidden" aria-label="Mobile">
            <div className="container-x flex flex-col pt-1 pb-5">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 border-b border-line py-3.5 font-display text-2xl font-semibold tracking-wide uppercase transition-colors hover:text-brand ${
                    isActive(item.href) ? "text-brand" : "text-ink"
                  }`}
                >
                  {item.label}
                  <Icons.arrow className="ml-auto size-4 text-ink/30" />
                </Link>
              ))}
              <a href={telHref(company.phones[0])} className="btn-primary mt-5">
                <Icons.phone className="size-4" /> Call {company.phones[0]}
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
