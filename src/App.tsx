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

export default function App() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden relative w-full z-10">
      {/* <VideoBackground /> */}

      <div className="max-w-[1440px] mx-auto w-full flex flex-col flex-1 px-6 lg:px-16">
        <Navigation />

        <main className="flex-1 flex flex-col md:flex-row items-center justify-between w-full py-8 md:py-16 gap-12 md:gap-0">

          <HeroDisplay />

          {/* Center Loop Block precisely camouflaged natively tracking against #a59383 backgrounds. */}
          <div className="relative z-0 flex w-full md:w-[480px] h-[680px] items-center justify-center pointer-events-none -mx-8 md:mx-0">
            <AutoPlaySequence />
          </div>

          <MetricsGrid />

        </main>
      </div>

      <ProcessSection />

      <ServicesSection />

      <ContactSection />

      <Footer />

      <FloatingOrb />
    </div>
  );
}
