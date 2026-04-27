import React, { useRef } from 'react';

import { motion, useScroll, useTransform, useMotionTemplate } from 'motion/react';
import ScrollReveal from './ScrollReveal';
import ScrollVelocity from './ScrollVelocity';
import Lanyard from './Lanyard';

export const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: posterProgress } = useScroll({
    target: posterRef,
    offset: ['start 90%', 'end 20%'],
  });

  const pillOpacity = useTransform(posterProgress, [0.0, 0.15, 0.25], [0, 0.6, 1]);
  const pillX = useTransform(posterProgress, [0.0, 0.25], [-60, 0]);
  const pillBlurVal = useTransform(posterProgress, [0.0, 0.2], [12, 0]);
  const pillFilter = useMotionTemplate`blur(${pillBlurVal}px)`;
  const pillScale = useTransform(posterProgress, [0.0, 0.25], [0.9, 1]);

  const cardOpacity = useTransform(posterProgress, [0.08, 0.2, 0.32], [0, 0.6, 1]);
  const cardX = useTransform(posterProgress, [0.08, 0.32], [60, 0]);
  const cardBlurVal = useTransform(posterProgress, [0.08, 0.28], [12, 0]);
  const cardFilter = useMotionTemplate`blur(${cardBlurVal}px)`;
  const cardScale = useTransform(posterProgress, [0.08, 0.32], [0.9, 1]);

  const nameOpacity = useTransform(posterProgress, [0.18, 0.32, 0.45], [0, 0.6, 1]);
  const nameY = useTransform(posterProgress, [0.18, 0.45], [50, 0]);
  const nameBlurVal = useTransform(posterProgress, [0.18, 0.4], [10, 0]);
  const nameFilter = useMotionTemplate`blur(${nameBlurVal}px)`;

  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const portraitMaskStyle = {
    WebkitMaskImage:
      'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.08) 10%, rgba(0,0,0,0.34) 18%, rgba(0,0,0,0.76) 30%, black 42%)',
    maskImage:
      'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.08) 10%, rgba(0,0,0,0.34) 18%, rgba(0,0,0,0.76) 30%, black 42%)',
  };

  return (
    <section ref={containerRef} className="pt-24 sm:pt-32 pb-0 px-4 relative z-10 overflow-visible" id="about">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="glow-purple top-1/3 left-0 opacity-30"></div>
        <div className="glow-blue bottom-1/3 right-0 opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div
          ref={posterRef}
          data-video-scrub-end
          className="relative left-1/2 w-screen -translate-x-1/2 min-h-[550px] md:min-h-[700px] overflow-hidden mb-0"
        >
          <div className="absolute inset-0 pointer-events-none z-0">
            <div
              data-parallax-background
              className="absolute inset-0 bg-cover opacity-85 scale-105"
              style={{
                backgroundImage: "url('/tentangsaya.png')",
                backgroundPosition: 'center 10%',
                filter: 'brightness(1.38) saturate(1.2) contrast(1.06)',
              }}
            ></div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--overlay-section-top)_0%,var(--overlay-section-mid)_35%,var(--overlay-section-bottom)_100%)]"></div>
          </div>

          <div className="absolute top-8 md:top-16 inset-x-0 w-full pointer-events-none z-[1] overflow-hidden select-none">
            <ScrollVelocity
              texts={['Rizky Mema', 'Software Engineer']}
              velocity={80}
              className="scroll-velocity-bg"
              numCopies={6}
              damping={50}
              stiffness={400}
            />
          </div>



          <div className="relative z-10 max-w-7xl mx-auto w-full min-h-[550px] md:min-h-[700px] flex justify-center items-end pb-0 pt-16 md:pt-24 px-4 sm:px-6 lg:px-8">
            <motion.div
              style={{
                opacity: pillOpacity,
                x: pillX,
                scale: pillScale,
                filter: pillFilter,
              }}
              className="absolute top-[20%] md:top-[35%] left-4 lg:left-10 z-20 flex items-center gap-3 bg-bg-secondary/80 border border-border-subtle backdrop-blur-xl py-2 md:py-3 px-4 md:px-5 rounded-full shadow-2xl will-change-transform"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
              <span className="text-[10px] md:text-xs font-bold text-content-secondary uppercase tracking-widest">
                Terbuka untuk peluang baru
              </span>
            </motion.div>

            <motion.div
              style={{
                opacity: cardOpacity,
                x: cardX,
                scale: cardScale,
                filter: cardFilter,
              }}
              className="absolute top-[28%] md:top-[35%] right-4 lg:right-10 z-20 max-w-[220px] text-right hidden md:block will-change-transform"
            >
              <div className="bg-surface-hover backdrop-blur-xl p-4 md:p-5 rounded-2xl border border-border-subtle shadow-2xl">
                <p className="text-xs font-semibold text-content-secondary dark:text-content-muted uppercase tracking-widest leading-relaxed">
                  Spesialisasi dalam <br />
                  <strong className="text-content">AI Development</strong> <br />&{' '}
                  <strong className="text-content">Software Engineering</strong>
                </p>
              </div>
            </motion.div>

            <div className="relative z-10 w-full max-w-[320px] md:max-w-[450px] aspect-[3/4] flex items-end justify-center">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-2/3 bg-gradient-to-t from-blue-600/20 to-purple-600/20 blur-[80px] z-0 rounded-full"></div>

              <motion.div
                style={{ y: imageY, ...portraitMaskStyle }}
                className="relative z-10 w-full h-full flex items-end justify-center scale-[1.10] md:scale-[1.20] origin-bottom hover:scale-[1.15] md:hover:scale-[1.24] transition-transform duration-700"
              >
                <img
                  src="/fotoprofil.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-contain object-bottom scale-[1.03] opacity-16 blur-[16px] [filter:brightness(0)_invert(1)]"
                />
                <img
                  src="/fotoprofil.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-contain object-bottom scale-[1.012] opacity-28 [filter:brightness(0)_invert(1)]"
                />
                <img
                  src="/fotoprofil.png"
                  alt="Rizky Mema"
                  className="relative z-10 w-full h-full object-contain object-bottom [filter:drop-shadow(0_0_1px_rgba(255,255,255,0.42))_drop-shadow(0_0_16px_rgba(255,255,255,0.14))_drop-shadow(0_28px_58px_rgba(0,0,0,0.42))]"
                />
              </motion.div>
            </div>

            <div className="absolute inset-x-0 bottom-0 md:bottom-10 z-30 flex flex-col md:flex-row justify-between items-center md:items-end px-2 lg:px-0 pointer-events-none text-center md:text-left gap-4 md:gap-0 pb-6 md:pb-0">
              <motion.div
                style={{
                  opacity: nameOpacity,
                  y: nameY,
                  filter: nameFilter,
                }}
                className="will-change-transform"
              >
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <span className="text-3xl md:text-5xl lg:text-[70px] font-serif italic text-content-secondary mb-2 md:-mb-4 normal-case font-medium drop-shadow-lg z-20 relative">
                    Hello, I'm
                  </span>
                  <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-[120px] font-black text-content leading-[0.8] tracking-tighter uppercase drop-shadow-2xl relative z-10">
                    RIZKY MEMA
                  </h2>
                </div>
              </motion.div>

              <div className="md:text-right z-50 relative">
                <h2 className="text-3xl md:text-5xl lg:text-[80px] font-black text-content-secondary dark:text-content-muted leading-[0.85] tracking-tighter uppercase drop-shadow-2xl origin-bottom-right">
                  SOFTWARE <br />
                  ENGINEER
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-40 left-1/2 w-screen -translate-x-1/2 -mt-px">
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div
              data-parallax-background
              className="absolute inset-0 bg-cover bg-center opacity-80 scale-105"
              style={{
                backgroundImage: "url('/tentangsaya2.png')",
                filter: 'brightness(0.9) saturate(0.98) contrast(1.02)',
              }}
            ></div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--overlay-section-bottom)_0%,var(--overlay-section-mid)_35%,var(--overlay-section-bottom)_100%)]"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full text-center lg:text-left"
              >
                <div className="flex justify-center lg:justify-start mb-6">
                  <span className="pill border border-blue-500/20 text-blue-500 bg-blue-500/10 backdrop-blur-md">
                    Kenalan Lebih Dekat
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-content mb-10 tracking-tight leading-tight">
                  Fokus pada Solusi, Bukan Sekadar Kode
                </h3>

                <div className="text-content-muted text-lg md:text-xl leading-relaxed mb-6 font-medium text-left">
                  <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}>
                    Menempuh pendidikan S1 Sistem Informasi di Universitas Sam Ratulangi (Agustus 2021 - Agustus 2025).
                    Seorang Sarjana Komputer dengan keahlian di bidang pengembangan fullstack, kecerdasan buatan, dan
                    pembuatan konten digital. Berpengalaman membangun aplikasi web secara menyeluruh mulai dari antarmuka
                    pengguna (front-end) hingga logika server (back-end), mengoptimalkan tampilan dan kinerja sistem,
                    serta memastikan pengalaman pengguna yang optimal.
                  </ScrollReveal>
                </div>
                <div className="text-content-muted leading-relaxed text-base md:text-lg text-left">
                  <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}>
                    Memiliki kemampuan kolaborasi, kepemimpinan, dan pemecahan masalah yang baik, serta berkomitmen untuk
                    terus berkembang dan berkontribusi melalui solusi teknologi yang inovatif dan berdampak nyata.
                  </ScrollReveal>
                </div>
              </motion.div>

              {/* Lanyard Interactive Component */}
              <div className="w-full h-[450px] lg:h-[800px] lg:absolute lg:top-0 lg:right-0 lg:w-[50%] flex justify-center items-center pointer-events-none z-[999] overflow-visible">
                {/* Dibuat absolute terpusat dengan w dan h sangat besar (melebihi layar) agar area tarik luas */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] lg:w-[250%] h-[150%] pointer-events-auto scale-110 lg:scale-[1.20] overflow-visible">
                  {/* position Z didekatkan dari 10 ke 7 untuk mengkompensasi height kanvas yang membesar */}
                  <Lanyard position={[0, 0, 7]} gravity={[0, -40, 0]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};