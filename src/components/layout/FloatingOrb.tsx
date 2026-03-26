import { motion } from "motion/react";

export default function FloatingOrb() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 flex items-center justify-center drop-shadow-md"
      >
        <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
           <path d="M12 0L13.8 9.2L24 12L13.8 14.8L12 24L10.2 14.8L0 12L10.2 9.2L12 0Z" />
        </svg>
      </motion.div>
    </div>
  );
}
