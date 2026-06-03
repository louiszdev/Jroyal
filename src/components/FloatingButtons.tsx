import { FaWhatsapp } from "react-icons/fa";
import { ShoppingBag, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { totalCount, setIsOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-3">
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-testid="button-back-to-top"
            className="w-10 h-10 border border-white/15 bg-[#080808]/80 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-[#FFD700] hover:border-[#FFD700]/40 transition-all duration-300"
          >
            <ArrowUp size={15} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {totalCount > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsOpen(true)}
            data-testid="button-cart-float"
            className="relative w-12 h-12 bg-[#FFD700] flex items-center justify-center text-black hover:bg-white transition-colors duration-300"
          >
            <ShoppingBag size={19} />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#CC0000] text-white text-[10px] font-sans font-bold flex items-center justify-center rounded-sm">
              {totalCount}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href="https://wa.me/2349060922047"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="button-whatsapp-float"
        className="relative w-14 h-14 bg-[#25D366] flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
        style={{ boxShadow: "0 0 0 0 rgba(37,211,102,0.6)" }}
      >
        <span className="absolute inset-0 animate-ping bg-[#25D366] opacity-20 rounded-sm" />
        <FaWhatsapp size={26} className="relative z-10" />
      </a>
    </div>
  );
}
