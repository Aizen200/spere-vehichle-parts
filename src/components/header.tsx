"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/90 backdrop-blur-md">
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="group inline-flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-10 place-items-center rounded-md bg-brand font-display text-base font-extrabold tracking-wide text-white transition-transform duration-300 group-hover:-rotate-6">
            JEC
          </span>
          <span className="leading-none">
            <span className="block text-[17px] font-extrabold tracking-wide text-ink uppercase">Jay Engineering</span>
            <span className="mt-1 block text-[10px] font-semibold tracking-[0.24em] text-steel uppercase">
              Forklift parts &amp; service
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-md bg-mist p-1 lg:flex" aria-label="Main">
          {nav.map((item) => {
            const active = item.href === "/products" && pathname.startsWith("/products");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-4 py-2 text-[14px] font-medium whitespace-nowrap transition-colors ${
                  active ? "bg-white text-ink shadow-sm" : "text-ink/60 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a href={telHref(company.phones[0])} className="btn-dark hidden px-5! py-2.5! text-[14px]! sm:inline-flex">
            <Icons.phone className="size-4" />
            {company.phones[0]}
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-md bg-mist text-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-0.5 w-5 rounded bg-ink transition-all duration-300 ${open ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-5 rounded bg-ink transition-all duration-300 ${open ? "top-[5px] -rotate-45" : "top-2.5"}`} />
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
          <div className="container-x flex flex-col gap-1 pt-1 pb-5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-4 py-3 text-[15px] font-medium text-ink/80 transition-colors hover:bg-mist hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <a href={telHref(company.phones[0])} className="btn-dark mt-3">
              <Icons.phone className="size-4" /> Call {company.phones[0]}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
