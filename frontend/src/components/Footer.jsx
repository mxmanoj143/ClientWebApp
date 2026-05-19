import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { COMPANY, NAV_LINKS, PRODUCTS } from "@/data/site";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="bg-[#1E3A8A] text-white relative noise-overlay">
      <div className="px-6 md:px-12 lg:px-24 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#3B82F6] flex items-center justify-center rounded-md">
                <span className="font-display font-black text-xl text-white">R</span>
              </div>
              <div className="leading-tight">
                <div className="font-display font-black text-xl">REVANTH</div>
                <div className="text-xs uppercase tracking-[0.25em] text-[#E2E8F0] font-bold">Concrete Products</div>
              </div>
            </div>
            <p className="mt-6 text-sm text-white/70 max-w-md leading-relaxed">{COMPANY.description}</p>
            <div className="mt-6 text-xs uppercase tracking-[0.2em] text-[#E2E8F0] font-bold">{COMPANY.tagline}</div>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-[0.25em] text-white/50 font-bold mb-4">Explore</div>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm hover:text-[#E2E8F0] transition-colors" data-testid={`footer-link-${l.label.toLowerCase()}`}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-[0.25em] text-white/50 font-bold mb-4">Products</div>
            <ul className="space-y-2">
              {PRODUCTS.slice(0, 8).map((p) => (
                <li key={p.id}>
                  <Link to="/products" className="text-sm text-white/80 hover:text-[#E2E8F0] transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-[0.25em] text-white/50 font-bold mb-4">Reach Us</div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E2E8F0] flex-shrink-0 mt-0.5" />
                <span className="text-white/80">{COMPANY.address}</span>
              </li>
              {COMPANY.phones.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#E2E8F0]" />
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="text-white/80 hover:text-white">{p}</a>
                </li>
              ))}
              {COMPANY.emails.map((e) => (
                <li key={e} className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#E2E8F0]" />
                  <a href={`mailto:${e}`} className="text-white/80 hover:text-white break-all">{e}</a>
                </li>
              ))}
            </ul>
            <Link to="/contact" data-testid="footer-cta-quote" className="mt-6 inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] px-5 py-3 text-sm font-bold rounded-full transition-colors">
              Request a Quote <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-white/50">
          <div>© {new Date().getFullYear()} {COMPANY.legal}. All rights reserved.</div>
          <div>Designed & engineered for precision concrete.</div>
        </div>
      </div>
    </footer>
  );
}
