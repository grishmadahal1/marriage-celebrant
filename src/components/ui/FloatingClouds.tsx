import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface HeartDrop {
  id: number;
  x: number;
  startY: number;
  endY: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

let dropId = 0;

const cloudPositions = [
  { bottom: "-5%", left: "-3%", width: 320, opacity: 0.55, dur: 22, ax: [0, 25, -10, 15, 0], ay: [0, -12, 8, -5, 0] },
  { top: "-4%", right: "-2%", width: 280, opacity: 0.45, dur: 26, ax: [0, -20, 12, -8, 0], ay: [0, 10, -8, 6, 0] },
  { top: "40%", left: "-5%", width: 200, opacity: 0.3, dur: 18, ax: [0, 18, -12, 8, 0], ay: [0, -10, 6, -8, 0] },
];

export default function FloatingClouds() {
  const [hearts, setHearts] = useState<HeartDrop[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleCloudClick = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cloudX = rect.left + rect.width / 2;
    const cloudY = rect.bottom;
    const bottomY = window.innerHeight - 30;

    const newHearts: HeartDrop[] = Array.from({ length: 15 }, () => {
      const drift = (Math.random() - 0.5) * 80;
      const delay = Math.random() * 0.6;
      const duration = 1.8 + Math.random() * 1.2;
      return {
        id: dropId++,
        x: cloudX + (Math.random() - 0.5) * rect.width * 0.6,
        startY: cloudY,
        endY: bottomY,
        size: 8 + Math.random() * 8,
        delay,
        duration,
        drift,
      };
    });

    setHearts((prev) => [...prev, ...newHearts]);

    // Create ripples as each heart lands
    newHearts.forEach((heart) => {
      setTimeout(() => {
        const ripple: Ripple = {
          id: heart.id,
          x: heart.x + heart.drift,
          y: heart.endY,
        };
        setRipples((prev) => [...prev, ripple]);

        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
        }, 1200);
      }, (heart.delay + heart.duration) * 1000);
    });

    // Clean up hearts
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.includes(h)));
    }, 5000);
  }, []);

  return (
    <>
      {/* Clickable floating clouds */}
      {cloudPositions.map((cloud, i) => {
        const { dur, ax, ay, ...pos } = cloud;
        return (
          <motion.div
            key={i}
            className="fixed z-[1] hidden md:block cursor-pointer"
            style={{
              ...Object.fromEntries(
                Object.entries(pos).filter(([k]) => ["top", "bottom", "left", "right"].includes(k))
              ),
            }}
            animate={{ x: ax, y: ay }}
            transition={{ duration: dur, ease: "easeInOut", repeat: Infinity }}
            onClick={handleCloudClick}
          >
            <img
              src="/frames/frames/cloud/ChatGPT_Image_Mar_26__2026__05_24_08_PM-removebg-preview.png"
              alt=""
              draggable={false}
              style={{
                width: pos.width,
                height: "auto",
                opacity: pos.opacity,
              }}
            />
          </motion.div>
        );
      })}

      {/* Falling heart rain */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0.9, y: 0, x: 0, scale: 0.3 }}
            animate={{
              opacity: [0.9, 0.85, 0.7, 0],
              y: [0, heart.endY - heart.startY],
              x: [0, heart.drift * 0.4, heart.drift],
              scale: [0.3, 1, 0.9, 0.6],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: "easeIn",
            }}
            className="fixed pointer-events-none z-[9997]"
            style={{
              left: heart.x,
              top: heart.startY,
              fontSize: heart.size,
              color: "rgba(220, 50, 80, 0.85)",
              lineHeight: 1,
            }}
          >
            ♥
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Water ripples at the bottom */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <div key={ripple.id}>
            <motion.div
              initial={{ opacity: 0.6, scaleX: 0.2, scaleY: 0.4 }}
              animate={{ opacity: 0, scaleX: 2.5, scaleY: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="fixed pointer-events-none z-[9996]"
              style={{
                left: ripple.x - 30,
                top: ripple.y - 6,
                width: 60,
                height: 12,
                borderRadius: "50%",
                border: "1.5px solid rgba(220, 50, 80, 0.4)",
                background: "transparent",
              }}
            />
            <motion.div
              initial={{ opacity: 0.4, scaleX: 0.1, scaleY: 0.3 }}
              animate={{ opacity: 0, scaleX: 3.5, scaleY: 1.2 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
              className="fixed pointer-events-none z-[9996]"
              style={{
                left: ripple.x - 40,
                top: ripple.y - 8,
                width: 80,
                height: 16,
                borderRadius: "50%",
                border: "1px solid rgba(220, 50, 80, 0.25)",
                background: "transparent",
              }}
            />
          </div>
        ))}
      </AnimatePresence>
    </>
  );
}
