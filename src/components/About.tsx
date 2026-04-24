import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import ScrollReveal from './ScrollReveal';
import BlurText from './BlurText';
import TextPressure from './TextPressure';

export const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Efek parallax: gambar bergerak dari Y 80 ke Y -80 saat digulir
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={containerRef} className="py-24 sm:py-32 px-4 relative z-10" id="about">
      {/* Glowing background shapes — contained so they don't escape section bounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="glow-purple top-1/3 left-0 opacity-30"></div>
        <div className="glow-blue bottom-1/3 right-0 opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">

        {/* 1. Magazine Poster Layout Section */}
        <div data-video-scrub-end className="relative w-full min-h-[550px] md:min-h-[700px] flex justify-center items-end pb-0 mb-20 pt-16 md:pt-24 border-b border-white/[0.05]">

          {/* Background Italic Text */}
          <div className="absolute top-10 md:top-20 inset-x-0 w-full text-center pointer-events-none z-0 overflow-hidden">
            <h2 className="text-[100px] md:text-[200px] lg:text-[200px] font-serif italic text-black/[0.15] dark:text-white/[0.10] tracking-tighter leading-[0.8] select-none flex justify-center">
              <TextPressure
                text="Tentang Saya"
                flex
                alpha={false}
                stroke={false}
                width
                weight
                italic
                textColor="inherit"
              />
            </h2>
          </div>

          {/* Floating Elements */}
          {/* Left Pill */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute top-[20%] md:top-[35%] left-4 lg:left-10 z-20 flex items-center gap-3 bg-white/40 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 backdrop-blur-xl py-2 md:py-3 px-4 md:px-5 rounded-full shadow-2xl"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
            <span className="text-[10px] md:text-xs font-bold text-slate-800 dark:text-slate-300 uppercase tracking-widest">Terbuka untuk peluang baru</span>
          </motion.div>

          {/* Right Desc */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute top-[28%] md:top-[35%] right-4 lg:right-10 z-20 max-w-[220px] text-right hidden md:block"
          >
            <div className="bg-white/10 dark:bg-white/[0.03] backdrop-blur-xl p-4 md:p-5 rounded-2xl border border-black/10 dark:border-white/10 shadow-2xl">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-400 uppercase tracking-widest leading-relaxed">
                Spesialisasi dalam <br /><strong className="text-slate-900 dark:text-white">AI Development</strong> <br />& <strong className="text-slate-900 dark:text-white">Software Engineering</strong>
              </p>
            </div>
          </motion.div>

          {/* Profile Image Wrapper */}
          <div className="relative z-10 w-full max-w-[320px] md:max-w-[450px] aspect-[3/4] flex items-end justify-center">
            {/* Ambient Glow behind user */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-2/3 bg-gradient-to-t from-blue-600/20 to-purple-600/20 blur-[80px] z-0 rounded-full"></div>

            {/* User's Actual Image Tag */}
            <motion.img
              src="/fotoprofil.png"
              alt="Rizky Mema"
              style={{ 
                y: imageY, 
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)', 
                maskImage: 'linear-gradient(to top, transparent 0%, black 15%)' 
              }}
              className="w-full h-full object-contain object-bottom scale-[1.15] md:scale-[1.25] origin-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 hover:scale-[1.20] md:hover:scale-[1.30] transition-transform duration-700"
            />
          </div>

          {/* Bottom Texts Layer */}
          <div className="absolute inset-x-0 bottom-0 md:bottom-10 z-30 flex flex-col md:flex-row justify-between items-center md:items-end px-2 lg:px-0 pointer-events-none text-center md:text-left gap-4 md:gap-0 pb-6 md:pb-0">

            {/* Bottom Left Huge Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <span className="text-3xl md:text-5xl lg:text-[70px] font-serif italic text-slate-700 dark:text-slate-300 mb-2 md:-mb-4 normal-case font-medium drop-shadow-lg z-20 relative">
                  <BlurText text="Hello, I'm" delay={200} animateBy="words" direction="top" className="inline-flex" />
                </span>
                <h2 className="text-6xl md:text-8xl lg:text-[120px] font-black text-slate-900 dark:text-white leading-[0.8] tracking-tighter uppercase drop-shadow-2xl relative z-10">
                  <BlurText text="RIZKY MEMA" delay={200} animateBy="words" direction="top" className="inline-flex" />
                </h2>
              </div>
            </motion.div>

            {/* Bottom Right Huge Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:text-right"
            >
              <h2 className="text-3xl md:text-5xl lg:text-[80px] font-black text-slate-700 dark:text-slate-400 leading-[0.85] tracking-tighter uppercase drop-shadow-2xl">
                <BlurText text="SOFTWARE" delay={200} animateBy="words" direction="top" className="inline-flex" /> <br />
                <BlurText text="ENGINEER" delay={200} animateBy="words" direction="top" className="inline-flex" />
              </h2>
            </motion.div>

          </div>
        </div>

        {/* 2. Text Details & Education (Below Poster) */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start relative z-40 max-w-5xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="pill mb-6 border border-blue-500/20 text-blue-500 bg-blue-500/10 backdrop-blur-md">✨ Kenalan Lebih Dekat</span>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">Fokus pada Solusi, Bukan Sekadar Kode</h3>
            <div className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6 font-medium">
              <ScrollReveal
                baseOpacity={0.1}
                enableBlur
                baseRotation={3}
                blurStrength={4}
              >
                Sarjana Komputer dengan keahlian di bidang pengembangan fullstack, kecerdasan buatan, dan pembuatan konten digital. Berpengalaman membangun aplikasi web secara menyeluruh mulai dari antarmuka pengguna (front-end) hingga logika server (back-end), mengoptimalkan tampilan dan kinerja sistem, serta memastikan pengalaman pengguna yang optimal.
              </ScrollReveal>
            </div>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
              <ScrollReveal
                baseOpacity={0.1}
                enableBlur
                baseRotation={3}
                blurStrength={4}
              >
                Memiliki kemampuan kolaborasi, kepemimpinan, dan pemecahan masalah yang baik, serta berkomitmen untuk terus berkembang dan berkontribusi melalui solusi teknologi yang inovatif dan berdampak nyata.
              </ScrollReveal>
            </div>
          </motion.div>

          {/* Education Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card hover:-translate-y-2 transition-all duration-500 overflow-hidden relative group"
          >
            {/* Subtle hover effect background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <h4 className="flex items-center text-xl font-extrabold mb-8 text-slate-900 dark:text-white">
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-black/5 dark:border-white/10 flex items-center justify-center mr-4 text-2xl shadow-lg">🎓</span>
                Pendidikan & Riset
              </h4>

              <div className="mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                  <strong className="text-slate-900 dark:text-white text-lg tracking-tight">S1 Sistem Informasi</strong>
                  <span className="text-[10px] px-3 py-1.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full font-bold text-blue-500 uppercase tracking-widest shadow-inner">Agustus 2021 - Agustus 2025</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Universitas Sam Ratulangi</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-300 mt-2">IPK: <span className="text-blue-500">3.75 / 4.00</span></p>
              </div>

              <div className="pt-8 border-t border-black/5 dark:border-white/5">
                <strong className="text-xs text-slate-600 dark:text-slate-500 uppercase tracking-widest block mb-3 font-bold">Skripsi:</strong>
                <p className="text-slate-900 dark:text-white text-base font-medium mb-6 leading-relaxed">"Identifikasi Penyakit Mosaik Tanaman Nilam Menggunakan Arsitektur MobileNetV2" </p>

                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-300 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">PYTHON</span>
                  <span className="text-[10px] font-bold text-purple-600 dark:text-purple-300 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full">TENSORFLOW</span>
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-300 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">MOBILENETV2</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};


