import Image from "next/image";
import Link from "next/link";
import { formatPrice, imageFor, type Product } from "@/data/products";
import { Icons } from "./icons";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-white transition-all duration-500 hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_24px_50px_-24px_rgba(11,12,14,0.35)]"
    >
      <div className="relative aspect-square overflow-hidden bg-mist">
        <Image
          src={imageFor(product.slug)}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 80vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        {product.inStock && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-ink backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> In stock
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium text-steel">{product.category}</p>
        <h3 className="mt-1.5 font-display text-lg leading-snug font-semibold tracking-tight">{product.name}</h3>
        <p className="mt-1 font-mono text-[11px] text-steel/80">{product.sku}</p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <p className="font-display text-xl font-bold tracking-tight">{formatPrice(product.price)}</p>
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 group-hover:border-hivis group-hover:bg-hivis"
            aria-hidden
          >
            <Icons.arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
