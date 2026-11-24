"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { GalleryView, Product } from "@/data/products";
import { Icons } from "./icons";

type Mode = "main" | "thumb" | "lightbox";

function SpecSheet({ view, product, mode }: { view: GalleryView; product: Product; mode: Mode }) {
  const thumb = mode === "thumb";
  return (
    <div className="absolute inset-0 flex flex-col bg-ink text-white">
      <div
        className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-size-[32px_32px]"
        aria-hidden
      />
      {!thumb && (
        <div className="relative flex items-center justify-between border-b border-white/10 px-[6%] py-[4%] font-mono text-[11px] tracking-wider text-white/60 uppercase sm:text-xs">
          <span>Spec sheet</span>
          <span>{product.sku}</span>
        </div>
      )}
      <div className={`relative flex flex-1 items-center justify-center ${thumb ? "p-[14%]" : "p-[8%]"}`}>
        <div className="relative aspect-square h-full max-h-full overflow-hidden rounded-sm ring-1 ring-white/15">
          <Image src={view.src} alt="" fill sizes={thumb ? "80px" : "40vw"} className="object-cover" />
          {/* corner ticks */}
          {!thumb &&
            ["top-1 left-1 border-t border-l", "top-1 right-1 border-t border-r", "bottom-1 left-1 border-b border-l", "right-1 bottom-1 border-r border-b"].map((c) => (
              <span key={c} className={`absolute h-4 w-4 border-brand ${c}`} aria-hidden />
            ))}
        </div>
      </div>
      {!thumb && (
        <dl className="relative grid grid-cols-2 gap-px border-t border-white/10 bg-white/10">
          {product.specs.slice(0, 4).map((s) => (
            <div key={s.label} className="bg-ink px-[6%] py-3 sm:py-4">
              <dt className="text-[10px] tracking-wider text-white/45 uppercase sm:text-[11px]">{s.label}</dt>
              <dd className="mt-0.5 truncate text-xs font-medium sm:text-sm">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

function View({
  view,
  product,
  mode,
  priority,
}: {
  view: GalleryView;
  product: Product;
  mode: Mode;
  priority?: boolean;
}) {
  if (view.kind === "specs") return <SpecSheet view={view} product={product} mode={mode} />;
  const sizes = mode === "thumb" ? "96px" : mode === "lightbox" ? "90vw" : "(min-width: 1024px) 45vw, 100vw";
  const fit = view.fit === "contain" ? "object-contain bg-white" : "object-cover";
  return (
    <Image
      src={view.src}
      alt={mode === "thumb" ? "" : view.alt}
      fill
      priority={priority}
      sizes={sizes}
      className={fit}
      style={view.scale ? { transform: `scale(${view.scale})` } : undefined}
    />
  );
}

export function ProductGallery({ product, views }: { product: Product; views: GalleryView[] }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const touchX = useRef<number | null>(null);
  const current = views[index];

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + views.length) % views.length), [views.length]);

  // Keyboard controls + scroll lock for the lightbox
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go]);

  const swipe = {
    onTouchStart: (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX),
    onTouchEnd: (e: React.TouchEvent) => {
      if (touchX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchX.current;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      touchX.current = null;
    },
  };

  const navBtn =
    "flex h-10 w-10 items-center justify-center rounded-sm bg-white/90 text-ink shadow-sm ring-1 ring-ink/10 backdrop-blur transition-colors hover:bg-ink hover:text-white";

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4">
      {/* Thumbnails: vertical on desktop, horizontal strip on mobile */}
      <div
        className="flex gap-2 overflow-x-auto [scrollbar-width:none] sm:max-h-[min(36rem,70vh)] sm:w-20 sm:shrink-0 sm:flex-col sm:overflow-y-auto [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Product images"
      >
        {views.map((v, i) => (
          <button
            key={v.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={v.label}
            onMouseEnter={() => setIndex(i)}
            onFocus={() => setIndex(i)}
            onClick={() => setIndex(i)}
            className={`group relative aspect-square w-16 shrink-0 overflow-hidden rounded-sm border bg-mist transition-all sm:w-full ${
              i === index ? "border-ink ring-2 ring-ink ring-offset-2 ring-offset-paper" : "border-line hover:border-ink/40"
            }`}
          >
            <View view={v} product={product} mode="thumb" />
          </button>
        ))}
      </div>

      {/* Main stage */}
      <div className="relative flex-1">
        <div
          className={`relative aspect-square overflow-hidden rounded-sm border border-line bg-mist cursor-pointer`}
          onClick={() => setOpen(true)}
          {...swipe}
        >
          {views.map((v, i) => (
            <div
              key={v.id}
              className={`absolute inset-0 transition-opacity duration-300 ${i === index ? "opacity-100" : "pointer-events-none opacity-0"}`}
              aria-hidden={i !== index}
            >
              <View view={v} product={product} mode="main" priority={i === 0} />
            </div>
          ))}

          <span className="pointer-events-none absolute right-3 bottom-3 rounded-sm bg-ink/80 px-2 py-0.5 font-mono text-[11px] text-white sm:hidden">
            {index + 1}/{views.length}
          </span>
        </div>

        {/* Arrows on the main image (desktop hover) */}
        <div className="pointer-events-none absolute inset-y-0 right-3 left-3 hidden items-center justify-between sm:flex">
          <button type="button" aria-label="Previous image" onClick={() => go(-1)} className={`pointer-events-auto ${navBtn}`}>
            <Icons.arrow className="h-4 w-4 rotate-180" />
          </button>
          <button type="button" aria-label="Next image" onClick={() => go(1)} className={`pointer-events-auto ${navBtn}`}>
            <Icons.arrow className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {open &&
        createPortal(
        <div
          className="fixed inset-0 z-100 flex flex-col bg-ink/95 text-white backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} images`}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <p className="text-sm">
              <span className="font-semibold">{product.name}</span>
              <span className="ml-3 font-mono text-white/50">
                {index + 1} / {views.length} · {current.label}
              </span>
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="flex h-10 w-10 items-center justify-center rounded-sm text-2xl leading-none text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              ×
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" {...swipe}>
            <div className="relative aspect-square h-full max-h-full w-auto max-w-full overflow-hidden rounded-sm">
              <View view={current} product={product} mode="lightbox" />
            </div>
            <button type="button" aria-label="Previous image" onClick={() => go(-1)} className={`absolute left-4 hidden sm:flex ${navBtn}`}>
              <Icons.arrow className="h-4 w-4 rotate-180" />
            </button>
            <button type="button" aria-label="Next image" onClick={() => go(1)} className={`absolute right-4 hidden sm:flex ${navBtn}`}>
              <Icons.arrow className="h-4 w-4" />
            </button>
          </div>

          <div className="flex justify-center gap-2 overflow-x-auto px-4 py-4">
            {views.map((v, i) => (
              <button
                key={v.id}
                type="button"
                aria-label={v.label}
                onClick={() => setIndex(i)}
                className={`relative aspect-square w-14 shrink-0 overflow-hidden rounded-sm bg-mist transition-opacity ${
                  i === index ? "ring-2 ring-brand" : "opacity-50 hover:opacity-100"
                }`}
              >
                <View view={v} product={product} mode="thumb" />
              </button>
            ))}
          </div>
        </div>,
          document.body,
        )}
    </div>
  );
}
