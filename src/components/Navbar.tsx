import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoPath from "@assets/lv_0_20260602212446-removebg-preview_1780433027895.png";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Story", href: "#about" },
    { name: "Menu", href: "#menu" },
    { name: "Experience", href: "#experience" },
    { name: "Gallery", href: "#gallery" },
    { name: "Reserve", href: "#reservation" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-[#080808]/96 backdrop-blur-xl border-b border-[#FFD700]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 h-20 md:h-24 flex items-center justify-between">

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 group"
          data-testid="logo-home"
        >
          <img
            src={logoPath}
            alt="JRoyal Grills N Chops"
            className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_12px_rgba(255,215,0,0.4)] group-hover:drop-shadow-[0_0_20px_rgba(255,215,0,0.65)] transition-all duration-500"
          />
        </button>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.slice(0, 4).map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              data-testid={`nav-link-${link.name.toLowerCase()}`}
              className="relative text-xs uppercase tracking-[0.2em] font-sans font-medium text-white/70 hover:text-white transition-colors duration-300 group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#FFD700] group-hover:w-full transition-all duration-500" />
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#reservation")}
            data-testid="nav-reserve"
            className="text-xs uppercase tracking-[0.2em] font-sans font-semibold border border-[#FFD700] text-[#FFD700] px-7 py-2.5 hover:bg-[#FFD700] hover:text-black transition-all duration-300"
          >
            Reserve
          </button>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.77, 0, 0.175, 1] }}
            className="md:hidden bg-[#080808]/98 backdrop-blur-xl border-b border-[#FFD700]/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-2xl font-serif text-white/80 hover:text-[#FFD700] transition-colors text-left tracking-wide"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
