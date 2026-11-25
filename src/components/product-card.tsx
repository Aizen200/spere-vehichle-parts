import Image from "next/image";
import Link from "next/link";
import { imageFor, type Product } from "@/data/products";
import { company, telHref } from "@/data/site";
import { Icons } from "./icons";

const btn = "px-3! py-2.5! text-sm!";

export function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.slug}`;
  return (
    <div className="group flex h-full flex-col gap-3 rounded-lg bg-mist p-3 ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(23,28,32,0.4)]">
      <Link href={href} tabIndex={-1} aria-hidden className="relative block aspect-square overflow-hidden rounded-md bg-white">
        <Image
          src={imageFor(product.slug)}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col rounded-md bg-white p-5">
        <p className="text-xs font-medium text-steel">{product.category}</p>
        <h3 className="mt-1 text-lg leading-snug font-semibold text-ink">
          <Link href={href} className="transition-colors hover:text-brand">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 font-mono text-[11px] text-steel/80">{product.sku}</p>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Link href={href} aria-label={`View ${product.name}`} className={`group/btn btn-dark ${btn}`}>
            View
            <Icons.arrow className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </Link>
          <a
            href={telHref(company.phones[0])}
            aria-label={`Enquire about ${product.name} — call ${company.phones[0]}`}
            className={`btn-primary ${btn}`}
          >
            <Icons.phone className="h-4 w-4" />
            Enquire
          </a>
        </div>
      </div>
    </div>
  );
}
