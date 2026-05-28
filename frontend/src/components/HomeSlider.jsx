import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  { src: "/assets/service_supply.png", title: "Engineered Precast Supply", caption: "Premium precast components manufactured at scale." },
  { src: "/assets/service_install.png", title: "Expert Installation Services", caption: "Site survey through final placement — done right." },
  { src: "/assets/service_consult.png", title: "Project Consultancy", caption: "End-to-end planning, design and execution support." },
];
const INTERVAL = 3000;

export default function HomeSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef({ x: 0 });

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused]);

  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setIndex((i) => (i + 1) % SLIDES.length);

  const onTouchStart = (e) => { touch.current.x = e.changedTouches[0].clientX; };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touch.current.x;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
  };

  return (
    <section
      className="relative w-full bg-[#072B61] overflow-hidden"
      data-testid="home-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative w-full h-[58vh] sm:h-[68vh] lg:h-[85vh] min-h-[420px] max-h-[820px]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={SLIDES[index].src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={SLIDES[index].src}
              alt={SLIDES[index].title}
              className="w-full h-full object-cover"
            />
            {/* Navy gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#072B61]/55 via-[#072B61]/20 to-[#072B61]/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#072B61]/65 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Caption */}
        <div className="absolute bottom-12 sm:bottom-16 lg:bottom-24 left-6 sm:left-12 lg:left-24 right-6 sm:right-auto max-w-[560px]">
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#B0B7C3] font-bold">Our Services</div>
          <motion.div
            key={SLIDES[index].title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="font-display font-black text-white text-3xl sm:text-4xl lg:text-5xl mt-2 sm:mt-3 leading-[1.1]"
          >
            {SLIDES[index].title}
          </motion.div>
          <div className="text-sm sm:text-base text-white/80 mt-3 max-w-md hidden sm:block">
            {SLIDES[index].caption}
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={prev}
          data-testid="slider-prev"
          className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/15 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-[#072B61] transition-colors border border-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          data-testid="slider-next"
          className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/15 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center text-white hover:text-[#072B61] transition-colors border border-white/20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              data-testid={`slider-dot-${i}`}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? "bg-white w-10" : "bg-white/40 w-3 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
