import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import CountUp from "react-countup";

export default function AnimatedCounter({ value, suffix = "", label, duration = 2.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [start, setStart] = useState(false);
  useEffect(() => { if (inView) setStart(true); }, [inView]);

  return (
    <div ref={ref} className="text-center md:text-left" data-testid={`stat-${label.replace(/\s+/g, "-").toLowerCase()}`}>
      <div className="font-display font-black text-5xl md:text-6xl lg:text-7xl text-[#0F172A] leading-none tracking-tight">
        {start ? <CountUp end={value} duration={duration} separator="," /> : 0}
        <span className="text-[#EA580C]">{suffix}</span>
      </div>
      <div className="mt-3 text-xs md:text-sm uppercase tracking-[0.25em] font-bold text-[#475569]">
        {label}
      </div>
    </div>
  );
}
