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
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-medium gold-text mb-4">
            My Process
          </h2>
          <p className="text-white/50 text-lg max-w-md mx-auto">
            How we create your perfect ceremony together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1: Steps 1 & 2 */}
          <div className="flex flex-col gap-16">
            {steps.slice(0, 2).map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative group"
              >
                <span className="text-6xl font-display font-bold text-white/5 absolute -top-6 -left-2">
                  {step.number}
                </span>
                <div className="pt-8">
                  <div className="w-8 h-[2px] bg-[#C5A059] mb-5 group-hover:w-12 transition-all duration-300" />
                  <h3 className="text-xl font-display font-medium text-white/90 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Column 2: Video sequence */}
          <div className="relative h-[500px] hidden md:flex items-center justify-center">
            <AutoPlaySequence folder="/frames/frames/my-process/ezgif-500fc0a49943b367-jpg" frameCount={31} blend />
          </div>

          {/* Column 3: Steps 3 & 4 */}
          <div className="flex flex-col gap-16">
            {steps.slice(2, 4).map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i + 2) * 0.15 }}
                className="relative group"
              >
                <span className="text-6xl font-display font-bold text-white/5 absolute -top-6 -left-2">
                  {step.number}
                </span>
                <div className="pt-8">
                  <div className="w-8 h-[2px] bg-[#C5A059] mb-5 group-hover:w-12 transition-all duration-300" />
                  <h3 className="text-xl font-display font-medium text-white/90 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
