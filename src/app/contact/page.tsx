import type { Metadata } from "next";
import Link from "next/link";
import { company, photos, telHref, whatsappHref } from "@/data/site";
import { PageHero } from "@/components/page-hero";
import { EnquiryForm } from "@/components/enquiry-form";
import { Reveal } from "@/components/reveal";
import { Icons } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Call, WhatsApp or email Jay Engineering Company for forklift spare parts, rentals, service and training anywhere in India.",
};

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const channels = [
  {
    icon: Icons.phone,
    title: "Call us",
    body: "Speak to our parts team directly for availability and pricing.",
    links: company.phones.map((p) => ({ href: telHref(p), label: p })),
  },
  {
    icon: Icons.chat,
    title: "WhatsApp",
    body: "Send a photo of the part or its number plate and we'll identify it.",
    links: [{ href: whatsappHref("Hi JEC, I need a forklift spare part."), label: "Chat on WhatsApp", external: true }],
  },
  {
    icon: Icons.mail,
    title: "Email",
    body: "Share part lists, drawings or tender requirements in detail.",
    links: company.emails.map((e) => ({ href: `mailto:${e}`, label: e })),
  },
];

const checklist = [
  "Forklift brand and model",
  "Part number, if you have it",
  "A photo of the part or its data plate",
  "Quantity and delivery location",
];

const topics = [
  { title: "Spare parts", href: "/products", body: "Browse multi-brand parts before you enquire." },
  { title: "Rentals & service", href: "/services", body: "Rentals, maintenance, load testing and training." },
  { title: "About JEC", href: "/about", body: `${company.years} years supplying ${company.clients} industrial clients.` },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        title={
          <>
            <span className="line-mask"><span style={d(100)}>Let&apos;s</span></span>
            <span className="line-mask"><span style={d(200)}>talk <span className="text-brand">parts.</span></span></span>
          </>
        }
        intro={
          <p>
            Tell us what you need, whether it&apos;s a single spare part, a fleet rental or a service visit. Our team will
            confirm availability and get back to you quickly.
          </p>
        }
        image={photos.fleet}
        imageAlt="A fleet of modern forklifts and pallet trucks in a bright warehouse hall"
        badge={
          <a
            href={telHref(company.phones[0])}
            className="group absolute -bottom-5 left-5 flex items-center gap-3 rounded-md bg-ink px-5 py-4 text-white shadow-xl transition-colors hover:bg-graphite sm:left-8"
          >
            <span className="grid size-10 place-items-center rounded-md bg-brand">
              <Icons.phone className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-[10px] font-semibold tracking-[0.14em] text-white/50 uppercase">Call now</span>
              <span className="font-display text-2xl font-bold tracking-wide">{company.phones[0]}</span>
            </span>
          </a>
        }
      />

      {/* CHANNELS */}
      <section className="container-x pt-14 sm:pt-16">
        <div className="grid gap-4 md:grid-cols-3">
          {channels.map((c, i) => (
            <Reveal key={c.title} delay={i * 90} className="h-full">
              <div className="group flex h-full flex-col rounded-lg bg-mist p-6 ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_24px_48px_-28px_rgba(23,28,32,0.45)] sm:p-7">
                <span className="grid size-12 place-items-center rounded-md bg-brand text-white transition-transform duration-300 group-hover:-rotate-6">
                  <c.icon className="size-6" />
                </span>
                <h2 className="mt-6 font-display text-3xl leading-none font-bold text-ink uppercase">{c.title}</h2>
                <p className="mt-3 leading-relaxed text-steel">{c.body}</p>
                <ul className="mt-auto space-y-1.5 pt-6">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        {...("external" in l && l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group/link inline-flex items-center gap-1.5 font-medium break-all text-ink transition-colors hover:text-brand"
                      >
                        {l.label}
                        <Icons.arrow className="size-3.5 shrink-0 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ENQUIRY */}
      <section id="enquiry" className="container-x scroll-mt-20 py-12 sm:py-16">
        <div className="relative overflow-hidden rounded-lg bg-ink text-white">
          <div className="hazard h-2" aria-hidden />
          <div className="grid gap-12 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div>
              <Reveal>
                <h2 className="text-5xl leading-[0.92] sm:text-6xl">
                  Send an
                  <br />
                  <span className="text-white/45">enquiry.</span>
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-white/65">
                  The more detail you share, the faster we can quote. Here&apos;s what helps:
                </p>
              </Reveal>
              <Reveal delay={150}>
                <ul className="mt-8 space-y-3">
                  {checklist.map((t) => (
                    <li key={t} className="flex items-center gap-3 text-[15px] text-white/80">
                      <span className="grid size-7 shrink-0 place-items-center rounded-md bg-brand text-white">
                        <Icons.check className="size-4" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
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

      {/* EXPLORE */}
      <section className="container-x pb-12 sm:pb-16">
        <Reveal>
          <h2 className="text-4xl text-ink sm:text-5xl">Not sure what you need yet?</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {topics.map((t, i) => (
            <Reveal key={t.href} delay={i * 90} className="h-full">
              <Link
                href={t.href}
                className="group flex h-full flex-col rounded-lg p-6 ring-1 ring-line transition-colors duration-300 hover:bg-mist hover:ring-brand/40"
              >
                <span className="flex items-center justify-between font-display text-2xl font-bold text-ink uppercase">
                  {t.title}
                  <Icons.arrow className="size-5 text-brand transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="mt-2 text-steel">{t.body}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
