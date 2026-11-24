"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { company, telHref } from "@/data/site";
import { Icons } from "./icons";

const nav = [
  { href: "/products", label: "Shop parts" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`border-b text-white transition-all duration-500 ${
          scrolled || open
            ? "border-white/10 bg-ink/90 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            : "border-white/5 bg-ink"
        }`}
      >
        <div
          className={`flex w-full items-center justify-between gap-6 px-4 sm:px-6 lg:grid lg:px-8 lg:grid-cols-[1fr_auto_1fr] transition-all duration-500 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <Link href="/" className="group flex items-center gap-3 justify-self-start" onClick={() => setOpen(false)}>
            <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-brand font-display text-sm font-extrabold tracking-tight text-white transition-transform duration-500 group-hover:rotate-[-6deg]">
              JEC
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[15px] font-semibold tracking-tight">Jay Engineering</span>
              <span className="block text-[11px] tracking-[0.2em] text-white/50 uppercase">Forklift parts &amp; service</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative px-4 py-2 whitespace-nowrap text-[15px] font-medium text-white/80 transition-colors hover:text-white"
              >
                {item.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
            <a href={telHref(company.phones[0])} className="btn-primary hidden !py-2.5 sm:inline-flex">
              <Icons.phone className="h-4 w-4" />
              {company.phones[0]}
            </a>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3.5 w-6">
                <span className={`absolute left-0 h-px w-6 bg-white transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-6 bg-white transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3.5"}`} />
              </span>
            </button>
          </div>
        </div>

        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <nav className="overflow-hidden">
            <div className="mx-auto flex max-w-7xl flex-col px-4 pt-2 pb-6">
              {nav.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`border-b border-white/10 py-4 font-display text-2xl font-semibold tracking-tight transition-all duration-500 hover:text-brand-light ${
                    open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                  }`}
                  style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                >
                  {item.label}
                </Link>
              ))}
              <a href={telHref(company.phones[0])} className="btn-primary mt-6">
                <Icons.phone className="h-4 w-4" /> Call {company.phones[0]}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
