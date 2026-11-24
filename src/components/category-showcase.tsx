"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { categories, imageFor, products, type Product } from "@/data/products";
import { company, telHref } from "@/data/site";
import { Icons } from "./icons";

const MAX_CARDS = 6;

export function CategoryShowcase() {
  const [active, setActive] = useState(categories[0]);
  const items = products.filter((p) => p.category === active);
  const count = items.length;
  const unit = count === 1 ? "part" : "parts";

  return (
    <div className="grid gap-10 lg:grid-cols-[17.5rem_1fr] lg:gap-10">
      {/* Category list */}
      <aside>
        <p className="text-sm font-medium text-steel">Categories</p>
        <ul
          role="tablist"
          aria-label="Part categories"
          className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
        >
          {categories.map((c) => {
            const n = products.filter((p) => p.category === c).length;
            const selected = c === active;
            return (
              <li key={c} className="shrink-0">
                <button
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(c)}
                  className={`flex w-full items-center justify-between gap-4 rounded-lg px-4 py-3 text-left text-[15px] font-medium whitespace-nowrap transition-colors duration-200 lg:px-5 lg:py-3.5 ${
                    selected ? "bg-ink text-white" : "bg-mist text-ink hover:bg-line"
                  }`}
                >
                  <span>{c}</span>
                  <span className={`text-sm tabular-nums ${selected ? "text-white/80" : "text-steel"}`}>{n}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Products for the active category */}
      <div role="tabpanel" aria-label={active}>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-steel">
            {active} · {count} {unit}
          </p>
          <Link
            href={`/products?category=${encodeURIComponent(active)}`}
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-ink hover:text-brand"
          >
            See all {count}
            <Icons.arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div key={active} className="fade-up mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.slice(0, MAX_CARDS).map((p) => (
            <ShowcaseCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ShowcaseCard({ product }: { product: Product }) {
  const [lead, ...rest] = product.specs;
  const facts = rest.slice(0, 2);
  const href = `/products/${product.slug}`;

  return (
    <div className="group flex h-full flex-col rounded-2xl border border-line bg-mist/70 p-3 transition-shadow duration-300 hover:shadow-[0_24px_50px_-28px_rgba(11,12,14,0.35)]">
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl bg-white">
        <Link href={href} className="relative block aspect-10/9 overflow-hidden bg-mist" tabIndex={-1} aria-hidden>
          <Image
            src={imageFor(product.slug)}
            alt=""
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 640px) 40vw, 90vw"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
          />
          <span className="absolute top-3 left-3 rounded-md bg-white/95 px-2.5 py-1 font-mono text-[11px] text-ink shadow-sm">
            {product.sku}
          </span>
        </Link>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <Link href={href} className="hover:text-brand">
            <h3 className="font-display text-lg leading-snug font-semibold tracking-tight transition-colors">{product.name}</h3>
          </Link>
          {lead && <p className="mt-1 text-sm text-steel">{lead.value}</p>}

          {facts.length > 0 && (
            <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-5">
              {facts.map((s) => (
                <div key={s.label} className="min-w-0">
                  <dt className="truncate text-sm text-steel">{s.label}</dt>
                  <dd className="mt-0.5 truncate text-[15px] font-semibold text-ink" title={s.value}>
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
            <Link
              href={href}
              aria-label={`View ${product.name}`}
              className="group/btn inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-brand-light/70 bg-brand text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              View
              <Icons.arrow className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </Link>
            <a
              href={telHref(company.phones[0])}
              aria-label={`Enquire about ${product.name} — call ${company.phones[0]}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-brand-light/70 bg-brand text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              <Icons.phone className="h-4 w-4" />
              Enquire
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
