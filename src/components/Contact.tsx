import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Mail } from 'lucide-react';

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
        
        {/* LEFT COLUMN: FORM */}
        <motion.div
          style={{ y: formY }}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col w-full justify-center"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <span className="stat-badge">Hubungi Saya</span>
            <a href="mailto:rhizkymema@gmail.com" className="group flex items-center gap-3 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 dark:text-blue-400 rounded-xl transition-colors border border-blue-500/20">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide">rhizkymema@gmail.com</span>
            </a>
          </div>
          
          <div className="bg-bg-secondary/60 border border-border-subtle rounded-3xl p-8 backdrop-blur-md w-full shadow-lg">
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
              <button className="btn-primary w-full justify-center transition-all duration-300 hover:scale-105 hover:brightness-110 py-3.5">
                Kirim Pesan Sekarang
              </button>
            </form>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: PHOTO & EMAIL */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col justify-center md:pl-8"
        >
          <div className="overflow-hidden rounded-3xl border border-border-subtle shadow-2xl bg-surface relative group w-full max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
            <img 
              src="/foto1.png" 
              alt="Foto Rizky Mema" 
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
  );
};

