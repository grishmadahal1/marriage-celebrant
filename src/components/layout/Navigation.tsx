import { useState } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "process", label: "My Process" },
  { id: "services", label: "Services" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between py-8 w-full z-50">
        <div
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => scrollTo("home")}
        >
          <div className="w-10 h-10 bg-[#C19E61] rounded-full flex items-center justify-center shadow-md transition-transform group-hover:scale-110">
            <span className="text-black/90 font-serif font-black text-sm">SC</span>
          </div>
          <span className="text-2xl font-serif font-black tracking-tighter text-white/90 leading-none">Steven Conroy</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="px-4 py-2 text-sm font-display font-medium text-white/60 hover:text-white/90 rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="ml-2 px-5 py-2.5 bg-[#C5A059] text-[#1a1a1a] rounded-xl text-sm font-semibold font-display tracking-wide hover:bg-[#E5C185] transition-colors"
          >
            Contact
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
          className="md:hidden absolute top-20 left-0 w-full bg-[#1c1c1c]/95 backdrop-blur-md p-6 z-40 border-b border-[#C5A059]/10"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="w-full py-3 text-left px-4 text-white/70 hover:text-white/90 hover:bg-white/5 rounded-lg text-base font-display transition-colors"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="w-full py-3 mt-2 bg-[#C5A059] text-[#1a1a1a] rounded-xl text-sm font-semibold font-display tracking-wide"
            >
              Contact
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
