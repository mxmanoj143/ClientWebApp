import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Stagger, StaggerItem } from "@/components/Reveal";
import { PROJECTS } from "@/data/site";

export default function Projects() {
  return (
    <div data-testid="projects-page">
      <PageHeader
        overline="Recent Projects"
        title="Concrete that's quietly running India's infrastructure."
        subtitle="A glimpse of recent supply, installation and consulting engagements where Revanth precast took centre stage."
        image="https://images.unsplash.com/photo-1775323017122-a3333fff34a7?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400"
      />

      <section className="px-6 md:px-12 lg:px-24 py-20">
        <Stagger className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <StaggerItem key={p.id}>
              <article className="group relative overflow-hidden rounded-3xl bg-[#0F172A] aspect-[5/4]" data-testid={`project-card-${p.id}`}>
                <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#EA580C] font-bold">
                    <MapPin className="w-3 h-3" /> {p.location}
                  </div>
                  <div className="font-display font-black text-white text-2xl md:text-3xl mt-2 leading-tight">{p.title}</div>
                  <div className="text-white/70 text-sm mt-2">{p.scope}</div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-20 bg-[#F1F5F9] rounded-3xl p-10 md:p-14 text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-[#EA580C] font-bold">Got a project?</div>
          <h2 className="font-display font-black text-3xl md:text-4xl text-[#0F172A] mt-3">Let's add yours to this list.</h2>
          <Link to="/contact" data-testid="projects-cta-quote" className="mt-8 inline-flex items-center gap-2 bg-[#0F172A] text-white px-7 py-4 font-bold rounded-full hover:bg-[#EA580C] transition-colors">
            Start a conversation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
