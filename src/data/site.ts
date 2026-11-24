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

export const brands = [
  "Toyota", "Doosan", "Mitsubishi", "Jungheinrich", "Linde", "KION",
  "STILL", "HELI", "Hyundai", "Clark", "ACE", "Godrej",
];

export type Client = { name: string; sector: string; logo?: string };

// Logos live in public/images/clients. Clients without a logo file show a typeset wordmark;
// drop a file in and add the path here to replace it.
export const clients: Client[] = [
  { name: "Aditya Birla Group", sector: "Conglomerate" },
  { name: "APAR", sector: "Cables & Conductors" },
  { name: "Tata Motors", sector: "Automotive", logo: "/images/clients/tata-motors.png" },
  { name: "BHEL", sector: "Heavy Engineering", logo: "/images/clients/bhel.svg" },
  { name: "Shyam Metallics", sector: "Steel & Metals", logo: "/images/clients/shyam-metallics.png" },
  { name: "Jindal Steel & Power", sector: "Steel & Power", logo: "/images/clients/jindal.svg" },
  { name: "HEC", sector: "Heavy Engineering" },
  { name: "Rail Wheel Factory", sector: "Indian Railways", logo: "/images/clients/rail-wheel-factory.svg" },
  { name: "Department of Atomic Energy", sector: "Atomic Energy" },
  { name: "BEML", sector: "Defence & Mining" },
  { name: "KIOCL Limited", sector: "Mining" },
];

export const photos = {
  hero: "/images/photos/warehouse.jpg",
  fleet: "/images/photos/fleet.jpg",
};

export const photoCredits = [
  {
    label: "Warehouse by Axisadman, CC BY-SA 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Modern_warehouse_with_pallet_rack_storage_system.jpg",
  },
  {
    label: "Forklift fleet by Patricklorek, CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Linde_Lithium-Ionen-Ger%C3%A4te.jpg",
  },
];
