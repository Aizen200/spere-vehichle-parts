import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { galleryFor, getProduct, products } from "@/data/products";
import { company, photos, telHref, whatsappHref } from "@/data/site";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { Icons } from "@/components/icons";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.summary };
}

const perks = [
  { icon: Icons.maintenance, label: "ISO 9001:2015 certified supplier" },
  { icon: Icons.field, label: "Dispatch across India" },
  { icon: Icons.workshop, label: "Expert fitment support" },
];

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = [
    ...products.filter((p) => p.category === product.category && p.slug !== product.slug),
    ...products.filter((p) => p.category !== product.category),
  ].slice(0, 4);

  const enquiry = `Hi JEC, I'd like a quote for ${product.name} (SKU ${product.sku}).`;
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <>
      <nav aria-label="Breadcrumb" className="border-b border-line bg-white">
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3.5 text-sm text-steel">
          <li><Link href="/" className="transition-colors hover:text-ink">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/products" className="transition-colors hover:text-ink">Spare parts</Link></li>
          <li aria-hidden>/</li>
          <li>
            <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="transition-colors hover:text-ink">
              {product.category}
            </Link>
          </li>
        </ol>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div className="fade-up lg:sticky lg:top-28 lg:self-start" style={d(0)}>
          <ProductGallery product={product} views={galleryFor(product, photos.fleet)} />
        </div>

        <div>
          <div className="fade-up flex flex-wrap items-center gap-3" style={d(80)}>
            <span className="text-sm text-steel">{product.category}</span>
          </div>
          <h1 className="fade-up mt-4 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl" style={d(140)}>
            {product.name}
          </h1>
          <p className="fade-up mt-3 font-mono text-sm text-steel" style={d(180)}>SKU {product.sku}</p>
          <p className="fade-up mt-6 text-lg leading-relaxed text-ink/70" style={d(300)}>{product.summary}</p>

          <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={d(360)}>
            <a href={whatsappHref(enquiry)} target="_blank" rel="noopener noreferrer" className="btn-primary group flex-1">
              Get a quote on WhatsApp
              <Icons.arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href={telHref(company.phones[0])} className="btn-ghost-dark flex-1">
              <Icons.phone className="h-4 w-4" /> Call to order
            </a>
          </div>
          <a
            href={`mailto:${company.emails[0]}?subject=${encodeURIComponent(`Quote: ${product.name} (${product.sku})`)}&body=${encodeURIComponent(enquiry)}`}
            className="fade-up mt-4 inline-block text-sm text-steel underline underline-offset-4 transition-colors hover:text-ink"
            style={d(400)}
          >
            Or request a quote by email
          </a>

          <ul className="fade-up mt-10 grid gap-3 sm:grid-cols-3" style={d(440)}>
            {perks.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 rounded-sm border border-line bg-white px-4 py-3.5 text-sm font-medium">
                <Icon className="h-5 w-5 shrink-0 text-ink/60" />
                {label}
              </li>
            ))}
          </ul>

          <div className="fade-up mt-12" style={d(500)}>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Specifications</h2>
            <dl className="mt-5 divide-y divide-line overflow-hidden rounded-sm border border-line bg-white">
              {product.specs.map((s) => (
                <div key={s.label} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 px-5 py-3.5 transition-colors hover:bg-paper">
                  <dt className="text-sm text-steel">{s.label}</dt>
                  <dd className="text-sm font-medium">{s.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-steel">
              Not sure it fits? Send us your forklift model and serial number and we&apos;ll confirm compatibility.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-mist/60 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <p className="eyebrow">Related</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">You may also need</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90} className="h-full">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
