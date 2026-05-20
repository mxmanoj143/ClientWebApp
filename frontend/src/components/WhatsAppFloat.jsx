import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone } from "lucide-react";
import { COMPANY } from "@/data/site";

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3" data-testid="whatsapp-floating">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="glass rounded-2xl p-5 w-[280px] shadow-xl"
          >
            <div className="text-xs uppercase tracking-[0.25em] text-[#B0B7C3] font-bold mb-1">Chat on WhatsApp</div>
            <div className="font-display font-bold text-[#072B61] text-lg leading-tight mb-3">Talk to our team</div>
            <div className="flex flex-col gap-2">
              {COMPANY.whatsapp.map((num, i) => (
                <a
                  key={num}
                  href={`https://wa.me/${num}?text=${encodeURIComponent("Hello Revanth Concrete, I would like to enquire about your products.")}`}
                  target="_blank"
                  rel="noreferrer"
                  data-testid={`whatsapp-number-${i}`}
                  className="flex items-center justify-between gap-3 bg-white/80 hover:bg-white border border-[#072B61]/10 px-4 py-3 rounded-xl transition-colors"
                >
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[#475569] font-bold">{i === 0 ? "Sales" : "Support"}</div>
                    <div className="text-sm font-bold text-[#072B61]">{COMPANY.phones[i]}</div>
                  </div>
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </a>
              ))}
              <a
                href={`tel:${COMPANY.phones[0].replace(/\s/g, "")}`}
                data-testid="whatsapp-call-btn"
                className="flex items-center justify-center gap-2 bg-[#072B61] text-white px-4 py-3 rounded-xl text-sm font-bold mt-1"
              >
                <Phone className="w-4 h-4" /> Call instead
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((s) => !s)}
        data-testid="whatsapp-toggle-btn"
        className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_24px_rgba(37,211,102,0.45)] relative"
        aria-label="WhatsApp chat"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!open && <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-[#072B61]"></span></span>}
      </motion.button>
    </div>
  );
}
