import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, COMPANY } from "@/data/site";

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

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className={`mx-4 md:mx-8 lg:mx-12 rounded-full transition-all duration-300 ${scrolled ? "glass" : "glass-dark"}`}>
        <div className="flex items-center justify-between px-5 md:px-7 py-3">
          <Link to="/" data-testid="navbar-logo" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#1E3A8A] flex items-center justify-center rounded-md border border-white/20">
              <span className="text-white font-display font-black text-lg">R</span>
            </div>
            <div className="leading-tight">
              <div className={`font-display font-black text-base tracking-tight ${scrolled ? "text-[#1E3A8A]" : "text-white"}`}>REVANTH</div>
              <div className={`text-[10px] uppercase tracking-[0.25em] font-bold ${scrolled ? "text-[#475569]" : "text-white/70"}`}>Concrete Products</div>
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
                  `px-4 py-2 text-sm font-bold tracking-wide transition-colors rounded-full ${
                    isActive
                      ? scrolled ? "text-[#1E3A8A]" : "text-white"
                      : scrolled ? "text-[#475569] hover:text-[#1E3A8A]" : "text-white/80 hover:text-white"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              data-testid="navbar-cta-quote"
              className={`hidden md:inline-flex items-center gap-2 px-5 py-3 text-sm font-bold tracking-wide rounded-full transition-colors ${
                scrolled
                  ? "bg-[#1E3A8A] text-white hover:bg-[#475569]"
                  : "bg-white text-[#1E3A8A] hover:bg-[#3B82F6] hover:text-white"
              }`}
            >
              Get Quote <ArrowUpRight className="w-4 h-4" />
            </Link>
            <button
              data-testid="navbar-mobile-toggle"
              onClick={() => setOpen((s) => !s)}
              className="lg:hidden p-3 rounded-full bg-[#1E3A8A] text-white"
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
                    `px-4 py-3 text-base font-bold ${isActive ? "text-[#94A3B8]" : "text-[#1E3A8A]"}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                data-testid="mobile-cta-quote"
                className="mt-2 inline-flex items-center justify-center gap-2 bg-[#3B82F6] text-white px-5 py-3 text-sm font-bold rounded-full"
              >
                Get Quote <ArrowUpRight className="w-4 h-4" />
              </Link>
              <div className="text-xs text-[#475569] mt-3 px-4">
                {COMPANY.phones.join("  ·  ")}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
