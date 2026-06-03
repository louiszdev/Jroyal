import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import photo2 from "@assets/IMG-20260602-WA0043_1780433258003.jpg";
import photo6 from "@assets/Screenshot_20260602-202304_1780433258100.png";
import { useCart } from "@/context/CartContext";

gsap.registerPlugin(ScrollTrigger);

const dishes = [
  {
    name: "Peppered Chicken",
    tagline: "The Signature. The Legend.",
    desc: "Spiced overnight in traditional herbs, char-grilled over open flame until the skin blisters and the aroma travels. Nothing else like it in Nsukka.",
    price: "₦2,500",
    priceNum: 2500,
    img: photo2,
    accent: "#FFD700",
  },
  {
    name: "Suya Platter",
    tagline: "Street royalty. Premium cut.",
    desc: "Premium beef skewers coated in Yaji spice blend, grilled to perfection, served with fresh sliced onions and tomatoes. Built for sharing.",
    price: "₦2,800",
    priceNum: 2800,
    img: photo6,
    accent: "#CC0000",
  },
];

export default function SignatureFeature() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef1 = useRef<HTMLDivElement>(null);
  const imgRef2 = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const { addItem, setIsOpen } = useCart();

  useEffect(() => {
    const pairs = [
      [imgRef1.current, textRef1.current],
      [imgRef2.current, textRef2.current],
    ];

    pairs.forEach(([img, text], i) => {
      gsap.fromTo(
        img,
        { clipPath: i === 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" },
        {
          clipPath: i === 0 ? "inset(0 0% 0 0)" : "inset(0 0 0 0%)",
          duration: 1.8,
          ease: "expo.inOut",
          scrollTrigger: { trigger: img, start: "top 70%" },
        }
      );
      gsap.fromTo(
        text,
        { opacity: 0, x: i === 0 ? 50 : -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: { trigger: img, start: "top 70%" },
        }
      );
    });
  }, []);

  const handleOrder = (dish: (typeof dishes)[0]) => {
    addItem({ name: dish.name, price: dish.price, priceNum: dish.priceNum });
    setIsOpen(true);
  };

  return (
    <section ref={sectionRef} className="bg-[#080808]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 pt-6 pb-4">
        <p className="text-[#CC0000] text-[10px] tracking-[0.5em] uppercase font-sans font-medium">
          Most Ordered
        </p>
      </div>

      {dishes.map((dish, idx) => (
        <div
          key={dish.name}
          className={`grid grid-cols-1 lg:grid-cols-2 min-h-[65vh] ${idx > 0 ? "border-t border-white/5" : ""}`}
        >
          {idx % 2 === 0 ? (
            <>
              <div
                ref={imgRef1}
                className="relative h-[50vh] lg:h-auto"
                style={{ clipPath: "inset(0 100% 0 0)" }}
              >
                <img src={dish.img} alt={dish.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#080808]/50" />
                <div className="absolute bottom-8 left-8">
                  <span
                    className="font-sans text-[10px] uppercase tracking-[0.3em] px-3 py-1.5 text-white"
                    style={{ backgroundColor: dish.accent === "#FFD700" ? "#CC0000" : "#FFD700", color: dish.accent === "#FFD700" ? "white" : "black" }}
                  >
                    Signature Dish
                  </span>
                </div>
              </div>

              <div
                ref={textRef1}
                className="opacity-0 flex flex-col justify-center px-10 md:px-16 lg:px-20 py-16 lg:py-0 bg-[#0a0a0a]"
              >
                <DishContent dish={dish} onOrder={() => handleOrder(dish)} />
              </div>
            </>
          ) : (
            <>
              <div
                ref={textRef2}
                className="opacity-0 flex flex-col justify-center px-10 md:px-16 lg:px-20 py-16 lg:py-0 bg-[#0a0a0a] order-2 lg:order-1"
              >
                <DishContent dish={dish} onOrder={() => handleOrder(dish)} />
              </div>

              <div
                ref={imgRef2}
                className="relative h-[50vh] lg:h-auto order-1 lg:order-2"
                style={{ clipPath: "inset(0 0 0 100%)" }}
              >
                <img src={dish.img} alt={dish.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a0a0a]/50" />
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  );
}

function DishContent({
  dish,
  onOrder,
}: {
  dish: (typeof dishes)[0];
  onOrder: () => void;
}) {
  return (
    <>
      <p
        className="font-sans font-light text-xs uppercase tracking-[0.3em] mb-5"
        style={{ color: dish.accent }}
      >
        {dish.tagline}
      </p>

      <h2
        className="font-serif font-bold text-white leading-[0.92] mb-6"
        style={{ fontSize: "clamp(2.6rem, 5.5vw, 6rem)", letterSpacing: "-0.02em" }}
      >
        {dish.name.split(" ")[0]}
        <br />
        <span className="italic font-light" style={{ color: dish.accent }}>
          {dish.name.split(" ").slice(1).join(" ")}.
        </span>
      </h2>

      <p className="text-white/40 font-sans font-light leading-[1.9] text-sm mb-8 max-w-sm">
        {dish.desc}
      </p>

      <div className="flex items-end gap-4 mb-10">
        <span
          className="font-display leading-none"
          style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)", color: dish.accent }}
        >
          {dish.price}
        </span>
        <span className="text-white/20 font-sans text-xs uppercase tracking-[0.2em] mb-1.5">
          per serving
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onOrder}
          className="px-8 py-4 font-sans font-semibold uppercase tracking-[0.2em] text-xs transition-colors duration-400"
          style={{ backgroundColor: dish.accent, color: dish.accent === "#FFD700" ? "black" : "white" }}
        >
          Add to Order
        </button>
        <button
          onClick={() =>
            document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-8 py-4 border border-white/12 text-white/50 font-sans font-medium uppercase tracking-[0.15em] text-xs hover:border-white/35 hover:text-white transition-all duration-400"
        >
          Full Menu
        </button>
      </div>
    </>
  );
}
