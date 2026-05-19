import { Link } from "react-router-dom";
import { ArrowRight, Package, HardHat, ClipboardList, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { SERVICES } from "@/data/site";

const ICONS = { Package, HardHat, ClipboardList };

export default function Services() {
  return (
    <div data-testid="services-page">
      <PageHeader
        overline="Services"
        title="Supply. Install. Consult."
        subtitle="Three integrated service lines that take you from drawing-board to live infrastructure — without the procurement headaches in between."
        image="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=2400&q=85"
      />

      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 space-y-16">
        {SERVICES.map((s, i) => {
          const Ico = ICONS[s.icon];
          return (
            <Reveal key={s.id} delay={i * 0.05}>
              <div className={`grid lg:grid-cols-12 gap-10 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`} data-testid={`service-${s.id}`}>
                <div className="lg:col-span-5">
                  <div className="aspect-[4/5] bg-[#1E3A8A] rounded-3xl relative overflow-hidden noise-overlay">
                    <img
                      src={`https://images.unsplash.com/${i === 0 ? "photo-1755778803577-5ea0e90ffd1d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" : i === 1 ? "photo-1759395162292-728a3279b926?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" : "photo-1759802805758-054116467e0a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"}`}
                      alt={s.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/90 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 w-14 h-14 bg-[#94A3B8] rounded-2xl flex items-center justify-center">
                      <Ico className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <div className="text-xs uppercase tracking-[0.3em] text-[#94A3B8] font-bold">0{i + 1} — Service</div>
                  <h2 className="font-display font-black text-4xl md:text-5xl text-[#1E3A8A] mt-4 leading-[1.05]">{s.title}</h2>
                  <p className="text-[#475569] mt-6 leading-relaxed">{s.desc}</p>
                  <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[#1E3A8A]">
                        <CheckCircle2 className="w-5 h-5 text-[#94A3B8] flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-medium">{p}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="mt-10 inline-flex items-center gap-2 bg-[#1E3A8A] text-white px-6 py-3 font-bold rounded-full hover:bg-[#94A3B8] transition-colors text-sm" data-testid={`service-cta-${s.id}`}>
                    Discuss your requirement <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          );
        })}
      </section>
    </div>
  );
}
