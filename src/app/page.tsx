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

const stats = [
  { value: company.years, label: "Years in business" },
  { value: company.clients, label: "Industrial clients" },
  { value: "12+", label: "Brands stocked" },
  { value: "Pan-India", label: "Field service" },
];


export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        {/* Subtle grid texture + warm glow (crisp vector, no photo stretching) */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_30%_40%,black,transparent_75%)]"
          aria-hidden
        />
        <div className="absolute -top-40 -left-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-brand/20 blur-[120px]" aria-hidden />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pt-16 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-24 lg:pb-24">
          <div>
          <p
            className="fade-up inline-flex w-fit items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur"
            style={{ "--d": "100ms" } as React.CSSProperties}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            ISO 9001:2015 certified · {company.years} years of experience
          </p>
          <h1 className="mt-7 max-w-3xl font-display text-[clamp(2.75rem,5.8vw,5.75rem)] leading-[0.98] font-semibold tracking-[-0.035em]">
            <span className="line-mask"><span style={{ "--d": "200ms" } as React.CSSProperties}>Built to keep</span></span>
            <span className="line-mask"><span style={{ "--d": "320ms" } as React.CSSProperties}>your fleet <span className="text-brand">lifting.</span></span></span>
          </h1>
          <p
            className="fade-up mt-7 max-w-xl text-lg leading-relaxed text-white/70"
            style={{ "--d": "550ms" } as React.CSSProperties}
          >
            Multi-brand forklift spare parts, rentals, service and training. Everything your material handling fleet
            needs, from one trusted partner.
          </p>
          <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ "--d": "700ms" } as React.CSSProperties}>
            <Link href="/products" className="btn-primary group">
              Shop spare parts
              <Icons.arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={whatsappHref("Hi JEC, I need a forklift spare part.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-light"
            >
              WhatsApp a part number
            </a>
          </div>
          </div>

          {/* Framed photo: rendered near its native resolution so it stays sharp */}
          <div className="fade-up relative mx-auto w-full max-w-xl lg:max-w-none" style={{ "--d": "400ms" } as React.CSSProperties}>
            <div
              className="absolute -right-4 -bottom-4 h-2/3 w-2/3 bg-brand [clip-path:polygon(100%_0,100%_100%,0_100%)] sm:-right-6 sm:-bottom-6"
              aria-hidden
            />
            <div className="relative aspect-4/3 overflow-hidden rounded-sm ring-1 ring-white/10 lg:aspect-5/6">
              <Image
                src={photos.hero}
                alt="Warehouse with high pallet racks and a forklift at work"
                fill
                priority
                quality={90}
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 46vw, (min-width: 640px) 576px, 100vw"
                className="object-cover object-[55%_center] transition-transform duration-[1.5s] ease-out-expo hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent" aria-hidden />
            </div>
          </div>
        </div>

        <div className="fade-up border-t border-white/10 bg-graphite" style={{ "--d": "900ms" } as React.CSSProperties}>
          <dl className="mx-auto grid max-w-7xl grid-cols-2 px-4 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`py-6 lg:py-8 ${i % 2 ? "pl-6" : "pr-6"} lg:px-8 ${i > 0 ? "lg:border-l lg:border-white/10" : "lg:pl-0"} ${i > 1 ? "border-t border-white/10 lg:border-t-0" : ""}`}
              >
                <dd className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  <CountUp value={s.value} />
                </dd>
                <dt className="mt-1 text-sm text-white/50">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* BRANDS */}
      <section id="brands" aria-label="Forklift brands we stock" className="scroll-mt-20 border-b border-line bg-white py-10">
        <div className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="animate-marquee flex w-max">
            {[0, 1].map((dup) => (
              <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
                {brands.map((b) => (
                  <li key={b.name} className="flex shrink-0 items-center px-8 sm:px-12">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.logo}
                      alt={dup === 0 ? b.name : ""}
                      loading="lazy"
                      className="h-10 w-auto max-w-40 object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-12 sm:max-w-48"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="scroll-mt-20 mx-auto grid max-w-7xl items-center gap-14 px-4 py-28 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <div className="absolute -right-4 -bottom-4 h-40 w-40 bg-brand [clip-path:polygon(100%_0,100%_100%,0_100%)] sm:-right-6 sm:-bottom-6 sm:h-56 sm:w-56" aria-hidden />
          <div className="halftone absolute -bottom-10 -left-6 h-40 w-56 text-brand/40" aria-hidden />
          <Reveal variant="zoom" className="relative z-10">
            <div className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-graphite sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src={photos.fleet}
                alt="A fleet of modern forklifts and pallet trucks in a bright warehouse hall"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[50%_80%] transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/40 via-transparent to-transparent" />
            </div>
          </Reveal>
          <Reveal
            variant="zoom"
            delay={500}
            className="absolute -top-8 left-6 z-20 rounded-sm border-t-4 border-brand bg-ink p-6 text-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)] sm:left-auto sm:right-6 sm:p-8 lg:-right-6"
          >
            <p className="font-display text-5xl font-bold tracking-tight text-brand-light sm:text-6xl">
              <CountUp value={company.years} />
            </p>
            <p className="mt-1 text-sm font-medium">years keeping India&apos;s
              <br />
              forklifts running</p>
          </Reveal>
        </div>
        <div>
          <Reveal>
            <p className="eyebrow">Who we are</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem]">
              More than parts.
              <br />
              <span className="text-steel">We look after your whole fleet.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 space-y-4 text-lg leading-relaxed text-ink/70">
              <p>
                With {company.years} years of experience, Jay Engineering Company is a one-stop shop for all your
                forklift needs in India.
              </p>
              <p>
                We started as a trusted supplier of top-quality forklift spare parts and have grown into a comprehensive
                material handling solutions provider, optimising your entire forklift ecosystem for maximum uptime and
                efficiency.
              </p>
            </div>
          </Reveal>
          <Reveal delay={250}>
            <figure className="mt-8 border-l-2 border-brand pl-5">
              <figcaption className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">Our mission</figcaption>
              <blockquote className="mt-2 font-display text-xl leading-snug font-medium tracking-[-0.01em] text-ink">
                &ldquo;{company.mission}&rdquo;
              </blockquote>
            </figure>
          </Reveal>
          <Reveal delay={300}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {["ISO 9001:2015 certified", "Multi-brand parts stock", "Field service across India", "Rentals with maintenance"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[15px] font-medium">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-ink text-brand">
                    <Icons.check className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* SHOP BY SYSTEM */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <SectionHead eyebrow="Find it fast" title="Shop by system" link={{ href: "/products", label: "View all parts" }} />
        <Reveal delay={150} className="mt-12">
          <CategoryShowcase />
        </Reveal>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-20 relative isolate overflow-hidden bg-ink py-28 text-white">
        {/* Diagonal red line texture */}
        <div
          className="absolute inset-0 -z-10 opacity-50 [background-image:repeating-linear-gradient(-60deg,transparent_0,transparent_14px,var(--color-brand)_14px,var(--color-brand)_16px)] [mask-image:linear-gradient(115deg,transparent_30%,black_62%,transparent_95%)]"
          aria-hidden
        />
        <div className="absolute -top-40 right-0 -z-10 h-96 w-96 rounded-full bg-brand/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4">
          <Reveal className="text-center">
            <p className="eyebrow justify-center text-white/50!">Value-added services</p>
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl">
              One partner. Nine ways to keep your fleet moving.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/55">
              Tailor-made support for every stage of your material handling operation.
            </p>
          </Reveal>
          <Reveal delay={150} className="mt-16">
            <ServicesCarousel />
          </Reveal>
        </div>
      </section>

      {/* EXCELLENCE + RENTALS */}
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-28 lg:grid-cols-2">
        <Reveal variant="left" className="h-full">
          <article className="flex h-full flex-col rounded-sm border border-line bg-white p-8 sm:p-12">
            <p className="eyebrow">Committed to excellence</p>
            <h3 className="mt-5 font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
              Reliability is paramount.
            </h3>
            <p className="mt-5 leading-relaxed text-ink/70">
              We invest time in understanding our customers&apos; needs and partner with industry-leading equipment
              manufacturers renowned for durability and performance, to guarantee consistent quality.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              Our qualified technicians meticulously inspect and maintain equipment, ensuring optimal performance.
            </p>
            <Link href="/products" className="btn-ghost-dark group mt-10 self-start">
              Browse parts
              <Icons.arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </article>
        </Reveal>
        <Reveal variant="right" delay={120} className="h-full">
          <article className="relative isolate flex h-full min-h-[26rem] flex-col overflow-hidden rounded-sm bg-ink p-8 text-white sm:p-12">
            <Image src={photos.hero} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="-z-20 object-cover opacity-50" />
            <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/80 to-ink/40" />
            <p className="eyebrow text-white/60!">Customised rentals</p>
            <h3 className="mt-5 font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
              Rent the fleet. Skip the hassle.
            </h3>
            <p className="mt-5 leading-relaxed text-white/70">
              The most comprehensive range of material handling equipment at competitive prices, with maintenance plans
              included, plus trained, experienced personnel to supplement your team.
            </p>
            <a href="#contact" className="btn-primary group mt-auto self-start">
              Ask about rentals
              <Icons.arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </article>
        </Reveal>
      </section>

      {/* CLIENTS */}
      <section className="mx-auto max-w-7xl px-4 py-28">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <Reveal>
            <p className="eyebrow">Our clients</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl">
              Trusted by <CountUp value={company.clients} /> industrial leaders.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-lg leading-relaxed text-ink/60 lg:ml-auto">
              From steel plants and heavy engineering to railways, mining and atomic energy, we keep India&apos;s
              toughest operations lifting.
            </p>
          </Reveal>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
          {clients.map((c, i) => (
            <Reveal key={c.name} variant="fade" delay={(i % 4) * 80} className="h-full">
              <ClientLogo client={c} />
            </Reveal>
          ))}
          <Reveal variant="fade" delay={240} className="h-full">
            <a
              href="#contact"
              className="group flex h-full min-h-40 flex-col items-center justify-center gap-2 bg-ink p-6 text-center text-white transition-colors duration-500 hover:bg-graphite"
            >
              <span className="font-display text-lg font-semibold tracking-tight">&amp; many more</span>
              <span className="inline-flex items-center gap-1.5 text-sm text-brand-light">
                Become our next client
                <Icons.arrow className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-20 relative overflow-hidden bg-ink text-white">
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-brand/10 blur-3xl" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-28 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Reveal>
              <p className="eyebrow text-white/50!">Get a quote</p>
              <h2 className="mt-5 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Need a part?
                <br />
                <span className="text-white/45">We&apos;ve got it.</span>
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-white/60">
                Tell us the brand, model and part number. We&apos;ll confirm availability and pricing.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <div className="mt-12 space-y-4">
                {company.phones.map((p) => (
                  <a key={p} href={telHref(p)} className="group flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-sm border border-white/15 transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                      <Icons.phone className="h-5 w-5" />
                    </span>
                    <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{p}</span>
                  </a>
                ))}
                {company.emails.map((e) => (
                  <a key={e} href={`mailto:${e}`} className="group flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-white/15 transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                      <Icons.mail className="h-5 w-5" />
                    </span>
                    <span className="break-all text-white/80 transition-colors group-hover:text-white">{e}</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal variant="right" delay={100}>
            <div className="rounded-sm border border-white/10 bg-graphite/80 p-6 backdrop-blur sm:p-10">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function SectionHead({
  eyebrow,
  title,
  link,
  dark,
}: {
  eyebrow: string;
  title: string;
  link?: { href: string; label: string };
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <Reveal>
        <p className={`eyebrow ${dark ? "text-white/50!" : ""}`}>{eyebrow}</p>
        <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {link && (
        <Reveal delay={150}>
          <Link
            href={link.href}
            className={`group inline-flex shrink-0 items-center gap-2 text-[15px] font-semibold ${dark ? "text-white" : "text-ink"}`}
          >
            <span className="relative">
              {link.label}
              <span className="absolute inset-x-0 -bottom-1 h-px origin-right bg-current transition-transform duration-500 group-hover:origin-left group-hover:scale-x-0" />
            </span>
            <Icons.arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      )}
    </div>
  );
}
