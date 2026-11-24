import Image from "next/image";
import type { Client } from "@/data/site";

export function ClientLogo({ client }: { client: Client }) {
  return (
    <div className="group relative flex h-full flex-col items-center justify-center gap-4 bg-white px-6 pt-8 pb-5 transition-colors duration-500 hover:bg-paper">
      <div className="relative flex h-14 w-full items-center justify-center">
        {client.logo ? (
          <Image
            src={client.logo}
            alt={`${client.name} logo`}
            fill
            sizes="200px"
            className="object-contain opacity-70 grayscale transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
          />
        ) : (
          <span className="text-center font-display text-lg leading-tight font-bold tracking-tight text-ink/55 transition-colors duration-500 group-hover:text-ink">
            {client.name}
          </span>
        )}
      </div>
      <div className="text-center">
        <p className="text-[13px] font-medium text-ink/70">{client.logo ? client.name : " "}</p>
        <p className="text-[11px] tracking-wide text-steel uppercase">{client.sector}</p>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-hivis transition-transform duration-500 group-hover:scale-x-100" />
    </div>
  );
}
