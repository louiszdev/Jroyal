import { useRef, useEffect } from "react";
import logoPath from "@assets/lv_0_20260602212446-removebg-preview_1780433027895.png";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { label: "Our Story", href: "#about" },
  { label: "The Menu", href: "#menu" },
  { label: "Experience", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reserve a Table", href: "#reservation" },
  { label: "Find Us", href: "#location" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    gsap.fromTo(
      footerRef.current.querySelectorAll(".footer-col"),
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 85%" },
      }
    );
  }, []);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="bg-[#080808] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent" />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-16">

          <div className="footer-col opacity-0 flex flex-col">
            <img
              src={logoPath}
              alt="JRoyal Grills N Chops"
              className="h-20 w-auto object-contain self-start mb-6"
              style={{ filter: "drop-shadow(0 0 10px rgba(255,215,0,0.3))" }}
            />
            <p className="text-white/35 font-sans font-light leading-[1.85] text-sm max-w-xs">
              Nigerian royalty meets premium grill culture. Bold, fiery, and unapologetically
              luxurious. We don't just serve food — we serve an experience.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px w-8 bg-[#FFD700]/30" />
              <span className="text-white/20 font-sans text-[10px] tracking-[0.4em] uppercase">Eat · Drink · Vibe</span>
            </div>
          </div>

          <div className="footer-col opacity-0">
            <h4 className="font-serif text-white text-xl font-bold mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-white/35 hover:text-[#FFD700] font-sans font-light text-sm tracking-wide transition-colors duration-300 group flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-[#FFD700] group-hover:w-4 transition-all duration-400" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col opacity-0">
            <h4 className="font-serif text-white text-xl font-bold mb-8">Find Us</h4>
            <div className="space-y-4 text-white/35 font-sans font-light text-sm leading-relaxed mb-8">
              <p>Opposite Shuttle Park, Behind Flat<br />Nsukka 410001, Enugu State, Nigeria</p>
              <p>
                <a href="tel:09060922047" className="hover:text-[#FFD700] transition-colors">09060922047</a>
              </p>
              <p>Open Daily &mdash; 9am to 11pm</p>
            </div>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/jroyal_grills_n_chops"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-instagram"
                className="w-10 h-10 border border-white/12 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all duration-300"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="https://wa.me/2349060922047"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-whatsapp"
                className="w-10 h-10 border border-white/12 flex items-center justify-center text-white/40 hover:text-[#25D366] hover:border-[#25D366]/40 transition-all duration-300"
              >
                <FaWhatsapp size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/6 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/15 font-sans text-xs tracking-wide">
            &copy; 2025 JRoyal Grills N Chops. All Rights Reserved.
          </p>
          <p className="text-white/10 font-sans text-xs">
            Nsukka, Enugu State, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
