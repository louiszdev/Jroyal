const WORDS = [
  "Eat", "·", "Drink", "·", "Vibe", "·",
  "Grills N Chops", "·", "Nsukka's Finest", "·",
  "Open 9am – 11pm", "·", "Premium Nigerian Grill", "·",
  "Char-Grilled Perfection", "·",
];

function TickerContent() {
  return (
    <div className="flex items-center gap-8 shrink-0 pr-8">
      {WORDS.map((word, i) => (
        <span
          key={i}
          className={`font-sans font-semibold uppercase tracking-[0.22em] text-[11px] whitespace-nowrap ${
            word === "·" ? "text-black/30" : "text-black"
          }`}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

export default function MarqueeTicker() {
  return (
    <div className="w-full overflow-hidden bg-[#FFD700] py-3.5 relative z-10">
      <div className="flex items-center marquee-track">
        <TickerContent />
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  );
}
