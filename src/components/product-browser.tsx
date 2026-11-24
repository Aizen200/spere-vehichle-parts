"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categories, products } from "@/data/products";
import { ShowcaseCard } from "./category-showcase";
import { Icons } from "./icons";

const ALL = "All parts";

export function ProductBrowser() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const requested = searchParams.get("category");
  const active = requested && categories.includes(requested) ? requested : ALL;
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const counts = useMemo(() => {
    const map: Record<string, number> = { [ALL]: products.length };
    for (const p of products) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, []);

  // Press "/" anywhere to jump to search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key !== "/" || t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName)) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const setCategory = (c: string) => {
    const params = new URLSearchParams(searchParams);
    if (c === ALL) params.delete("category");
    else params.set("category", c);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (active === ALL || p.category === active) &&
        (!q ||
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.specs.some((s) => s.value.toLowerCase().includes(q))),
    );
  }, [active, query]);

  const filtered = active !== ALL || query.trim() !== "";

  const count = visible.length;

  return (
    <div className="grid gap-10 lg:grid-cols-[17.5rem_1fr] lg:gap-10">
      {/* Category list */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <label className="group relative flex items-center">
          <span className="sr-only">Search parts</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 h-4.5 w-4.5 text-steel transition-colors group-focus-within:text-ink" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search part, SKU or spec…"
            className="h-13 w-full rounded-lg border border-line bg-white pr-12 pl-11 text-[15px] transition-all outline-none placeholder:text-steel/80 focus:border-ink focus:ring-1 focus:ring-ink [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="absolute right-3 rounded-md px-2 py-1 text-xs font-medium text-steel transition-colors hover:bg-mist hover:text-ink"
            >
              Clear
            </button>
          ) : (
            <kbd className="pointer-events-none absolute right-3 hidden rounded-md border border-line bg-white px-2 py-0.5 font-sans text-xs text-steel sm:block">
              /
            </kbd>
          )}
        </label>
        <p className="mt-8 text-sm font-medium text-steel">Categories</p>
        <ul
          role="tablist"
          aria-label="Filter by category"
          className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {[ALL, ...categories].map((c) => {
            const selected = active === c;
            return (
              <li key={c} className="shrink-0">
                <button
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setCategory(c)}
                  className={`flex w-full items-center justify-between gap-4 h-13 rounded-lg px-4 text-left text-[15px] font-medium whitespace-nowrap transition-colors duration-200 lg:px-5 ${
                    selected ? "bg-ink text-white" : "bg-mist text-ink hover:bg-line"
                  }`}
                >
                  <span>{c}</span>
                  <span className={`text-sm tabular-nums ${selected ? "text-white/80" : "text-steel"}`}>{counts[c] ?? 0}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Results */}
      <div role="tabpanel" aria-label={active}>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-steel" aria-live="polite">
            {active} · {count} {count === 1 ? "part" : "parts"}
            {query.trim() && <> matching “{query.trim()}”</>}
          </p>
          {filtered && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory(ALL);
              }}
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-ink hover:text-brand"
            >
              See all {products.length}
              <Icons.arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          )}
        </div>

        {count > 0 ? (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((p, i) => (
              <div
                key={`${active}-${p.slug}`}
                className="fade-up"
                style={{ "--d": `${Math.min(i, 8) * 60}ms` } as React.CSSProperties}
              >
                <ShowcaseCard product={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-line bg-mist/70 p-12 text-center">
            <p className="font-display text-2xl font-semibold tracking-tight">No parts match your search</p>
            <p className="mt-2 text-steel">
              We stock far more than what&apos;s listed here. Call us with your part number.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
