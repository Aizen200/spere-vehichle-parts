"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { services } from "@/data/site";
import { serviceIcons } from "./icons";

const AUTOPLAY_MS = 3500;
const n = services.length;
// Render three copies so the track can loop forever in both directions.
const slides = [...services, ...services, ...services].map((s, i) => ({ ...s, i: i % n }));

export function ServicesCarousel() {
  const [index, setIndex] = useState(n);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const dragStart = useRef<number | null>(null);
  const active = ((index % n) + n) % n;

  const go = useCallback((next: number) => {
    setAnimate(true);
    setIndex(next);
  }, []);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      if (!document.hidden) go(index + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [index, paused, go]);

  // Re-enable the transition one frame after a silent loop jump.
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  // Once we drift into a clone set, jump back to the middle copy without animating.
  const onTransitionEnd = () => {
    if (index >= 2 * n || index < n) {
      setAnimate(false);
      setIndex(n + active);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] [--w:84%] sm:[--w:46%] lg:[--w:29.4%]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (dragStart.current = null)}
        style={{ touchAction: "pan-y" }}
      >
        <div
          className={`flex w-full ${animate ? "transition-transform duration-700 ease-out-expo" : ""}`}
          style={{ transform: `translateX(calc(50% - ${index + 0.5} * var(--w)))` }}
          onTransitionEnd={onTransitionEnd}
        >
          {slides.map((s, k) => {
            const Icon = serviceIcons[s.i];
            return (
              <div
                key={k}
                className="shrink-0 basis-(--w) px-2.5 sm:px-4"
                aria-hidden={Math.abs(k - index) > 1}
              >
                <div className="group relative isolate flex h-full min-h-[20rem] flex-col overflow-hidden rounded-lg bg-white/[0.04] p-7 ring-1 ring-white/10 transition-colors duration-300 select-none hover:bg-white/[0.07] hover:ring-brand/50">
                  <span aria-hidden className="pointer-events-none absolute -top-5 -right-1 -z-10 font-display text-[8rem] leading-none font-bold text-white/[0.04] transition-colors duration-300 group-hover:text-brand/20">
                    {String(s.i + 1).padStart(2, "0")}
                  </span>
                  <span className="grid size-12 place-items-center rounded-md bg-brand text-white transition-transform duration-300 group-hover:-rotate-6">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-auto pt-10 font-display text-3xl leading-none font-bold uppercase">{s.title}</h3>
                  <p className="mt-3 max-w-xs leading-relaxed text-white/60">{s.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Services">
        {services.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={s.title}
            onClick={() => go(index + (i - active))}
            className="group py-3"
          >
            <span
              className={`block h-1 transition-all duration-500 ${
                i === active ? "w-10 bg-brand" : "w-6 bg-white/25 group-hover:bg-white/50"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
