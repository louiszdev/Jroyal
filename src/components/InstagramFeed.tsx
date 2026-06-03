import { useRef, useEffect } from "react";
import { FaInstagram, FaHeart } from "react-icons/fa";
import { MessageCircle, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import reel1 from "../assets/reel1.mp4";
import reel2 from "../assets/reel2.mp4";
import reel3 from "../assets/reel3.mp4";

gsap.registerPlugin(ScrollTrigger);

const reels = [
  {
    src: reel1,
    likes: "2.4k",
    comments: "91",
    label: "Coming Soon — Cafe by JRoyal",
    caption: "Something big is coming to Hilltop, Nsukka. Stay tuned 👑",
  },
  {
    src: reel2,
    likes: "3.1k",
    comments: "118",
    label: "Waffle Sandwiches & Milkshakes",
    caption: "Heavenly bites you won't find anywhere else in Nsukka ✨😍",
  },
  {
    src: reel3,
    likes: "4.7k",
    comments: "204",
    label: "The Crowd",
    caption: "Why are you not here? We are open all night 🥳🔥",
  },
];

function ReelCard({
  reel,
  index,
}: {
  reel: (typeof reels)[0];
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const card = cardRef.current;
    if (!video || !card) return;

    // Only play when in viewport — saves CPU + bandwidth
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="ig-reel relative overflow-hidden opacity-0 group cursor-pointer"
      style={{ aspectRatio: "9/16" }}
      onClick={() =>
        window.open("https://instagram.com/jroyal_grills_n_chops", "_blank")
      }
    >
      <video
        ref={videoRef}
        src={reel.src}
        muted
        loop
        playsInline
        preload="none"
        className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-400"
        style={{
          background:
            "linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.3) 45%, rgba(8,8,8,0.1) 100%)",
        }}
      />

      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-[#FFD700] to-[#CC0000] flex items-center justify-center">
            <FaInstagram size={13} className="text-white" />
          </div>
          <span className="text-white/80 font-sans text-[10px] tracking-wide">
            jroyal_grills_n_chops
          </span>
        </div>
        <div className="w-6 h-6 border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Play size={10} className="text-white fill-white ml-0.5" />
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-white font-serif font-semibold leading-snug mb-2"
          style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)" }}>
          {reel.label}
        </p>
        <p className="text-white/55 font-sans text-[11px] leading-snug mb-4 line-clamp-2">
          {reel.caption}
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-white/70">
            <FaHeart size={13} className="text-[#FF4466]" />
            <span className="font-sans text-xs font-semibold">{reel.likes}</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/70">
            <MessageCircle size={13} />
            <span className="font-sans text-xs font-semibold">{reel.comments}</span>
          </div>
        </div>
      </div>

      {/* Reel number badge */}
      <div className="absolute top-14 right-4 font-display text-white/8 leading-none select-none pointer-events-none"
        style={{ fontSize: "4rem" }}>
        0{index + 1}
      </div>
    </div>
  );
}

export default function InstagramFeed() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const reelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    gsap.fromTo(
      headerRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
      }
    );

    if (reelsRef.current) {
      const cards = reelsRef.current.querySelectorAll(".ig-reel");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: reelsRef.current, start: "top 75%" },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="instagram"
      className="py-24 md:py-36 bg-[#060606] relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.025) 0%, transparent 55%)",
        }}
      />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-4 opacity-0">
              <FaInstagram size={15} className="text-[#FFD700]" />
              <span className="text-[#FFD700] text-[10px] tracking-[0.45em] uppercase font-sans font-medium">
                @jroyal_grills_n_chops
              </span>
            </div>
            <h2
              className="font-serif font-bold text-white leading-[0.92] opacity-0"
              style={{
                fontSize: "clamp(2.4rem, 6vw, 7rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Watch the<br />
              <span className="italic font-light text-[#FFD700]">Royalty.</span>
            </h2>
          </div>

          <div className="opacity-0 flex flex-col gap-4 items-start md:items-end">
            <p className="text-white/22 font-sans text-xs tracking-wider uppercase max-w-xs leading-relaxed text-left md:text-right">
              Real moments. Real vibes.<br />
              Follow us for daily content.
            </p>
            <a
              href="https://instagram.com/jroyal_grills_n_chops"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-7 py-3.5 border border-white/12 text-white/50 font-sans font-medium uppercase tracking-[0.18em] text-[10px] hover:border-[#FFD700] hover:text-[#FFD700] transition-all duration-400 group"
            >
              <FaInstagram
                size={13}
                className="group-hover:scale-110 transition-transform duration-300"
              />
              Follow on Instagram
            </a>
          </div>
        </div>

        {/* Reels grid — 3 vertical 9:16 cards */}
        <div
          ref={reelsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4"
        >
          {reels.map((reel, idx) => (
            <ReelCard key={idx} reel={reel} index={idx} />
          ))}
        </div>

        {/* CTA footer */}
        <div className="mt-10 md:mt-14 flex items-center justify-center gap-6">
          <div className="h-px flex-1 bg-white/5 max-w-[160px]" />
          <a
            href="https://instagram.com/jroyal_grills_n_chops"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-white/22 font-sans text-[10px] uppercase tracking-[0.3em] hover:text-[#FFD700] transition-colors duration-400 group"
          >
            <FaInstagram size={11} />
            @jroyal_grills_n_chops
          </a>
          <div className="h-px flex-1 bg-white/5 max-w-[160px]" />
        </div>
      </div>
    </section>
  );
}
