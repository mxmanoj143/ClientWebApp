import { Link } from "react-router-dom";
import { ArrowUpRight, Droplets, Grid3x3, TrafficCone, TreePine, Square, Layers, Fence, Droplet, Zap } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { CATEGORIES } from "@/data/site";

const ICONS = { Droplets, Grid3x3, TrafficCone, TreePine, Square, Layers, Fence, Droplet, Zap };

export default function Products() {
  return (
    <div data-testid="products-page">
      <PageHeader
        overline="Catalogue"
        title="Every precast element your project needs."
        subtitle="Nine engineered product categories covering infrastructure, building, drainage, landscape and utility applications."
        image="/assets/about.png"
      />

      <section className="px-6 md:px-12 lg:px-24 py-20">
        <Reveal>
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.3em] text-[#072B61] font-bold">9 Categories · 50+ Products</div>
            <h2 className="font-display font-black text-3xl md:text-4xl text-[#072B61] mt-3 leading-[1.05]">
              Explore by application area.
            </h2>
            <p className="text-[#475569] mt-4">
              Each category opens into a detailed view with sub-products, technical specifications and applications.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {CATEGORIES.map((c, i) => {
            const Ico = ICONS[c.icon] || Square;
            return (
              <StaggerItem key={c.slug}>
                <Link
                  to={`/products/${c.slug}`}
                  data-testid={`category-card-${c.slug}`}
                  className="group block bg-white rounded-2xl border border-[#B0B7C3] hover:border-[#072B61] product-card-hover h-full overflow-hidden"
                >
                  <div className="p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-14 h-14 bg-[#072B61] group-hover:bg-[#051E47] rounded-xl flex items-center justify-center transition-colors">
                        <Ico className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#B0B7C3] font-bold">
                        0{i + 1}
                      </div>
                    </div>
                    <h3 className="font-display font-black text-2xl text-[#072B61] mt-6 leading-tight">{c.name}</h3>
                    <p className="text-[#475569] text-sm mt-3 leading-relaxed">{c.summary}</p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {c.products.slice(0, 6).map((p) => (
                        <span key={p.id} className="text-[11px] text-[#475569] bg-[#F5F7FA] border border-[#B0B7C3]/50 px-2.5 py-1 rounded-full">
                          {p.name}
                        </span>
                      ))}
                      {c.products.length > 6 && (
                        <span className="text-[11px] text-[#072B61] font-bold px-2.5 py-1 rounded-full">
                          +{c.products.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="px-7 py-4 border-t border-[#F5F7FA] flex items-center justify-between bg-[#F5F7FA]/60 group-hover:bg-[#072B61] transition-colors">
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#072B61] group-hover:text-white">
                      {c.products.length} Products
                    </span>
                    <span className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-bold text-[#072B61] group-hover:text-white">
                      Explore <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>
    </div>
  );
}
