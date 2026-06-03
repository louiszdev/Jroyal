import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

export default function PreOrderModal() {
  const {
    items, removeItem, updateQty, clearCart,
    totalPrice, isOpen, setIsOpen,
  } = useCart();
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");

  const handleSendOrder = () => {
    if (!name.trim() || !time.trim() || items.length === 0) return;

    const orderLines = items
      .map((i) => `• ${i.name} x${i.quantity} — ${i.price}`)
      .join("\n");

    const message = [
      `🍖 *NEW PRE-ORDER — JRoyal Grills N Chops*`,
      ``,
      `👤 *Name:* ${name}`,
      `⏰ *Pickup Time:* ${time}`,
      ``,
      `📋 *Order:*`,
      orderLines,
      ``,
      `💰 *Total:* ₦${totalPrice.toLocaleString()}`,
      note.trim() ? `\n📝 *Note:* ${note}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/2349060922047?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    clearCart();
    setIsOpen(false);
    setName("");
    setTime("");
    setNote("");
  };

  const canSend = name.trim() && time.trim() && items.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[300] bg-black/75 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[301] w-full max-w-md bg-[#0c0c0c] border-l border-white/8 flex flex-col"
          >
            <div className="flex items-center justify-between px-7 py-5 border-b border-white/6">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <ShoppingBag size={13} className="text-[#FFD700]" />
                  <span className="text-[#FFD700] text-[9px] tracking-[0.4em] uppercase font-sans font-medium">
                    Your Order
                  </span>
                </div>
                <h3 className="font-serif text-white text-xl font-bold">
                  Pre-Order via WhatsApp
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
              >
                <X size={15} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-7 py-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center pt-16">
                  <div className="w-16 h-16 border border-white/8 flex items-center justify-center">
                    <ShoppingBag size={22} className="text-white/15" />
                  </div>
                  <p className="text-white/30 font-sans text-sm leading-relaxed">
                    Your order is empty.<br />Add items from the menu.
                  </p>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setTimeout(() =>
                        document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" }), 300
                      );
                    }}
                    className="text-[#FFD700] font-sans text-[10px] uppercase tracking-[0.3em] border-b border-[#FFD700]/30 pb-0.5 hover:border-[#FFD700] transition-colors"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    {items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center gap-3 py-4 border-b border-white/5"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-serif text-base font-semibold truncate mb-0.5">
                            {item.name}
                          </p>
                          <p className="text-[#FFD700] font-display text-sm">
                            {item.price}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => updateQty(item.name, item.quantity - 1)}
                            className="w-7 h-7 border border-white/12 flex items-center justify-center text-white/45 hover:text-white hover:border-white/35 transition-all"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="text-white font-sans text-sm w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.name, item.quantity + 1)}
                            className="w-7 h-7 border border-white/12 flex items-center justify-center text-white/45 hover:text-white hover:border-white/35 transition-all"
                          >
                            <Plus size={11} />
                          </button>
                          <button
                            onClick={() => removeItem(item.name)}
                            className="w-7 h-7 ml-0.5 flex items-center justify-center text-white/20 hover:text-[#CC0000] transition-colors"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center justify-between pt-4 pb-2">
                      <span className="text-white/30 font-sans text-xs uppercase tracking-[0.2em]">
                        Total
                      </span>
                      <span className="font-display text-[#FFD700]" style={{ fontSize: "1.6rem" }}>
                        ₦{totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-white/6 pt-6 space-y-5">
                    <p className="text-white/35 font-sans text-[10px] tracking-[0.35em] uppercase">
                      Your Details
                    </p>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name *"
                      className="w-full bg-transparent border-b border-white/12 pb-2.5 text-white placeholder-white/22 focus:outline-none focus:border-[#FFD700] transition-colors font-sans text-sm"
                    />
                    <input
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="Pickup Time — e.g. Today 7pm *"
                      className="w-full bg-transparent border-b border-white/12 pb-2.5 text-white placeholder-white/22 focus:outline-none focus:border-[#FFD700] transition-colors font-sans text-sm"
                    />
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Special instructions (optional)"
                      rows={2}
                      className="w-full bg-transparent border-b border-white/12 pb-2 text-white placeholder-white/22 focus:outline-none focus:border-[#FFD700] transition-colors font-sans text-sm resize-none"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="px-7 py-5 border-t border-white/6 space-y-2.5">
              <button
                onClick={handleSendOrder}
                disabled={!canSend}
                className={`w-full flex items-center justify-center gap-3 py-4 font-sans font-semibold uppercase tracking-[0.18em] text-xs transition-all duration-300 ${
                  canSend
                    ? "bg-[#25D366] text-white hover:bg-[#1dbd5a]"
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                }`}
              >
                <FaWhatsapp size={17} />
                Send Order on WhatsApp
              </button>
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="w-full text-center text-white/18 font-sans text-[10px] uppercase tracking-[0.3em] hover:text-white/35 transition-colors py-1"
                >
                  Clear Order
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
