import { useEffect, useState } from "react";

interface Glitter {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
  shape: "circle" | "diamond" | "star";
}

function GoldGlitters() {
  const [glitters, setGlitters] = useState<Glitter[]>([]);

  useEffect(() => {
    const particles: Glitter[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.6 + 0.1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      shape: (["circle", "diamond", "star"] as const)[Math.floor(Math.random() * 3)],
    }));
    setGlitters(particles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {glitters.map((g) => (
        <div
          key={g.id}
          className="absolute animate-glitter"
          style={{
            left: `${g.x}%`,
            top: `${g.y}%`,
            width: `${g.size}px`,
            height: `${g.size}px`,
            animationDelay: `${g.delay}s`,
            animationDuration: `${g.duration}s`,
            background:
              g.shape === "star"
                ? "none"
                : `radial-gradient(circle, #E5C185, #C5A059)`,
            borderRadius: g.shape === "circle" ? "50%" : "0",
            transform: g.shape === "diamond" ? "rotate(45deg)" : "none",
            boxShadow: `0 0 ${g.size * 2}px rgba(197,160,89,0.4)`,
          }}
        >
          {g.shape === "star" && (
            <svg width={g.size * 2} height={g.size * 2} viewBox="0 0 10 10">
              <polygon
                points="5,0 6.2,3.5 10,3.5 7,5.8 8,9.5 5,7.2 2,9.5 3,5.8 0,3.5 3.8,3.5"
                fill="#C5A059"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-12 overflow-hidden">
      {/* Gold dust gradient at the top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #9C7942 20%, #E5C185 50%, #9C7942 80%, transparent 100%)",
        }}
      />

      {/* Scattered gold glow patches */}
      <div
        className="absolute top-0 left-1/4 w-64 h-32 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(197,160,89,0.08), transparent)" }}
      />
      <div
        className="absolute bottom-0 right-1/3 w-48 h-24 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(229,193,133,0.06), transparent)" }}
      />
      <div
        className="absolute top-1/2 left-2/3 w-36 h-36 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(197,160,89,0.05), transparent)" }}
      />

      {/* Glitter particles */}
      <GoldGlitters />

      {/* Footer content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#C19E61] rounded-full flex items-center justify-center shadow-md">
              <span className="text-black/90 font-serif font-black text-sm">SC</span>
            </div>
            <span className="text-2xl font-serif font-black tracking-tighter text-white/90 leading-none">
              Steven Conroy
            </span>
          </div>

          {/* Tagline */}
          <p className="text-white/30 text-sm font-display tracking-wider text-center">
            Crafting your perfect moment
          </p>

          {/* Contact */}
          <div className="text-right">
            <p className="text-white/50 text-sm">Perth, Western Australia</p>
            <p className="text-[#C5A059]/70 text-sm mt-1">theperthcelebrant@gmail.com</p>
          </div>
        </div>

        {/* Bottom line */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} Steven Conroy Celebrant. All rights reserved.
          </p>
          <p className="text-white/20 text-xs font-display tracking-wider">
            Made with love
          </p>
        </div>
      </div>
    </footer>
  );
}
