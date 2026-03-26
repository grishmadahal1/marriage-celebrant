import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Home, Heart, Sparkles, Mail } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "process", label: "My Process", icon: Sparkles },
  { id: "services", label: "Services", icon: Heart },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] hidden md:flex items-center">
      {/* Expanded panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="flex flex-col gap-1 py-4 px-3 rounded-l-xl mr-0"
              style={{
                background: "rgba(26, 26, 26, 0.9)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(197, 160, 89, 0.15)",
                borderRight: "none",
              }}
            >
              {navItems.map(({ id, label, icon: Icon }) => {
                const isActive = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 whitespace-nowrap"
                    style={{
                      background: isActive ? "rgba(197, 160, 89, 0.15)" : "transparent",
                    }}
                  >
                    <Icon
                      size={16}
                      className={isActive ? "text-[#C5A059]" : "text-white/40"}
                    />
                    <span
                      className={`text-sm font-display tracking-wide ${
                        isActive ? "text-[#C5A059] font-medium" : "text-white/50"
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center w-8 h-16 rounded-l-lg transition-colors"
        style={{
          background: isOpen
            ? "rgba(26, 26, 26, 0.9)"
            : "rgba(197, 160, 89, 0.2)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(197, 160, 89, 0.2)",
          borderBottom: "1px solid rgba(197, 160, 89, 0.2)",
          borderLeft: "1px solid rgba(197, 160, 89, 0.2)",
        }}
      >
        {isOpen ? (
          <ChevronRight size={14} className="text-white/50" />
        ) : (
          <ChevronLeft size={14} className="text-[#C5A059]" />
        )}
      </button>
    </div>
  );
}
