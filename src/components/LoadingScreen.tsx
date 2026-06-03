import { useEffect, useRef } from "react";
import gsap from "gsap";
import logoPath from "@assets/lv_0_20260602212446-removebg-preview_1780433027895.png";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const line = lineRef.current;
    const tagline = taglineRef.current;
    const glow = glowRef.current;
    if (!overlay || !logo || !line || !tagline || !glow) return;

    gsap.set(logo, { scale: 0.04, opacity: 0, filter: "blur(40px)" });
    gsap.set([line, tagline], { opacity: 0, y: 8 });
    gsap.set(glow, { opacity: 0, scale: 0.5 });
    gsap.set(overlay, { clipPath: "inset(0 0 0% 0)" });

    const tl = gsap.timeline({
      onComplete: () => onCompleteRef.current(),
    });

    tl
      // Glow pulses in from center
      .to(glow, {
        opacity: 1,
        scale: 1.4,
        duration: 1.0,
        ease: "power2.out",
      })
      // Logo grows in from tiny — smooth power curve
      .to(
        logo,
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "expo.out",
        },
        "-=0.7"
      )
      // Tagline line grows
      .to(
        line,
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      )
      .to(
        tagline,
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      )
      // Hold
      .to({}, { duration: 0.55 })
      // Logo ZOOMS forward — grows to fill entire screen, glow explodes
      .to(glow, { opacity: 0, duration: 0.4, ease: "power2.in" })
      .to(
        [line, tagline],
        { opacity: 0, duration: 0.25, ease: "power2.in" },
        "<"
      )
      .to(logo, {
        scale: 35,
        opacity: 0,
        filter: "blur(60px)",
        duration: 0.85,
        ease: "power3.in",
      })
      // Overlay wipes up to reveal hero beneath
      .to(
        overlay,
        {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.9,
          ease: "power4.inOut",
        },
        "-=0.25"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] bg-[#080808] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient glow behind logo */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(255,180,0,0.12) 0%, rgba(204,0,0,0.06) 40%, transparent 70%)",
          transform: "scale(0.5)",
          opacity: 0,
        }}
      />

      <div className="relative flex flex-col items-center z-10">
        <img
          ref={logoRef}
          src={logoPath}
          alt="JRoyal Grills N Chops"
          className="w-52 md:w-72 object-contain"
          style={{
            filter:
              "drop-shadow(0 0 50px rgba(255,215,0,0.7)) drop-shadow(0 0 120px rgba(255,140,0,0.3))",
            willChange: "transform, opacity, filter",
          }}
        />

        <div
          ref={lineRef}
          className="mt-8 h-px w-52 origin-center"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,215,0,0.8), transparent)",
          }}
        />

        <p
          ref={taglineRef}
          className="mt-4 text-[9px] tracking-[0.6em] uppercase text-white/35 font-sans"
        >
          Eat &middot; Drink &middot; Vibe
        </p>
      </div>
    </div>
  );
}
