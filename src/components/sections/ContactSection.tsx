import { motion } from "motion/react";
import { useRef, useState } from "react";

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");

    try {
      const res = await fetch("https://formsubmit.co/ajax/grishma.dahal1@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(formRef.current))),
      });

      if (res.ok) {
        setStatus("sent");
        formRef.current.reset();
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center scroll-mt-0" style={{ scrollSnapAlign: "start" }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center justify-center">

          {/* Left — The Man */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-end"
          >
            <div className="relative">
              <div
                className="absolute inset-0 -inset-x-12 -inset-y-8 rounded-full blur-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center 60%, rgba(197,160,89,0.15) 0%, rgba(197,160,89,0.05) 40%, transparent 70%)",
                }}
              />
              <div className="bg-[#1c1c1c] border border-[#C5A059]/30 rounded-2xl rounded-bl-none px-4 py-2 shadow-lg absolute -top-6 left-1/2 -translate-x-1/2 z-10">
                <p className="text-white/80 text-xs font-display whitespace-nowrap">
                  Let's make it happen!
                </p>
              </div>
              <img
                src="/frames/frames/contact/theman.png"
                alt="Steven Conroy"
                className="h-[400px] md:h-[500px] object-contain drop-shadow-2xl relative z-[1]"
              />
            </div>
          </motion.div>

          {/* Right — Lanyard Card Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col items-center"
          >
            {/* Lanyard strap */}
            <div className="flex flex-col items-center mb-0">
              {/* Attachment point */}
              <div className="w-3 h-3 rounded-full bg-[#C5A059] shadow-md" />
              {/* Strap */}
              <div className="w-[2px] h-10 bg-gradient-to-b from-[#C5A059] to-[#C5A059]/50" />
              {/* Metal clip */}
              <div className="w-8 h-4 bg-gradient-to-b from-[#d4d4d4] to-[#999] rounded-b-sm border border-white/20 flex items-center justify-center">
                <div className="w-4 h-[2px] bg-white/40 rounded-full" />
              </div>
            </div>

            {/* Badge card */}
            <motion.div
              animate={{ rotate: [-1, 1, -1] }}
              transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
              className="relative"
              style={{ transformOrigin: "top center" }}
            >
              {/* Hole punch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white/10 z-10" />

              <div
                className="w-[340px] md:w-[380px] rounded-2xl p-8 pt-10 shadow-2xl"
                style={{
                  background: "linear-gradient(160deg, #1c1c1c 0%, #141414 50%, #1a1a1a 100%)",
                  border: "1px solid rgba(197, 160, 89, 0.2)",
                }}
              >
                {/* Card header */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-display font-medium gold-text mb-1">
                    Get in Touch
                  </h2>
                  <p className="text-white/40 text-xs tracking-wider uppercase">
                    Let's plan your perfect day
                  </p>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]/30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]/40" />
                  <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]/30" />
                </div>

                <form ref={formRef} className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <input type="hidden" name="_subject" value="New Wedding Enquiry" />
                  <input type="hidden" name="_captcha" value="false" />

                  <div>
                    <label className="text-white/40 text-[10px] tracking-[0.15em] uppercase block mb-1.5 font-display">
                      Your Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Full name"
                      required
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white/90 placeholder:text-white/15 focus:outline-none focus:border-[#C5A059]/40 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-white/40 text-[10px] tracking-[0.15em] uppercase block mb-1.5 font-display">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="you@email.com"
                      required
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white/90 placeholder:text-white/15 focus:outline-none focus:border-[#C5A059]/40 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-white/40 text-[10px] tracking-[0.15em] uppercase block mb-1.5 font-display">
                      Phone
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Your number"
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white/90 placeholder:text-white/15 focus:outline-none focus:border-[#C5A059]/40 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-white/40 text-[10px] tracking-[0.15em] uppercase block mb-1.5 font-display">
                      Your Vision
                    </label>
                    <textarea
                      name="vision"
                      rows={3}
                      placeholder="Tell me about your special day..."
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white/90 placeholder:text-white/15 focus:outline-none focus:border-[#C5A059]/40 transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-3 bg-[#C5A059] text-[#1a1a1a] rounded-lg text-sm font-semibold font-display tracking-wide hover:bg-[#E5C185] transition-colors mt-1 disabled:opacity-60"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === "sending" ? "Sending..." : status === "sent" ? "Sent! We'll be in touch." : status === "error" ? "Something went wrong" : "Send Enquiry"}
                  </motion.button>
                </form>

                {/* Card footer */}
                <div className="mt-5 flex items-center justify-center gap-2">
                  <div className="w-6 h-6 bg-[#C19E61] rounded-full flex items-center justify-center">
                    <span className="text-[8px] font-display font-bold text-white">SC</span>
                  </div>
                  <span className="text-white/25 text-[10px] font-display tracking-wider">STEVEN CONROY — CELEBRANT</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
