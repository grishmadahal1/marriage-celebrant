import { useState } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between py-8 w-full z-50">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-[#C19E61] rounded-full flex items-center justify-center shadow-md transition-transform group-hover:scale-110">
            <span className="text-black/90 font-serif font-black text-sm">SC</span>
          </div>
          <span className="text-2xl font-serif font-black tracking-tighter text-white/90 leading-none">Steven Conroy</span>
        </div>

<div className="hidden md:flex items-center gap-4">
          <button className="px-5 py-2.5 border border-white/20 text-white/90 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
            Contact Us
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 w-full bg-[#B8A898] p-6 z-40 border-b border-black/10"
        >
          <div className="flex flex-col gap-4 text-lg font-medium">
            <button className="w-full py-3 border border-black/20 text-black/90 rounded-lg">Contact Us</button>
          </div>
        </motion.div>
      )}
    </>
  );
}
