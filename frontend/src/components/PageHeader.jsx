import { motion } from "framer-motion";

export default function PageHeader({ overline, title, subtitle, image }) {
  return (
    <section className="relative pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden bg-[#072B61] noise-overlay">
      {image && (
        <div className="absolute inset-0 opacity-25">
          <img src={image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#072B61]/40 via-[#072B61]/60 to-[#072B61]" />
        </div>
      )}
      <div className="relative px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          {overline && (
            <div className="text-xs uppercase tracking-[0.3em] text-[#E2E8F0] font-bold mb-4">
              {overline}
            </div>
          )}
          <h1 className="font-display font-black text-white text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            {title}
          </h1>
          {subtitle && <p className="mt-6 text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  );
}
