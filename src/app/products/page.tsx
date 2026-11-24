import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ProductBrowser } from "@/components/product-browser";
import { company, photos, telHref } from "@/data/site";

export const metadata: Metadata = {
  title: "Shop Forklift Spare Parts",
  description: "Hydraulics, tyres, bearings, brakes, filters, chains and more for every major forklift brand.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image src={photos.hero} alt="" fill priority sizes="100vw" className="animate-kenburns -z-20 object-cover opacity-40" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-ink via-ink/85 to-ink/50" />
        <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
          <nav aria-label="Breadcrumb" className="fade-up text-sm text-white/50">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">Spare parts</span>
          </nav>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[1] font-semibold tracking-[-0.035em]">
            <span className="line-mask"><span style={{ "--d": "100ms" } as React.CSSProperties}>Forklift spare parts</span></span>
          </h1>
          <p className="fade-up mt-5 max-w-2xl text-lg leading-relaxed text-white/65" style={{ "--d": "300ms" } as React.CSSProperties}>
            Stocked parts for Toyota, Linde, Doosan, Godrej and more. Can&apos;t find your part? We stock far more than
            what&apos;s listed here —{" "}
            <a href={telHref(company.phones[0])} className="text-white underline decoration-brand underline-offset-4">
              call {company.phones[0]}
            </a>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <Suspense fallback={<div className="h-96" />}>
          <ProductBrowser />
        </Suspense>
      </section>
    </>
  );
}
