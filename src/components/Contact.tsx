import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY1 = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [-50, 60]);
  const formY  = useTransform(scrollYProgress, [0, 0.6], [40, 0]);

  return (
  <section ref={sectionRef} className="py-24 px-6 sm:px-12 relative overflow-hidden" id="contact">

    <div className="absolute inset-0 pointer-events-none z-0">
      <div
        data-parallax-background
        className="absolute inset-0 bg-cover bg-center opacity-80 scale-105"
        style={{
          backgroundImage: "url('/kontak.png')",
          filter: 'brightness(0.88) saturate(0.98) contrast(1.04)'
        }}
      ></div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--overlay-section-top)_0%,var(--overlay-section-mid)_35%,var(--overlay-section-bottom)_100%)]"></div>
    </div>

    {/* Parallax glow orbs behind the card */}
    <motion.div
      style={{ y: bgY1 }}
      className="absolute -top-10 left-1/4 w-[500px] h-[500px] bg-blue-500/[0.06] dark:bg-blue-500/[0.08] rounded-full blur-3xl pointer-events-none"
    />
    <motion.div
      style={{ y: bgY2 }}
      className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/[0.05] dark:bg-purple-500/[0.07] rounded-full blur-3xl pointer-events-none"
    />

    <div className="max-w-6xl mx-auto glass-card relative z-10">
      <div className="glow-blue max-w-full hidden md:block"></div>
      <div className="grid md:grid-cols-2 gap-16 relative z-10 p-0 md:p-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className="stat-badge">Hubungi Saya</span>
          <h3 className="hero-text !text-[44px] pb-2 mb-6">Mari Kolaborasi & Ciptakan Impact Nyata</h3>
          <p className="text-content-muted mb-8 leading-relaxed">
            Punya ide aplikasi, sistem AI, atau butuh pembicara untuk webinar tech? Saya selalu terbuka untuk diskusi dan kolaborasi.
          </p>

          <div className="space-y-6">
            <a href="mailto:rhizkymema@gmail.com" className="group relative flex items-center gap-4 bg-bg-secondary border border-border-subtle p-4 rounded-2xl hover:bg-bg-tertiary transition-all duration-300 hover:border-border-strong hover:-translate-y-1">
              <div className="absolute -inset-px rounded-2xl border border-gray-400/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true"></div>
              <div className="relative w-12 h-12 bg-surface rounded-xl flex items-center justify-center text-xl">
                ✉️
              </div>
              <div className="relative">
                <strong className="block text-content">Email</strong>
                <span className="text-sm text-content-muted">rhizkymema@gmail.com</span>
              </div>
            </a>

            <a href="https://wa.me/6285242083263" target="_blank" rel="noreferrer" className="group relative flex items-center gap-4 bg-surface border border-border-subtle p-4 rounded-2xl hover:bg-black/10 dark:hover:bg-surface-hover transition-all duration-300 hover:border-border-strong hover:-translate-y-1">
              <div className="absolute -inset-px rounded-2xl border border-green-400/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true"></div>
              <div className="relative w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-xl border border-green-500/20">
                📱
              </div>
              <div className="relative">
                <strong className="block text-content">WhatsApp</strong>
                <span className="text-sm text-content-muted">+62 852-4208-3263</span>
              </div>
            </a>
          </div>
        </motion.div>

        <motion.div
          style={{ y: formY }}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-bg-secondary/60 border border-border-subtle rounded-3xl p-8 backdrop-blur-md self-center"
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-content-muted uppercase tracking-widest">Nama Lengkap</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 pb-2 rounded-xl bg-surface border border-border-subtle focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition shadow-inner text-content" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-content-muted uppercase tracking-widest">Email</label>
                <input type="email" placeholder="john@company.com" className="w-full px-4 py-3 pb-2 rounded-xl bg-surface border border-border-subtle focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition shadow-inner text-content" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-content-muted uppercase tracking-widest">Pesan / Diskusi</label>
              <textarea placeholder="Ceritakan detail project atau kolaborasi..." className="w-full px-4 py-3 rounded-xl bg-surface border border-border-subtle focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition h-32 resize-none shadow-inner text-content" />
            </div>
            <button className="btn-primary w-full justify-center transition-all duration-300 hover:scale-105 hover:brightness-110">
              Kirim Pesan Sekarang
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  </section>
  );
};

