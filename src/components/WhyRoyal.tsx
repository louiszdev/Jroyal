import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    num: "01",
    title: "Flame Grilled",
    body: "Every piece of protein we serve has earned its char. Open-flame grilling is not a technique here — it's a philosophy. The smoke is the seasoning.",
    accent: "#FFD700",
  },
  {
    num: "02",
    title: "Nigerian Soul",
    body: "Our roots are in the spice markets of Nigeria. Every marinade, every blend, every sauce carries the memory of generations of bold, unapologetic cooking.",
    accent: "#CC0000",
  },
  {
    num: "03",
    title: "Royal Standard",
    body: "Premium cuts. Attentive service. An atmosphere built for dining, not just eating. JRoyal is what happens when passion meets professional precision.",
    accent: "#FFD700",
  },
];

export default function WhyRoyal() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
      }
    );

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 82%" },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 bg-[#080808] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(204,0,0,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
        <div ref={headerRef} className="opacity-0 mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[#CC0000] text-[10px] tracking-[0.5em] uppercase font-sans font-medium mb-4">
              Why JRoyal
            </p>
            <h2
              className="font-serif font-bold text-white leading-[0.95]"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 6rem)", letterSpacing: "-0.02em" }}
            >
              What Makes Us<br />
              <span className="italic font-light text-[#FFD700]">Different.</span>
            </h2>
          </div>
          <p className="text-white/25 font-sans font-light text-sm max-w-xs leading-relaxed">
            Three pillars that define every plate, every pour, every moment at JRoyal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {pillars.map((p, i) => (
            <div
              key={p.num}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="opacity-0 bg-[#080808] p-10 md:p-12 group hover:bg-[#0d0d0d] transition-colors duration-500 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"
                style={{ backgroundColor: p.accent }}
              />

              <div
                className="font-display mb-8 leading-none"
                style={{ fontSize: "clamp(3.5rem, 6vw, 5.5rem)", color: `${p.accent}12` }}
              >
                {p.num}
              </div>

              <div
                className="w-8 h-px mb-6"
                style={{ backgroundColor: p.accent }}
              />

              <h3
                className="font-serif font-bold text-white mb-4 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
              >
                {p.title}
              </h3>

              <p className="text-white/35 font-sans font-light leading-[1.85] text-sm">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
