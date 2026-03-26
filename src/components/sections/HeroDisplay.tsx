import { motion } from "motion/react";

export default function HeroDisplay() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="flex-1 max-w-sm text-center md:text-left mt-0 md:mt-16"
    >
      <h1 className="text-6xl md:text-[5.5rem] font-display font-medium leading-[0.9] tracking-tight mb-8">
        <span className="gold-text block">Crafting</span>
        <span className="gold-text block">your perfect</span>
        <span className="gold-text block">moment</span>
      </h1>
      <p className="text-base md:text-lg font-medium leading-[1.6] max-w-[280px] mx-auto md:mx-0 text-white/70">
        I bring warmth, elegance, and a personal touch to your most significant life events.
      </p>
    </motion.div>
  );
}
