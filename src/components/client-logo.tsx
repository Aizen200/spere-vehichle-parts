import Image from "next/image";
import type { Client } from "@/data/site";

const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

export function ClientLogo({ client }: { client: Client }) {
  return (
    <div
      tabIndex={0}
      className="group relative flex h-full min-h-52 flex-col items-center justify-center overflow-hidden rounded-lg bg-white px-6 pt-8 pb-6 ring-1 ring-line outline-none transition-all duration-300 hover:-translate-y-1 hover:bg-brand-tint hover:ring-brand/40 focus-visible:bg-brand-tint"
    >
      <div className="relative flex h-14 w-full items-center justify-center">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-40 -translate-x-1/2 -translate-y-1/2 scale-75 rounded-full bg-[radial-gradient(closest-side,rgba(207,63,46,0.18),transparent)] opacity-0 blur-md transition-all duration-700 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
        />
        {client.logo ? (
          <Image
            src={client.logo}
            alt={`${client.name} logo`}
            fill
            sizes="200px"
            className="object-contain opacity-70 grayscale transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:scale-110 group-focus-visible:opacity-100 group-focus-visible:grayscale-0"
          />
        ) : (
          <span className="text-center font-display text-xl leading-tight font-bold text-ink/60 uppercase transition-all duration-500 group-hover:scale-105 group-hover:text-brand group-focus-visible:text-brand">
            {client.name}
          </span>
        )}
      </div>

      <div className="mt-4 text-center">
        {client.logo && <p className="text-[13px] font-medium text-ink/70">{client.name}</p>}
        <p className="text-[11px] tracking-wide text-steel uppercase">{client.sector}</p>
      </div>

      {/* Collapsed row that opens on hover, pushing the logo and name up */}
      <div
        className={`grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ${ease} group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]`}
      >
        <div className="overflow-hidden">
          <p
            className={`max-w-[16rem] translate-y-4 pt-3 text-center text-[13px] leading-relaxed text-ink/60 opacity-0 transition-all duration-700 ${ease} group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100`}
          >
            {client.blurb}
          </p>
        </div>
      </div>

      <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
    </div>
  );
}
