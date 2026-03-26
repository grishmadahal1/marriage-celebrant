import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

interface Splash {
  id: number;
  angle: number;
  distance: number;
  size: number;
  duration: number;
}

export default function ChampagneBottle() {
  const [popped, setPopped] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [splashes, setSplashes] = useState<Splash[]>([]);

  const popCork = useCallback(() => {
    if (popped) return;
    setPopped(true);

    const newBubbles: Bubble[] = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 140,
      y: -(Math.random() * 350 + 120),
      size: Math.random() * 8 + 3,
      duration: Math.random() * 2.5 + 1.5,
      delay: Math.random() * 1,
      drift: (Math.random() - 0.5) * 80,
    }));
    setBubbles(newBubbles);

    const newSplashes: Splash[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      angle: (i / 20) * 360 + Math.random() * 15,
      distance: Math.random() * 100 + 50,
      size: Math.random() * 5 + 2,
      duration: Math.random() * 0.8 + 0.5,
    }));
    setSplashes(newSplashes);

    setTimeout(() => {
      setPopped(false);
      setBubbles([]);
      setSplashes([]);
    }, 5000);
  }, [popped]);

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Gold bubbles rising */}
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={`bubble-${bubble.id}`}
            className="absolute rounded-full"
            style={{
              width: bubble.size,
              height: bubble.size,
              background:
                "radial-gradient(circle at 30% 30%, rgba(229,193,133,0.9), rgba(197,160,89,0.4))",
              border: "1px solid rgba(197,160,89,0.2)",
            }}
            initial={{ x: 0, y: 20, opacity: 0, scale: 0 }}
            animate={{
              x: [0, bubble.drift, bubble.x],
              y: [20, bubble.y * 0.4, bubble.y],
              opacity: [0, 0.8, 0],
              scale: [0, 1.2, 0.3],
            }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Gold splash burst */}
      <AnimatePresence>
        {splashes.map((s) => {
          const rad = (s.angle * Math.PI) / 180;
          return (
            <motion.div
              key={`splash-${s.id}`}
              className="absolute rounded-full"
              style={{
                width: s.size,
                height: s.size,
                background: "linear-gradient(135deg, #E5C185, #C5A059)",
              }}
              initial={{ x: 0, y: 20, opacity: 1, scale: 0 }}
              animate={{
                x: Math.cos(rad) * s.distance,
                y: Math.sin(rad) * s.distance - 20,
                opacity: 0,
                scale: 1.5,
              }}
              transition={{ duration: s.duration, ease: "easeOut" }}
            />
          );
        })}
      </AnimatePresence>

      {/* Champagne stream */}
      <AnimatePresence>
        {popped && (
          <motion.div
            className="absolute top-6 w-2 rounded-full origin-bottom z-20"
            style={{
              background:
                "linear-gradient(to top, rgba(197,160,89,0.5), rgba(229,193,133,0.8), transparent)",
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 100, opacity: [0, 1, 0.8, 0] }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Cork with hint arrow */}
      <div className="relative">
        <motion.div
          className="relative z-30 cursor-pointer"
          onClick={popCork}
          whileHover={!popped ? { y: -6, scale: 1.1 } : undefined}
          animate={
            popped
              ? { y: -160, x: 30, rotate: 720, opacity: 0 }
              : { y: 0, x: 0, rotate: 0, opacity: 1 }
          }
          transition={
            popped
              ? { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }
              : { type: "spring", stiffness: 300 }
          }
        >
          {/* Cork SVG */}
          <svg width="30" height="28" viewBox="0 0 30 28" fill="none">
            <rect x="7" y="0" width="16" height="22" rx="4" fill="#9C7942" />
            <rect x="7" y="0" width="16" height="22" rx="4" fill="url(#corkTex)" />
            <rect x="5" y="20" width="20" height="8" rx="2" fill="#C5A059" />
            <rect x="5" y="20" width="20" height="2" rx="1" fill="#E5C185" />
            <defs>
              <pattern id="corkTex" width="5" height="5" patternUnits="userSpaceOnUse">
                <circle cx="2.5" cy="2.5" r="0.6" fill="rgba(0,0,0,0.12)" />
                <circle cx="0.5" cy="1" r="0.4" fill="rgba(0,0,0,0.08)" />
                <circle cx="4" cy="4" r="0.3" fill="rgba(0,0,0,0.1)" />
              </pattern>
            </defs>
          </svg>
        </motion.div>

        {/* Animated hint arrow pointing at cork */}
        <AnimatePresence>
          {!popped && (
            <motion.div
              className="absolute -right-28 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              <motion.svg
                width="20"
                height="12"
                viewBox="0 0 20 12"
                fill="none"
                animate={{ x: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M20 6H2M2 6L7 1M2 6L7 11" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
              <motion.span
                className="text-[#C5A059]/60 text-[10px] tracking-[0.2em] uppercase font-display whitespace-nowrap"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                pop me
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottle - dark elegant with gold accents */}
      <svg width="70" height="180" viewBox="0 0 70 180" fill="none" className="relative z-10">
        {/* Neck */}
        <rect x="26" y="0" width="18" height="44" rx="5" fill="#1c1c1c" />
        <rect x="28" y="2" width="2" height="38" rx="1" fill="rgba(255,255,255,0.04)" />

        {/* Gold foil wrap */}
        <rect x="22" y="34" width="26" height="14" rx="3" fill="url(#foilGrad)" />
        <rect x="22" y="34" width="26" height="3" rx="1.5" fill="#E5C185" opacity="0.7" />
        <rect x="22" y="45" width="26" height="2" rx="1" fill="#9C7942" opacity="0.5" />

        {/* Shoulder curve */}
        <path d="M22 48 Q22 68 10 78 L60 78 Q48 68 48 48 Z" fill="#1c1c1c" />

        {/* Body */}
        <rect x="10" y="78" width="50" height="90" rx="4" fill="#1c1c1c" />

        {/* Subtle body shine */}
        <rect x="18" y="50" width="3" height="115" rx="1.5" fill="rgba(255,255,255,0.04)" />

        {/* Gold label area */}
        <rect x="15" y="92" width="40" height="55" rx="3" fill="rgba(197,160,89,0.08)" stroke="#C5A059" strokeWidth="0.5" strokeOpacity="0.3" />

        {/* Label decorations */}
        <rect x="20" y="98" width="30" height="1" rx="0.5" fill="#C5A059" opacity="0.6" />
        <rect x="25" y="103" width="20" height="0.5" rx="0.25" fill="#C5A059" opacity="0.3" />

        {/* SC monogram on label */}
        <text x="35" y="120" textAnchor="middle" fill="#C5A059" fontSize="12" fontWeight="700" fontFamily="serif" opacity="0.8">
          SC
        </text>

        <rect x="20" y="128" width="30" height="0.5" rx="0.25" fill="#C5A059" opacity="0.3" />

        {/* Celebrant text */}
        <text x="35" y="140" textAnchor="middle" fill="#C5A059" fontSize="5" fontFamily="sans-serif" letterSpacing="3" opacity="0.5">
          CELEBRANT
        </text>

        {/* Base */}
        <rect x="8" y="166" width="54" height="6" rx="3" fill="#111" />
        <rect x="10" y="166" width="50" height="2" rx="1" fill="rgba(197,160,89,0.1)" />
      </svg>

      <defs>
        <linearGradient id="foilGrad" x1="22" y1="34" x2="48" y2="48">
          <stop offset="0%" stopColor="#9C7942" />
          <stop offset="40%" stopColor="#E5C185" />
          <stop offset="60%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#9C7942" />
        </linearGradient>
      </defs>

      {/* Celebration text after pop */}
      <AnimatePresence>
        {popped && (
          <motion.p
            className="gold-text text-sm font-display tracking-widest mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Cheers to love!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
