import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "@/context/CartContext";

import photo2 from "@assets/IMG-20260602-WA0043_1780433258003.jpg";
import photo3 from "@assets/IMG-20260602-WA0044_1780433258029.jpg";
import photo4 from "@assets/Screenshot_20260602-202734_1780433258057.png";
import photo5 from "@assets/Screenshot_20260602-202333_1780433258081.png";
import photo6 from "@assets/Screenshot_20260602-202304_1780433258100.png";
import photo8 from "@assets/Screenshot_20260602-202751_1780433258137.png";

gsap.registerPlugin(ScrollTrigger);

const menuData = {
  Grills: [
    { name: "Peppered Chicken", desc: "Spiced overnight, char-grilled over open flame. The signature.", price: "₦2,500", priceNum: 2500, img: photo2 },
    { name: "Suya Platter", desc: "Premium beef skewers with traditional Yaji and fresh onions.", price: "₦2,800", priceNum: 2800, img: photo6 },
  ],
  Chops: [
    { name: "Grilled Catfish", desc: "Whole catfish, slow-grilled, served with our rich pepper sauce.", price: "₦3,000", priceNum: 3000, img: photo3 },
    { name: "Jollof Rice + Fish", desc: "Smoky party jollof, boiled egg, and your choice of protein.", price: "₦2,200", priceNum: 2200, img: photo3 },
  ],
  Combos: [
    { name: "Fufu + Egusi", desc: "Authentic swallow with rich melon soup, assorted meat.", price: "₦1,800", priceNum: 1800, img: photo4 },
    { name: "Burger + Wings + Fries", desc: "Gourmet beef patty, crispy wings, seasoned fries. The full deal.", price: "₦2,500", priceNum: 2500, img: photo5 },
  ],
  Drinks: [
    { name: "Royal Cocktails", desc: "Crafted in-house. Bold, balanced, unforgettable.", price: "₦1,500", priceNum: 1500, img: photo8 },
    { name: "Chapman", desc: "The classic Nigerian mocktail, chilled and refreshed.", price: "₦800", priceNum: 800, img: photo8 },
  ],
  Specials: [
    { name: "Royal Special Platter", desc: "Everything on the grill. The ultimate feast for the bold.", price: "₦5,500", priceNum: 5500, img: photo6 },
  ],
};

type TabKey = keyof typeof menuData;
const tabs: TabKey[] = ["Grills", "Chops", "Combos", "Drinks", "Specials"];

function AddButton({ item }: { item: { name: string; price: string; priceNum: number } }) {
  const { addItem, setIsOpen, items } = useCart();
  const inCart = items.some((i) => i.name === item.name);
  const [flash, setFlash] = useState(false);

  const handleAdd = () => {
    addItem({ name: item.name, price: item.price, priceNum: item.priceNum });
    setFlash(true);
    setTimeout(() => setFlash(false), 1400);
  };

  return (
    <button
      onClick={handleAdd}
      data-testid={`add-to-order-${item.name}`}
      className={`flex items-center gap-2 px-4 py-2 font-sans font-semibold uppercase tracking-[0.18em] text-[10px] transition-all duration-400 ${
        flash
          ? "bg-[#FFD700] text-black"
          : inCart
          ? "bg-white/8 text-[#FFD700] border border-[#FFD700]/30"
          : "bg-white/5 text-white/50 border border-white/10 hover:bg-[#FFD700] hover:text-black hover:border-[#FFD700]"
      }`}
    >
      {flash ? <Check size={11} /> : <Plus size={11} />}
      {flash ? "Added!" : inCart ? "In Order" : "Add to Order"}
    </button>
  );
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState<TabKey>("Grills");
  const headerRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { totalCount, setIsOpen } = useCart();

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      }
    );
  }, []);

  return (
    <section id="menu" ref={sectionRef} className="py-24 md:py-36 bg-[#080808] min-h-screen">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 flex flex-col items-center">

        <div className="text-center mb-14 md:mb-20 w-full">
          <p className="text-[#CC0000] text-[10px] tracking-[0.45em] uppercase font-sans font-medium mb-5">
            Curated for Royalty
          </p>
          <h2
            ref={headerRef}
            className="shimmer-gold font-serif font-bold uppercase opacity-0"
            style={{ fontSize: "clamp(3rem, 9vw, 10rem)", lineHeight: "0.92", letterSpacing: "-0.02em" }}
          >
            The Royal Menu
          </h2>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-4 mb-12 w-full border-b border-white/8 pb-0">
          <div className="flex flex-wrap gap-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                data-testid={`tab-${tab.toLowerCase()}`}
                className={`relative px-5 md:px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                  activeTab === tab ? "text-[#FFD700]" : "text-white/35 hover:text-white/70"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="menuUnderline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#FFD700]"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>

          {totalCount > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-3 px-5 py-2.5 bg-[#FFD700] text-black font-sans font-semibold uppercase tracking-[0.18em] text-[10px] hover:bg-white transition-colors duration-300"
            >
              <span className="w-5 h-5 bg-black/20 rounded-sm flex items-center justify-center text-[9px] font-bold">
                {totalCount}
              </span>
              View Order
            </motion.button>
          )}
        </div>

        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
            >
              {menuData[activeTab].map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  data-testid={`menu-card-${idx}`}
                  className="group relative bg-[#111] border border-white/5 overflow-hidden hover:border-[#FFD700]/20 transition-all duration-700"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,215,0,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                  </div>

                  <div className="p-6 md:p-7">
                    <h3
                      className="font-serif text-white font-bold mb-2 leading-tight"
                      style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)" }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-white/32 font-sans font-light text-sm leading-relaxed mb-5">
                      {item.desc}
                    </p>

                    <div className="flex items-end justify-between gap-3">
                      <span
                        className="font-display text-[#FFD700] tracking-wider"
                        style={{ fontSize: "1.5rem" }}
                      >
                        {item.price}
                      </span>
                      <AddButton item={item} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.a
          href="https://wa.me/2349060922047"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="full-menu-cta"
          className="mt-14 md:mt-20 flex items-center gap-6 group"
          whileHover={{ gap: "2.5rem" } as never}
          transition={{ duration: 0.4 }}
        >
          <span className="text-white/28 font-sans text-xs uppercase tracking-[0.3em] group-hover:text-white/55 transition-colors">
            Full menu via WhatsApp
          </span>
          <div className="h-px w-20 bg-[#FFD700]/30 group-hover:w-36 transition-all duration-500 group-hover:bg-[#FFD700]" />
        </motion.a>
      </div>
    </section>
  );
}
