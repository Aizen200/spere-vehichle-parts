export type Spec = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  inStock: boolean;
  summary: string;
  specs: Spec[];
};

const p = (
  slug: string,
  name: string,
  sku: string,
  category: string,
  price: number,
  summary: string,
  specs: [string, string][],
): Product => ({
  slug,
  name,
  sku,
  category,
  price,
  inStock: true,
  summary,
  specs: specs.map(([label, value]) => ({ label, value })),
});

export const products: Product[] = [
  p("heavy-duty-hydraulic-pump", "Heavy-Duty Hydraulic Pump", "JEC-HYD-001", "Hydraulic System", 18500,
    "A cast-iron gear pump that delivers steady flow for lifting and tilting under heavy loads.",
    [["Type", "Gear pump"], ["Operating pressure", "180 bar"], ["Flow rate", "35 L/min"], ["Material", "Cast iron housing"], ["Compatibility", "Selected Toyota, Linde and Doosan models"]]),
  p("industrial-solid-forklift-tyre", "Industrial Solid Forklift Tyre", "JEC-TYR-002", "Wheels & Tyres", 12800,
    "A puncture-proof solid rubber tyre built for long shifts on warehouse floors.",
    [["Type", "Solid rubber"], ["Size", "7.00-12"], ["Construction", "Heavy-duty"], ["Application", "Indoor warehouse operations"], ["Compatibility", "Selected 2–3 tonne forklifts"]]),
  p("forklift-mast-roller-bearing", "Forklift Mast Roller Bearing", "JEC-BRG-003", "Bearings", 2450,
    "A hardened-steel mast guide roller for smooth, quiet lifting.",
    [["Type", "Mast guide roller"], ["Outer diameter", "85 mm"], ["Inner diameter", "35 mm"], ["Material", "Hardened steel"], ["Application", "Mast lifting assembly"]]),
  p("hydraulic-lift-cylinder", "Hydraulic Lift Cylinder", "JEC-CYL-004", "Hydraulic System", 24900,
    "A single-acting lift cylinder with a chrome rod, built for repeated full-stroke cycles.",
    [["Type", "Single acting"], ["Bore diameter", "80 mm"], ["Stroke length", "450 mm"], ["Working pressure", "160 bar"], ["Application", "Forklift lifting mechanism"]]),
  p("forklift-brake-shoe-assembly", "Forklift Brake Shoe Assembly", "JEC-BRK-005", "Brake System", 3200,
    "Drum brake shoes with a riveted friction lining for consistent stopping power.",
    [["Type", "Drum brake shoe"], ["Material", "Steel with friction lining"], ["Quantity", "2 pieces"], ["Application", "Industrial braking system"]]),
  p("heavy-duty-air-filter", "Heavy-Duty Air Filter", "JEC-FLT-006", "Filters", 950,
    "A multi-layer pleated engine air filter that keeps dust out of diesel engines.",
    [["Filter type", "Engine air filter"], ["Material", "Pleated cellulose"], ["Filtration", "Multi-layer"], ["Application", "Diesel forklift engines"]]),
  p("forklift-lift-chain", "Forklift Lift Chain", "JEC-CHN-007", "Mast Components", 8750,
    "An alloy-steel leaf chain for the mast lifting mechanism.",
    [["Type", "Leaf chain"], ["Construction", "Alloy steel"], ["Length", "2 metres"], ["Application", "Mast lifting mechanism"]]),
  p("forklift-starter-motor", "Forklift Starter Motor", "JEC-STR-008", "Electrical", 6500,
    "A 12V, 2.2 kW starter motor for reliable cold starts on diesel engines.",
    [["Voltage", "12V"], ["Power", "2.2 kW"], ["Type", "Electric starter"], ["Application", "Diesel engines"]]),
  p("heavy-duty-fork-arms", "Heavy-Duty Fork Arms", "JEC-FRK-009", "Fork Attachments", 15900,
    "Forged alloy-steel fork arms with an industrial coating.",
    [["Length", "1,200 mm"], ["Material", "Forged alloy steel"], ["Capacity", "2,000 kg per pair (demo specification)"], ["Finish", "Industrial coating"]]),
  p("ergonomic-forklift-operator-seat", "Ergonomic Forklift Operator Seat", "JEC-SET-010", "Cabin & Accessories", 7200,
    "A suspension seat with a seat belt that keeps operators comfortable through a full shift.",
    [["Material", "Premium vinyl"], ["Suspension", "Mechanical"], ["Adjustment", "Forward/backward"], ["Safety", "Seat belt included"]]),
  p("transmission-oil-filter", "Transmission Oil Filter", "JEC-FLT-011", "Filters", 1450,
    "A 10-micron metal-housed filter that protects the transmission system.",
    [["Filter type", "Hydraulic transmission"], ["Housing", "Metal"], ["Filtration rating", "10 micron"], ["Application", "Forklift transmission system"]]),
  p("polyurethane-load-wheel", "Polyurethane Load Wheel", "JEC-WHL-012", "Wheels & Tyres", 3850,
    "A hard-wearing polyurethane load wheel for electric pallet trucks.",
    [["Material", "Polyurethane"], ["Diameter", "230 mm"], ["Width", "75 mm"], ["Application", "Electric pallet trucks"]]),
];

export const categories = Array.from(new Set(products.map((x) => x.category)));

export const imageFor = (slug: string) => `/images/products/${slug}.svg`;

export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const getProduct = (slug: string) => products.find((x) => x.slug === slug);
