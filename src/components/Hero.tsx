import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroVideo1 from "@assets/Jroyals_Location_1780433079080.mp4";
import heroVideo2 from "@assets/Coconut_Rice_paired_with_Peppered_Chicken_To_order,_send_a_mes_1780433097683.mp4";
import heroVideo3 from "@assets/Welcome_to_Our_Fine_Dining.Experience_not_just_exquisite_food__1780433128349.mp4";
import heroVideo4 from "@assets/Good_food_from_the_best_restaurant_in_Nsukka_Stir_fry_spaghett_1780433147875.mp4";

gsap.registerPlugin(ScrollTrigger);

const videos = [heroVideo1, heroVideo2, heroVideo3, heroVideo4];

interface Particle {
  x: number; y: number; size: number;
  vx: number; vy: number; alpha: number;
  color: string; wobble: number; wobbleSpeed: number;
}

export default function Hero() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.2 });
    tl.fromTo(badgeRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
      .fromTo(
        titleRef.current?.querySelectorAll(".word") ?? [],
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.4, stagger: 0.12, ease: "power4.out" },
        "-=0.4"
      )
      .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.6")
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.6")
      .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.4");
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = [
      "255,140,0", "255,180,0", "255,215,0", "255,100,30", "255,255,180"
    ];

    const particles: Particle[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * canvas.height * 0.5,
      size: Math.random() * 3.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -(Math.random() * 1.6 + 0.6),
      alpha: Math.random() * 0.7 + 0.15,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.04 + 0.01,
    }));

    let frame: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * 0.4;
        p.y += p.vy;
        p.alpha -= 0.003;

        if (p.y < -20 || p.alpha <= 0) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
          p.alpha = Math.random() * 0.7 + 0.2;
          p.size = Math.random() * 3.5 + 0.5;
          p.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        }

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        gradient.addColorStop(0, `rgba(${p.color},${p.alpha})`);
        gradient.addColorStop(1, `rgba(${p.color},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,220,${p.alpha * 0.9})`;
        ctx.fill();
      }
      frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full h-[100dvh] overflow-hidden bg-black flex flex-col items-center justify-center"
    >
      {videos.map((vid, idx) => (
        <video
          key={idx}
          src={vid}
          autoPlay muted loop playsInline
          preload={idx === 0 ? "auto" : "none"}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1800ms] ease-in-out ${
            idx === currentVideo ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 z-10"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.65) 60%, rgba(8,8,8,0.95) 100%)",
        }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/60" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      />

      <div className="relative z-30 flex flex-col items-center text-center px-6 max-w-6xl w-full">

        <div ref={badgeRef} className="opacity-0 mb-8 md:mb-10 flex items-center gap-3">
          <div className="h-px w-12 bg-[#FFD700]/60" />
          <span className="text-[#FFD700] text-[10px] md:text-xs font-sans font-medium tracking-[0.35em] uppercase">
            Nsukka's No.1 Premium Grill Experience
          </span>
          <div className="h-px w-12 bg-[#FFD700]/60" />
        </div>

        <h1
          ref={titleRef}
          className="font-serif font-bold text-white uppercase mb-6 md:mb-8 overflow-hidden"
          style={{
            fontSize: "clamp(3.5rem, 12vw, 13rem)",
            lineHeight: "0.88",
            letterSpacing: "-0.02em",
            textShadow: "0 0 80px rgba(255,215,0,0.12), 0 0 160px rgba(255,100,0,0.08)",
          }}
        >
          <div className="overflow-hidden"><span className="word inline-block">Where</span></div>
          <div className="overflow-hidden flex flex-wrap justify-center gap-x-6">
            <span className="word inline-block">Fire</span>
            <span className="word inline-block italic text-[#FFD700]" style={{ textShadow: "0 0 60px rgba(255,215,0,0.5)" }}>
              Meets
            </span>
          </div>
          <div className="overflow-hidden"><span className="word inline-block">Royalty</span></div>
        </h1>

        <p
          ref={subtitleRef}
          className="opacity-0 text-white/60 font-sans font-light mb-10 md:mb-14 tracking-[0.18em] uppercase text-xs md:text-sm"
        >
          Eat &nbsp;·&nbsp; Drink &nbsp;·&nbsp; Vibe &nbsp;—&nbsp; 9am to 11pm Daily
        </p>

        <div ref={ctaRef} className="opacity-0 flex flex-col sm:flex-row gap-4 md:gap-6">
          <button
            onClick={() => document.querySelector("#reservation")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="button-reserve"
            className="px-10 md:px-14 py-4 md:py-5 bg-[#FFD700] text-black font-sans font-semibold uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors duration-500 relative overflow-hidden group"
          >
            <span className="relative z-10">Reserve a Table</span>
            <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          </button>
          <button
            onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="button-menu"
            className="px-10 md:px-14 py-4 md:py-5 border border-white/40 text-white font-sans font-medium uppercase tracking-[0.2em] text-xs hover:border-[#FFD700] hover:text-[#FFD700] transition-all duration-500"
          >
            Explore the Menu
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
        <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase font-sans">Scroll</span>
        <div className="w-px h-14 bg-gradient-to-b from-[#FFD700]/60 to-transparent animate-pulse" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 h-32 bg-gradient-to-t from-[#080808] to-transparent" />
    </section>
  );
}
