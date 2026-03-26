import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  drift: number;
  duration: number;
}

let heartId = 0;

export default function CloudCursor() {
  const [inSection, setInSection] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const section = document.querySelector("[data-cloud-cursor]");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      setInSection(inside);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!inSection) return;

      const x = e.clientX;
      const y = e.clientY;

      const newHearts: Heart[] = Array.from({ length: 12 }, () => ({
        id: heartId++,
        x: x + (Math.random() - 0.5) * 40,
        y: y + (Math.random() - 0.5) * 20,
        size: 6 + Math.random() * 6,
        drift: (Math.random() - 0.5) * 60,
        duration: 1.5 + Math.random() * 1.5,
      }));

      setHearts((prev) => [...prev, ...newHearts]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => !newHearts.includes(h)));
      }, 3500);
    },
    [inSection]
  );

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <>
      {inSection && (
        <div
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            src="/frames/frames/cloud/ChatGPT_Image_Mar_26__2026__05_24_08_PM-removebg-preview.png"
            alt=""
            draggable={false}
            style={{
              width: 350,
              height: "auto",
              filter: "drop-shadow(0 3px 12px rgba(255, 255, 255, 0.3))",
              opacity: 0.9,
            }}
          />
        </div>
      )}

      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, y: 0, x: 0, scale: 0 }}
            animate={{
              opacity: [1, 0.8, 0.5, 0],
              y: [0, 40, 100, 180],
              x: [0, heart.drift * 0.3, heart.drift * 0.7, heart.drift],
              scale: [0, 1, 0.8, 0.4],
              rotate: [
                0,
                heart.drift > 0 ? 20 : -20,
                heart.drift > 0 ? -10 : 10,
                0,
              ],
            }}
            transition={{
              duration: heart.duration,
              ease: "easeOut",
            }}
            className="fixed pointer-events-none z-[9997]"
            style={{
              left: heart.x,
              top: heart.y,
              fontSize: heart.size,
              lineHeight: 1,
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            ♥
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
