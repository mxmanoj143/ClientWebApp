import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, Package, HardHat, ClipboardList, ShieldCheck, Truck, Wrench,
  Leaf, MapPin, Handshake, Phone, Mail, Plus, Minus, Download, FileText,
} from "lucide-react";
import { useState } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import HomeSlider from "@/components/HomeSlider";
import { COMPANY, SERVICES, FAQS, WHY_US } from "@/data/site";

const ICONS = { Package, HardHat, ClipboardList, ShieldCheck, Truck, Wrench, Leaf, MapPin, Handshake };

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div data-testid="home-page">
      {/* FULL-WIDTH HERO SLIDER (ABOVE EVERYTHING) */}
      <HomeSlider />

      {/* HERO TEXT SECTION */}
      <section className="relative overflow-hidden bg-[#072B61] noise-overlay">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1759802805758-054116467e0a?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400"
            alt="Modern concrete architecture"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#072B61]/85 via-[#072B61]/60 to-[#072B61]/95" />
        </div>

        <div className="relative pt-28 md:pt-32 pb-20 md:pb-24 px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-8"
            >
              <div className="text-xs uppercase tracking-[0.35em] text-[#E2E8F0] font-bold">
                {COMPANY.tagline}
              </div>
              <h1 className="font-display font-black text-white text-[40px] sm:text-5xl lg:text-[76px] leading-[1.02] tracking-tight mt-6">
                Built for <span className="text-[#E2E8F0] italic">Strength.</span><br />
                Designed for <span className="text-[#E2E8F0] italic">Reliability.</span>
              </h1>
              <div className="mt-8 space-y-5 max-w-2xl">
                {COMPANY.heroParagraphs.map((p, i) => (
                  <p key={i} className="text-base md:text-lg text-white/75 leading-relaxed">{p}</p>
                ))}
                <p className="text-base md:text-lg text-white font-bold tracking-wide">{COMPANY.heroSignoff}</p>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/contact" state={{ tab: "quote" }} data-testid="hero-cta-quote" className="inline-flex items-center gap-2 bg-[#072B61] hover:bg-[#051E47] text-white px-7 py-4 font-bold rounded-full transition-colors">
                  Request a Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/products" data-testid="hero-cta-products" className="inline-flex items-center gap-2 glass-dark text-white px-7 py-4 font-bold rounded-full hover:bg-white/10 transition-colors">
                  Explore Products <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <div className="glass rounded-2xl p-6">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#072B61] font-bold">Direct Line</div>
                <div className="font-display font-black text-2xl text-[#072B61] mt-2">Talk to engineering</div>
                <div className="mt-4 space-y-3">
                  {COMPANY.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="flex items-center gap-3 text-[#072B61] hover:text-[#475569]">
                      <Phone className="w-4 h-4 text-[#072B61]" />
                      <span className="font-bold">{p}</span>
                    </a>
                  ))}
                  <a href={`mailto:${COMPANY.emails[0]}`} className="flex items-center gap-3 text-[#072B61] hover:text-[#475569]">
                    <Mail className="w-4 h-4 text-[#072B61]" />
                    <span className="font-bold break-all text-sm">{COMPANY.emails[0]}</span>
                  </a>
                </div>
                <Link to="/contact" data-testid="hero-card-cta" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#072B61] hover:text-[#475569]">
                  Send a brief <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Marquee */}
        <div className="relative border-y border-white/10 bg-black/20 overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap py-5">
            {[...Array(2)].flatMap((_, i) =>
              ["ISO Quality Mix", "On-Time Delivery", "Custom Moulds", "Pan-Maharashtra", "Engineered Strength", "Sustainable Concrete", "60,000 sq ft Facility", "Trusted Partnerships"].map((t, j) => (
                <span key={`${i}-${j}`} className="text-white/70 text-xs uppercase tracking-[0.35em] font-bold flex items-center gap-12">
                  <span className="text-[#E2E8F0]">●</span> {t}
                </span>
              ))
            )}
          </div>
        </div>
      </section>

      {/* SERVICES SLIDER moved above hero */}

      {/* WHO WE ARE */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.3em] text-[#B0B7C3] font-bold">Who we are</div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#072B61] mt-4 leading-[1.05]">
              Engineered precast. <span className="text-[#475569]">Delivered with trust.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="space-y-5">
              {COMPANY.whoWeAre.map((p, i) => (
                <p key={i} className="text-lg text-[#475569] leading-relaxed">{p}</p>
              ))}
            </div>
            <div className="mt-12 grid sm:grid-cols-2 gap-6">
              <div>
                <div className="font-display font-black text-3xl text-[#072B61]">Built to spec</div>
                <p className="text-[#475569] mt-2 text-sm">Custom moulds, mix designs and finishes — from RCC to FRP.</p>
              </div>
              <div>
                <div className="font-display font-black text-3xl text-[#072B61]">Built to last</div>
                <p className="text-[#475569] mt-2 text-sm">Quality-controlled curing and certified test results on every batch.</p>
              </div>
            </div>
            <Link to="/about" className="mt-10 inline-flex items-center gap-2 font-bold text-[#072B61] hover:text-[#B0B7C3]" data-testid="intro-about-link">
              About the company <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-[#F5F7FA] border-y border-[#E2E8F0]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#B0B7C3] font-bold">What we do</div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#072B61] mt-4 max-w-2xl leading-[1.05]">
              Three pillars of precast excellence.
            </h2>
          </div>
          <Link to="/services" className="text-sm font-bold text-[#072B61] hover:text-[#B0B7C3] inline-flex items-center gap-2" data-testid="services-see-all">
            All services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <Stagger className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s) => {
            const Ico = ICONS[s.icon];
            return (
              <StaggerItem key={s.id}>
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 h-full product-card-hover" data-testid={`service-card-${s.id}`}>
                  <div className="w-12 h-12 bg-[#072B61] text-[#B0B7C3] rounded-xl flex items-center justify-center">
                    <Ico className="w-6 h-6" />
                  </div>
                  <div className="font-display font-black text-2xl text-[#072B61] mt-6">{s.title}</div>
                  <p className="text-[#475569] mt-3 leading-relaxed text-sm">{s.desc}</p>
                  <ul className="mt-6 space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-[#072B61]">
                        <span className="w-1.5 h-1.5 bg-[#072B61] rounded-full mt-2 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* WHY US */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.3em] text-[#B0B7C3] font-bold">Why Revanth</div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#072B61] mt-4 max-w-3xl leading-[1.05]">
            Where engineering rigour meets industrial scale.
          </h2>
        </Reveal>
        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {WHY_US.map((w) => {
            const Ico = ICONS[w.icon];
            return (
              <StaggerItem key={w.title}>
                <div className="bg-[#F5F7FA] border border-[#E2E8F0] rounded-2xl p-7 h-full product-card-hover" data-testid={`why-us-${w.title.replace(/\s+/g, "-").toLowerCase()}`}>
                  <Ico className="w-7 h-7 text-[#B0B7C3]" />
                  <div className="font-display font-black text-xl text-[#072B61] mt-4">{w.title}</div>
                  <p className="text-[#475569] mt-2 text-sm leading-relaxed">{w.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* TESTIMONIALS section removed by request */}

      {/* FAQ */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.3em] text-[#B0B7C3] font-bold">Questions</div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#072B61] mt-4 leading-[1.05]">
              Frequently asked.
            </h2>
            <p className="text-[#475569] mt-6">Don't see your question? Talk to our team — we typically respond within an hour during business hours.</p>
            <Link to="/contact" data-testid="faq-contact-cta" className="mt-8 inline-flex items-center gap-2 bg-[#072B61] text-white px-6 py-3 font-bold rounded-full hover:bg-[#072B61] transition-colors text-sm">
              Ask a question <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
          <div className="lg:col-span-8 space-y-3">
            {FAQS.map((f, i) => (
              <button
                key={f.q}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                data-testid={`faq-item-${i}`}
                className="w-full text-left bg-white border border-[#E2E8F0] rounded-2xl p-6 hover:border-[#B0B7C3] transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display font-bold text-[#072B61] text-lg">{f.q}</span>
                  <span className="w-8 h-8 bg-[#072B61] text-white rounded-full flex items-center justify-center flex-shrink-0">
                    {openFaq === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </div>
                {openFaq === i && (
                  <p className="text-[#475569] mt-4 leading-relaxed text-sm">{f.a}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="px-6 md:px-12 lg:px-24 py-20">
        <div className="bg-[#072B61] noise-overlay rounded-3xl p-10 md:p-16 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#072B61]/30 rounded-full blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[#E2E8F0] font-bold">Build with us</div>
              <h2 className="font-display font-black text-white text-4xl md:text-5xl mt-4 leading-[1.05]">
                Have a project?<br />Let's cast it right.
              </h2>
              <p className="text-white/70 mt-5 max-w-lg">Send us your drawings or a brief and our engineers will revert with feasibility, lead time and a competitive quote.</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to="/contact" state={{ tab: "quote" }} data-testid="bottom-cta-quote" className="inline-flex items-center gap-2 bg-[#072B61] hover:bg-[#051E47] text-white px-7 py-4 font-bold rounded-full transition-colors">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="/assets/brochure.pdf"
                download="Revanth_Concrete_Products.pdf"
                data-testid="bottom-cta-brochure"
                className="inline-flex items-center gap-2 bg-white text-[#072B61] hover:bg-[#B0B7C3] px-7 py-4 font-bold rounded-full transition-colors"
              >
                <Download className="w-4 h-4" /> Download Brochure
              </a>
              <a
                href="https://drive.google.com/drive/folders/13kcnfmg1cDbcuHoXAHo2oqKaUq62Xqj7?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="bottom-cta-product-brochure"
                className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white hover:text-[#072B61] px-7 py-4 font-bold rounded-full transition-colors"
              >
                <FileText className="w-4 h-4" /> Product Brochure
              </a>
              <a href={`tel:${COMPANY.phones[0].replace(/\s/g, "")}`} data-testid="bottom-cta-call" className="inline-flex items-center gap-2 glass-dark text-white px-7 py-4 font-bold rounded-full hover:bg-white/10 transition-colors">
                <Phone className="w-4 h-4" /> {COMPANY.phones[0]}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
