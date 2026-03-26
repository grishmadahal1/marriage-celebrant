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
    <section className="min-h-screen flex items-center justify-center scroll-mt-0" style={{ scrollSnapAlign: "start" }}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-medium gold-text mb-4">
            Get in Touch
          </h2>
          <p className="text-white/50 text-lg max-w-md mx-auto">
            Let's start planning your perfect day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Left column: The Man */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-end"
          >
            <div className="relative">
              {/* Golden spotlight glow behind the man */}
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

          {/* Middle column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center justify-center"
          >
            <div className="w-full bg-[#1c1c1c]/90 backdrop-blur-sm border border-[#C5A059]/20 rounded-2xl p-8 shadow-2xl">
              <form ref={formRef} className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <input type="hidden" name="_subject" value="New Wedding Enquiry" />
                <input type="hidden" name="_captcha" value="false" />
                <div>
                  <label className="text-white/50 text-xs tracking-wider uppercase block mb-2 font-display">
                    Your Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Full name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-[#C5A059]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-white/50 text-xs tracking-wider uppercase block mb-2 font-display">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-[#C5A059]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-white/50 text-xs tracking-wider uppercase block mb-2 font-display">
                    Phone
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Your number"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-[#C5A059]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-white/50 text-xs tracking-wider uppercase block mb-2 font-display">
                    Your Vision
                  </label>
                  <textarea
                    name="vision"
                    rows={3}
                    placeholder="Tell me about your special day..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-[#C5A059]/50 transition-colors resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3.5 bg-[#C5A059] text-[#1a1a1a] rounded-xl text-sm font-semibold font-display tracking-wide hover:bg-[#E5C185] transition-colors mt-2 disabled:opacity-60"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === "sending" ? "Sending..." : status === "sent" ? "Sent! We'll be in touch." : status === "error" ? "Something went wrong" : "Send Enquiry"}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right column: empty to match layout */}
          <div />
        </div>
      </div>
    </section>
  );
}
