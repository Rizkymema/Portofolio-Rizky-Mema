import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY1 = useTransform(scrollYProgress, [0, 1], [60, -80]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [-50, 70]);

  return (
  <section ref={sectionRef} className="py-24 px-6 sm:px-12 relative overflow-hidden" id="experience">

    <div className="absolute inset-0 pointer-events-none z-0">
      <div
        data-parallax-background
        className="absolute inset-0 bg-cover bg-center opacity-80 scale-105"
        style={{
          backgroundImage: "url('/pengalaman.png')",
          filter: 'brightness(0.92) saturate(1.04) contrast(1.04)'
        }}
      ></div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--overlay-section-top)_0%,var(--overlay-section-mid)_35%,var(--overlay-section-bottom)_100%)]"></div>
    </div>

    {/* Parallax background blobs */}
    <motion.div
      style={{ y: bgY1 }}
      className="absolute -top-20 -left-16 w-[380px] h-[380px] bg-blue-500/[0.05] dark:bg-blue-500/[0.06] rounded-full blur-3xl pointer-events-none"
    />
    <motion.div
      style={{ y: bgY2 }}
      className="absolute bottom-0 -right-16 w-[320px] h-[320px] bg-purple-500/[0.04] dark:bg-purple-500/[0.06] rounded-full blur-3xl pointer-events-none"
    />

    <div className="max-w-4xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="stat-badge">Karir & Organisasi</span>
        <h3 className="hero-text !text-[40px] pb-2">Pengalaman Saya</h3>
      </motion.div>

      <div className="space-y-8">
        
        {/* Johan Garage */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="glass-card hover:bg-bg-tertiary transition duration-300">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div>
              <h4 className="text-2xl font-extrabold mb-1">Software Engineer</h4>
              <span className="text-lg text-blue-400 font-medium tracking-wide">Johan Garage</span>
            </div>
            <span className="mt-4 md:mt-0 pill border-blue-500/30 text-blue-400 bg-blue-500/10">2026 - Sekarang</span>
          </div>
          <ul className="space-y-3 text-content-muted">
            <li className="flex gap-3">
              <span className="text-blue-500 mt-0.5 font-bold">▹</span>
              <p>Mengembangkan dan memelihara sistem perangkat lunak secara berkelanjutan serta mengoptimalkan performa aplikasi.</p>
            </li>
          </ul>
        </motion.div>

        {/* Himsifor */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="glass-card hover:bg-bg-tertiary transition duration-300">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div>
              <h4 className="text-2xl font-extrabold mb-1">Ketua Departemen Multimedia & Jurnalistik</h4>
              <span className="text-lg text-purple-400 font-medium tracking-wide">Himsifor – Universitas Sam Ratulangi</span>
            </div>
            <span className="mt-4 md:mt-0 pill border-purple-500/30 text-purple-400 bg-purple-500/10">Maret 2024 – Maret 2025</span>
          </div>
          <ul className="space-y-3 text-content-muted">
            <li className="flex gap-3">
              <span className="text-purple-500 mt-0.5 font-bold">▹</span>
              <p>Memimpin tim multimedia dalam merancang dan memproduksi konten visual serta jurnalistik untuk keperluan himpunan mahasiswa.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-500 mt-0.5 font-bold">▹</span>
              <p>Mengoordinasikan kegiatan dokumentasi, publikasi berita, dan peliputan acara tingkat jurusan maupun universitas.</p>
            </li>
          </ul>
        </motion.div>

        {/* UKM Paduan Suara */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="glass-card hover:bg-bg-tertiary transition duration-300">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div>
              <h4 className="text-2xl font-extrabold mb-1">Anggota Divisi Publikasi & Dokumentasi</h4>
              <span className="text-lg text-pink-400 font-medium tracking-wide">UKM Paduan Suara – Universitas Sam Ratulangi</span>
            </div>
            <span className="mt-4 md:mt-0 pill border-pink-500/30 text-pink-400 bg-pink-500/10">April 2024 – April 2025</span>
          </div>
          <ul className="space-y-3 text-content-muted">
            <li className="flex gap-3">
              <span className="text-pink-500 mt-0.5 font-bold">▹</span>
              <p>Mengelola publikasi kegiatan UKM melalui media sosial dan saluran komunikasi resmi organisasi.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-pink-500 mt-0.5 font-bold">▹</span>
              <p>Mendokumentasikan seluruh kegiatan latihan, perlombaan, dan penampilan paduan suara mahasiswa.</p>
            </li>
          </ul>
        </motion.div>

        {/* Orders - Startup */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="glass-card hover:bg-bg-tertiary transition duration-300">
           <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div>
              <h4 className="text-2xl font-extrabold mb-1">Anggota Tim Inti</h4>
              <span className="text-lg text-emerald-400 font-medium tracking-wide">Orders – Startup Digital</span>
            </div>
            <span className="mt-4 md:mt-0 pill border-emerald-500/30 text-emerald-400 bg-emerald-500/10">2024 – 2025</span>
          </div>
          <ul className="space-y-3 text-content-muted">
            <li className="flex gap-3">
              <span className="text-emerald-500 mt-0.5 font-bold">▹</span>
              <p>Terlibat aktif dalam pengembangan produk dan perumusan strategi bisnis startup Orders.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-emerald-500 mt-0.5 font-bold">▹</span>
              <p>Berkolaborasi lintas divisi untuk memastikan arah pengembangan selaras dengan visi dan kebutuhan pasar.</p>
            </li>
          </ul>
        </motion.div>

      </div>
    </div>
  </section>
  );
};
