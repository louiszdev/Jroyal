import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BrandStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  const text = "We don't just serve food. We serve an experience that stays with you long after the last bite.";
  const highlighted = ["experience", "stays", "last"];

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 65%",
      },
    });

    tl.fromTo(
      numberRef.current,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 1.4, ease: "power4.out" }
    ).fromTo(
      wordsRef.current,
      { y: "120%", opacity: 0, rotateZ: 3 },
      {
        y: "0%",
        opacity: 1,
        rotateZ: 0,
        duration: 1.1,
        stagger: 0.055,
        ease: "power4.out",
      },
      "-=1"
    ).fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.4, ease: "expo.inOut" },
      "-=0.4"
    );
  }, []);

  const words = text.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative py-36 md:py-56 bg-[#080808] flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      <div
        ref={numberRef}
        className="absolute left-6 md:left-16 top-1/2 -translate-y-1/2 font-display text-[18vw] text-white/[0.025] leading-none select-none pointer-events-none"
        style={{ letterSpacing: "-0.05em" }}
      >
        JR
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="overflow-hidden mb-4">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#CC0000] font-sans font-medium">
            Our Promise
          </p>
        </div>

        <h2
          className="font-serif font-bold text-white leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 5vw, 5.5rem)" }}
        >
          {words.map((word, i) => {
            const isHighlighted = highlighted.some((h) => word.toLowerCase().includes(h));
            return (
              <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.35em] mb-1">
                <span
                  ref={(el) => { if (el) wordsRef.current[i] = el; }}
                  className={`inline-block ${isHighlighted ? "italic text-[#FFD700]" : ""}`}
                >
                  {word}
                </span>
              </span>
            );
          })}
        </h2>

        <div className="mt-16 flex items-center gap-6">
          <div
            ref={lineRef}
            className="h-px bg-gradient-to-r from-[#FFD700] via-[#FFD700]/60 to-transparent flex-1 max-w-xs origin-left"
          />
          <span className="text-white/20 font-serif italic text-lg">JRoyal</span>
        </div>
      </div>
    </section>
  );
}
