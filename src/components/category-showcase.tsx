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
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
      {/* Category list */}
      <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <p className="text-sm font-medium text-steel">Categories</p>
        <ul
          role="tablist"
          aria-label="Part categories"
          className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0"
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
                  className={`flex w-full items-center justify-between gap-4 rounded-md px-4 py-2.5 text-left text-[15px] font-medium whitespace-nowrap transition-colors duration-200 ${
                    selected ? "bg-ink text-white" : "bg-mist text-ink/75 hover:text-ink"
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
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand hover:text-ink"
          >
            See all {count}
            <Icons.arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div key={active} className="fade-up mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
    <div className="group flex h-full flex-col gap-3 rounded-lg bg-mist p-3 ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(23,28,32,0.4)]">
        <Link href={href} className="relative block aspect-[4/3.6] overflow-hidden rounded-md bg-white" tabIndex={-1} aria-hidden>
          <Image
            src={imageFor(product.slug)}
            alt=""
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 640px) 40vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-2 left-2 rounded-md bg-white px-2.5 py-1 font-mono text-[11px] text-ink/70 ring-1 ring-line">
            {product.sku}
          </span>
        </Link>

        <div className="flex flex-1 flex-col rounded-md bg-white p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Link href={href} className="hover:text-brand">
                <h3 className="text-lg leading-snug font-semibold text-ink transition-colors">{product.name}</h3>
              </Link>
              {lead && <p className="mt-0.5 text-sm text-steel">{lead.value}</p>}
            </div>
            <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-md bg-mist text-ink transition-colors group-hover:bg-ink group-hover:text-white">
              <Icons.arrow className="size-4 -rotate-45" />
            </span>
          </div>

          {facts.length > 0 && (
            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4 text-sm">
              {facts.map((s) => (
                <div key={s.label} className="min-w-0">
                  <dt className="truncate text-steel">{s.label}</dt>
                  <dd className="truncate font-semibold text-ink" title={s.value}>
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
            <Link
              href={href}
              aria-label={`View ${product.name}`}
              className="group/btn btn-dark px-3! py-2.5! text-sm!"
            >
              View
              <Icons.arrow className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </Link>
            <a
              href={telHref(company.phones[0])}
              aria-label={`Enquire about ${product.name} — call ${company.phones[0]}`}
              className="btn-primary px-3! py-2.5! text-sm!"
            >
              <Icons.phone className="h-4 w-4" />
              Enquire
            </a>
          </div>
        </div>
    </div>
  );
}
