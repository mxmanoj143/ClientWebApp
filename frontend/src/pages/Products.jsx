import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Stagger, StaggerItem } from "@/components/Reveal";
import { PRODUCTS } from "@/data/site";

export default function Products() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");

  const categories = useMemo(() => ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))], []);
  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (active === "All" || p.category === active) &&
          (query === "" || p.name.toLowerCase().includes(query.toLowerCase()) || p.desc.toLowerCase().includes(query.toLowerCase()))
      ),
    [query, active]
  );

  return (
    <div data-testid="products-page">
      <PageHeader
        overline="Catalogue"
        title="Every precast element your project needs."
        subtitle="From paving blocks to bespoke architectural casts — engineered, finished, and ready to install."
        image="https://images.unsplash.com/photo-1755778803577-5ea0e90ffd1d?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400"
      />

      <section className="px-6 md:px-12 lg:px-24 py-12 sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-b border-[#E2E8F0]">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
          <div className="flex items-center gap-3 bg-[#F1F5F9] rounded-full px-5 py-3 lg:w-96">
            <Search className="w-4 h-4 text-[#475569]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              data-testid="products-search"
              className="bg-transparent outline-none w-full text-sm text-[#0F172A]"
            />
          </div>
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

      <section className="px-6 md:px-12 lg:px-24 py-16">
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <StaggerItem key={p.id}>
              <Link
                to="/contact"
                state={{ product: p.name }}
                data-testid={`product-card-${p.id}`}
                className="group block bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden product-card-hover h-full"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#F1F5F9] relative">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-[#0F172A]">
                    {p.category}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-display font-black text-lg text-[#0F172A] leading-tight">{p.name}</div>
                    <ArrowUpRight className="w-5 h-5 text-[#EA580C] flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <p className="text-[#475569] text-sm mt-3 leading-relaxed line-clamp-3">{p.desc}</p>
                  <div className="mt-5 text-[11px] uppercase tracking-[0.2em] font-bold text-[#EA580C]">Get a quote →</div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#475569]" data-testid="products-empty">
            No products match your search. Try a different keyword or filter.
          </div>
        )}
      </section>
    </div>
  );
}
