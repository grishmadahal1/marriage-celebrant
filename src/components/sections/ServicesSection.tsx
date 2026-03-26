import { motion } from "motion/react";
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
    <section ref={sectionRef} className="relative overflow-hidden py-32" style={{ scrollSnapAlign: "start" }}>
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
        </motion.div>

        {/* Divider */}
        <div className="flex items-center justify-center mb-32">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C5A059]/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]/50 mx-4" />
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C5A059]/30" />
        </div>

        {/* Why section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h3 className="text-3xl md:text-4xl font-display font-medium text-white/90 mb-4">
            Making Legal <span className="gold-text">Legendary</span>
          </h3>
          <p className="text-white/50 max-w-lg mx-auto">
            A celebration, not an obligation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 max-w-4xl mx-auto mb-32">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="w-8 h-[2px] bg-[#C5A059] mb-5 group-hover:w-14 transition-all duration-300" />
              <h4 className="text-lg font-display font-medium text-white/90 mb-3">
                {feature.title}
              </h4>
              <p className="text-white/50 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

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
