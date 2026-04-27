import React from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { HighlightSkills } from './HighlightSkills';
import localFont from 'next/font/local';

const runtimeFont = localFont({ src: '../../public/assets/font/font Runtime/RuntimeRegular-m2Odx.otf' });

export const Hero = () => {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const section = sectionRef.current;

    if (!section) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.15,
          invalidateOnRefresh: true,
        },
      })
        .to('.hero-copy, .hero-highlight-strip', {
          opacity: 1,
          y: 0,
        }, 0)
        .to('.hero-copy, .hero-highlight-strip', {
          opacity: 0,
          y: -28,
        }, 0.48)
        .to('.hero-backdrop', {
          opacity: 0.2,
          scale: 1.03,
        }, 0.48)
        .to('.hero-video', {
          scale: 1.04,
          yPercent: -4,
        }, 0.48);
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* Section with transform must be AFTER the fixed video div */}
      <section
        ref={sectionRef}
        id="home"
        className="relative -mt-32 flex min-h-[100svh] w-full items-center justify-center overflow-visible"
      >
        <div className="hero-backdrop pointer-events-none absolute inset-0 z-0 overflow-hidden transition-transform duration-500" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.2),transparent_28%),radial-gradient(circle_at_18%_78%,rgba(14,165,233,0.12),transparent_22%),radial-gradient(circle_at_80%_24%,rgba(37,99,235,0.2),transparent_30%),linear-gradient(180deg,#081120_0%,#0d1c34_48%,#08111d_100%)]" />
          <video
            className="hero-video absolute inset-0 h-full w-full object-cover object-[center_18%] opacity-100 will-change-transform sm:object-[center_16%]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src="/video/video1.mp4" type="video/mp4" />
          </video>
          <div className="absolute left-1/2 top-[18%] h-48 w-[68%] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute bottom-[18%] left-[14%] h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />
          <div className="absolute right-[12%] top-[24%] h-52 w-52 rounded-full bg-blue-500/12 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,32,0.2)_0%,rgba(8,17,32,0.34)_38%,rgba(8,17,32,0.72)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,17,32,0.08),rgba(8,17,32,0.42)_58%,rgba(8,17,32,0.72)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-48" style={{ background: `linear-gradient(to top, var(--bg-primary), transparent)` }} />
        </div>
        <div className="hero-copy relative z-10 mx-auto flex min-h-[100svh] w-full max-w-5xl items-center justify-center px-6 pb-28 pt-32 sm:px-12 sm:pb-32 lg:pb-36">
          <div className="flex w-full max-w-3xl translate-y-4 flex-col items-center text-center sm:translate-y-6 lg:translate-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className={`text-5xl uppercase tracking-[-0.06em] text-white sm:text-7xl md:text-[92px] md:leading-[0.92] ${runtimeFont.className}`}
            >
              RIZKY MEMA
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="mt-7 grid w-full max-w-3xl grid-cols-2 items-center gap-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/84 sm:text-sm md:text-xl md:tracking-[0.28em]"
            >
              <span className="justify-self-start text-left">SOFTWARE ENGINEER</span>
              <span className="justify-self-end text-right">KONTEN KREATOR</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              className="mt-8 relative top-12 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <a href="#projects" className="btn-primary group flex w-full items-center justify-center pb-3 pt-3 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 sm:w-auto">
                Lihat Karya Saya <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#contact" className="btn-secondary group flex w-full items-center justify-center border-border-strong bg-surface-hover !text-content pb-3 pt-3 text-center transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-hover hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/10 sm:w-auto">
                Unduh CV <ArrowDown size={16} className="ml-2 transition-transform group-hover:translate-y-1" />
              </a>
            </motion.div>
          </div>
        </div>

        <div className="hero-highlight-strip absolute inset-x-0 -bottom-14 z-20 px-6 sm:-bottom-16 sm:px-12 lg:-bottom-20">
          <div className="mx-auto max-w-5xl">
            <HighlightSkills />
          </div>
        </div>
      </section>
    </>
  );
};
