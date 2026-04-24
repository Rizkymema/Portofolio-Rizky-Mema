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
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Punya ide aplikasi, sistem AI, atau butuh pembicara untuk webinar tech? Saya selalu terbuka untuk diskusi dan kolaborasi.
          </p>

          <div className="space-y-6">
            <a href="mailto:rhizkymema@gmail.com" className="group relative flex items-center gap-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-4 rounded-2xl hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 hover:border-white/20 hover:-translate-y-1">
              <div className="absolute -inset-px rounded-2xl border border-gray-400/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true"></div>
              <div className="relative w-12 h-12 bg-black/5 dark:bg-white/5 rounded-xl flex items-center justify-center text-xl">
                ✉️
              </div>
              <div className="relative">
                <strong className="block text-slate-900 dark:text-white">Email</strong>
                <span className="text-sm text-slate-600 dark:text-slate-400">rhizkymema@gmail.com</span>
              </div>
            </a>

            <a href="https://wa.me/6285242083263" target="_blank" rel="noreferrer" className="group relative flex items-center gap-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-4 rounded-2xl hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 hover:border-white/20 hover:-translate-y-1">
              <div className="absolute -inset-px rounded-2xl border border-green-400/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true"></div>
              <div className="relative w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-xl border border-green-500/20">
                📱
              </div>
              <div className="relative">
                <strong className="block text-slate-900 dark:text-white">WhatsApp</strong>
                <span className="text-sm text-slate-600 dark:text-slate-400">+62 852-4208-3263</span>
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
          className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-md self-center"
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Nama Lengkap</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 pb-2 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-black/10 dark:border-white/10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition shadow-inner text-slate-900 dark:text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email</label>
                <input type="email" placeholder="john@company.com" className="w-full px-4 py-3 pb-2 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-black/10 dark:border-white/10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition shadow-inner text-slate-900 dark:text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pesan / Diskusi</label>
              <textarea placeholder="Ceritakan detail project atau kolaborasi..." className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-slate-900/80 border border-black/10 dark:border-white/10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition h-32 resize-none shadow-inner text-slate-900 dark:text-white" />
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

