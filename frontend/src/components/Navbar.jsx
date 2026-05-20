import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, COMPANY } from "@/data/site";

const LOGO = "/assets/logo.png";
const BROCHURE = "/assets/brochure.pdf";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = location.pathname === "/";
  const lightOnDark = isHome && !scrolled;

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-4"}`}
    >
      <div className={`mx-4 md:mx-8 lg:mx-12 rounded-full transition-all duration-300 ${scrolled ? "glass" : lightOnDark ? "glass-dark" : "glass"}`}>
        <div className="flex items-center justify-between px-4 md:px-6 py-2.5">
          <Link to="/" data-testid="navbar-logo" className="flex items-center gap-3 group">
            <div className={`flex items-center justify-center rounded-lg overflow-hidden transition-all ${scrolled ? "h-11 w-11 bg-white" : lightOnDark ? "h-11 w-11 bg-white/95" : "h-11 w-11 bg-white"}`}>
              <img src={LOGO} alt="Revanth Concrete Products" className="h-9 w-9 object-contain" />
            </div>
            <div className="hidden sm:block leading-tight">
              <div className={`font-display font-black text-base tracking-tight ${lightOnDark ? "text-white" : "text-[#072B61]"}`}>REVANTH</div>
              <div className={`text-[10px] uppercase tracking-[0.22em] font-bold ${lightOnDark ? "text-white/70" : "text-[#475569]"}`}>Concrete Products</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-[13px] font-bold tracking-wide transition-colors rounded-full ${
                    isActive
                      ? lightOnDark ? "text-white" : "text-[#072B61]"
                      : lightOnDark ? "text-white/75 hover:text-white" : "text-[#475569] hover:text-[#072B61]"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={BROCHURE}
              download="Revanth_Concrete_Products.pdf"
              data-testid="navbar-cta-brochure"
              className={`hidden md:inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold tracking-wide rounded-full transition-all ${
                lightOnDark
                  ? "border border-white/40 text-white hover:bg-white hover:text-[#072B61]"
                  : "border border-[#B0B7C3] text-[#072B61] hover:bg-[#072B61] hover:text-white hover:border-[#072B61]"
              }`}
            >
              <Download className="w-4 h-4" /> Brochure
            </a>
            <Link
              to="/contact"
              data-testid="navbar-cta-quote"
              className={`hidden md:inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold tracking-wide rounded-full transition-colors ${
                lightOnDark
                  ? "bg-white text-[#072B61] hover:bg-[#B0B7C3] hover:text-[#072B61]"
                  : "bg-[#072B61] text-white hover:bg-[#051E47]"
              }`}
            >
              Get Quote <ArrowUpRight className="w-4 h-4" />
            </Link>
            <button
              data-testid="navbar-mobile-toggle"
              onClick={() => setOpen((s) => !s)}
              className={`lg:hidden p-2.5 rounded-full ${lightOnDark ? "bg-white text-[#072B61]" : "bg-[#072B61] text-white"}`}
              aria-label="Open menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            data-testid="navbar-mobile-menu"
            className="lg:hidden mx-4 mt-3 glass rounded-3xl p-4"
          >
            <div className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
                  className={({ isActive }) =>
                    `px-4 py-3 text-base font-bold ${isActive ? "text-[#072B61]" : "text-[#475569]"}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="grid grid-cols-2 gap-2 mt-3">
                <a
                  href={BROCHURE}
                  download="Revanth_Concrete_Products.pdf"
                  data-testid="mobile-cta-brochure"
                  className="inline-flex items-center justify-center gap-2 border border-[#B0B7C3] text-[#072B61] px-4 py-3 text-sm font-bold rounded-full"
                >
                  <Download className="w-4 h-4" /> Brochure
                </a>
                <Link
                  to="/contact"
                  data-testid="mobile-cta-quote"
                  className="inline-flex items-center justify-center gap-2 bg-[#072B61] text-white px-4 py-3 text-sm font-bold rounded-full"
                >
                  Get Quote <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="text-xs text-[#475569] mt-3 px-1">
                {COMPANY.phones.join("  ·  ")}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
