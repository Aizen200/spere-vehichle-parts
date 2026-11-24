import Image from "next/image";
import Link from "next/link";
import { imageFor, type Product } from "@/data/products";
import { company, telHref } from "@/data/site";
import { Icons } from "./icons";

const btn =
  "inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-brand-light/70 bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-dark";

export function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.slug}`;
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-white transition-all duration-500 hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_24px_50px_-24px_rgba(11,12,14,0.35)]">
      <Link href={href} tabIndex={-1} aria-hidden className="relative block aspect-square overflow-hidden bg-mist">
        <Image
          src={imageFor(product.slug)}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium text-steel">{product.category}</p>
        <h3 className="mt-1.5 font-display text-lg leading-snug font-semibold tracking-tight">
          <Link href={href} className="transition-colors hover:text-brand">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 font-mono text-[11px] text-steel/80">{product.sku}</p>
        <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
          <Link href={href} aria-label={`View ${product.name}`} className={`group/btn ${btn}`}>
            View
            <Icons.arrow className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </Link>
          <a
            href={telHref(company.phones[0])}
            aria-label={`Enquire about ${product.name} — call ${company.phones[0]}`}
            className={btn}
          >
            <Icons.phone className="h-4 w-4" />
            Enquire
          </a>
        </div>
      </div>
    </div>
  );
}
