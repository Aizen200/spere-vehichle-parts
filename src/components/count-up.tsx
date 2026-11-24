"use client";

import { useEffect, useRef, useState } from "react";

/** Counts from 0 to the number inside `value` (e.g. "45+", "120+") when scrolled into view. */
export function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? Number(match[2]) : 0;
  const hasNumber = match !== null;
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasNumber) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setN(Math.round(target * (1 - Math.pow(1 - t, 4))));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration, hasNumber]);

  if (!match) return <span>{value}</span>;
  return (
    <span ref={ref} className="tabular-nums" aria-label={value}>
      <span aria-hidden>
        {match[1]}
        {n}
        {match[3]}
      </span>
    </span>
  );
}
