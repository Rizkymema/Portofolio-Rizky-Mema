"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Award, ExternalLink, ChevronDown, ChevronUp, X } from 'lucide-react';

/* ─── Cert Data ─── */
const certs = [
  {
    title: "Juara Harapan I – Lomba Paduan Suara Mahasiswa Tingkat Nasional 2024",
    platform: "Kemendikbudristek",
    year: "Jul 2024",
    icon: "🏆",
    category: "Penghargaan",
    tags: ["Paduan Suara", "Nasional"],
    color: "amber",
    credentialUrl: "#",
  },
  {
    title: "Galactic Problem Solver – NASA International Space Apps Challenge",
    platform: "NASA",
    year: "Okt 2025",
    icon: "🚀",
    category: "Kompetisi",
    tags: ["Space Apps", "Problem Solving"],
    color: "blue",
    credentialUrl: "#",
  },
  {
    title: "Belajar Dasar Kecerdasan Buatan",
    platform: "Dicoding Indonesia",
    year: "Nov 2025",
    icon: "🤖",
    category: "Kursus",
    tags: ["AI", "Machine Learning"],
    color: "violet",
    credentialUrl: "#",
  },
  {
    title: "Rekayasa Perintah (Prompt Engineering) untuk Pengembang Perangkat Lunak",
    platform: "Dicoding Indonesia",
    year: "Sep 2025",
    icon: "💬",
    category: "Kursus",
    tags: ["Prompt Engineering", "AI"],
    color: "sky",
    credentialUrl: "#",
  },
  {
    title: "Akselerasi Inovasi Hijau melalui Kinerja PROPER",
    platform: "Olahkarsa",
    year: "Sep 2025",
    icon: "🌱",
    category: "Workshop",
    tags: ["Sustainability", "Inovasi"],
    color: "emerald",
    credentialUrl: "#",
  },
  {
    title: "Tim Pelaksana Program Penguatan Kapasitas Organisasi Kemahasiswaan",
    platform: "Ditjen Dikti Ristek",
    year: "Nov 2024",
    icon: "🎓",
    category: "Program",
    tags: ["Leadership", "Organisasi"],
    color: "purple",
    credentialUrl: "#",
  },
  {
    title: "Workshop Python: Algoritma Machine Learning dan Aplikasinya (Seri 2 & 3)",
    platform: "UNSRAT",
    year: "2021",
    icon: "🐍",
    category: "Workshop",
    tags: ["Python", "ML"],
    color: "emerald",
    credentialUrl: "#",
  },
  {
    title: "Analisis Data untuk E-Commerce Challenge",
    platform: "DQLab",
    year: "Mar 2023",
    icon: "📊",
    category: "Kursus",
    tags: ["Data Analysis", "E-Commerce"],
    color: "cyan",
    credentialUrl: "#",
  },
  {
    title: "Proyek Analisis Data B2B Retail: Laporan Kinerja Penjualan",
    platform: "DQLab",
    year: "Mei 2023",
    icon: "📈",
    category: "Kursus",
    tags: ["Data Analysis", "B2B"],
    color: "blue",
    credentialUrl: "#",
  },
  {
    title: "SQL Dasar: Group By dan Having",
    platform: "DQLab",
    year: "Jun 2023",
    icon: "🗄️",
    category: "Kursus",
    tags: ["SQL", "Database"],
    color: "indigo",
    credentialUrl: "#",
  },
  {
    title: "Pendekatan Praktis Pemasaran Media Sosial",
    platform: "PT Gama Inovasi Berdikari",
    year: "Apr 2023",
    icon: "📱",
    category: "Kursus",
    tags: ["Marketing", "Social Media"],
    color: "pink",
    credentialUrl: "#",
  },
  {
    title: "Pelatihan Akademik Organisasi Himsifor",
    platform: "UNSRAT",
    year: "Ags 2023",
    icon: "📚",
    category: "Pelatihan",
    tags: ["Akademik", "Organisasi"],
    color: "violet",
    credentialUrl: "#",
  },
  {
    title: "Latihan Kepemimpinan dan Manajemen Mahasiswa FMIPA",
    platform: "UNSRAT",
    year: "Jan 2023",
    icon: "👑",
    category: "Pelatihan",
    tags: ["Leadership", "Manajemen"],
    color: "amber",
    credentialUrl: "#",
  },
  {
    title: "Webinar Potensi Energi Panas Bumi: Perkembangan dan Dampaknya terhadap Lingkungan",
    platform: "UNSRAT",
    year: "2022",
    icon: "⚡",
    category: "Webinar",
    tags: ["Energi", "Lingkungan"],
    color: "orange",
    credentialUrl: "#",
  },
];

/* ─── Color utility ─── */
const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  amber:   { bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   text: 'text-amber-400',   glow: 'rgba(245,158,11,0.12)' },
  blue:    { bg: 'bg-blue-500/10',     border: 'border-blue-500/20',    text: 'text-blue-400',    glow: 'rgba(59,130,246,0.12)' },
  violet:  { bg: 'bg-violet-500/10',   border: 'border-violet-500/20',  text: 'text-violet-400',  glow: 'rgba(139,92,246,0.12)' },
  sky:     { bg: 'bg-sky-500/10',      border: 'border-sky-500/20',     text: 'text-sky-400',     glow: 'rgba(56,189,248,0.12)' },
  emerald: { bg: 'bg-emerald-500/10',  border: 'border-emerald-500/20', text: 'text-emerald-400', glow: 'rgba(16,185,129,0.12)' },
  purple:  { bg: 'bg-purple-500/10',   border: 'border-purple-500/20',  text: 'text-purple-400',  glow: 'rgba(168,85,247,0.12)' },
  cyan:    { bg: 'bg-cyan-500/10',     border: 'border-cyan-500/20',    text: 'text-cyan-400',    glow: 'rgba(6,182,212,0.12)' },
  indigo:  { bg: 'bg-indigo-500/10',   border: 'border-indigo-500/20',  text: 'text-indigo-400',  glow: 'rgba(99,102,241,0.12)' },
  pink:    { bg: 'bg-pink-500/10',     border: 'border-pink-500/20',    text: 'text-pink-400',    glow: 'rgba(236,72,153,0.12)' },
  orange:  { bg: 'bg-orange-500/10',   border: 'border-orange-500/20',  text: 'text-orange-400',  glow: 'rgba(249,115,22,0.12)' },
};

/* ─── Modal Component ─── */
const CertModal = ({
  cert,
  onClose,
}: {
  cert: (typeof certs)[0];
  onClose: () => void;
}) => {
  const c = colorMap[cert.color] || colorMap.blue;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-border-subtle p-6 shadow-2xl"
        style={{ background: 'var(--bg-secondary)' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface flex items-center justify-center border border-border-subtle text-content-muted hover:text-content hover:bg-surface-hover transition-all"
        >
          <X size={16} />
        </button>

        {/* Icon */}
        <motion.div
          className={`w-16 h-16 rounded-2xl ${c.bg} ${c.border} border flex items-center justify-center text-3xl mb-5 shadow-lg`}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {cert.icon}
        </motion.div>

        {/* Category */}
        <span className={`inline-block text-[10px] font-bold uppercase tracking-wider ${c.text} ${c.bg} ${c.border} border px-2.5 py-1 rounded-full mb-4`}>
          {cert.category}
        </span>

        <h3 className="text-xl font-extrabold text-content leading-tight mb-3">{cert.title}</h3>

        <div className="flex items-center gap-2 text-sm text-content-muted mb-5">
          <Award size={14} className={c.text} />
          <span className="font-medium">{cert.platform}</span>
          <span>·</span>
          <span>{cert.year}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {cert.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-border-subtle text-content-secondary"
              style={{ background: 'var(--glass-bg)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary !rounded-xl !py-2.5 w-full !text-xs"
        >
          <ExternalLink size={14} /> Lihat Kredensial
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

/* ─── Certificate Card ─── */
const CertCard = ({
  cert,
  index,
  onOpen,
}: {
  cert: (typeof certs)[0];
  index: number;
  onOpen: () => void;
}) => {
  const c = colorMap[cert.color] || colorMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-40px' }}
    >
      <motion.button
        type="button"
        onClick={onOpen}
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group relative w-full text-left rounded-2xl border border-border-subtle p-5 transition-all duration-500 hover:border-purple-400/30 hover:shadow-xl hover:shadow-purple-500/[0.04] cursor-pointer"
        style={{ background: 'var(--glass-bg)' }}
      >
        {/* Hover glow */}
        <div
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${c.glow}, transparent 60%)`,
          }}
        />

        <div className="relative z-10">
          {/* Top row: icon + category */}
          <div className="flex items-start justify-between mb-4">
            <motion.div
              whileHover={{ scale: 1.12, rotate: -8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className={`w-12 h-12 rounded-xl ${c.bg} ${c.border} border flex items-center justify-center text-2xl shadow-lg relative`}
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none" />
              {cert.icon}
            </motion.div>
            <span className={`text-[9px] font-bold uppercase tracking-wider ${c.text} ${c.bg} ${c.border} border px-2 py-0.5 rounded-full`}>
              {cert.category}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-sm font-bold text-content leading-snug mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
            {cert.title}
          </h4>

          {/* Issuer + Year */}
          <div className="flex items-center gap-1.5 text-xs text-content-muted mb-4">
            <Award size={12} className={c.text} />
            <span className="font-medium truncate">{cert.platform}</span>
            <span>·</span>
            <span className="shrink-0">{cert.year}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {cert.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-semibold px-2 py-0.5 rounded-full border border-border-subtle text-content-muted"
                style={{ background: 'var(--glass-bg)' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom CTA hint */}
          <div className="mt-4 pt-3 border-t border-border-subtle flex items-center text-[11px] font-semibold text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Lihat Detail <ExternalLink size={11} className="ml-1.5" />
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
};

/* ─── Main Section ─── */
const INITIAL_VISIBLE = 8;

export const Certifications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedCert, setSelectedCert] = useState<(typeof certs)[0] | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY1 = useTransform(scrollYProgress, [0, 1], [60, -70]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [-40, 50]);

  const visibleCerts = showAll ? certs : certs.slice(0, INITIAL_VISIBLE);

  return (
    <>
      <section ref={sectionRef} className="py-24 px-6 sm:px-12 relative overflow-hidden" id="certifications">
        {/* Background image */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            data-parallax-background
            className="absolute inset-0 bg-cover bg-center opacity-80 scale-105"
            style={{
              backgroundImage: "url('/sertifikasi.png')",
              filter: 'brightness(0.9) saturate(0.98) contrast(1.03)',
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--overlay-section-top)_0%,var(--overlay-section-mid)_35%,var(--overlay-section-bottom)_100%)]" />
        </div>

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        {/* Parallax blobs */}
        <motion.div style={{ y: bgY1 }} className="absolute -top-20 -right-24 w-[400px] h-[400px] bg-purple-500/[0.05] dark:bg-purple-500/[0.07] rounded-full blur-3xl pointer-events-none" />
        <motion.div style={{ y: bgY2 }} className="absolute -bottom-16 -left-20 w-[320px] h-[320px] bg-blue-500/[0.04] dark:bg-blue-500/[0.06] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="stat-badge">Pencapaian</span>
            <h3 className="hero-text !text-[40px] pb-2">Sertifikasi & Penghargaan</h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-content-muted text-sm max-w-lg mx-auto mt-4 leading-relaxed"
            >
              Sertifikasi profesional dan penghargaan yang mendukung kredibilitas dan keahlian saya.
            </motion.p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12"
          >
            {[
              { value: `${certs.length}`, label: 'Total Sertifikasi' },
              { value: '5+', label: 'Platform' },
              { value: '2', label: 'Penghargaan' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 200 }}
                  viewport={{ once: true }}
                  className="block text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent"
                >
                  {stat.value}
                </motion.span>
                <span className="text-[10px] font-semibold text-content-muted uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {visibleCerts.map((cert, i) => (
              <CertCard
                key={cert.title}
                cert={cert}
                index={i}
                onOpen={() => setSelectedCert(cert)}
              />
            ))}
          </div>

          {/* Show more / less */}
          {certs.length > INITIAL_VISIBLE && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-10 flex justify-center"
            >
              <motion.button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                aria-expanded={showAll}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-6 py-3 text-sm font-semibold text-content transition-all duration-300 hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/[0.06]"
                style={{ background: 'var(--glass-bg)' }}
              >
                {showAll ? (
                  <><ChevronUp size={16} /> Sembunyikan</>
                ) : (
                  <><ChevronDown size={16} /> Lihat Semua ({certs.length - INITIAL_VISIBLE} lainnya)</>
                )}
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </>
  );
};
