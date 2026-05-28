import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight, Download, FileText } from "lucide-react";
import { COMPANY, NAV_LINKS, COMPANY_LEGAL } from "@/data/site";

const LOGO = "/assets/logo.png";
const BROCHURE = "/assets/brochure.pdf";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="bg-[#072B61] text-white relative noise-overlay">
      <div className="px-6 md:px-12 lg:px-24 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left — Logo + description */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-5 inline-flex items-center gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
              <img src={LOGO} alt="Revanth Concrete Products" className="h-20 w-20 object-contain" />
              <div className="leading-tight">
                <div className="font-display font-black text-[#072B61] text-2xl tracking-tight">REVANTH</div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#475569] font-bold">Concrete Products</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#B0B7C3] font-bold mt-1">By Maharudra Precast Pvt Ltd</div>
              </div>
            </div>
            <p className="mt-6 text-sm text-white/70 max-w-md leading-relaxed">
              {COMPANY.whoWeAre[0]}
            </p>
            <div className="mt-5 text-xs uppercase tracking-[0.22em] text-[#B0B7C3] font-bold">{COMPANY.tagline}</div>
            <a
              href={BROCHURE}
              download="Revanth_Concrete_Products.pdf"
              data-testid="footer-cta-brochure"
              className="mt-6 inline-flex items-center gap-2 bg-white text-[#072B61] hover:bg-[#B0B7C3] px-5 py-3 text-sm font-bold rounded-full transition-colors"
            >
              <Download className="w-4 h-4" /> Download Brochure
            </a>
            <a
              href="https://drive.google.com/drive/folders/13kcnfmg1cDbcuHoXAHo2oqKaUq62Xqj7?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-cta-product-brochure"
              className="mt-3 ml-0 sm:ml-3 inline-flex items-center gap-2 border border-[#B0B7C3] text-white hover:bg-white hover:text-[#072B61] px-5 py-3 text-sm font-bold rounded-full transition-colors"
            >
              <FileText className="w-4 h-4" /> Product Brochure
            </a>
          </div>

          {/* Middle — Links */}
          <div className="lg:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#B0B7C3] font-bold mb-4">Explore</div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-white/80 hover:text-white transition-colors" data-testid={`footer-link-${l.label.toLowerCase()}`}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="text-[10px] uppercase tracking-[0.25em] text-[#B0B7C3] font-bold mt-8 mb-4">Reach Us</div>
            <ul className="space-y-3 text-sm" data-testid="footer-reach-us">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B0B7C3] flex-shrink-0 mt-0.5" />
                <a
                  href={COMPANY.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-address-link"
                  className="text-white/80 hover:text-white text-xs leading-relaxed cursor-pointer hover:underline"
                >
                  {COMPANY.address}
                </a>
              </li>
              {COMPANY.phones.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#B0B7C3] flex-shrink-0" />
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="text-white/85 hover:text-white text-sm font-semibold whitespace-nowrap tracking-wide">{p}</a>
                </li>
              ))}
              {COMPANY.emails.map((e) => (
                <li key={e} className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#B0B7C3] flex-shrink-0" />
                  <a href={`mailto:${e}`} className="text-white/80 hover:text-white break-all text-sm">{e}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Registration */}
          <div className="lg:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#B0B7C3] font-bold mb-4">Company Registration</div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 space-y-3" data-testid="footer-registration">
              {COMPANY_LEGAL.map((r) => (
                <div key={r.label} className="flex items-center justify-between gap-3 border-b border-white/10 pb-2 last:border-b-0 last:pb-0">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B0B7C3] font-bold">{r.label}</span>
                  <span className="text-xs text-white font-bold tracking-wide font-mono">{r.value}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" state={{ tab: "quote" }} data-testid="footer-cta-quote" className="mt-5 inline-flex items-center gap-2 bg-white text-[#072B61] hover:bg-[#B0B7C3] px-5 py-3 text-sm font-bold rounded-full transition-colors">
              Request a Quote <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/50">
          <div>© {new Date().getFullYear()} {COMPANY.legal}. All rights reserved.</div>
          <div>Designed & engineered for precision concrete.</div>
        </div>
      </div>
    </footer>
  );
}
