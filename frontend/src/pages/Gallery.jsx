import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { PRODUCTS } from "@/data/site";

const GALLERY = PRODUCTS.map((p) => ({ src: p.img, label: p.name, category: p.category }));

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <div data-testid="gallery-page">
      <PageHeader
        overline="Gallery"
        title="A visual catalogue of precast in motion."
        subtitle="Yard, factory, despatch and on-site — moments that capture the precision behind every Revanth product."
        image="https://images.unsplash.com/photo-1759802805758-054116467e0a?crop=entropy&cs=srgb&fm=jpg&q=85&w=2400"
      />

      <section className="px-6 md:px-12 lg:px-24 py-20">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance]">
          {GALLERY.map((g, i) => (
            <button
              key={i}
              onClick={() => setActive(g)}
              data-testid={`gallery-tile-${i}`}
              className="block w-full mb-4 break-inside-avoid relative group overflow-hidden rounded-2xl bg-[#F5F7FA]"
            >
              <img src={g.src} alt={g.label} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#072B61]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#B0B7C3] font-bold">{g.category}</div>
                <div className="text-white font-display font-bold text-sm">{g.label}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            data-testid="gallery-lightbox"
            className="fixed inset-0 z-[60] bg-[#072B61]/95 backdrop-blur-md flex items-center justify-center p-6"
          >
            <button onClick={() => setActive(null)} className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white" data-testid="gallery-lightbox-close">
              <X className="w-5 h-5" />
            </button>
            <motion.img
              key={active.src}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={active.src}
              alt={active.label}
              className="max-w-[90vw] max-h-[80vh] rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
