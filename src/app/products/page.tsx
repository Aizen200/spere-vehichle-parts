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
      <section className="relative isolate overflow-hidden bg-linear-to-b from-[#d9dcdc] via-[#e8eaea] to-paper">
        <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8 lg:py-16">
          <div>
          <nav aria-label="Breadcrumb" className="fade-up text-sm text-ink/55">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-ink/80">Spare parts</span>
          </nav>
          <h1 className="mt-5 text-[clamp(3rem,6.4vw,5.4rem)] leading-[0.88] text-ink">
            <span className="line-mask"><span style={{ "--d": "100ms" } as React.CSSProperties}>Forklift spare parts</span></span>
          </h1>
          <p className="fade-up mt-5 max-w-2xl text-lg leading-relaxed text-ink/70" style={{ "--d": "300ms" } as React.CSSProperties}>
            Stocked parts for Toyota, Linde, Doosan, Godrej and more. Can&apos;t find your part? We stock far more than
            what&apos;s listed here —{" "}
            <a href={telHref(company.phones[0])} className="font-medium text-ink underline decoration-brand decoration-2 underline-offset-4">
              call {company.phones[0]}
            </a>
            .
          </p>
          </div>
          <div className="fade-up relative hidden aspect-[4/3] overflow-hidden rounded-lg shadow-[0_40px_80px_-40px_rgba(23,28,32,0.6)] ring-1 ring-black/5 lg:block" style={{ "--d": "250ms" } as React.CSSProperties}>
            <Image src={photos.hero} alt="" fill priority sizes="40vw" className="animate-kenburns object-cover" />
          </div>
        </div>
        <div className="hazard h-1.5" aria-hidden />
      </section>

      <section className="container-x py-10 lg:py-14">
        <Suspense fallback={<div className="h-96" />}>
          <ProductBrowser />
        </Suspense>
      </section>
    </>
  );
}
