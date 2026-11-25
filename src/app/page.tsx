import Image from "next/image";
import Link from "next/link";
import { brands, clients, company, photos, telHref, whatsappHref } from "@/data/site";
import { ServicesCarousel } from "@/components/services-carousel";
import { EnquiryForm } from "@/components/enquiry-form";
import { CategoryShowcase } from "@/components/category-showcase";
import { ClientLogo } from "@/components/client-logo";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { Icons } from "@/components/icons";
import { getProduct, imageFor, type Product } from "@/data/products";

const stats = [
  { value: company.years, label: "Years in business" },
  { value: company.clients, label: "Industrial clients" },
  { value: "12+", label: "Brands stocked" },
  { value: "Pan-India", label: "Field service" },
];

const heroProducts = ["heavy-duty-hydraulic-pump", "hydraulic-lift-cylinder", "industrial-solid-forklift-tyre"]
  .map(getProduct)
  .filter((p): p is Product => Boolean(p));

// Main card centred, the other two tucked behind it at angles
const cardPositions = [
  "left-1/2 top-1/2 z-20 w-[56%] -translate-x-1/2 -translate-y-1/2 -rotate-2",
  "right-0 top-0 z-10 w-[42%] rotate-6",
  "bottom-0 left-0 z-30 w-[42%] -rotate-6",
];

function HeroCard({ product, position, delay }: { product: Product; position: string; delay: number }) {
  const spec = product.specs[1] ?? product.specs[0];
  return (
    <div className={`absolute ${position}`}>
      <Link
        href={`/products/${product.slug}`}
        className="float group block rounded-lg bg-white p-2.5 shadow-[0_30px_60px_-24px_rgba(23,28,32,0.45)] ring-1 ring-black/5 transition-[rotate,scale] duration-500 hover:scale-[1.03] hover:rotate-0"
        style={{ "--float-delay": `${delay}s` } as React.CSSProperties}
      >
        <div className="relative aspect-square overflow-hidden rounded-md bg-mist">
          <Image src={imageFor(product.slug)} alt="" fill sizes="300px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="flex items-end justify-between gap-2 px-1.5 pt-3 pb-1">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">{product.name}</p>
            {spec && (
              <p className="truncate text-xs text-steel">
                {spec.label}: <span className="font-medium text-ink">{spec.value}</span>
              </p>
            )}
          </div>
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-mist text-ink transition-colors group-hover:bg-brand group-hover:text-white">
            <Icons.arrow className="size-3.5 -rotate-45" />
          </span>
        </div>
      </Link>
    </div>
  );
}

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-linear-to-b from-[#e3e5e5] via-[#eeefef] to-paper">
        <div className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-80" aria-hidden />

        <div className="container-x grid items-center gap-12 pt-12 pb-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-16 lg:pb-20">
          {/* Copy + search */}
          <div className="relative z-10 min-w-0">
            <p className="eyebrow fade-up text-ink/75!" style={d(50)}>
              ISO 9001:2015 certified · {company.years} years of experience
            </p>
            <h1 className="mt-6 text-[clamp(3.25rem,6.6vw,6rem)] leading-[0.86] text-ink">
              <span className="line-mask"><span style={d(120)}>Built to keep</span></span>
              <span className="line-mask"><span style={d(220)}>your fleet <span className="text-brand">lifting.</span></span></span>
            </h1>
            <p className="fade-up mt-6 max-w-lg text-lg leading-relaxed text-ink/70" style={d(400)}>
              Multi-brand forklift spare parts, rentals, service and training. Everything your material handling fleet
              needs, from one trusted partner.
            </p>

            <div className="fade-up mt-8 flex flex-wrap gap-3" style={d(500)}>
              <Link href="/products" className="btn-primary group px-6! py-3.5!">
                Shop spare parts
                <Icons.arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={whatsappHref("Hi JEC, I need a forklift spare part.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-light px-6! py-3.5!"
              >
                WhatsApp a part number
              </a>
            </div>

            {/* Stats */}
            <dl className="fade-up mt-10 grid max-w-xl grid-cols-2 gap-y-5 border-t border-ink/10 pt-6 sm:grid-cols-4" style={d(680)}>
              {stats.map((s, i) => (
                <div key={s.label} className={`${i % 2 ? "border-l border-ink/10 pl-5" : ""} ${i === 2 ? "sm:border-l sm:border-ink/10 sm:pl-5" : ""}`}>
                  <dd className="font-display text-3xl leading-none font-bold whitespace-nowrap text-ink uppercase sm:text-[2rem]">
                    <CountUp value={s.value} />
                  </dd>
                  <dt className="mt-1.5 text-[13px] leading-snug text-steel">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Floating product cards */}
          <div className="fade-up relative mx-auto h-[400px] w-full max-w-[560px] sm:h-[520px]" style={d(300)} aria-label="Featured parts">
            <div className="absolute inset-[12%] rotate-6 rounded-[2rem] bg-brand" aria-hidden />
            <div className="absolute inset-[12%] -rotate-3 rounded-[2rem] ring-2 ring-ink/10" aria-hidden />
            {heroProducts.map((p, i) => (
              <HeroCard key={p.slug} product={p} position={cardPositions[i]} delay={i * 1.2} />
            ))}
          </div>
        </div>
        <div className="hazard h-1.5" aria-hidden />
      </section>

      {/* BRANDS */}
      <section id="brands" aria-label="Forklift brands we stock" className="scroll-mt-20 py-10 sm:py-12">
        <div className="container-x flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <p className="eyebrow">Brands we stock</p>
          <p className="text-sm text-steel">Genuine and OEM-equivalent parts for every major forklift brand</p>
        </div>
        <div className="mt-5">
          <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]">
            <div className="animate-marquee flex w-max">
              {[0, 1].map((dup) => (
                <ul key={dup} className="flex shrink-0 items-center gap-4 pr-4" aria-hidden={dup === 1}>
                  {brands.map((b) => (
                    <li
                      key={b.name}
                      className="grid h-24 w-44 shrink-0 place-items-center rounded-lg bg-white px-6 ring-1 ring-line sm:h-28 sm:w-52"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={b.logo}
                        alt={dup === 0 ? b.name : ""}
                        loading="lazy"
                        className="max-h-12 w-auto max-w-full object-contain mix-blend-multiply sm:max-h-14"
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="container-x scroll-mt-20 py-10 sm:py-14">
        <div className="grid items-stretch gap-8 overflow-hidden rounded-lg bg-mist ring-1 ring-line lg:grid-cols-[1fr_1.15fr]">
          <Reveal variant="fade" className="relative">
            <div className="group relative aspect-[4/3] h-full w-full overflow-hidden bg-graphite lg:aspect-auto lg:min-h-[36rem]">
              <Image
                src={photos.fleet}
                alt="A fleet of modern forklifts and pallet trucks in a bright warehouse hall"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-[50%_80%] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 rounded-md bg-ink px-5 py-4 text-white shadow-xl sm:top-6 sm:left-6">
                <p className="font-display text-5xl leading-none font-bold text-brand-light">
                  <CountUp value={company.years} />
                </p>
                <p className="mt-1.5 text-sm font-medium text-white/80">
                  years keeping India&apos;s
                  <br />
                  forklifts running
                </p>
              </div>
            </div>
          </Reveal>
          <div className="px-6 pb-8 sm:px-10 lg:py-12 lg:pr-12 lg:pl-0">
            <Reveal>
              <p className="eyebrow">Who we are</p>
              <h2 className="mt-4 text-4xl text-ink sm:text-5xl lg:text-6xl">
                More than parts.
                <br />
                <span className="text-steel">We look after your whole fleet.</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-6 space-y-4 leading-relaxed text-steel">
                <p>
                  With {company.years} years of experience, Jay Engineering Company is a one-stop shop for all your
                  forklift needs in India.
                </p>
                <p>
                  We started as a trusted supplier of top-quality forklift spare parts and have grown into a
                  comprehensive material handling solutions provider, optimising your entire forklift ecosystem for
                  maximum uptime and efficiency.
                </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <figure className="mt-6 rounded-md bg-white p-5 ring-1 ring-line">
                <figcaption className="text-[10px] font-semibold tracking-[0.16em] text-brand uppercase">Our mission</figcaption>
                <blockquote className="mt-2 leading-relaxed font-medium text-ink">&ldquo;{company.mission}&rdquo;</blockquote>
              </figure>
            </Reveal>
            <Reveal delay={200}>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {["ISO 9001:2015 certified", "Multi-brand parts stock", "Field service across India", "Rentals with maintenance"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[15px] font-medium text-ink">
                    <span className="grid size-7 shrink-0 place-items-center rounded-md bg-brand text-white">
                      <Icons.check className="size-4" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SHOP BY SYSTEM */}
      <section className="container-x py-10 sm:py-14">
        <SectionHead eyebrow="Find it fast" title="Shop by system" link={{ href: "/products", label: "View all parts" }} />
        <div className="mt-8">
          <CategoryShowcase />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-20 relative isolate overflow-hidden bg-ink py-16 text-white sm:py-20">
        <div
          className="absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]"
          aria-hidden
        />
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Reveal className="max-w-3xl">
              <p className="eyebrow text-white/60!">Value-added services</p>
              <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl">One partner. Nine ways to keep your fleet moving.</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="max-w-sm text-white/60">Tailor-made support for every stage of your material handling operation.</p>
            </Reveal>
          </div>
          <Reveal delay={150} className="mt-12">
            <ServicesCarousel />
          </Reveal>
        </div>
      </section>

      {/* EXCELLENCE + RENTALS */}
      <section className="container-x grid gap-4 py-10 sm:py-14 lg:grid-cols-2">
        <Reveal variant="left" className="h-full">
          <article className="relative isolate flex h-full flex-col overflow-hidden rounded-lg bg-mist p-7 ring-1 ring-line sm:p-10">
            <span aria-hidden className="pointer-events-none absolute -right-2 -bottom-8 -z-10 font-display text-[11rem] leading-none font-bold text-ink/[0.04]">
              ISO
            </span>
            <p className="eyebrow">Committed to excellence</p>
            <h3 className="mt-4 font-display text-4xl leading-[0.95] font-bold text-ink uppercase sm:text-5xl">
              Reliability is paramount.
            </h3>
            <p className="mt-5 leading-relaxed text-steel">
              We invest time in understanding our customers&apos; needs and partner with industry-leading equipment
              manufacturers renowned for durability and performance, to guarantee consistent quality.
            </p>
            <p className="mt-4 leading-relaxed text-steel">
              Our qualified technicians meticulously inspect and maintain equipment, ensuring optimal performance.
            </p>
            <Link href="/products" className="btn-dark group mt-8 self-start">
              Browse parts
              <Icons.arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </article>
        </Reveal>
        <Reveal variant="right" delay={120} className="h-full">
          <article className="relative isolate flex h-full min-h-[26rem] flex-col overflow-hidden rounded-lg bg-ink text-white">
            <div className="hazard h-2" aria-hidden />
            <Image src={photos.hero} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="-z-20 object-cover opacity-40" />
            <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/85 to-ink/40" />
            <div className="flex flex-1 flex-col p-7 sm:p-10">
              <p className="eyebrow text-white/60!">Customised rentals</p>
              <h3 className="mt-4 font-display text-4xl leading-[0.95] font-bold uppercase sm:text-5xl">
                Rent the fleet. Skip the hassle.
              </h3>
              <p className="mt-5 leading-relaxed text-white/70">
                The most comprehensive range of material handling equipment at competitive prices, with maintenance
                plans included, plus trained, experienced personnel to supplement your team.
              </p>
              <a href="#contact" className="btn-primary group mt-auto self-start">
                Ask about rentals
                <Icons.arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </article>
        </Reveal>
      </section>

      {/* CLIENTS */}
      <section className="container-x py-10 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <Reveal>
            <p className="eyebrow">Our clients</p>
            <h2 className="mt-4 text-4xl text-ink sm:text-5xl lg:text-6xl">
              Trusted by <span className="text-brand"><CountUp value={company.clients} /></span> industrial leaders.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-lg leading-relaxed text-steel lg:ml-auto">
              From steel plants and heavy engineering to railways, mining and atomic energy, we keep India&apos;s
              toughest operations lifting.
            </p>
          </Reveal>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {clients.map((c, i) => (
            <Reveal key={c.name} variant="fade" delay={(i % 4) * 80} className="h-full">
              <ClientLogo client={c} />
            </Reveal>
          ))}
          <Reveal variant="fade" delay={240} className="h-full">
            <a
              href="#contact"
              className="group flex h-full min-h-52 flex-col items-center justify-center gap-2 rounded-lg bg-ink p-6 text-center text-white transition-colors duration-300 hover:bg-graphite"
            >
              <span className="font-display text-2xl font-bold uppercase">&amp; many more</span>
              <span className="inline-flex items-center gap-1.5 text-sm text-brand-light">
                Become our next client
                <Icons.arrow className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="container-x scroll-mt-20 pt-4 pb-12 sm:pb-16">
        <div className="relative overflow-hidden rounded-lg bg-ink text-white">
          <div className="hazard h-2" aria-hidden />
          <div className="grid gap-12 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div>
              <Reveal>
                <p className="eyebrow text-white/60!">Get a quote</p>
                <h2 className="mt-4 text-5xl leading-[0.92] sm:text-6xl">
                  Need a part?
                  <br />
                  <span className="text-white/45">We&apos;ve got it.</span>
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-white/65">
                  Tell us the brand, model and part number. We&apos;ll confirm availability and pricing.
                </p>
              </Reveal>
              <Reveal delay={150}>
                <div className="mt-10 space-y-3">
                  {company.phones.map((p) => (
                    <a key={p} href={telHref(p)} className="group flex items-center gap-4">
                      <span className="grid size-11 place-items-center rounded-md bg-white/10 transition-colors duration-300 group-hover:bg-brand">
                        <Icons.phone className="size-5" />
                      </span>
                      <span className="font-display text-2xl font-bold tracking-wide">{p}</span>
                    </a>
                  ))}
                  {company.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`} className="group flex items-center gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-md bg-white/10 transition-colors duration-300 group-hover:bg-brand">
                        <Icons.mail className="size-5" />
                      </span>
                      <span className="break-all text-white/75 transition-colors group-hover:text-white">{e}</span>
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal variant="right" delay={100}>
              <div className="rounded-lg bg-white/[0.04] p-6 ring-1 ring-white/10 sm:p-8">
                <EnquiryForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHead({
  eyebrow,
  title,
  link,
}: {
  eyebrow: string;
  title: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 max-w-2xl text-4xl text-ink sm:text-5xl lg:text-6xl">{title}</h2>
      </Reveal>
      {link && (
        <Reveal delay={150}>
          <Link href={link.href} className="group inline-flex shrink-0 items-center gap-1.5 text-[15px] font-medium text-brand hover:text-ink">
            {link.label}
            <Icons.arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      )}
    </div>
  );
}
