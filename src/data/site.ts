export const company = {
  name: "Jay Engineering Company",
  short: "JEC",
  years: "45+",
  clients: "120+",
  tagline: "India's one-stop shop for forklift spare parts and material handling solutions.",
  mission:
    "To be the most trusted and innovative partner in the material handling industry, empowering businesses with efficient and sustainable solutions.",
  phones: ["+91 8169119174", "+91 9867588796"],
  emails: ["jayengg1@rediffmail.com", "jkamdarbusiness@gmail.com"],
};

export const telHref = (p: string) => `tel:${p.replace(/\s/g, "")}`;
export const whatsappHref = (text: string) =>
  `https://wa.me/918169119174?text=${encodeURIComponent(text)}`;

export const services = [
  { title: "Multi-Brand Spare Parts", body: "Genuine and OEM-equivalent parts for every major forklift brand, stocked and ready to ship." },
  { title: "Engineering Workshop", body: "A fully equipped workshop for overhauls, rebuilds and fabrication." },
  { title: "Short & Long-Term Rentals", body: "Flexible forklift rentals with maintenance plans built in." },
  { title: "Pan-India Field Service", body: "Dedicated field technicians who come to your site, anywhere in India." },
  { title: "Service & Maintenance", body: "Planned and breakdown maintenance that keeps your fleet running." },
  { title: "Product Training", body: "Hands-on training on material handling equipment for your team." },
  { title: "Fleet Management", body: "End-to-end management of your forklift fleet to maximise uptime." },
  { title: "Load Testing", body: "Certified load testing for forklifts and material handling equipment." },
  { title: "Operator Driving Training", body: "Safe-driving programmes for new and experienced forklift operators." },
];

export type Brand = { name: string; logo: string };

// Logo files live in public/images/brands.
export const brands: Brand[] = [
  { name: "Toyota", logo: "/images/brands/toyota.svg" },
  { name: "Doosan", logo: "/images/brands/doosan.svg" },
  { name: "Mitsubishi", logo: "/images/brands/mitsubishi.svg" },
  { name: "Jungheinrich", logo: "/images/brands/jungheinrich.svg" },
  { name: "Linde", logo: "/images/brands/linde.svg" },
  { name: "KION", logo: "/images/brands/kion.svg" },
  { name: "STILL", logo: "/images/brands/still.svg" },
  { name: "HELI", logo: "/images/brands/heli.jpg" },
  { name: "Hyundai", logo: "/images/brands/hyundai.svg" },
  { name: "Clark", logo: "/images/brands/clark.jpg" },
  { name: "ACE", logo: "/images/brands/ace.svg" },
  { name: "Godrej", logo: "/images/brands/godrej.svg" },
];

export type Client = { name: string; sector: string; blurb: string; logo?: string };

// Logos live in public/images/clients. Clients without a logo file show a typeset wordmark;
// drop a file in and add the path here to replace it.
export const clients: Client[] = [
  { name: "Aditya Birla Group", sector: "Conglomerate", blurb: "A global conglomerate spanning metals, cement, textiles and chemicals." },
  { name: "APAR", sector: "Cables & Conductors", blurb: "One of the world's largest makers of conductors, cables and specialty oils." },
  { name: "Tata Motors", sector: "Automotive", blurb: "India's leading maker of commercial and passenger vehicles.", logo: "/images/clients/tata-motors.png" },
  { name: "BHEL", sector: "Heavy Engineering", blurb: "India's largest power-equipment manufacturer and engineering enterprise.", logo: "/images/clients/bhel.svg" },
  { name: "Shyam Metallics", sector: "Steel & Metals", blurb: "An integrated producer of ferro alloys, steel and aluminium foil.", logo: "/images/clients/shyam-metallics.png" },
  { name: "Jindal Steel & Power", sector: "Steel & Power", blurb: "A major Indian producer of steel and power, with mining operations.", logo: "/images/clients/jindal.svg" },
  { name: "HEC", sector: "Heavy Engineering", blurb: "Heavy Engineering Corporation, building equipment for steel and mining." },
  { name: "Rail Wheel Factory", sector: "Indian Railways", blurb: "Indian Railways' plant producing wheels and axles for rolling stock.", logo: "/images/clients/rail-wheel-factory.svg" },
  { name: "Department of Atomic Energy", sector: "Atomic Energy", blurb: "The government department driving India's nuclear energy programme." },
  { name: "BEML", sector: "Defence & Mining", blurb: "A defence PSU making mining, rail and earth-moving equipment." },
  { name: "KIOCL Limited", sector: "Mining", blurb: "A government-owned iron ore mining and pelletisation company." },
];

export const photos = {
  hero: "/images/photos/forklift-hero.jpg",
  fleet: "/images/photos/fleet.jpg",
};

export const photoCredits = [
  {
    label: "Forklift by Marc Auledas Noguera, CC BY 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Jungheinrich_forklift_in_a_builders_hardware_store_in_Girona.jpg",
  },
  {
    label: "Forklift fleet by Patricklorek, CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Linde_Lithium-Ionen-Ger%C3%A4te.jpg",
  },
];
