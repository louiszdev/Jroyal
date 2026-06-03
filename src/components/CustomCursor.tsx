import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let isHovering = false;
    let frame: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }

      const target = e.target as HTMLElement;
      const hov =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        !!target.closest("button") ||
        !!target.closest("a");

      if (hov !== isHovering) {
        isHovering = hov;
        if (dotRef.current) {
          dotRef.current.style.opacity = hov ? "0" : "1";
          dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(${hov ? 0 : 1})`;
        }
        if (ringRef.current) {
          ringRef.current.style.width = hov ? "60px" : "36px";
          ringRef.current.style.height = hov ? "60px" : "36px";
          ringRef.current.style.borderColor = hov ? "#FFD700" : "rgba(255,215,0,0.35)";
          ringRef.current.style.backgroundColor = hov ? "rgba(255,215,0,0.08)" : "transparent";
        }
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.1);
      ringY = lerp(ringY, mouseY, 0.1);
      if (ringRef.current) {
        const w = parseInt(ringRef.current.style.width || "36");
        const h = parseInt(ringRef.current.style.height || "36");
        ringRef.current.style.transform = `translate(${ringX - w / 2}px, ${ringY - h / 2}px)`;
      }
      frame = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#FFD700",
          boxShadow: "0 0 10px rgba(255,215,0,0.8), 0 0 20px rgba(255,215,0,0.4)",
          transition: "opacity 0.2s, transform 0.05s linear",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(255,215,0,0.35)",
          transition: "width 0.4s cubic-bezier(0.16,1,0.3,1), height 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, background-color 0.3s",
          willChange: "transform",
        }}
      />
    </>
  );
}
