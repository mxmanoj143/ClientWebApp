// Single source of truth for site content
export const COMPANY = {
  name: "Revanth Concrete Products",
  legal: "Maharudra Precast Pvt Ltd",
  short: "RCP",
  tagline: "Shaping Strength, Delivering Trust",
  description:
    "Revanth Concrete Products, operated by Maharudra Precast Pvt Ltd, delivers engineered precast supply solutions designed to meet the highest standards of strength, precision and reliability. Built with strict quality control, our products integrate seamlessly into modern infrastructure and construction projects.",
  address: "'Gopibhagwant', Raykar Mala, Dhayari, Pune 411041",
  phones: ["+91 90492 49262", "+91 98227 54545"],
  whatsapp: ["919049249262", "919822754545"],
  emails: ["info@reventhconcrete.com", "sales@reventhconcrete.com"],
  website: "www.revanthconcrete.com",
  mapsEmbed:
    "https://www.google.com/maps?q=Dhayari,Pune,411041&output=embed",
};

export const STATS = [
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 27, suffix: "", label: "Precast Products" },
  { value: 250, suffix: "+", label: "Happy Clients" },
];

export const SERVICES = [
  {
    id: "supply",
    title: "Engineered Precast Supply",
    icon: "Package",
    desc: "Engineered precast supply solutions designed to meet the highest standards of strength, precision and reliability — manufactured with strict quality control and consistent timely delivery.",
    points: [
      "Standard & custom moulds",
      "Strict quality control",
      "Bulk order capacity",
      "Pan-Maharashtra delivery",
    ],
  },
  {
    id: "install",
    title: "Expert Installation Services",
    icon: "HardHat",
    desc: "Professional installation services for precast concrete products — site preparation through final placement — delivering precision, durability and timely execution that meets structural standards.",
    points: [
      "Trained installation crews",
      "Site survey & planning",
      "Heavy machinery support",
      "Safety-first protocols",
    ],
  },
  {
    id: "consult",
    title: "Project Consultancy",
    icon: "ClipboardList",
    desc: "End-to-end project consultancy from planning and design to execution and completion — focused on technical accuracy, cost efficiency and seamless coordination.",
    points: [
      "Design optimisation",
      "Cost engineering",
      "Compliance & approvals",
      "Lifecycle support",
    ],
  },
];

export const PRODUCTS = [
  { id: "paving-blocks", name: "Paving Blocks", category: "Landscaping", img: "https://images.unsplash.com/photo-1755778803577-5ea0e90ffd1d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200", desc: "Rectangular, Square, Zig-zag, Hexagonal & Interlocking. Thickness 60mm / 80mm / 100mm. Finishes: Rough, Glossy, Leather, Shot Blast." },
  { id: "hume-pipes", name: "Hume Pipes", category: "Infrastructure", img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=85", desc: "Reinforced precast pipes for stormwater, sewerage and culverts. Available in NP2, NP3, NP4 grades & multiple diameters." },
  { id: "chamber-covers", name: "Chamber Covers", category: "Infrastructure", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=85", desc: "Heavy-duty round and square manhole covers cast with the RCP logo — engineered for vehicular load classes." },
  { id: "decorative", name: "Decorative Products", category: "Landscape", img: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=1200&q=85", desc: "Premium planters, pots and architectural ornaments to elevate landscapes and façades." },
  { id: "compound-wall", name: "Compound Wall", category: "Boundary", img: "https://images.unsplash.com/photo-1631719606912-e90abc91683b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200", desc: "Precast modular boundary walls with reinforced posts — fast install, factory-finished, vandal-resistant." },
  { id: "concrete-blocks", name: "Concrete Blocks", category: "Building", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=85", desc: "Solid and hollow concrete masonry units in standard sizes — high compressive strength, low water absorption." },
  { id: "septic-tanks", name: "Septic Tanks", category: "Sanitation", img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200&q=85", desc: "Watertight RCC septic tanks for residential and commercial sewage management — multi-chamber design." },
  { id: "kerb-stone", name: "Kerb Stone", category: "Roads", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85", desc: "Road kerbs and channels for highways, internal roads and pathways — IRC compliant profiles." },
  { id: "rcc-lintel", name: "RCC Lintel", category: "Structural", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=85", desc: "Pre-cast reinforced lintels for door & window openings — saves shuttering time, ready to install." },
  { id: "rcc-bench", name: "RCC Benches", category: "Public Furniture", img: "https://images.unsplash.com/photo-1568667256549-094345857637?w=1200&q=85", desc: "Durable concrete benches with timber slat tops for parks, plazas and public spaces." },
  { id: "u-trench", name: "U Trench", category: "Drainage", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85", desc: "U-shaped precast drains for stormwater and surface runoff — sized to your site discharge plan." },
  { id: "half-round-pipe", name: "Half Round Pipe", category: "Drainage", img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=85", desc: "Open-channel half-round pipes for surface water collection and roof gutter networks." },
  { id: "earthpit-chamber", name: "Earthpit Chamber", category: "Electrical", img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200&q=85", desc: "Inspection chambers with covers for earthing pits — IS 3043 compliant detailing." },
  { id: "rcc-rings", name: "RCC Rings", category: "Infrastructure", img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=85", desc: "Cast rings for wells, manholes and culverts — multiple diameters, stackable design." },
  { id: "fly-ash-brick", name: "Fly Ash Brick", category: "Building", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=85", desc: "Eco-friendly fly ash bricks — uniform shape, high strength, low mortar consumption." },
  { id: "rcc-pedestal", name: "RCC Pedestal", category: "Structural", img: "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?w=1200&q=85", desc: "Pre-cast pedestals with anchor bolts for signage, utility poles, and rooftop units." },
  { id: "rcc-bollard", name: "RCC Bollard", category: "Traffic", img: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=1200&q=85", desc: "Concrete bollards for traffic control, perimeter security and pedestrian protection." },
  { id: "grass-paver", name: "Grass Paver", category: "Landscaping", img: "https://images.unsplash.com/photo-1597007030739-6d2e7172ee99?w=1200&q=85", desc: "Permeable interlocking pavers with grass voids — ideal for green parking & driveways." },
  { id: "saucer-drain", name: "Saucer Drain", category: "Drainage", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85", desc: "Curved saucer drains for landscape water channelling and surface runoff." },
  { id: "trench-cover", name: "Trench Cover", category: "Infrastructure", img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200&q=85", desc: "Heavy-duty flat covers for service trenches — vehicular and pedestrian rated." },
  { id: "frp-cover", name: "FRP Cover", category: "Utilities", img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200&q=85", desc: "Lightweight FRP composite covers for utility access — corrosion proof and easy lift." },
  { id: "frp-toilet", name: "FRP Toilets", category: "Sanitation", img: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=1200&q=85", desc: "Portable FRP toilet units for construction sites, public events and remote locations." },
  { id: "rcc-toilet", name: "RCC Toilet", category: "Sanitation", img: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=1200&q=85", desc: "Permanent precast toilet structures for villages, highways and public utilities." },
  { id: "route-marker", name: "Route Marker", category: "Utilities", img: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=1200&q=85", desc: "Concrete markers for underground cable routes — railway S&T, telecom, gas and power." },
  { id: "fencing-pole", name: "Fencing Pole", category: "Boundary", img: "https://images.unsplash.com/photo-1631719606912-e90abc91683b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200", desc: "Reinforced concrete fencing poles for farms, plots and boundary walls — long service life." },
  { id: "baluster", name: "Baluster", category: "Architectural", img: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=1200&q=85", desc: "Decorative balusters for staircases, balconies and verandas — multiple classical profiles." },
  { id: "water-tank", name: "Water Tank", category: "Storage", img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200&q=85", desc: "RCC water storage tanks — overhead and underground configurations, watertight construction." },
];

export const PROJECTS = [
  { id: 1, title: "Highway Drainage Network", location: "Pune-Satara Highway", scope: "U-Trench, Saucer Drains, Hume Pipes", img: "https://images.unsplash.com/photo-1775323017122-a3333fff34a7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600" },
  { id: 2, title: "Township Boundary Wall", location: "Hinjewadi, Pune", scope: "12,000 Rmt of Compound Wall", img: "https://images.unsplash.com/photo-1631719606912-e90abc91683b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600" },
  { id: 3, title: "Industrial Park Paving", location: "Chakan MIDC", scope: "85,000 sqm Interlocking Pavers", img: "https://images.unsplash.com/photo-1755778803577-5ea0e90ffd1d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600" },
  { id: 4, title: "Stormwater Culvert", location: "Mumbai-Pune Expressway", scope: "NP4 Hume Pipes & RCC Rings", img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1600&q=85" },
  { id: 5, title: "Smart City Public Realm", location: "Pimpri-Chinchwad", scope: "Benches, Bollards, Planters", img: "https://images.unsplash.com/photo-1568667256549-094345857637?w=1600&q=85" },
  { id: 6, title: "Cable Route Markers", location: "Central Railway", scope: "5,200 Route Markers", img: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=1600&q=85" },
];

export const TESTIMONIALS = [
  { name: "Anand Joshi", role: "Project Manager, Skyline Infra", text: "Revanth's precast units arrived perfectly cured and dimensionally true. They saved us nearly four weeks on the boundary wall package.", avatar: "https://images.unsplash.com/photo-1759922378219-1d31edb644f4?crop=entropy&cs=srgb&fm=jpg&q=85&w=400" },
  { name: "Priya Deshmukh", role: "Architect, Studio Praxis", text: "Beautiful finishes on the bespoke planters and balusters. RCP genuinely understands design intent and delivers without compromise.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=85" },
  { name: "Rahul Patil", role: "Civil Contractor", text: "Their hume pipes and U-trenches met every IS load test on the highway package. Reliable team, reliable product.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85" },
];

export const FAQS = [
  { q: "What is the minimum order quantity?", a: "There is no fixed MoQ for standard catalogue products. For custom moulds and bespoke finishes, a minimum batch is agreed at the quotation stage." },
  { q: "Do you deliver outside Pune?", a: "Yes — we regularly deliver across Maharashtra and to neighbouring states. Logistics is quoted on actual transport cost, FOR or ex-works as you prefer." },
  { q: "Can you cast products to client drawings?", a: "Absolutely. Share your GFC drawings and we will revert with a feasibility note, mould lead time and unit cost." },
  { q: "What concrete grades do you produce?", a: "We commonly supply M25 to M45 grades. Higher grades and special mix designs are available on request with a mix-design submission." },
  { q: "Are your products tested?", a: "Every batch is sampled for cube strength, water absorption and dimensional checks. Third-party test reports are available on request." },
  { q: "How quickly can you deliver?", a: "Catalogue products typically ship within 7–10 days. Bespoke orders depend on mould fabrication and curing — usually 3–5 weeks." },
];

export const WHY_US = [
  { title: "ISO-Grade Quality", desc: "Strict in-house QC labs and certified mix designs on every batch.", icon: "ShieldCheck" },
  { title: "On-Time Delivery", desc: "Production planning and a dedicated logistics fleet keep your site moving.", icon: "Truck" },
  { title: "Custom Engineering", desc: "Bespoke moulds, mixes and finishes — engineered to your GFC drawings.", icon: "Wrench" },
  { title: "Sustainable Practice", desc: "Fly-ash, recycled water curing and low-carbon mixes wherever feasible.", icon: "Leaf" },
  { title: "Pan-Maharashtra Reach", desc: "Pune-headquartered with delivery hubs across the state.", icon: "MapPin" },
  { title: "Trusted Partnership", desc: "Long-standing relationships with developers, contractors and PSUs.", icon: "Handshake" },
];

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];
