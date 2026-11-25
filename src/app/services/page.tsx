import type { Metadata } from "next";
import Link from "next/link";
import { brands, company, photos, services, telHref, whatsappHref } from "@/data/site";
import { PageCta, PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Icons, serviceIcons } from "@/components/icons";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Multi-brand forklift spare parts, rentals, service and maintenance, fleet management, load testing and operator training across India.",
};

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        title={
          <>
            <span className="line-mask"><span style={d(100)}>Value-added</span></span>
            <span className="line-mask"><span style={d(200)} className="text-brand">services.</span></span>
          </>
        }
        intro={
          <p>
            We go beyond parts to optimise your entire forklift ecosystem, maximising uptime and efficiency. Nine ways we
            keep your fleet moving, from one trusted partner.
          </p>
        }
        image={photos.fleet}
        imageAlt="A fleet of modern forklifts and pallet trucks in a bright warehouse hall"
      />

      {/* ALL SERVICES */}
      <section className="container-x py-12 sm:py-16">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal className="max-w-3xl">
            <h2 className="text-4xl text-ink sm:text-5xl lg:text-6xl">Everything your fleet needs.</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-sm text-steel">Tailor-made support for every stage of your material handling operation.</p>
          </Reveal>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = serviceIcons[i];
            return (
              <Reveal key={s.title} delay={(i % 3) * 80} className="h-full">
                <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-lg bg-mist p-6 ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:bg-brand-tint hover:shadow-xl hover:shadow-brand/10 hover:ring-brand/40 sm:p-7">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-2 -bottom-6 -z-10 font-display text-[8rem] leading-none font-bold text-ink/[0.04] transition-colors duration-300 group-hover:text-brand/15"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="grid size-12 place-items-center rounded-md bg-brand text-white transition-transform duration-300 group-hover:-rotate-6">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-6 font-display text-3xl leading-none font-bold text-ink uppercase">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-steel">{s.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* RENTALS + EXCELLENCE */}
      <section className="container-x grid gap-4 pb-12 sm:pb-16 lg:grid-cols-2">
        <Reveal variant="left" className="h-full">
          <article className="relative isolate flex h-full flex-col overflow-hidden rounded-lg bg-ink text-white">
            <div className="hazard h-2" aria-hidden />
            <div className="flex flex-1 flex-col p-7 sm:p-10">
              <span className="font-display text-6xl leading-none font-bold text-brand">01</span>
              <h3 className="mt-5 font-display text-4xl leading-[0.95] font-bold uppercase sm:text-5xl">Customised rental services</h3>
              <p className="mt-5 leading-relaxed text-white/70">
                JEC offers the most comprehensive range of material handling equipment at competitive pricing, inclusive of
                maintenance plans. We also provide trained and experienced personnel to supplement your team and keep your
                operations running seamlessly.
              </p>
              <Link href="/contact" className="btn-primary group mt-8 self-start">
                Ask about rentals
                <Icons.arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        </Reveal>
        <Reveal variant="right" delay={120} className="h-full">
          <article className="relative isolate flex h-full flex-col overflow-hidden rounded-lg bg-mist p-7 ring-1 ring-line sm:p-10">
            <span aria-hidden className="pointer-events-none absolute -right-2 -bottom-8 -z-10 font-display text-[11rem] leading-none font-bold text-ink/[0.04]">
              ISO
            </span>
            <span className="font-display text-6xl leading-none font-bold text-brand">02</span>
            <h3 className="mt-5 font-display text-4xl leading-[0.95] font-bold text-ink uppercase sm:text-5xl">Committed to excellence</h3>
            <p className="mt-5 leading-relaxed text-steel">
              At JEC, reliability is paramount. We invest time in understanding the needs of our customers and partner with
              industry-leading equipment manufacturers renowned for their durability and performance, to guarantee
              consistent quality. Our team of qualified technicians meticulously inspects and maintains equipment, ensuring
              optimal performance.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {["ISO 9001:2015 certified", "Qualified technicians", "Industry-leading manufacturers", "Field service across India"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-[15px] font-medium text-ink">
                  <span className="grid size-7 shrink-0 place-items-center rounded-md bg-brand text-white">
                    <Icons.check className="size-4" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </section>

      {/* PRODUCT PORTFOLIO */}
      <section className="bg-ink py-14 text-white sm:py-16">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:items-center lg:gap-14">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl">Our product portfolio.</h2>
            <p className="mt-4 text-white/65">
              We have complete stock of top forklift brands around the globe, with genuine and OEM-equivalent parts ready to
              ship. And more beyond the brands listed here.
            </p>
            <Link href="/products" className="btn-primary group mt-6">
              Shop spare parts
              <Icons.arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {brands.map((b, i) => (
              <Reveal as="li" key={b.name} variant="fade" delay={(i % 4) * 60}>
                <div className="grid h-20 place-items-center rounded-md bg-white px-4 sm:h-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.logo} alt={b.name} loading="lazy" className="max-h-10 w-auto max-w-full object-contain sm:max-h-12" />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <div className="pt-8 sm:pt-12" />
      <PageCta
        title={
          <>
            Need service
            <br />
            <span className="text-white/45">or a rental?</span>
          </>
        }
        body="Tell us your forklift brand, model and what you need. Our team will get back to you with availability and pricing."
      >
        <a href={telHref(company.phones[0])} className="btn-primary">
          <Icons.phone className="size-4" /> {company.phones[0]}
        </a>
        <a
          href={whatsappHref("Hi JEC, I'd like to know more about your services.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost-light"
        >
          WhatsApp us
        </a>
        <a href={`mailto:${company.emails[1]}`} className="btn-ghost-light">
          <Icons.mail className="size-4" /> Email
        </a>
      </PageCta>
    </>
  );
}
