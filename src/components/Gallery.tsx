import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import photo1 from "@assets/Screenshot_20260602-203751_1780433257973.png";
import photo2 from "@assets/IMG-20260602-WA0043_1780433258003.jpg";
import photo3 from "@assets/IMG-20260602-WA0044_1780433258029.jpg";
import photo4 from "@assets/Screenshot_20260602-202734_1780433258057.png";
import photo5 from "@assets/Screenshot_20260602-202333_1780433258081.png";
import photo6 from "@assets/Screenshot_20260602-202304_1780433258100.png";
import photo7 from "@assets/Screenshot_20260602-202405_1780433258118.png";
import photo8 from "@assets/Screenshot_20260602-202751_1780433258137.png";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  { src: photo6, span: "col-span-1 row-span-2", label: "Flame Grilled" },
  { src: photo2, span: "col-span-1 row-span-1", label: "Peppered Chicken" },
  { src: photo7, span: "col-span-1 row-span-1", label: "Brand Moments" },
  { src: photo3, span: "col-span-2 row-span-1", label: "Jollof & Catfish" },
  { src: photo1, span: "col-span-1 row-span-2", label: "The Atmosphere" },
  { src: photo5, span: "col-span-1 row-span-1", label: "The Combo" },
  { src: photo4, span: "col-span-1 row-span-1", label: "Fufu & Egusi" },
  { src: photo8, span: "col-span-2 row-span-1", label: "Bar Vibes" },
];

export default function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.1, stagger: 0.14, ease: "power4.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
      }
    );

    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll(".gallery-item");
      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.92, y: 30 },
        {
          opacity: 1, scale: 1, y: 0, duration: 0.9, stagger: 0.07, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 75%" },
        }
      );
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === "ArrowRight") setSelectedIdx((p) => (p! + 1) % photos.length);
      if (e.key === "ArrowLeft") setSelectedIdx((p) => (p! - 1 + photos.length) % photos.length);
      if (e.key === "Escape") setSelectedIdx(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIdx]);

  return (
    <section id="gallery" ref={sectionRef} className="py-28 md:py-44 bg-[#080808]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">

        <div ref={headerRef} className="mb-14 md:mb-20">
          <p className="text-[#FFD700] text-[10px] tracking-[0.45em] uppercase font-sans font-medium mb-4 opacity-0">
            Our World
          </p>
          <h2
            className="font-serif font-bold text-white opacity-0"
            style={{ fontSize: "clamp(2.5rem, 7vw, 8rem)", lineHeight: "0.9", letterSpacing: "-0.025em" }}
          >
            Moments at<br />
            <span className="italic font-light text-[#FFD700]">JRoyal</span>
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[180px] md:auto-rows-[220px]"
        >
          {photos.map((photo, idx) => (
            <div
              key={idx}
              className={`gallery-item relative overflow-hidden group cursor-pointer opacity-0 ${photo.span}`}
              onClick={() => setSelectedIdx(idx)}
              data-testid={`gallery-item-${idx}`}
            >
              <img
                src={photo.src}
                alt={photo.label}
                className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[1200ms] ease-out"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <div
                  className="w-10 h-10 border border-[#FFD700] flex items-center justify-center mb-3"
                  style={{ boxShadow: "0 0 20px rgba(255,215,0,0.3)" }}
                >
                  <span className="text-[#FFD700] text-xl leading-none">+</span>
                </div>
                <p className="text-white font-sans text-[10px] tracking-[0.25em] uppercase">{photo.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[200] bg-black/97 flex items-center justify-center backdrop-blur-md"
            onClick={() => setSelectedIdx(null)}
          >
            <button
              data-testid="lightbox-close"
              className="absolute top-6 right-6 z-10 w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:border-[#FFD700] hover:text-[#FFD700] transition-colors"
              onClick={() => setSelectedIdx(null)}
            >
              <X size={18} />
            </button>
            <button
              data-testid="lightbox-prev"
              className="absolute left-4 md:left-8 z-10 w-12 h-12 border border-white/15 flex items-center justify-center text-white hover:border-[#FFD700] hover:text-[#FFD700] transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelectedIdx((p) => (p! - 1 + photos.length) % photos.length); }}
            >
              <ChevronLeft size={20} />
            </button>

            <motion.img
              key={selectedIdx}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              src={photos[selectedIdx].src}
              alt={photos[selectedIdx].label}
              className="max-h-[88vh] max-w-[86vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              data-testid="lightbox-next"
              className="absolute right-4 md:right-8 z-10 w-12 h-12 border border-white/15 flex items-center justify-center text-white hover:border-[#FFD700] hover:text-[#FFD700] transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelectedIdx((p) => (p! + 1) % photos.length); }}
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 font-sans text-xs tracking-[0.3em] uppercase">
              {selectedIdx + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
