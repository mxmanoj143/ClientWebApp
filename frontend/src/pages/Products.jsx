import { useMemo, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Search, CheckCircle2, MapPin, ChevronDown } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { PRODUCTS } from "@/data/site";

export default function Products() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const categories = useMemo(() => ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))], []);
  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (active === "All" || p.category === active) &&
          (query === "" ||
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.desc.toLowerCase().includes(query.toLowerCase()))
      ),
    [query, active]
  );

  // Scroll to product on hash change or dropdown select
  useEffect(() => {
    const hash = location.hash?.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [location.hash]);

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const scrollToProduct = (id) => {
    setSelected(id);
    setDropdownOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div data-testid="products-page">
      <PageHeader
        overline="Catalogue"
        title="Every precast element your project needs."
        subtitle="A complete range of RCC and precast products engineered for infrastructure, building, drainage, landscape and utility applications."
        image="https://images.unsplash.com/photo-1755778803577-5ea0e90ffd1d?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400"
      />

      {/* Toolbar */}
      <section className="px-6 md:px-12 lg:px-24 py-10 sticky top-20 z-30 bg-white/85 backdrop-blur-xl border-b border-[#E2E8F0]">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
          {/* Dropdown */}
          <div className="relative lg:w-80" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((s) => !s)}
              data-testid="products-dropdown-toggle"
              className="w-full flex items-center justify-between gap-3 bg-[#0F172A] text-white rounded-full px-5 py-3 text-sm font-bold"
            >
              <span className="truncate">
                {selected ? PRODUCTS.find((p) => p.id === selected)?.name : "Jump to a product"}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-50 mt-2 w-full max-h-80 overflow-y-auto bg-white border border-[#E2E8F0] rounded-2xl shadow-xl"
                data-testid="products-dropdown-menu"
              >
                {PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => scrollToProduct(p.id)}
                    data-testid={`dropdown-option-${p.id}`}
                    className="w-full text-left px-4 py-3 text-sm font-bold text-[#0F172A] hover:bg-[#F1F5F9] flex items-center justify-between gap-3 border-b border-[#E2E8F0] last:border-b-0"
                  >
                    <span>{p.name}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#EA580C]">{p.category}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Search */}
          <div className="flex items-center gap-3 bg-[#F1F5F9] rounded-full px-5 py-3 lg:w-80">
            <Search className="w-4 h-4 text-[#475569]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              data-testid="products-search"
              className="bg-transparent outline-none w-full text-sm text-[#0F172A]"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                data-testid={`products-filter-${c.toLowerCase().replace(/\s+/g, "-")}`}
                className={`px-4 py-2 text-xs uppercase tracking-[0.2em] font-bold rounded-full transition-colors ${
                  active === c ? "bg-[#0F172A] text-white" : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product list */}
      <section className="px-6 md:px-12 lg:px-24 py-16 space-y-20">
        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#475569]" data-testid="products-empty">
            No products match your search. Try a different keyword or filter.
          </div>
        )}
        {filtered.map((p, i) => (
          <article
            key={p.id}
            id={p.id}
            data-testid={`product-section-${p.id}`}
            className="scroll-mt-32"
          >
            <Reveal>
              <div className={`grid lg:grid-cols-12 gap-10 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                {/* Image */}
                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#F1F5F9] group">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold text-[#0F172A]">
                      {p.category}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                      <div className="bg-[#EA580C] text-white text-[10px] uppercase tracking-[0.25em] font-bold px-3 py-1.5 rounded-full">
                        #{String(i + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] font-bold">
                    <MapPin className="w-3 h-3 text-[#EA580C]" />
                    <span className="text-[#EA580C]">{p.category}</span>
                  </div>
                  <h2 className="font-display font-black text-4xl md:text-5xl text-[#0F172A] mt-3 leading-[1.05]">{p.name}</h2>
                  <p className="text-[#475569] mt-6 leading-relaxed">{p.desc}</p>

                  <div className="grid sm:grid-cols-2 gap-8 mt-8">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#EA580C] mb-3">Key Features</div>
                      <ul className="space-y-2">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-[#0F172A]">
                            <CheckCircle2 className="w-4 h-4 text-[#EA580C] flex-shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#EA580C] mb-3">Applications</div>
                      <ul className="space-y-2">
                        {p.applications.map((a) => (
                          <li key={a} className="flex items-start gap-2 text-sm text-[#0F172A]">
                            <span className="w-1.5 h-1.5 bg-[#0F172A] rounded-full mt-2 flex-shrink-0" />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    state={{ product: p.name }}
                    data-testid={`product-cta-${p.id}`}
                    className="mt-10 inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#EA580C] text-white px-6 py-3 font-bold rounded-full transition-colors text-sm"
                  >
                    Request a Quote <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </article>
        ))}
      </section>
    </div>
  );
}
