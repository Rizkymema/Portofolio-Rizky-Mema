import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { SocialEmbed } from './SocialEmbed';
import { Instagram, Video } from 'lucide-react';

// SILAKAN GANTI URL DI BAWAH INI DENGAN URL VIDEO/POSTINGAN ASLI ANDA.
// PERHATIAN: Harus berupa link ke SATU VIDEO (bukan link profil) agar preview videonya bisa muncul langsung.
const tiktokUrls = [
  "https://www.tiktok.com/@tiktok/video/7106594312292453678", // Ganti dengan link video TikTok Anda
  "https://www.tiktok.com/@midudev/video/7192038753735494917" // Ganti dengan link video TikTok Anda
];

const igUrls = [
  "https://www.instagram.com/p/CtX_w1_sP-m/", // Ganti dengan link postingan/reels IG Anda
  "https://www.instagram.com/p/C-h9l_kPRo_/"  // Ganti dengan link postingan/reels IG Anda
];

const PhoneMockup = ({ platform, urls }: { platform: 'tiktok' | 'instagram', urls: string[] }) => {
  const isTikTok = platform === "tiktok";

  return (
    <div className="relative w-[280px] sm:w-[320px] h-[560px] sm:h-[650px] bg-black rounded-[45px] border-[8px] border-slate-800 dark:border-slate-900 shadow-[0_0_50px_rgba(0,0,0,0.3)] dark:shadow-[0_0_50px_rgba(255,255,255,0.05)] overflow-hidden ring-1 ring-white/10 shrink-0">
      
      {/* Notch */}
      <div className="absolute top-2 inset-x-0 mx-auto w-24 h-6 bg-black rounded-full z-50"></div>
      
      {/* Top App Header / Status Bar */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/80 to-transparent z-40 flex flex-col justify-between px-6 pt-1 pointer-events-none">
         <div className="flex justify-between items-center w-full">
           <span className="text-[11px] font-bold" style={{ color: 'white' }}>9:41</span>
           <div className="flex gap-1 items-center">
              <span className="w-3 h-3 rounded-full border-[1.5px] border-white/80"></span>
           </div>
         </div>
      </div>

      {/* Floating Platform Badge */}
      <div className="absolute top-10 left-4 z-40 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-border-subtle flex items-center gap-2 pointer-events-none">
         {isTikTok ? <Video size={14} style={{ color: 'white' }} /> : <Instagram size={14} style={{ color: 'white' }} />}
         <span className="font-bold text-xs" style={{ color: 'white' }}>{isTikTok ? 'TikTok' : 'Instagram'}</span>
      </div>

      {/* Scrollable Embed Feed */}
      <div className="w-full h-full overflow-y-scroll snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-surface pb-16 pt-16">
        {urls.map((url, i) => (
           <SocialEmbed key={i} platform={platform} url={url} />
        ))}
      </div>

      {/* Bottom App Navigation Bar (Fake to keep the app feel) */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-black flex justify-between items-center px-4 sm:px-6 z-40 border-t border-border-subtle pointer-events-none">
         <div className="flex flex-col items-center gap-1"><div className="w-5 h-5 rounded-sm bg-white/80"></div></div>
         <div className="flex flex-col items-center gap-1"><div className="w-5 h-5 rounded-full bg-white/40"></div></div>
         <div className={`w-10 h-7 sm:w-12 sm:h-8 rounded-xl ${isTikTok ? 'bg-gradient-to-r from-cyan-400 to-pink-500' : 'bg-white'} flex items-center justify-center font-bold ${isTikTok ? 'text-white' : 'text-black'} text-xl shadow-lg`}>+</div>
         <div className="flex flex-col items-center gap-1"><div className="w-5 h-5 rounded bg-white/40"></div></div>
         <div className="flex flex-col items-center gap-1"><div className="w-5 h-5 rounded-full bg-white/40 border-[1.5px] border-white/40"></div></div>
      </div>
    </div>
  );
};

export const CreatorHub = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Phone mockups move in opposing directions for depth effect
  const phoneY1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const phoneY2 = useTransform(scrollYProgress, [0, 1], [-40, 80]);
  const bgY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
  <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-12 overflow-hidden relative" id="creator-hub">

    <div className="absolute inset-0 pointer-events-none z-0">
      <div
        data-parallax-background
        className="absolute inset-0 bg-cover bg-center opacity-80 scale-105"
        style={{
          backgroundImage: "url('/konten.png')",
          filter: 'brightness(0.86) saturate(0.96) contrast(1.03)'
        }}
      ></div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--overlay-section-top)_0%,var(--overlay-section-mid)_35%,var(--overlay-section-bottom)_100%)]"></div>
    </div>

    {/* Parallax background orb */}
    <motion.div
      style={{ y: bgY }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.04] dark:bg-blue-500/[0.06] rounded-full blur-3xl pointer-events-none"
    />

    <div className="max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="pill mb-4 border border-blue-500/20 text-blue-500 bg-blue-500/10 backdrop-blur-md">Pusat Kreator</span>
        <h3 className="text-4xl md:text-5xl font-extrabold text-content mb-4">Konten</h3>
        <p className="text-content-muted font-medium">Video edukasi dapat langsung Anda putar di bawah ini tanpa meninggalkan halaman.</p>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16">
        {/* TikTok Mockup - moves up on scroll */}
        <motion.div
          style={{ y: phoneY1 }}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          <PhoneMockup platform="tiktok" urls={tiktokUrls} />
        </motion.div>

        {/* Instagram Mockup - moves down on scroll (opposing) */}
        <motion.div
          style={{ y: phoneY2 }}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          <PhoneMockup platform="instagram" urls={igUrls} />
        </motion.div>
      </div>
    </div>
  </section>
  );
};


