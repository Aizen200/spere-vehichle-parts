import type { SVGProps } from "react";

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

type P = SVGProps<SVGSVGElement>;

export const Icons = {
  parts: (p: P) => (
    <svg {...base} {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" /></svg>
  ),
  workshop: (p: P) => (
    <svg {...base} {...p}><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z" /></svg>
  ),
  rentals: (p: P) => (
    <svg {...base} {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4M8 14h3M8 17h6" /></svg>
  ),
  field: (p: P) => (
    <svg {...base} {...p}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
  ),
  maintenance: (p: P) => (
    <svg {...base} {...p}><path d="M12 3 4 6v6c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V6z" /><path d="m9 12 2 2 4-4" /></svg>
  ),
  training: (p: P) => (
    <svg {...base} {...p}><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M8 20h8M12 16v4M7 12l3-3 2 2 4-4" /></svg>
  ),
  fleet: (p: P) => (
    <svg {...base} {...p}><path d="m12 3 9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" /></svg>
  ),
  load: (p: P) => (
    <svg {...base} {...p}><path d="M6 20h12l-2-11H8z" /><circle cx="12" cy="6" r="2.5" /><path d="M10 15h4" /></svg>
  ),
  operator: (p: P) => (
    <svg {...base} {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2" /><path d="M12 3v7M4.5 15.5 10.2 13M19.5 15.5 13.8 13" /></svg>
  ),
  arrow: (p: P) => (
    <svg {...base} strokeWidth={2} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  ),
  check: (p: P) => (
    <svg {...base} strokeWidth={2} {...p}><path d="m5 12 4.5 4.5L19 7" /></svg>
  ),
  phone: (p: P) => (
    <svg {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
  ),
  mail: (p: P) => (
    <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
  ),
  chat: (p: P) => (
    <svg {...base} {...p}><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.1z" /><path d="M9 10h6M9 13h4" /></svg>
  ),
};

/** Icons for each entry in `services` (src/data/site.ts), in the same order. */
export const serviceIcons = [
  Icons.parts, Icons.workshop, Icons.rentals, Icons.field, Icons.maintenance,
  Icons.training, Icons.fleet, Icons.load, Icons.operator,
];
