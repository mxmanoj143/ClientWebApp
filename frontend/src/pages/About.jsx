import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Award } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { COMPANY, STATS, WHY_US } from "@/data/site";
import { ShieldCheck, Truck, Wrench, Leaf, MapPin, Handshake } from "lucide-react";

const ICONS = { ShieldCheck, Truck, Wrench, Leaf, MapPin, Handshake };

export default function About() {
  return (
    <div data-testid="about-page">
      <PageHeader
        overline="About Revanth"
        title="A precast partner built on rigor, finish and trust."
        subtitle={COMPANY.description}
        image="https://images.unsplash.com/photo-1759395162292-728a3279b926?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400"
      />

      {/* Story */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-6">
            <img
              src="https://images.unsplash.com/photo-1759955074170-026d882ef011?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600"
              alt="Manufacturing"
              className="rounded-3xl w-full aspect-[4/5] object-cover"
            />
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-6">
            <div className="text-xs uppercase tracking-[0.3em] text-[#EA580C] font-bold">Our story</div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#0F172A] mt-4 leading-[1.05]">
              From foundry floor to flagship landmarks.
            </h2>
            <p className="text-[#475569] mt-6 leading-relaxed">
              Operated by Maharudra Precast Pvt Ltd, Revanth Concrete Products has grown from a single mould-shop in Pune into a full-spectrum precast manufacturer serving infrastructure, industrial, residential and landscape projects across Maharashtra and beyond.
            </p>
            <p className="text-[#475569] mt-4 leading-relaxed">
              We don't just supply concrete — we engineer it. Every batch is tested, every mould is calibrated, and every despatch is tracked so that what arrives on your site fits, flies up the schedule, and lasts decades.
            </p>
            <Link to="/contact" className="mt-10 inline-flex items-center gap-2 bg-[#EA580C] text-white px-6 py-3 font-bold rounded-full hover:bg-[#C2410C] transition-colors text-sm" data-testid="about-cta-talk">
              Talk to our team <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#F1F5F9]">
        <Stagger className="grid md:grid-cols-3 gap-6">
          <StaggerItem>
            <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] h-full" data-testid="about-mission">
              <Target className="w-7 h-7 text-[#EA580C]" />
              <div className="font-display font-black text-2xl text-[#0F172A] mt-4">Mission</div>
              <p className="text-[#475569] mt-3 text-sm leading-relaxed">Deliver precast concrete that is dimensionally true, structurally sound and consistently on time — empowering builders to deliver projects faster and better.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] h-full" data-testid="about-vision">
              <Eye className="w-7 h-7 text-[#EA580C]" />
              <div className="font-display font-black text-2xl text-[#0F172A] mt-4">Vision</div>
              <p className="text-[#475569] mt-3 text-sm leading-relaxed">To be India's most-trusted precast partner — the default first call for engineers and architects who refuse to compromise on quality.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] h-full" data-testid="about-values">
              <Award className="w-7 h-7 text-[#EA580C]" />
              <div className="font-display font-black text-2xl text-[#0F172A] mt-4">Values</div>
              <p className="text-[#475569] mt-3 text-sm leading-relaxed">Strength in detail. Trust in delivery. Care in every cast. Three principles that shape every product, every shift and every despatch.</p>
            </div>
          </StaggerItem>
        </Stagger>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {STATS.map((s) => <AnimatedCounter key={s.label} {...s} />)}
        </div>
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
