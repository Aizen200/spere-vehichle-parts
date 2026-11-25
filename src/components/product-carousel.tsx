"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "@/data/products";
import { ProductCard } from "./product-card";
import { Icons } from "./icons";

export function ProductCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
    setProgress(max > 0 ? el.scrollLeft / max : 1);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const btn =
    "flex h-11 w-11 items-center justify-center rounded-md border border-ink/15 text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30";

  return (
    <div className="mt-10">
      <div
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <div
            key={p.slug}
            className="w-[78%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-6">
        <div className="relative h-px flex-1 bg-ink/10">
          <div
            className="absolute inset-y-0 left-0 bg-ink transition-[width] duration-300"
            style={{ width: `${Math.max(12, progress * 100)}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous products" className={btn} disabled={!canPrev} onClick={() => scrollByPage(-1)}>
            <Icons.arrow className="h-4 w-4 rotate-180" />
          </button>
          <button type="button" aria-label="Next products" className={btn} disabled={!canNext} onClick={() => scrollByPage(1)}>
            <Icons.arrow className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
