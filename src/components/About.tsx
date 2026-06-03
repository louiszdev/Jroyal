import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import photo1 from "@assets/Screenshot_20260602-203751_1780433257973.png";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: "5,000", suffix: "+", label: "Meals Served" },
  { num: "5", suffix: "★", label: "Star Experience" },
  { num: "7", suffix: "/7", label: "Days a Week" },
  { num: "100", suffix: "%", label: "Flame Grilled" },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<HTMLDivElement[]>([]);
  const lineRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const imgTl = gsap.timeline({
      scrollTrigger: { trigger: imageRef.current, start: "top 70%" },
    });
    imgTl
      .fromTo(imageRef.current, { clipPath: "inset(0 100% 0 0)" }, {
        clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "expo.inOut",
      })
      .fromTo(curtainRef.current, { scaleX: 1 }, { scaleX: 0, duration: 1.2, ease: "expo.inOut" }, 0);

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 1.4, ease: "power4.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 70%" }
      }
    );

    statRefs.current.forEach((el, i) => {
      if (!el) return;
      const numEl = el.querySelector<HTMLElement>(".stat-num");
      const target = parseFloat(stats[i].num.replace(",", ""));
      const isLarge = target >= 1000;
      const counter = { val: 0 };

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            val: target,
            duration: 2,
            delay: i * 0.15,
            ease: "power2.out",
            onUpdate: () => {
              if (numEl) {
                const v = Math.round(counter.val);
                numEl.textContent = isLarge ? v.toLocaleString() : String(v);
              }
            },
          });
        },
      });

      gsap.fromTo(el, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.9, delay: i * 0.12, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" }
      });

      if (lineRefs.current[i]) {
        gsap.fromTo(lineRefs.current[i], { scaleX: 0 }, {
          scaleX: 1, duration: 1, delay: i * 0.12 + 0.3, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%" }
        });
      }
    });
  }, []);

  return (
    <section id="about" ref={containerRef} className="bg-[#080808] py-24 md:py-40 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-28 items-center">

        <div ref={imageRef} className="relative h-[55vh] md:h-[70vh] w-full" style={{ clipPath: "inset(0 100% 0 0)" }}>
          <div
            ref={curtainRef}
            className="absolute inset-0 bg-[#CC0000] z-10 origin-left"
          />
          <img
            src={photo1}
            alt="Dining at JRoyal"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#080808]/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#080808]/40" />

          <div className="absolute bottom-8 left-8 z-20">
            <p className="text-[#FFD700] font-serif italic text-lg mb-1">Est. Nsukka</p>
            <div className="h-px w-12 bg-[#FFD700]/50" />
          </div>
        </div>

        <div ref={contentRef} className="flex flex-col opacity-0">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-px bg-[#CC0000]" />
            <span className="text-[#CC0000] font-sans font-medium tracking-[0.35em] text-xs uppercase">Our Story</span>
          </div>

          <h2
            className="font-serif font-bold text-white mb-8 leading-[1.0]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)" }}
          >
            Born in Nsukka.<br />
            <span className="italic text-[#FFD700] font-light">Built for Royalty.</span>
          </h2>

          <p className="text-white/45 font-sans font-light leading-[1.9] mb-16 text-[0.95rem]">
            JRoyal Grills N Chops isn't just a restaurant — it's a statement. A fusion of
            Nigerian soul and premium grill culture. We take the fiery, unapologetic flavors
            of our roots and elevate them into a luxury experience. Every cut of meat, every
            blend of spice, every moment spent here is deliberate, weighted, and unforgettable.
          </p>

          <div className="grid grid-cols-2 gap-x-10 gap-y-10">
            {stats.map((stat, i) => (
              <div
                key={i}
                ref={(el) => { if (el) statRefs.current[i] = el; }}
                className="flex flex-col opacity-0"
              >
                <div className="flex items-end gap-1 mb-3">
                  <span
                    className="font-display text-white leading-none"
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
                  >
                    <span className="stat-num">0</span>
                    <span className="text-[#FFD700]">{stat.suffix}</span>
                  </span>
                </div>
                <div
                  ref={(el) => { if (el) lineRefs.current[i] = el; }}
                  className="w-14 h-px bg-[#FFD700] mb-3 origin-left"
                />
                <span className="text-white/35 font-sans text-xs uppercase tracking-[0.2em]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
