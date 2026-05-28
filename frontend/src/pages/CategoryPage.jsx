import { useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import ProductImage from "@/components/ProductImage";
import { CATEGORIES } from "@/data/site";

export default function CategoryPage() {
  const { slug } = useParams();
  const category = useMemo(() => CATEGORIES.find((c) => c.slug === slug), [slug]);
  const [activeId, setActiveId] = useState(category?.products[0]?.id);

  if (!category) return <Navigate to="/products" replace />;
  const active = category.products.find((p) => p.id === activeId) || category.products[0];

  return (
    <div data-testid={`category-page-${slug}`}>
      <PageHeader
        overline={`Category · ${category.name}`}
        title={category.name}
        subtitle={category.summary}
        image="/assets/about.png"
      />

      {/* Breadcrumb */}
      <section className="px-6 md:px-12 lg:px-24 pt-10">
        <Link to="/products" data-testid="back-to-categories" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-bold text-[#475569] hover:text-[#072B61]">
          <ArrowLeft className="w-3.5 h-3.5" /> All Categories
        </Link>
      </section>

      {/* Sub-product selector */}
      <section className="px-6 md:px-12 lg:px-24 pt-8">
        <div className="flex flex-wrap gap-2">
          {category.products.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              data-testid={`subproduct-btn-${p.id}`}
              className={`px-4 py-2.5 text-xs uppercase tracking-[0.2em] font-bold rounded-full transition-colors ${
                active.id === p.id
                  ? "bg-[#072B61] text-white"
                  : "bg-white border border-[#B0B7C3] text-[#475569] hover:border-[#072B61] hover:text-[#072B61]"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </section>

      {/* Active product detail */}
      <section className="px-6 md:px-12 lg:px-24 py-14">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-12 gap-10"
          data-testid={`product-detail-${active.id}`}
        >
          <div className="lg:col-span-5">
            <ProductImage productId={active.id} productName={active.name} className="aspect-[4/5]" />
            <div className="mt-4 text-[11px] uppercase tracking-[0.22em] text-[#475569] font-bold">{active.short}</div>
          </div>

          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-[0.3em] text-[#072B61] font-bold">{category.name}</div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#072B61] mt-3 leading-[1.05]">{active.name}</h2>

            {/* Description */}
            <div className="mt-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#475569] font-bold mb-2">Description</div>
              <p className="text-[#475569] leading-relaxed">{active.desc}</p>
            </div>

            {/* Tech Specs */}
            {active.specs && active.specs.length > 0 && (
              <div className="mt-8">
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#475569] font-bold mb-3">Technical Specifications</div>
                <div className="rounded-2xl border border-[#B0B7C3]/60 overflow-hidden">
                  {active.specs.map((s, i) => (
                    <div key={s.label} className={`grid grid-cols-3 ${i !== active.specs.length - 1 ? "border-b border-[#B0B7C3]/40" : ""}`}>
                      <div className="px-4 py-3 bg-[#F5F7FA] text-[11px] uppercase tracking-[0.2em] font-bold text-[#072B61] col-span-1">{s.label}</div>
                      <div className="px-4 py-3 col-span-2 flex flex-wrap gap-1.5">
                        {s.values.map((v) => (
                          <span key={v} className="text-xs font-bold text-[#072B61] bg-white border border-[#B0B7C3]/60 px-2.5 py-1 rounded-full">{v}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features + Applications */}
            <div className="grid sm:grid-cols-2 gap-8 mt-8">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#475569] font-bold mb-3">Key Features</div>
                <ul className="space-y-2">
                  {active.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#072B61]">
                      <CheckCircle2 className="w-4 h-4 text-[#072B61] flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#475569] font-bold mb-3">Applications</div>
                <ul className="space-y-2">
                  {active.applications.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-[#072B61]">
                      <ChevronRight className="w-4 h-4 text-[#B0B7C3] flex-shrink-0 mt-0.5" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              to="/contact"
              state={{ product: active.name }}
              data-testid={`product-cta-${active.id}`}
              className="mt-10 inline-flex items-center gap-2 bg-[#072B61] hover:bg-[#051E47] text-white px-6 py-3 font-bold rounded-full transition-colors text-sm"
            >
              Request a Quote <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Other products in category */}
      <section className="px-6 md:px-12 lg:px-24 pb-20">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.3em] text-[#072B61] font-bold">All in {category.name}</div>
          <h3 className="font-display font-black text-2xl md:text-3xl text-[#072B61] mt-3 leading-tight">Browse the full range.</h3>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {category.products.map((p) => (
            <div
              key={p.id}
              role="button"
              tabIndex={0}
              onClick={() => { setActiveId(p.id); window.scrollTo({ top: 380, behavior: "smooth" }); }}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveId(p.id); window.scrollTo({ top: 380, behavior: "smooth" }); } }}
              data-testid={`grid-card-${p.id}`}
              className="text-left bg-white border border-[#B0B7C3] rounded-2xl overflow-hidden product-card-hover cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#072B61]"
            >
              <ProductImage productId={p.id} productName={p.name} className="aspect-[4/3]" roundedClass="rounded-none" />
              <div className="p-5">
                <h4 className="font-display font-black text-lg text-[#072B61] leading-tight">{p.name}</h4>
                <p className="text-[#475569] text-xs mt-1 leading-relaxed">{p.short}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
