import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import photo1 from "@assets/Screenshot_20260602-203751_1780433257973.png";
import photo3 from "@assets/IMG-20260602-WA0044_1780433258029.jpg";
import photo6 from "@assets/Screenshot_20260602-202304_1780433258100.png";
import photo8 from "@assets/Screenshot_20260602-202751_1780433258137.png";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    number: "01",
    title: "The Grill",
    sub: "Where fire is the ingredient",
    img: photo6,
    accent: "#FFD700",
  },
  {
    number: "02",
    title: "The Atmosphere",
    sub: "Every corner tells a story",
    img: photo1,
    accent: "#CC0000",
  },
  {
    number: "03",
    title: "The Chops",
    sub: "Flavour without compromise",
    img: photo3,
    accent: "#FFD700",
  },
  {
    number: "04",
    title: "The Vibe",
    sub: "Drink. Connect. Celebrate.",
    img: photo8,
    accent: "#CC0000",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-28 md:py-40 bg-[#060606] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 mb-14 md:mb-20">
        <div ref={headerRef}>
          <p className="text-[#CC0000] text-[10px] tracking-[0.45em] uppercase font-sans font-medium mb-4 opacity-0">
            The World of JRoyal
          </p>
          <h2
            className="font-serif font-bold text-white opacity-0"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)", lineHeight: "0.92", letterSpacing: "-0.02em" }}
          >
            A Curated<br />
            <span className="italic text-[#FFD700] font-light">Experience.</span>
          </h2>
        </div>
      </div>

      <div
        ref={trackRef}
        className="experience-track flex gap-4 md:gap-6 overflow-x-auto px-6 lg:px-16 pb-6 snap-x snap-mandatory"
        style={{ scrollPaddingLeft: "4rem" }}
      >
        {panels.map((panel, i) => (
          <motion.div
            key={panel.number}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            data-testid={`experience-panel-${i}`}
            className="relative flex-shrink-0 snap-start overflow-hidden group"
            style={{ width: "clamp(280px, 72vw, 680px)", height: "clamp(400px, 75vh, 720px)" }}
          >
            <img
              src={panel.img}
              alt={panel.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1400ms] ease-out"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.4) 50%, rgba(8,8,8,0.15) 100%)`,
              }}
            />

            <div className="absolute top-8 right-8 font-display text-white/10 leading-none select-none"
              style={{ fontSize: "clamp(4rem, 8vw, 8rem)" }}>
              {panel.number}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <div className="h-px w-10 mb-4 transition-all duration-700 group-hover:w-20"
                style={{ backgroundColor: panel.accent }} />
              <h3
                className="font-serif font-bold text-white mb-2 leading-none translate-y-2 group-hover:translate-y-0 transition-transform duration-500"
                style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
              >
                {panel.title}
              </h3>
              <p
                className="font-sans text-white/45 text-sm tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75"
              >
                {panel.sub}
              </p>
            </div>
          </motion.div>
        ))}

        <div className="flex-shrink-0 w-6 md:w-10" />
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 mt-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/5" />
        <p className="text-white/20 font-sans text-xs tracking-[0.25em] uppercase">
          Drag to explore
        </p>
        <div className="h-px w-12 bg-white/5" />
      </div>
    </section>
  );
}
