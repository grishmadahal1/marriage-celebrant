import { motion } from "motion/react";
import AutoPlaySequence from "../ui/AutoPlaySequence";

const steps = [
  {
    number: "01",
    title: "First Meeting",
    description: "We chat about your vision — the who, when, what and where.",
  },
  {
    number: "02",
    title: "Ceremony Design",
    description: "We get to know each other and craft a ceremony that's uniquely yours.",
  },
  {
    number: "03",
    title: "Review & Refine",
    description: "We finalise every detail, rehearse if needed, and lock it all in.",
  },
  {
    number: "04",
    title: "Your Special Day",
    description: "Sit back, relax, and enjoy every moment. We've got it covered.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" data-cloud-cursor className="min-h-screen flex items-center justify-center" style={{ cursor: "none" }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full">
        <div className="flex flex-col md:flex-row gap-20 lg:gap-32 items-start">

          {/* Left side — heading & subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-[45%] md:sticky md:top-32 shrink-0"
          >
            <p className="text-[#C5A059] text-xs font-medium tracking-[0.3em] uppercase mb-6">
              My Process
            </p>
            <h2 className="text-4xl md:text-[3.5rem] font-display font-medium leading-[1.1] mb-6">
              <span className="gold-text">How we create</span>
              <br />
              <span className="text-white/40 font-serif italic">your perfect ceremony</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed max-w-sm mb-10">
              From the first conversation to your special day — every step is personal, relaxed, and all about you.
            </p>

            {/* Frame sequence */}
            <div className="relative h-[400px] hidden md:flex items-center justify-center">
              <AutoPlaySequence folder="/frames/frames/my-process/ezgif-500fc0a49943b367-jpg" frameCount={31} blend />
            </div>
          </motion.div>

          {/* Right side — numbered steps list */}
          <div className="flex-1 w-full">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="border-t border-white/10 py-8 flex items-start justify-between gap-8 group">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-display font-medium text-white/90 group-hover:text-[#C5A059] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed mt-2 max-w-lg">
                      {step.description}
                    </p>
                  </div>
                  <span className="text-white/20 text-sm font-display font-medium tracking-wide shrink-0 pt-1">
                    {step.number}
                  </span>
                </div>
              </motion.div>
            ))}
            {/* Bottom border */}
            <div className="border-t border-white/10" />
          </div>

        </div>
      </div>
    </section>
  );
}
