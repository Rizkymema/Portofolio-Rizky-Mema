import React from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, Github, Instagram, Facebook, Linkedin } from 'lucide-react';
import TextType from './TextType';

const TikTokIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const Hero = () => {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const videoFrameRef = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const overlayRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const section = sectionRef.current;
    const videoFrame = videoFrameRef.current;
    const video = videoRef.current;
    const overlay = overlayRef.current;

    if (!section || !videoFrame || !video || !overlay) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const refreshOnMetadata = () => ScrollTrigger.refresh();
    video.addEventListener('loadedmetadata', refreshOnMetadata);

    const ctx = gsap.context(() => {
      gsap.set(videoFrame, {
        clipPath: 'inset(0% 0% 0% 0% round 0rem)',
      });

      gsap.set(video, {
        scale: 1,
        yPercent: 0,
        transformOrigin: 'center center',
      });

      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=115%',
          scrub: 1.35,
          fastScrollEnd: false,
          invalidateOnRefresh: true,
          snap: {
            snapTo: [0, 1],
            delay: 0.08,
            directional: true,
            inertia: false,
            duration: { min: 0.35, max: 0.7 },
            ease: 'power3.inOut',
          },
        },
      })
      .to(videoFrame, {
        clipPath: 'inset(4% 3% 7% 3% round 1.75rem)',
      }, 0)
      .to(video, {
        scale: 1.08,
        yPercent: 3,
      }, 0)
      .to(overlay, {
        opacity: 0.86,
      }, 0);
    }, section);

    return () => {
      video.removeEventListener('loadedmetadata', refreshOnMetadata);
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* Section with transform must be AFTER the fixed video div */}
      <section
        ref={sectionRef}
        id="home"
        className="relative w-full -mt-32"
      >
      {/* Background layer dipindahkan ke dalam section agar hanya muncul di beranda */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden transition-colors duration-500" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="absolute inset-0 bg-[url('/begrund1.png')] bg-cover bg-center bg-no-repeat opacity-85 transition-opacity duration-500" />
        <div ref={videoFrameRef} className="absolute inset-0 overflow-hidden will-change-transform">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover opacity-30 dark:opacity-45 will-change-transform"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/begrund1.png"
            aria-hidden="true"
          >
            <source src="/video/video1.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Lapisan overlay agar teks tetap mudah dibaca */}
        <div ref={overlayRef} className="absolute inset-0 bg-[linear-gradient(180deg,var(--overlay-dense)_0%,var(--overlay-light)_35%,var(--overlay-mid)_100%)] transition-colors duration-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.1),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.05),transparent_35%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.28),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_35%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48" style={{ background: `linear-gradient(to top, var(--bg-primary), transparent)` }} />
      </div>
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] items-center px-6 pb-8 pt-32 sm:px-12">

        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex w-full max-w-2xl flex-col items-start text-left"
          >
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="pill !mb-0 !border-blue-500/30 !bg-blue-500/10 !text-accent-primary font-bold">Halo, Saya Rizky</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-content-secondary">Terbuka Untuk Kolaborasi</span>

            </div>

            <h1 className="mb-6 mt-2 flex flex-col min-h-[140px] whitespace-pre-line text-left text-4xl sm:text-5xl leading-[0.95] font-extrabold tracking-[-0.04em] text-content md:text-[64px] lg:text-[72px]">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white/90 mb-1"
                style={{ fontFamily: "serif" }}
              >
                Hello, I'm
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.5, ease: "backOut" }}
                className="uppercase tracking-tight text-white mb-2"
              >
                RIZKY MEMA
              </motion.span>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
              >
                <TextType
                  text={["SOFTWARE ENGINEER"]}
                  typingSpeed={75}
                  pauseDuration={3000}
                  showCursor
                  cursorCharacter="_"
                  deletingSpeed={50}
                  variableSpeedEnabled={false}
                  variableSpeedMin={60}
                  variableSpeedMax={120}
                  cursorBlinkDuration={0.5}
                />
              </motion.div>
            </h1>

            <p className="mb-10 max-w-xl text-base sm:text-lg leading-relaxed text-content-secondary">
              Yang mengkhususkan diri pada Pengembangan AI & Aplikasi Web, sekaligus Kreator Konten di berbagai platform.
            </p>

            <div className="mb-16 flex flex-col sm:flex-row flex-wrap justify-start gap-4 w-full sm:w-auto">
              <a href="#projects" className="btn-primary group pb-3 pt-3 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 w-full sm:w-auto text-center justify-center">
                Lihat Karya Saya <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 inline-block" />
              </a>
              <a href="#contact" className="btn-secondary group border-border-strong bg-surface-hover !text-content pb-3 pt-3 hover:bg-surface-hover transition-all duration-300 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/10 hover:-translate-y-0.5 w-full sm:w-auto text-center justify-center">
                Unduh CV <ArrowDown size={16} className="transition-transform group-hover:translate-y-1 inline-block" />
              </a>
            </div>

            <div className="mt-auto flex w-full flex-col items-start justify-between gap-8 border-t border-border-subtle pt-8 sm:flex-row sm:items-center sm:gap-0">
              <div className="flex items-center gap-3 text-content-secondary">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-surface-hover animate-bounce">
                  <ArrowDown size={16} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest">Gulir ke Bawah</span>
              </div>

              <div className="flex items-center gap-3">
                <a href="https://github.com/Rizkymema" target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-surface-hover text-content transition-all duration-300 hover:-translate-y-1 hover:bg-surface-hover hover:text-content hover:shadow-lg hover:shadow-white/10" aria-label="GitHub">
                  <Github size={18} />
                </a>
                <a href="https://www.instagram.com/rizkymema?igsh=cGJ5NjBuZm41NXc2" target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-surface-hover text-content transition-all duration-300 hover:-translate-y-1 hover:bg-surface-hover hover:text-pink-200 hover:shadow-lg hover:shadow-pink-500/20" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="https://www.tiktok.com/@rizkymema?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-surface-hover text-content transition-all duration-300 hover:-translate-y-1 hover:bg-surface-hover hover:text-content hover:shadow-lg hover:shadow-cyan-400/20" aria-label="TikTok">
                  <TikTokIcon size={18} />
                </a>
                <a href="https://www.linkedin.com/in/rizky-mema-947336370" target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-surface-hover text-content transition-all duration-300 hover:-translate-y-1 hover:bg-surface-hover hover:text-blue-300 hover:shadow-lg hover:shadow-blue-500/20" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href="https://www.facebook.com/share/1Dr3PUE4oP/" target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-surface-hover text-content transition-all duration-300 hover:-translate-y-1 hover:bg-surface-hover hover:text-blue-200 hover:shadow-lg hover:shadow-blue-400/20" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex h-full w-full flex-col items-center justify-center gap-5 lg:items-end"
          >
            {/* Ambient glow behind the whole right column */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-transparent blur-[90px] opacity-70" />

            {/* ── Photo – no frame, just the image ── */}
            <div className="relative flex w-full max-w-[420px] justify-center lg:justify-end">
              {/* Backglow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-2/5 bg-gradient-to-t from-blue-900/20 to-transparent -z-10 blur-3xl"></div>
              
              <img
                src="/foto1.png"
                alt="Rhizky"
                className="h-[480px] max-h-[55vh] w-auto object-contain object-bottom drop-shadow-2xl"
                loading="eager"
                draggable={false}
                style={{ 
                  WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%)',
                  maskImage: 'linear-gradient(to top, transparent 0%, black 15%)' 
                }}
              />
            </div>

            {/* ── Stats grid ── */}
            <div className="grid w-full max-w-[420px] grid-cols-2 gap-3">
              {[
                { value: '10+',   label: 'Project Selesai' },
                { value: '3+',    label: 'Tahun Experience' },
                { value: '500K+', label: 'Total Views' },
                { value: '15K+',  label: 'Followers Aktif' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col justify-center rounded-[20px] border border-border-subtle bg-surface p-4 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-surface-hover hover:shadow-blue-500/10"
                >
                  <span className="mb-0.5 text-3xl font-extrabold leading-none text-content">{value}</span>
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-content-muted">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      </section>
    </>
  );
};


