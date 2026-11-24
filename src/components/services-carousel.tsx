"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { services } from "@/data/site";
import { Icons } from "./icons";

const serviceIcons = [
  Icons.parts, Icons.workshop, Icons.rentals, Icons.field, Icons.maintenance,
  Icons.training, Icons.fleet, Icons.load, Icons.operator,
];

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
        className="overflow-hidden [--w:84%] sm:[--w:46%] lg:[--w:29.4%]"
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
                <div className="group relative flex h-full min-h-[22rem] flex-col items-center justify-center overflow-hidden border border-white/15 bg-ink/60 px-8 py-12 text-center backdrop-blur-[2px] transition-colors duration-500 select-none hover:bg-graphite">
                  <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-700 group-hover:scale-x-100" />
                  <span className="flex h-16 w-16 items-center justify-center rounded-sm border border-white/15 text-brand transition-all duration-500 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-7 font-display text-xl font-semibold tracking-tight sm:text-2xl">{s.title}</h3>
                  <p className="mt-3 max-w-xs leading-relaxed text-white/55">{s.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5" role="tablist" aria-label="Services">
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
              className={`block h-1 w-8 rounded-full transition-all duration-500 sm:w-10 ${
                i === active ? "bg-white" : "bg-white/25 group-hover:bg-white/50"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
