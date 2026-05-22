import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  { src: "/assets/service_supply.png", title: "Engineered Precast Supply" },
  { src: "/assets/service_install.png", title: "Expert Installation Services" },
  { src: "/assets/service_consult.png", title: "Project Consultancy" },
];
const INTERVAL = 4000;

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
      className="px-6 md:px-12 lg:px-24 py-16 md:py-20"
      data-testid="home-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-3xl bg-[#072B61] shadow-[0_24px_48px_rgba(7,43,97,0.18)] border border-[#B0B7C3]/40">
        <div
          className="relative w-full aspect-square sm:aspect-[16/9] lg:aspect-[21/9] max-h-[640px]"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={SLIDES[index].src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              src={SLIDES[index].src}
              alt={SLIDES[index].title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Subtle navy gradient at bottom for caption legibility */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#072B61]/70 to-transparent pointer-events-none" />

          {/* Caption */}
          <div className="absolute bottom-5 sm:bottom-7 left-5 sm:left-8 right-5 sm:right-auto sm:max-w-md">
            <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#B0B7C3] font-bold">Services</div>
            <div className="font-display font-black text-white text-xl sm:text-2xl lg:text-3xl mt-1 leading-tight">
              {SLIDES[index].title}
            </div>
          </div>

          {/* Controls */}
          <button
            onClick={prev}
            data-testid="slider-prev"
            className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-5 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white backdrop-blur rounded-full flex items-center justify-center text-[#072B61] shadow-lg transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            data-testid="slider-next"
            className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-5 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white backdrop-blur rounded-full flex items-center justify-center text-[#072B61] shadow-lg transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-8 sm:translate-x-0 flex gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                data-testid={`slider-dot-${i}`}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? "bg-white w-8" : "bg-white/50 w-3 hover:bg-white/80"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
