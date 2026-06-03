import { useRef, useEffect, useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Phone, MapPin, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const hours = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
];

function getNigeriaHour(): number {
  const now = new Date();
  return (now.getUTCHours() + 1) % 24;
}

function isOpenNow(): boolean {
  const h = getNigeriaHour();
  return h >= 9 && h < 23;
}

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(isOpenNow);
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  useEffect(() => {
    const t = setInterval(() => setOpen(isOpenNow()), 60000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(leftRef.current, { opacity: 0, x: -50 }, {
      opacity: 1, x: 0, duration: 1.3, ease: "power4.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
    });
    gsap.fromTo(rightRef.current, { opacity: 0, x: 50 }, {
      opacity: 1, x: 0, duration: 1.3, ease: "power4.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
    });
  }, []);

  return (
    <section id="location" ref={sectionRef} className="py-28 md:py-44 bg-[#080808] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 mb-16 md:mb-20">
        <p className="text-[#FFD700] text-[10px] tracking-[0.45em] uppercase font-sans font-medium mb-4">
          Find Us
        </p>
        <h2
          className="font-serif font-bold text-white"
          style={{ fontSize: "clamp(2.5rem, 7vw, 7.5rem)", lineHeight: "0.92", letterSpacing: "-0.02em" }}
        >
          Come Visit<br />
          <span className="italic font-light text-[#FFD700]">Nsukka's Finest.</span>
        </h2>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">

        <div ref={leftRef} className="opacity-0 relative overflow-hidden" style={{ height: "clamp(360px, 55vh, 560px)" }}>
          <iframe
            title="JRoyal Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15841.488661661608!2d7.3941459!3d6.8654877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1044e9caab7c0e5b%3A0xc0d268d06d48a1c9!2sNsukka%20410001%2C%20Enugu%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.35) brightness(0.75)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            data-testid="google-map"
          />
          <div className="absolute inset-0 pointer-events-none border border-[#FFD700]/8" />
        </div>

        <div ref={rightRef} className="opacity-0 bg-[#0c0c0c] border border-white/6 p-8 md:p-10 flex flex-col gap-8">

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 border border-[#FFD700]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin size={13} className="text-[#FFD700]" />
            </div>
            <div>
              <p className="text-white/20 font-sans text-[9px] tracking-[0.4em] uppercase mb-2">Address</p>
              <p className="text-white/70 font-sans font-light text-sm leading-[1.9]">
                Opposite Shuttle Park, Behind Flat<br />
                Nsukka 410001, Enugu State, Nigeria
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 border border-[#FFD700]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Phone size={13} className="text-[#FFD700]" />
            </div>
            <div>
              <p className="text-white/20 font-sans text-[9px] tracking-[0.4em] uppercase mb-2">Contact</p>
              <a href="tel:09060922047" className="text-white/70 font-sans font-light text-sm hover:text-[#FFD700] transition-colors block mb-1">
                09060922047
              </a>
              <a
                href="https://instagram.com/jroyal_grills_n_chops"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 font-sans font-light text-xs hover:text-[#FFD700] transition-colors flex items-center gap-2"
              >
                <FaInstagram size={11} /> @jroyal_grills_n_chops
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 border border-[#FFD700]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Clock size={13} className="text-[#FFD700]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-5">
                <p className="text-white/20 font-sans text-[9px] tracking-[0.4em] uppercase">Hours</p>
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${open ? "bg-emerald-400 animate-pulse" : "bg-red-500"}`} />
                  <span className={`font-sans text-[10px] tracking-wider ${open ? "text-emerald-400" : "text-red-400"}`}>
                    {open ? "Open Now" : "Closed"}
                  </span>
                </div>
              </div>
              <div className="space-y-2.5">
                {hours.map((day) => (
                  <div
                    key={day}
                    className={`flex justify-between font-sans text-xs ${
                      day === today ? "text-[#FFD700]" : "text-white/25"
                    }`}
                  >
                    <span className={day === today ? "font-medium" : "font-light"}>{day}</span>
                    <span>9:00 AM – 11:00 PM</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/2349060922047"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="location-whatsapp"
            className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 hover:bg-[#1eb858] transition-colors font-sans font-medium text-xs uppercase tracking-[0.2em] mt-auto"
          >
            <FaWhatsapp size={16} /> Order via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
