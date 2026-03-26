import { motion } from "motion/react";
import Navigation from "./components/layout/Navigation";
import FloatingOrb from "./components/layout/FloatingOrb";
import VideoBackground from "./components/sections/VideoBackground";
import HeroDisplay from "./components/sections/HeroDisplay";
import MetricsGrid from "./components/sections/MetricsGrid";
import AutoPlaySequence from "./components/ui/AutoPlaySequence";
import ProcessSection from "./components/sections/ProcessSection";
import ServicesSection from "./components/sections/ServicesSection";
import ContactSection from "./components/sections/ContactSection";
import Footer from "./components/layout/Footer";
import CloudCursor from "./components/ui/CloudCursor";
import SideNav from "./components/layout/SideNav";


export default function App() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden relative w-full z-10">
      {/* <VideoBackground /> */}

      <div className="max-w-[1440px] mx-auto w-full flex flex-col flex-1 px-6 lg:px-16">
        <Navigation />

        <main id="home" className="flex-1 flex flex-col md:flex-row items-center justify-between w-full py-8 md:py-16 gap-12 md:gap-0 relative">

          <HeroDisplay />

          {/* Center Loop Block precisely camouflaged natively tracking against #a59383 backgrounds. */}
          <div className="relative z-0 flex w-full md:w-[480px] h-[680px] items-center justify-center pointer-events-none -mx-8 md:mx-0">
            <AutoPlaySequence />
            {/* Golden glow behind the frame */}
            <div
              className="absolute inset-0 pointer-events-none z-[-1]"
              style={{
                background: "radial-gradient(ellipse 45% 50% at center, rgba(197, 160, 89, 0.15) 0%, rgba(229, 193, 133, 0.06) 40%, transparent 70%)",
              }}
            />
          </div>

          <MetricsGrid />

        </main>
      </div>

      <ProcessSection />

      <ServicesSection />

      {/* Knotted infinity bond divider */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center py-8"
      >
        <div className="flex items-center gap-6">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#C5A059]/40" />
          <svg
            viewBox="0 0 160 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[140px]"
          >
            {/* Left ring */}
            <motion.circle
              cx="55"
              cy="40"
              r="28"
              stroke="url(#ringGold1)"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            {/* Right ring */}
            <motion.circle
              cx="105"
              cy="40"
              r="28"
              stroke="url(#ringGold2)"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
            />
            <defs>
              <linearGradient id="ringGold1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9C7942" />
                <stop offset="50%" stopColor="#E5C185" />
                <stop offset="100%" stopColor="#C5A059" />
              </linearGradient>
              <linearGradient id="ringGold2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#C5A059" />
                <stop offset="50%" stopColor="#E5C185" />
                <stop offset="100%" stopColor="#9C7942" />
              </linearGradient>
            </defs>
          </svg>
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#C5A059]/40" />
        </div>
        <p className="text-white/25 text-[10px] tracking-[0.3em] uppercase font-display mt-6">
          Bound together forever
        </p>
      </motion.div>

      <ContactSection />

      <Footer />

      <FloatingOrb />
      <CloudCursor />
      <SideNav />

      {/* Ambient atmosphere — fog & sun glow */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[0]"
        animate={{ opacity: [0, 0.12, 0.05, 0.15, 0] }}
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
        style={{
          background: "radial-gradient(ellipse at 75% 20%, rgba(255, 220, 130, 0.25) 0%, transparent 60%)",
        }}
      />
      <motion.div
        className="fixed inset-0 pointer-events-none z-[0]"
        animate={{ opacity: [0.05, 0.18, 0.08, 0.2, 0.05] }}
        transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
        style={{
          background: "radial-gradient(ellipse at 20% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 55%)",
        }}
      />
      <motion.div
        className="fixed inset-0 pointer-events-none z-[0]"
        animate={{ opacity: [0.03, 0.1, 0.15, 0.08, 0.03] }}
        transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
        style={{
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, transparent 40%, rgba(255, 255, 255, 0.03) 100%)",
        }}
      />

    </div>
  );
}
