import { useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import QuoteForm from "@/components/QuoteForm";
import { COMPANY } from "@/data/site";
import { useState } from "react";

export default function Contact() {
  const location = useLocation();
  const presetProduct = location.state?.product || "";
  const initialTab = location.state?.tab === "quote" || presetProduct ? "quote" : (location.hash === "#quote" ? "quote" : "contact");
  const [tab, setTab] = useState(initialTab);

  return (
    <div data-testid="contact-page">
      <PageHeader
        overline="Contact"
        title="Let's talk concrete."
        subtitle="Share your drawings, specifications or questions — our engineering team responds within one business day."
        image="https://images.unsplash.com/photo-1759802805758-054116467e0a?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400"
      />

      <section className="px-6 md:px-12 lg:px-24 py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-5">
            <div className="text-xs uppercase tracking-[0.3em] text-[#B0B7C3] font-bold">Reach us</div>
            <h2 className="font-display font-black text-4xl text-[#072B61] leading-[1.05]">Direct. Responsive. Engineered.</h2>

            <div className="space-y-4 mt-6">
              <a
                href={COMPANY.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-address-link"
                className="flex items-start gap-4 bg-white border border-[#B0B7C3] rounded-2xl p-5 cursor-pointer hover:border-[#072B61] transition-colors group"
              >
                <div className="w-10 h-10 bg-[#072B61] rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#B0B7C3]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#475569] flex items-center gap-2">
                    Address
                    <ExternalLink className="w-3 h-3 text-[#B0B7C3] group-hover:text-[#072B61]" />
                  </div>
                  <div className="text-[#072B61] font-bold mt-1 group-hover:underline">{COMPANY.address}</div>
                </div>
              </a>

              <div className="flex items-start gap-4 bg-white border border-[#B0B7C3] rounded-2xl p-5">
                <div className="w-10 h-10 bg-[#072B61] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#B0B7C3]" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#475569]">Phone</div>
                  {COMPANY.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block text-[#072B61] font-bold hover:text-[#B0B7C3] mt-1">{p}</a>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white border border-[#B0B7C3] rounded-2xl p-5">
                <div className="w-10 h-10 bg-[#072B61] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#B0B7C3]" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#475569]">Email</div>
                  {COMPANY.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`} className="block text-[#072B61] font-bold hover:text-[#B0B7C3] mt-1 break-all">{e}</a>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white border border-[#B0B7C3] rounded-2xl p-5">
                <div className="w-10 h-10 bg-[#072B61] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#B0B7C3]" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#475569]">Hours</div>
                  <div className="text-[#072B61] font-bold mt-1">Mon – Sat · 9:00 to 18:30 IST</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex gap-2 mb-5">
              <button
                onClick={() => setTab("contact")}
                data-testid="tab-contact"
                className={`px-5 py-2 text-xs uppercase tracking-[0.25em] font-bold rounded-full transition-colors ${tab === "contact" ? "bg-[#072B61] text-white" : "bg-[#F5F7FA] text-[#475569]"}`}
              >
                General Enquiry
              </button>
              <button
                onClick={() => setTab("quote")}
                data-testid="tab-quote"
                className={`px-5 py-2 text-xs uppercase tracking-[0.25em] font-bold rounded-full transition-colors ${tab === "quote" ? "bg-[#072B61] text-white" : "bg-[#F5F7FA] text-[#475569]"}`}
              >
                Request a Quote
              </button>
            </div>
            {tab === "contact" ? <ContactForm /> : <QuoteForm defaultProduct={presetProduct} />}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 pb-20" data-testid="contact-map">
        <div className="rounded-3xl overflow-hidden border border-[#B0B7C3] aspect-[16/7]">
          <iframe
            title="Revanth Concrete location"
            src={COMPANY.mapsEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
