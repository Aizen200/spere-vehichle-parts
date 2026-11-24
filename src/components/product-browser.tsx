"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categories, products } from "@/data/products";
import { ProductCard } from "./product-card";

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

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(11,12,14,0.04)]">
        {/* Search row */}
        <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-4">
          <label className="group relative flex flex-1 items-center">
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
              placeholder="Search by part name, SKU or spec…"
              className="w-full rounded-xl bg-paper py-3.5 pr-20 pl-11 text-[15px] transition-all outline-none placeholder:text-steel/80 focus:bg-white focus:ring-2 focus:ring-ink [&::-webkit-search-cancel-button]:hidden"
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

          <div className="flex items-center justify-between gap-4 px-1 sm:justify-end">
            <p className="text-sm whitespace-nowrap text-steel" aria-live="polite">
              <span className="font-display text-xl font-semibold tracking-tight text-ink tabular-nums">{visible.length}</span>
              <span className="mx-1">/</span>
              {products.length} parts
            </p>
            {filtered && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory(ALL);
                }}
                className="text-sm font-medium whitespace-nowrap text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:decoration-ink"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Category strip */}
        <div className="relative border-t border-line">
          <div className="flex gap-1 overflow-x-auto px-3 py-3 [scrollbar-width:none] sm:px-4 [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Filter by category">
            {[ALL, ...categories].map((c) => {
              const isActive = active === c;
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setCategory(c)}
                  className={`group flex shrink-0 items-center gap-2 rounded-lg py-2 pr-2 pl-3.5 text-sm font-medium transition-all duration-300 ${
                    isActive ? "bg-ink text-white" : "text-ink/70 hover:bg-mist hover:text-ink"
                  }`}
                >
                  {c}
                  <span
                    className={`min-w-6 rounded-md px-1.5 py-0.5 text-center text-[11px] font-semibold tabular-nums transition-colors ${
                      isActive ? "bg-hivis text-ink" : "bg-mist text-steel group-hover:bg-white"
                    }`}
                  >
                    {counts[c] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-white to-transparent" aria-hidden />
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((p, i) => (
            <div
              key={`${active}-${p.slug}`}
              className="fade-up"
              style={{ "--d": `${Math.min(i, 8) * 60}ms` } as React.CSSProperties}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-line bg-white p-12 text-center">
          <p className="font-display text-2xl font-semibold tracking-tight">No parts match your search</p>
          <p className="mt-2 text-steel">
            We stock far more than what&apos;s listed here. Call us with your part number.
          </p>
        </div>
      )}
    </div>
  );
}
