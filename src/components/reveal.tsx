"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Variant = "up" | "fade" | "left" | "right" | "zoom";

/**
 * Fades/slides its content in the first time it scrolls into view.
 * Styles live in globals.css (.reveal / .is-visible).
 * Content is never left hidden: it is shown immediately if already on screen,
 * if IntersectionObserver is unavailable, or after a safety timeout.
 */
export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: Variant;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.classList.add("is-visible");

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);

    // Safety net: anything already scrolled past (e.g. after a jump link) gets shown.
    const safety = window.setTimeout(() => {
      if (el.getBoundingClientRect().top < window.innerHeight) show();
    }, 1800);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      data-variant={variant}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
