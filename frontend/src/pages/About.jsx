import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Linkedin, Mail } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { COMPANY, VISION, MISSION, TEAM, WHY_US } from "@/data/site";
import { ShieldCheck, Truck, Wrench, Leaf, MapPin, Handshake } from "lucide-react";

const ICONS = { ShieldCheck, Truck, Wrench, Leaf, MapPin, Handshake };

export default function About() {
  return (
    <div data-testid="about-page">
      <PageHeader
        overline="About Revanth"
        title="A precast partner built on rigor, finish and trust."
        subtitle="Operated by Maharudra Precast Private Limited — engineering premium RCC and precast solutions from a 60,000 sq. ft. facility in Pune."
        image="https://images.unsplash.com/photo-1759395162292-728a3279b926?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400"
      />

      {/* Story */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-6">
            <img
              src="https://images.unsplash.com/photo-1759955074170-026d882ef011?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600"
              alt="Manufacturing facility"
              className="rounded-3xl w-full aspect-[4/5] object-cover"
            />
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-6">
            <div className="text-xs uppercase tracking-[0.3em] text-[#EA580C] font-bold">Our story</div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#0F172A] mt-4 leading-[1.05]">
              From foundry floor to flagship landmarks.
            </h2>
            <div className="space-y-5 mt-6">
              {COMPANY.aboutParagraphs.map((p, i) => (
                <p key={i} className="text-[#475569] leading-relaxed">{p}</p>
              ))}
            </div>
            <Link to="/contact" className="mt-10 inline-flex items-center gap-2 bg-[#EA580C] text-white px-6 py-3 font-bold rounded-full hover:bg-[#C2410C] transition-colors text-sm" data-testid="about-cta-talk">
              Talk to our team <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 md:py-24 px-6 md:px-12 lg:px-24 bg-[#F1F5F9]">
        <Stagger className="grid md:grid-cols-2 gap-6">
          <StaggerItem>
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#E2E8F0] h-full product-card-hover" data-testid="about-vision">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#0F172A] rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-[#EA580C]" />
                </div>
                <div className="text-xs uppercase tracking-[0.3em] text-[#EA580C] font-bold">Our Vision</div>
              </div>
              <div className="font-display font-black text-3xl md:text-4xl text-[#0F172A] mt-6 leading-[1.05]">Shaping tomorrow's infrastructure.</div>
              <p className="text-[#475569] mt-5 leading-relaxed">{VISION}</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-[#0F172A] noise-overlay rounded-3xl p-8 md:p-10 h-full text-white relative overflow-hidden" data-testid="about-mission">
              <div className="absolute -right-12 -top-12 w-56 h-56 bg-[#EA580C]/30 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#EA580C] rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs uppercase tracking-[0.3em] text-[#EA580C] font-bold">Our Mission</div>
                </div>
                <div className="font-display font-black text-3xl md:text-4xl mt-6 leading-[1.05]">Engineered for excellence.</div>
                <p className="text-white/75 mt-5 leading-relaxed">{MISSION}</p>
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </section>

      {/* TEAM */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.3em] text-[#EA580C] font-bold">Leadership</div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#0F172A] mt-4 max-w-3xl leading-[1.05]">
            Meet Our Team.
          </h2>
          <p className="text-[#475569] mt-6 max-w-2xl leading-relaxed">
            Experienced civil engineers leading precision manufacturing and dependable project delivery for clients across Maharashtra.
          </p>
        </Reveal>

        <Stagger className="grid md:grid-cols-2 gap-8 mt-14">
          {TEAM.map((m) => (
            <StaggerItem key={m.name}>
              <article className="group relative bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden product-card-hover h-full" data-testid={`team-card-${m.name.replace(/\s+/g, "-").toLowerCase()}`}>
                <div className="grid sm:grid-cols-5 h-full">
                  <div className="sm:col-span-2 aspect-square sm:aspect-auto relative overflow-hidden bg-[#0F172A]">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0F172A]/40 to-transparent" />
                    <div className="absolute top-4 left-4 bg-[#EA580C] text-white text-[10px] uppercase tracking-[0.25em] font-bold px-3 py-1 rounded-full">
                      {m.qualification}
                    </div>
                  </div>
                  <div className="sm:col-span-3 p-7 md:p-8 flex flex-col">
                    <div className="text-xs uppercase tracking-[0.25em] text-[#EA580C] font-bold">{m.role}</div>
                    <div className="font-display font-black text-3xl text-[#0F172A] mt-2 leading-tight">{m.name}</div>
                    <p className="text-[#475569] mt-5 text-sm leading-relaxed">{m.bio}</p>
                    <p className="text-[#475569] mt-3 text-sm leading-relaxed">{m.bio2}</p>
                    <div className="mt-auto pt-6 flex items-center gap-3">
                      <a href={`mailto:${COMPANY.emails[0]}`} className="w-9 h-9 bg-[#F1F5F9] hover:bg-[#0F172A] hover:text-white rounded-full flex items-center justify-center transition-colors text-[#0F172A]" aria-label="Email">
                        <Mail className="w-4 h-4" />
                      </a>
                      <a href="#" className="w-9 h-9 bg-[#F1F5F9] hover:bg-[#0F172A] hover:text-white rounded-full flex items-center justify-center transition-colors text-[#0F172A]" aria-label="LinkedIn">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Strengths */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[#F1F5F9]">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.3em] text-[#EA580C] font-bold">Our edge</div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#0F172A] mt-4 max-w-3xl leading-[1.05]">
            What sets Revanth apart.
          </h2>
        </Reveal>
        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {WHY_US.map((w) => {
            const Ico = ICONS[w.icon];
            return (
              <StaggerItem key={w.title}>
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-7 h-full product-card-hover">
                  <Ico className="w-7 h-7 text-[#EA580C]" />
                  <div className="font-display font-black text-xl text-[#0F172A] mt-4">{w.title}</div>
                  <p className="text-[#475569] mt-2 text-sm leading-relaxed">{w.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>
    </div>
  );
}
