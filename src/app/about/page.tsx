import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { clients, company, photos, telHref, whatsappHref } from "@/data/site";
import { PageCta, PageHero } from "@/components/page-hero";
import { ClientLogo } from "@/components/client-logo";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { Icons } from "@/components/icons";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "45+ years as India's one-stop shop for forklift needs: ISO 9001:2015 certified spare parts, rentals, service and training for 120+ industrial clients.",
};

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const stats = [
  { value: company.years, label: "Years of experience" },
  { value: company.clients, label: "Customer base" },
  { value: "12+", label: "Forklift brands stocked" },
  { value: "ISO", label: "9001:2015 certified" },
];

const journey = [
  {
    step: "Where we started",
    title: "Trusted spare parts supplier",
    body: "Jay Engineering Company began by supplying top-quality forklift spare parts, ISO 9001:2015 certified, for every major brand.",
  },
  {
    step: "What we became",
    title: "Complete material handling partner",
    body: "Today we offer rentals, service and maintenance, fleet management, load testing, training and field service across India.",
  },
  {
    step: "What we do for you",
    title: "Maximum uptime and efficiency",
    body: "We go beyond parts to optimise your entire forklift ecosystem, so your operations keep running.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About us"
        title={
          <>
            <span className="line-mask"><span style={d(100)}>Who</span></span>
            <span className="line-mask"><span style={d(200)}>we <span className="text-brand">are.</span></span></span>
          </>
        }
        intro={
          <p>
            With {company.years} years of experience, Jay Engineering Company is a one-stop shop for all your forklift needs
            in India.
          </p>
        }
        image={photos.hero}
        imageAlt="Warehouse with high pallet racks and a forklift at work"
        badge={
          <div className="absolute -bottom-5 left-5 rounded-md bg-ink px-5 py-4 text-white shadow-xl sm:left-8">
            <p className="font-display text-5xl leading-none font-bold text-brand-light">
              <CountUp value={company.years} />
            </p>
            <p className="mt-1 text-sm text-white/75">years in business</p>
          </div>
        }
      />

      {/* STATS */}
      <section className="container-x pt-14 sm:pt-16">
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="h-full">
              <div className="h-full rounded-lg bg-mist px-6 py-6 ring-1 ring-line">
                <dd className="font-display text-5xl leading-none font-bold text-ink uppercase">
                  <CountUp value={s.value} />
                </dd>
                <dt className="mt-2 text-sm text-steel">{s.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* STORY */}
      <section className="container-x grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="text-4xl text-ink sm:text-5xl lg:text-6xl">
            More than parts.
            <br />
            <span className="text-steel">We look after your whole fleet.</span>
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-steel">
            <p>
              We started as a trusted supplier of top-quality forklift spare parts (ISO 9001:2015 certified) and have grown
              into a comprehensive material handling solutions provider.
            </p>
            <p>
              We go beyond parts to optimise your entire forklift ecosystem, maximising uptime and efficiency for{" "}
              {company.clients} industrial customers, from steel plants and heavy engineering to railways, mining and atomic
              energy.
            </p>
          </div>
          <Link href="/services" className="btn-dark group mt-8">
            Explore our services
            <Icons.arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <Reveal variant="right" delay={100}>
          <div className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-graphite">
            <Image
              src={photos.fleet}
              alt="A fleet of modern forklifts and pallet trucks in a bright warehouse hall"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-[50%_80%] transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </Reveal>
      </section>

      {/* MISSION */}
      <section className="relative isolate overflow-hidden bg-ink py-16 text-white sm:py-20">
        <div
          className="absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_50%_50%,black,transparent_70%)]"
          aria-hidden
        />
        <div className="container-x grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-16">
          <Reveal>
            <span className="inline-flex items-center gap-3 rounded-md bg-brand px-4 py-2 font-display text-xl font-bold tracking-wide uppercase">
              Our mission
            </span>
          </Reveal>
          <Reveal delay={100}>
            <blockquote className="font-display text-4xl leading-[1.02] font-bold uppercase sm:text-5xl lg:text-6xl">
              <span className="text-brand">&ldquo;</span>
              To be the most trusted and innovative partner in the material handling industry, empowering businesses with{" "}
              <span className="text-brand-light">efficient and sustainable solutions.</span>
              <span className="text-brand">&rdquo;</span>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="container-x py-12 sm:py-16">
        <Reveal className="max-w-3xl">
          <h2 className="text-4xl text-ink sm:text-5xl lg:text-6xl">From parts supplier to fleet partner.</h2>
        </Reveal>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {journey.map((j, i) => (
            <Reveal as="li" key={j.title} delay={i * 90} className="h-full">
              <div className="relative isolate flex h-full flex-col overflow-hidden rounded-lg bg-mist p-6 ring-1 ring-line sm:p-7">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -bottom-6 -z-10 font-display text-[8rem] leading-none font-bold text-ink/[0.04]"
                >
                  0{i + 1}
                </span>
                <span className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">{j.step}</span>
                <h3 className="mt-3 font-display text-3xl leading-none font-bold text-ink uppercase">{j.title}</h3>
                <p className="mt-3 leading-relaxed text-steel">{j.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* EXCELLENCE */}
      <section className="container-x pb-12 sm:pb-16">
        <div className="grid items-center gap-8 overflow-hidden rounded-lg bg-mist ring-1 ring-line lg:grid-cols-[1fr_1.1fr]">
          <div className="relative aspect-[4/3] h-full w-full overflow-hidden bg-graphite lg:aspect-auto lg:min-h-[28rem]">
            <Image src={photos.hero} alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-[60%_center]" />
            <div className="hazard absolute inset-x-0 bottom-0 h-2" aria-hidden />
          </div>
          <Reveal className="px-6 pb-8 sm:px-10 lg:py-10 lg:pr-12 lg:pl-0">
            <h2 className="text-4xl text-ink sm:text-5xl">Committed to excellence.</h2>
            <p className="mt-5 leading-relaxed text-steel">
              At JEC, reliability is paramount. We invest time in understanding the needs of our customers and partner with
              industry-leading equipment manufacturers renowned for their durability and performance, to guarantee
              consistent quality.
            </p>
            <p className="mt-4 leading-relaxed text-steel">
              Our team of qualified technicians meticulously inspects and maintains equipment, ensuring optimal performance.
            </p>
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
      </section>

      {/* CLIENTS */}
      <section className="container-x pb-12 sm:pb-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <Reveal>
            <h2 className="text-4xl text-ink sm:text-5xl lg:text-6xl">
              Our clients. <span className="text-brand"><CountUp value={company.clients} /></span> customer base.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-lg leading-relaxed text-steel lg:ml-auto">
              From steel plants and heavy engineering to railways, mining and atomic energy, we keep India&apos;s toughest
              operations lifting.
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
            <div className="flex h-full min-h-52 flex-col items-center justify-center gap-2 rounded-lg bg-ink p-6 text-center text-white">
              <span className="font-display text-2xl font-bold uppercase">&amp; many more</span>
            </div>
          </Reveal>
        </div>
      </section>

      <PageCta
        title={
          <>
            Let&apos;s keep your
            <br />
            <span className="text-white/45">fleet lifting.</span>
          </>
        }
        body="Talk to us about spare parts, rentals, service or training. We'll get back to you with what you need."
      >
        <a href={telHref(company.phones[0])} className="btn-primary">
          <Icons.phone className="size-4" /> {company.phones[0]}
        </a>
        <a
          href={whatsappHref("Hi JEC, I'd like to know more about your company.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost-light"
        >
          WhatsApp us
        </a>
        <Link href="/contact" className="btn-ghost-light">
          Get a quote
        </Link>
      </PageCta>
    </>
  );
}
