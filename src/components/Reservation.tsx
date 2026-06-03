import { useState, useRef, useEffect } from "react";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Reservation() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(leftRef.current, { opacity: 0, x: -60 }, {
      opacity: 1, x: 0, duration: 1.3, ease: "power4.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
    });
    gsap.fromTo(rightRef.current, { opacity: 0, x: 60 }, {
      opacity: 1, x: 0, duration: 1.3, ease: "power4.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Reservation Received",
        description: "We'll reach out shortly to confirm your table.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1600);
  };

  const inputClass =
    "w-full bg-white/5 border-b border-white/15 px-0 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#FFD700] transition-colors duration-400 font-sans text-sm tracking-wide bg-transparent";

  return (
    <section
      id="reservation"
      ref={sectionRef}
      className="relative py-28 md:py-44 bg-[#CC0000] overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px",
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-px bg-[#FFD700]/20" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28 items-start">

        <div ref={leftRef} className="opacity-0">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#FFD700]/60" />
            <span className="text-[#FFD700]/70 font-sans text-[10px] tracking-[0.4em] uppercase">Reserve Your Seat</span>
          </div>

          <h2
            className="font-serif font-bold text-white mb-8 leading-[0.92]"
            style={{ fontSize: "clamp(2.8rem, 6vw, 7rem)", letterSpacing: "-0.02em" }}
          >
            Ready to<br />
            Experience<br />
            <span className="italic font-light text-[#FFD700]">Royalty?</span>
          </h2>

          <p className="text-white/55 font-sans font-light text-base leading-relaxed mb-12 max-w-sm">
            Reserve your table or reach out directly. We're open 9am to 11pm daily — for dine-in, 
            take-out, and private celebrations.
          </p>

          <div className="flex flex-col gap-4">
            <a
              href="tel:09060922047"
              data-testid="button-call"
              className="flex items-center gap-4 border border-white/30 text-white px-8 py-4 hover:border-[#FFD700] hover:bg-[#FFD700]/10 transition-all duration-400 group w-full md:w-auto justify-center md:justify-start"
            >
              <Phone size={16} className="group-hover:text-[#FFD700] transition-colors" />
              <span className="font-sans font-medium text-sm tracking-[0.15em] uppercase">09060922047</span>
            </a>
            <a
              href="https://wa.me/2349060922047"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-whatsapp"
              className="flex items-center gap-4 bg-[#25D366] text-white px-8 py-4 hover:bg-[#1eb858] transition-colors duration-400 w-full md:w-auto justify-center md:justify-start"
            >
              <FaWhatsapp size={18} />
              <span className="font-sans font-medium text-sm tracking-[0.15em] uppercase">Order on WhatsApp</span>
            </a>
          </div>
        </div>

        <div ref={rightRef} className="opacity-0">
          <div className="border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12">
            <h3
              className="font-serif text-[#FFD700] mb-10 font-bold"
              style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}
            >
              Book a Table
            </h3>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    data-testid="input-name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    data-testid="input-phone"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <input
                    required
                    type="date"
                    data-testid="input-date"
                    className={`${inputClass} [color-scheme:dark]`}
                  />
                </div>
                <div>
                  <input
                    required
                    type="time"
                    data-testid="input-time"
                    className={`${inputClass} [color-scheme:dark]`}
                  />
                </div>
              </div>

              <div>
                <select
                  required
                  data-testid="select-party"
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="" disabled>Party Size</option>
                  {["1 Guest", "2 Guests", "3 Guests", "4 Guests", "5 Guests", "6+ Guests"].map((v) => (
                    <option key={v} value={v} className="bg-[#080808]">{v}</option>
                  ))}
                </select>
              </div>

              <div>
                <textarea
                  placeholder="Special Requests (optional)"
                  rows={3}
                  data-testid="textarea-request"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                data-testid="button-submit"
                whileHover={{ backgroundColor: "#080808", color: "#FFD700" } as never}
                transition={{ duration: 0.3 }}
                className="w-full bg-[#FFD700] text-black font-sans font-semibold uppercase tracking-[0.2em] py-4 text-xs transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Submit Reservation"}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
