import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Chidi Okonkwo",
    location: "Nsukka",
    text: "The peppered chicken is unlike anything I've tasted in Enugu state. The char, the spice, the tenderness — I've been back four times this month alone.",
  },
  {
    name: "Amina Khalid",
    location: "Abuja",
    text: "I came for a weekend, ended up extending my stay just to eat here again. The atmosphere is premium, the cocktails are dangerously good, and the service makes you feel like royalty.",
  },
  {
    name: "Emeka Uzodike",
    location: "Enugu",
    text: "JRoyal is what fine dining should feel like in Nigeria. The grilled catfish and party jollof is a masterpiece of flavour. Nothing else comes close in this city.",
  },
  {
    name: "Sarah Jeremiah",
    location: "Lagos",
    text: "Brought my entire family and we couldn't stop talking about it on the drive home. The suya platter disappeared before I could even reach for seconds. Unforgettable.",
  },
  {
    name: "Obinna Maduka",
    location: "Nsukka",
    text: "A hidden gem that shines like actual gold. The quality is consistent every single visit. This is not just food — this is an experience you carry with you.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power4.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
      }
    );
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-28 md:py-44 bg-[#060606] relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px",
        }}
      />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-28 gap-8">
          <div>
            <p className="text-[#CC0000] text-[10px] tracking-[0.45em] uppercase font-sans font-medium mb-4 opacity-0">
              Words from Royalty
            </p>
            <h2
              className="font-serif font-bold text-white opacity-0"
              style={{ fontSize: "clamp(2.4rem, 6vw, 7rem)", lineHeight: "0.92", letterSpacing: "-0.02em" }}
            >
              What They
              <br />
              <span className="italic font-light text-[#FFD700]">Say About Us.</span>
            </h2>
          </div>
          <p className="text-white/25 font-sans text-xs tracking-wider uppercase opacity-0 max-w-xs">
            Real guests. Real meals. Real feelings.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="text-[22vw] md:text-[18vw] font-serif text-[#FFD700]/[0.04] absolute -top-16 -left-4 leading-none select-none pointer-events-none"
            aria-hidden
          >
            "
          </div>

          <div className="relative min-h-[280px] md:min-h-[240px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#FFD700] text-lg">★</span>
                  ))}
                </div>
                <p
                  className="font-serif italic text-white mb-10 leading-[1.4]"
                  style={{ fontSize: "clamp(1.3rem, 3.5vw, 2.6rem)", fontWeight: 300 }}
                >
                  "{testimonials[active].text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-[#FFD700]" />
                  <div>
                    <p className="text-white font-sans font-medium text-sm">{testimonials[active].name}</p>
                    <p className="text-white/30 font-sans text-xs tracking-wider">{testimonials[active].location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-6 mt-12 pt-8 border-t border-white/6">
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  data-testid={`testimonial-dot-${idx}`}
                  className={`h-px transition-all duration-500 ${
                    active === idx
                      ? "w-12 bg-[#FFD700]"
                      : "w-4 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <span className="text-white/20 font-sans text-xs ml-auto">
              {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
