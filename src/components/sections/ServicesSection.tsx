import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ChampagneBottle from "../ui/ChampagneBottle";

const features = [
  {
    title: "Personalised Magic",
    description:
      "Every ceremony is handcrafted to celebrate you — your story, your sparkle, your strength. No templates, no AI. Just me, writing words that are truly yours.",
  },
  {
    title: "Your Place, Your Way",
    description:
      "A quiet Perth beach at golden hour, a leafy park with your closest crew, your garden, or a favourite cafe. Two witnesses and we're ready.",
  },
  {
    title: "Fun Without the Fuss",
    description:
      "Just the legal essentials — short, sweet, and full of personality. Add a reading from a mate, your favourite song, or a group cheer. It's official, heartfelt, and all yours.",
  },
  {
    title: "Stress-Free, Sorted",
    description:
      "I handle every piece of paperwork and all the legal requirements. Fully compliant with Australian marriage laws. You focus on the exciting part — getting married.",
  },
];

const process = [
  {
    step: "01",
    title: "The Easy Chat",
    description:
      "A relaxed catch-up — your place, my place, Zoom, or over coffee. We hear your love story and dream up the vibe.",
  },
  {
    step: "02",
    title: "The Big (But Chill) Chat",
    description:
      "We get the legals done, write custom vows that feel real, and finalise everything. You do? You do? We're done.",
  },
  {
    step: "03",
    title: "The Big Day",
    description:
      "No hassle, no stress, no anxiety. We've already done all the hard stuff. Just enjoy every moment.",
  },
];

interface Snowflake {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function SnowEffect() {
  const [flakes, setFlakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const snowflakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setFlakes(snowflakes);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-white animate-snowfall"
          style={{
            left: `${flake.x}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// Letter positions when envelope is open — fan out (smaller spread on mobile)
const letterTransformsDesktop = [
  { x: "-110%", y: "-60%", rotate: -12 },
  { x: "-35%", y: "-85%", rotate: -4 },
  { x: "35%",  y: "-85%", rotate: 4 },
  { x: "110%", y: "-60%", rotate: 12 },
];

const letterTransformsMobile = [
  { x: "-70%", y: "-55%", rotate: -10 },
  { x: "-20%", y: "-75%", rotate: -3 },
  { x: "20%",  y: "-75%", rotate: 3 },
  { x: "70%", y: "-55%", rotate: 10 },
];

function EnvelopeCards({
  features,
  activeLetter,
  onSelect,
  flyOffset,
}: {
  features: { title: string; description: string }[];
  activeLetter: number | null;
  onSelect: (i: number | null) => void;
  flyOffset: { x: number; y: number };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const letterTransforms = isMobile ? letterTransformsMobile : letterTransformsDesktop;

  const handleEnvelopeClick = () => {
    if (activeLetter !== null) return;
    setIsOpen((prev) => !prev);
  };

  const handleLetterClick = (e: React.MouseEvent, i: number) => {
    e.stopPropagation();
    if (!isOpen) return;
    onSelect(activeLetter === i ? null : i);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[280px] h-[180px] sm:w-[340px] sm:h-[220px] md:w-[400px] md:h-[260px]">

        {/* Envelope back */}
        <div
          className="absolute inset-0 rounded-lg cursor-pointer z-[1]"
          style={{
            background: "linear-gradient(180deg, #C5A059 0%, #9C7942 100%)",
            boxShadow: "0 6px 30px rgba(0,0,0,0.2)",
          }}
          onClick={handleEnvelopeClick}
        />

        {/* Letters inside */}
        {features.map((feature, i) => {
          const isActive = activeLetter === i;
          const pos = letterTransforms[i];

          return (
            <motion.div
              key={feature.title}
              className={`absolute cursor-pointer ${isActive ? "z-[50]" : "z-[2]"}`}
              style={{
                width: "75%",
                left: "50%",
                bottom: "15%",
                transform: "translateX(-50%)",
                marginLeft: 0,
                transformOrigin: "bottom center",
              }}
              animate={
                isActive
                  ? isMobile
                    ? { x: "-50%", y: -280, rotate: 0, scale: 1.05 }
                    : { x: `calc(-50% + ${flyOffset.x}px)`, y: flyOffset.y, rotate: 0, scale: 1.15 }
                  : isOpen
                  ? { x: `calc(-50% + ${pos.x})`, y: pos.y, rotate: pos.rotate, scale: 1 }
                  : { x: "-50%", y: "10%", rotate: 0, scale: 0.9 }
              }
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => handleLetterClick(e, i)}
            >
              {/* Letter card */}
              <div
                className="rounded-lg overflow-hidden shadow-xl"
                style={{
                  background: "linear-gradient(170deg, #f5f0e8 0%, #ede6d8 100%)",
                  border: "1px solid rgba(197,160,89,0.2)",
                  minHeight: isActive ? (isMobile ? 200 : 280) : (isMobile ? 100 : 160),
                  padding: isActive ? (isMobile ? "20px 16px" : "32px 28px") : (isMobile ? "12px 14px" : "20px 22px"),
                  transition: "min-height 0.3s, padding 0.3s",
                }}
              >
                {/* Paper texture */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.03] rounded-lg"
                  style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 26px, #8b7355 26px, #8b7355 27px)",
                  }}
                />

                <div className="relative z-[1]">
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <div className="w-3 sm:w-4 h-[1px] bg-[#C5A059]/50" />
                    <span className="text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-display text-[#C5A059]/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base md:text-lg font-serif font-bold text-[#3a3530] leading-snug">
                    {feature.title}
                  </h4>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-[#6b6156] text-xs sm:text-sm leading-relaxed font-serif mt-2 sm:mt-3">
                        {feature.description}
                      </p>
                      <p className="text-[8px] sm:text-[9px] text-[#a09080] mt-3 sm:mt-4 font-display tracking-wider uppercase">
                        Tap to close
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Envelope front flap — uses % width so it scales */}
        <motion.div
          className="absolute inset-x-0 top-0 z-[3] cursor-pointer overflow-hidden"
          style={{ transformOrigin: "top center", height: "46%" }}
          animate={isOpen ? { rotateX: 180, opacity: 0 } : { rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          onClick={handleEnvelopeClick}
        >
          <div
            className="w-full h-full"
            style={{
              background: "#E5C185",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            }}
          />
        </motion.div>

        {/* Envelope front body */}
        <div
          className="absolute inset-0 rounded-lg z-[4] pointer-events-none"
          style={{
            background: "linear-gradient(0deg, #C5A059 0%, #C5A059 50%, transparent 50%)",
            borderRadius: "0 0 8px 8px",
          }}
        />

        {/* Wax seal */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 z-[5] cursor-pointer"
          style={{ top: "32%" }}
          animate={isOpen ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={handleEnvelopeClick}
        >
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center"
            style={{
              background: "radial-gradient(circle at 35% 35%, #E5C185, #C5A059, #9C7942)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)",
            }}
          >
            <span className="text-[8px] sm:text-[9px] font-display font-bold text-white/90">SC</span>
          </div>
        </motion.div>
      </div>

      <p className="text-white/70 text-xs sm:text-sm mt-6 sm:mt-8 font-display tracking-wider">
        {isOpen ? "Tap a letter to read" : "Tap the envelope to open"}
      </p>
    </div>
  );
}

function EnvelopeSection({ features }: { features: { title: string; description: string }[] }) {
  const [activeLetter, setActiveLetter] = useState<number | null>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const [flyOffset, setFlyOffset] = useState({ x: 0, y: 0 });

  const handleSelect = (i: number | null) => {
    if (i !== null && leftRef.current && envelopeRef.current) {
      const leftRect = leftRef.current.getBoundingClientRect();
      const envRect = envelopeRef.current.getBoundingClientRect();
      setFlyOffset({
        x: leftRect.left + leftRect.width / 2 - (envRect.left + envRect.width / 2),
        y: leftRect.top + leftRect.height / 2 - (envRect.top + envRect.height / 2),
      });
    }
    setActiveLetter(i);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center mb-20 md:mb-32 max-w-5xl mx-auto">
      <motion.div
        ref={leftRef}
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="min-h-[120px] md:min-h-[280px] flex items-center text-center md:text-left"
      >
        <AnimatePresence mode="wait">
          {activeLetter === null && (
            <motion.div
              key="default"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-display font-medium text-white/90 mb-3 md:mb-4 leading-tight">
                Making Legal <span className="gold-text">Legendary</span>
              </h3>
              <p className="text-white/50 max-w-md text-base md:text-lg leading-relaxed mx-auto md:mx-0">
                A celebration, not an obligation.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        ref={envelopeRef}
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <EnvelopeCards features={features} activeLetter={activeLetter} onSelect={handleSelect} flyOffset={flyOffset} />
      </motion.div>
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative overflow-hidden pt-32 pb-12" style={{ scrollSnapAlign: "start" }}>
      {isVisible && <SnowEffect />}

      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full relative z-10">

        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <p className="text-[#C5A059] text-sm font-medium tracking-[0.3em] uppercase mb-6">
            Legal Weddings
          </p>
          <h2 className="text-5xl md:text-7xl font-display font-medium gold-text mb-6">
            Simply Legal,<br />Simply Perfect.
          </h2>
          <p className="text-white/40 text-sm tracking-widest uppercase mb-10">
            Starting from $350
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-center mb-32"
        >
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            Your "I do" moment deserves to feel special, romantic, and a little bit magical — even when it's beautifully straightforward.
          </p>
          <p className="text-white/40 text-sm italic font-serif">
            The expression 'Simply Perfect' exists for a reason.
          </p>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10"
          >
            <svg
              viewBox="0 0 280 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[180px] sm:w-[220px] md:w-[260px] mx-auto"
            >
              {/* "Steven" */}
              <motion.path
                d="M30 65 C25 55, 20 40, 30 35 C40 30, 48 45, 42 55 C36 65, 25 68, 30 65
                   M50 30 C50 30, 45 70, 55 70 C60 70, 58 50, 55 45
                   M62 50 C60 45, 65 38, 70 42 C75 46, 65 55, 62 55
                   M72 50 C72 38, 85 38, 82 50 C79 58, 72 55, 72 50
                   M88 32 C85 50, 90 68, 95 55 C100 42, 88 32, 88 32
                   M100 50 C100 45, 105 38, 110 42 C115 46, 105 55, 100 55
                   M115 35 C112 55, 118 65, 125 55 C130 48, 122 35, 115 35"
                stroke="url(#goldGradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
              />
              {/* Flourish connecting stroke */}
              <motion.path
                d="M125 55 C135 70, 145 72, 155 60"
                stroke="url(#goldGradient)"
                strokeWidth="1.2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 2 }}
              />
              {/* "Conroy" */}
              <motion.path
                d="M155 55 C148 45, 155 30, 168 35 C175 38, 172 50, 165 55
                   M175 40 C172 55, 178 65, 185 55 C190 48, 182 38, 175 40
                   M192 35 C189 55, 195 65, 200 55 C203 48, 198 35, 192 35
                   M205 55 C205 45, 215 35, 218 42 C221 50, 210 58, 205 55
                   M222 40 C220 55, 225 65, 232 55 C238 45, 230 35, 222 40
                   M235 32 C235 55, 242 68, 248 55 C252 45, 248 30, 240 50"
                stroke="url(#goldGradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut", delay: 2.5 }}
              />
              {/* Underline flourish */}
              <motion.path
                d="M25 78 C80 82, 180 75, 255 72 C270 71, 250 78, 220 80"
                stroke="url(#goldGradient)"
                strokeWidth="1"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 4.2 }}
              />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9C7942" />
                  <stop offset="40%" stopColor="#E5C185" />
                  <stop offset="60%" stopColor="#C5A059" />
                  <stop offset="100%" stopColor="#9C7942" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center justify-center mb-32">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C5A059]/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]/50 mx-4" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C5A059]/30" />
        </div>

        {/* Why section — Envelope + Text side by side */}
        <EnvelopeSection features={features} />

        {/* Divider */}
        <div className="flex items-center justify-center mb-32">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C5A059]/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]/50 mx-4" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C5A059]/30" />
        </div>

        {/* Your Ceremony process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h3 className="text-3xl md:text-4xl font-display font-medium text-white/90 mb-4">
            Your <span className="gold-text">Ceremony</span>
          </h3>
          <p className="text-white/50 max-w-lg mx-auto">
            Three simple steps to your perfect day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-16">
          {process.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center group"
            >
              <span className="text-7xl font-display font-bold text-white/[0.03] block mb-2">
                {item.step}
              </span>
              <h4 className="text-lg font-display font-medium text-white/90 mb-3">
                {item.title}
              </h4>
              <p className="text-white/50 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Champagne bottle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-32"
        >
          <ChampagneBottle />
        </motion.div>


      </div>
    </section>
  );
}
