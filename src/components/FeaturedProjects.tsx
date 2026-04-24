"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, ChevronDown, ChevronUp, Sparkles, ArrowUpRight } from 'lucide-react';

/* ─── Project Data ─── */
const featuredProject = {
  title: "Aethra – Platform Produktivitas AI (SaaS)",
  description: "Platform asisten virtual berbasis AI untuk penulisan dan peringkasan teks dalam satu dasbor terpusat. Menggabungkan kekuatan GPT dengan antarmuka modern untuk meningkatkan produktivitas pengguna.",
  problem: "Produktivitas penulisan konten masih rendah karena tool yang tersebar dan tidak terintegrasi.",
  solution: "Dasbor terpusat berbasis AI yang mengotomasi penulisan, peringkasan, dan pengelolaan konten.",
  period: "Okt 2025 – Jan 2026",
  tech: ["Next.js", "React", "TypeScript", "OpenAI API", "Tailwind"],
  result: "40% lebih cepat dalam produksi konten",
  gradient: "from-blue-600/30 via-violet-600/20 to-purple-600/30",
  accentColor: "blue",
  link: "#",
  github: "#",
};

const projects = [
  {
    title: "Dasbor Perdagangan Aset Real-Time",
    description: "Grafik interaktif, analisis teknikal otomatis & bot Python dengan integrasi AI untuk perdagangan aset secara real-time.",
    period: "Ags 2025 – Nov 2025",
    tech: ["Next.js", "React", "TypeScript", "Python", "FastAPI", "CCXT"],
    gradient: "from-emerald-600/25 to-teal-600/25",
    link: "#",
  },
  {
    title: "Platform Layanan Makeup Artist (MUA)",
    description: "Sistem multi-pengguna berbasis Django untuk pemesanan jadwal dan galeri portofolio MUA secara digital.",
    period: "Sep 2025 – Des 2025",
    tech: ["Django", "Python", "PostgreSQL", "Bootstrap"],
    gradient: "from-pink-600/25 to-rose-600/25",
    link: "#",
  },
  {
    title: "NoteConverter AI",
    description: "Platform AI konversi not balok ke not angka untuk paduan suara, arranger, dan pendidik musik.",
    period: "Nov 2025 – Feb 2026",
    tech: ["React", "Python", "TypeScript", "AI/ML"],
    gradient: "from-amber-600/25 to-orange-600/25",
    link: "#",
  },
  {
    title: "AI Inventory untuk UMKM",
    description: "Platform manajemen inventaris berbasis AI untuk Usaha Mikro, Kecil, dan Menengah di Indonesia.",
    period: "Jul 2025 – Okt 2025",
    tech: ["React", "Python", "FastAPI", "AI"],
    gradient: "from-cyan-600/25 to-sky-600/25",
    link: "#",
  },
  {
    title: "Klasifikasi Batu Menggunakan YOLO",
    description: "Deteksi dan klasifikasi 7 jenis batu secara real-time menggunakan model YOLO.",
    period: "Sep 2025 – Des 2025",
    tech: ["Python", "YOLOv8", "OpenCV", "TensorFlow"],
    gradient: "from-violet-600/25 to-indigo-600/25",
    link: "#",
  },
  {
    title: "Situs Web Desa Toundanouw",
    description: "Sistem informasi desa untuk pelayanan publik dan transparansi informasi. KKT 145 UNSRAT.",
    period: "Des 2025 – Feb 2026",
    tech: ["React", "Laravel", "MySQL"],
    gradient: "from-green-600/25 to-emerald-600/25",
    link: "#",
  },
  {
    title: "Karwanua",
    description: "Platform kalkulator emisi karbon untuk pelaporan dan pemantauan jejak karbon secara digital.",
    period: "Jul 2025 – Sep 2025",
    tech: ["React", "TypeScript", "Node.js", "Tailwind"],
    gradient: "from-teal-600/25 to-cyan-600/25",
    link: "#",
  },
  {
    title: "Mdo.AI",
    description: "Chatbot asisten virtual berbasis AI untuk layanan informasi masyarakat Kota Manado.",
    period: "Jul 2025 – Ags 2025",
    tech: ["Python", "LangChain", "FastAPI", "React"],
    gradient: "from-blue-600/25 to-indigo-600/25",
    link: "#",
  },
  {
    title: "Sistem Pemesanan Lapangan Futsal",
    description: "Aplikasi web pemesanan lapangan futsal secara daring dengan fitur penjadwalan & manajemen pengguna.",
    period: "Ags 2025 – Sep 2025",
    tech: ["React", "Node.js", "MySQL"],
    gradient: "from-lime-600/25 to-green-600/25",
    link: "#",
  },
  {
    title: "Identifikasi Penyakit Mosaik Tanaman Nilam",
    description: "Model klasifikasi berbasis deep learning menggunakan arsitektur MobileNetV2 untuk deteksi penyakit tanaman nilam.",
    period: "April 2025",
    tech: ["Python", "TensorFlow", "MobileNetV2", "Keras"],
    gradient: "from-rose-600/25 to-pink-600/25",
    link: "#",
  },
  {
    title: "Orders – Situs Profil & Portofolio Perusahaan",
    description: "Company profile dan portofolio digital untuk startup Orders.",
    period: "Mei 2025 – Jul 2025",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    gradient: "from-sky-600/25 to-blue-600/25",
    link: "#",
  },
  {
    title: "Sistem Pengelolaan Limbah Berbasis Web3",
    description: "Platform pengelolaan limbah terintegrasi teknologi Web3 untuk transparansi dan auditabilitas data.",
    period: "Nov 2024 – Jul 2025",
    tech: ["Solidity", "React", "Web3.js", "Ethereum"],
    gradient: "from-purple-600/25 to-violet-600/25",
    link: "#",
  },
  {
    title: "Tanah Nyiur Lestari",
    description: "Startup lingkungan berbasis di Bitung yang berfokus pada pelestarian ekosistem pesisir.",
    period: "Nov 2024 – Jun 2025",
    tech: ["React", "Node.js", "Figma"],
    gradient: "from-emerald-600/25 to-green-600/25",
    link: "#",
  },
];

/* ─── Tech Icon Map ─── */
const techIcons: Record<string, string> = {
  "Next.js": "https://cdn.simpleicons.org/nextdotjs/white",
  "React": "https://cdn.simpleicons.org/react/61DAFB",
  "TypeScript": "https://cdn.simpleicons.org/typescript/3178C6",
  "OpenAI API": "https://cdn.simpleicons.org/openai/412991",
  "Tailwind": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  "Python": "https://cdn.simpleicons.org/python/3776AB",
  "FastAPI": "https://cdn.simpleicons.org/fastapi/009688",
  "CCXT": "https://cdn.simpleicons.org/bitcoin/F7931A",
  "Django": "https://cdn.simpleicons.org/django/092E20",
  "PostgreSQL": "https://cdn.simpleicons.org/postgresql/4169E1",
  "Bootstrap": "https://cdn.simpleicons.org/bootstrap/7952B3",
  "AI/ML": "https://cdn.simpleicons.org/tensorflow/FF6F00",
  "AI": "https://cdn.simpleicons.org/tensorflow/FF6F00",
  "YOLOv8": "https://cdn.simpleicons.org/pytorch/EE4C2C",
  "OpenCV": "https://cdn.simpleicons.org/opencv/5C3EE8",
  "TensorFlow": "https://cdn.simpleicons.org/tensorflow/FF6F00",
  "Laravel": "https://cdn.simpleicons.org/laravel/FF2D20",
  "MySQL": "https://cdn.simpleicons.org/mysql/4479A1",
  "Node.js": "https://cdn.simpleicons.org/nodedotjs/339933",
  "LangChain": "https://cdn.simpleicons.org/langchain/1C3C3C",
  "MobileNetV2": "https://cdn.simpleicons.org/tensorflow/FF6F00",
  "Keras": "https://cdn.simpleicons.org/keras/D00000",
  "Solidity": "https://cdn.simpleicons.org/solidity/363636",
  "Web3.js": "https://cdn.simpleicons.org/web3dotjs/F16822",
  "Ethereum": "https://cdn.simpleicons.org/ethereum/3C3C3D",
  "Figma": "https://cdn.simpleicons.org/figma/F24E1E",
};

/* ─── Tech Badge Component ─── */
const TechBadge = ({ name, small = false }: { name: string; small?: boolean }) => (
  <motion.span
    whileHover={{ scale: 1.08, y: -2 }}
    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    className={`inline-flex items-center gap-1.5 rounded-full border border-border-subtle backdrop-blur-md transition-all duration-300 hover:border-blue-400/40 ${small ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11px]'}`}
    style={{ background: 'var(--glass-bg)' }}
  >
    {techIcons[name] && (
      <img src={techIcons[name]} alt={name} className={`${small ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} loading="lazy" />
    )}
    <span className="font-semibold text-content-secondary">{name}</span>
  </motion.span>
);

/* ─── Project Card Preview (gradient-based visual) ─── */
const ProjectPreview = ({ gradient, tech }: { gradient: string; tech: string[] }) => (
  <div className={`relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br ${gradient}`}>
    {/* Grid pattern */}
    <div className="absolute inset-0 opacity-[0.06]" style={{
      backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
      backgroundSize: '20px 20px',
    }} />
    {/* Floating tech icons */}
    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-40">
      {tech.slice(0, 3).map((t, i) => (
        techIcons[t] && (
          <motion.img
            key={t}
            src={techIcons[t]}
            alt=""
            className="w-8 h-8 drop-shadow-lg"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            loading="lazy"
          />
        )
      ))}
    </div>
    {/* Bottom gradient fade */}
    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent" />
  </div>
);

/* ─── Grid Project Card ─── */
const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-40px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.a
        href={project.link}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group relative block rounded-2xl border border-border-subtle overflow-hidden transition-all duration-500 hover:border-blue-400/40 hover:shadow-2xl hover:shadow-blue-500/[0.08]"
        style={{ background: 'var(--glass-bg)' }}
      >
        {/* Hover glow */}
        <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
          background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(96,165,250,0.08), transparent 50%)',
        }} />

        {/* Preview image area */}
        <div className="relative overflow-hidden">
          <ProjectPreview gradient={project.gradient} tech={project.tech} />
          {/* Hover overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center"
              >
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold backdrop-blur-md"
                >
                  Lihat Detail <ArrowUpRight size={14} />
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="p-5 relative">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h4 className="text-base font-bold text-content group-hover:text-blue-400 transition-colors duration-300 leading-snug line-clamp-2">
              {project.title}
            </h4>
          </div>
          <p className="text-xs text-content-muted font-medium uppercase tracking-wider mb-3">{project.period}</p>
          <p className="text-sm text-content-secondary leading-relaxed line-clamp-2 mb-4">{project.description}</p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map(t => (
              <TechBadge key={t} name={t} small />
            ))}
            {project.tech.length > 4 && (
              <span className="text-[10px] font-medium text-content-muted px-2 py-0.5 rounded-full border border-border-subtle" style={{ background: 'var(--glass-bg)' }}>
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
};

/* ─── Featured Project Card ─── */
const FeaturedCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true }}
    className="group relative rounded-3xl border border-border-subtle overflow-hidden transition-all duration-500 hover:border-blue-400/40 hover:shadow-2xl hover:shadow-blue-500/[0.06]"
    style={{ background: 'var(--glass-bg)' }}
  >
    {/* Ambient glow */}
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/[0.08] rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-500/[0.12] transition-colors duration-700" />
    <div className="absolute -bottom-40 -left-40 w-60 h-60 bg-purple-500/[0.06] rounded-full blur-[60px] pointer-events-none" />

    <div className="relative grid md:grid-cols-2 gap-0">
      {/* Left: Visual preview */}
      <div className="relative overflow-hidden">
        <div className={`w-full h-full min-h-[280px] md:min-h-[380px] bg-gradient-to-br ${featuredProject.gradient} relative`}>
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />

          {/* Featured badge */}
          <div className="absolute top-5 left-5 z-10">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
            >
              <Sparkles size={12} /> Proyek Unggulan
            </motion.span>
          </div>

          {/* Floating tech icons */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-48">
              {featuredProject.tech.slice(0, 5).map((t, i) => {
                const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
                const radius = 70;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return techIcons[t] ? (
                  <motion.div
                    key={t}
                    className="absolute left-1/2 top-1/2 w-10 h-10 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-xl"
                    style={{ x: x - 20, y: y - 20 }}
                    animate={{ y: [y - 20, y - 28, y - 20] }}
                    transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <img src={techIcons[t]} alt={t} className="w-5 h-5 drop-shadow-md" loading="lazy" />
                  </motion.div>
                ) : null;
              })}
              {/* Center glow */}
              <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-blue-400/20 blur-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Right: Content */}
      <div className="p-7 md:p-8 flex flex-col justify-center relative">
        <p className="text-[10px] text-content-muted font-bold uppercase tracking-widest mb-3">{featuredProject.period}</p>

        <h3 className="text-2xl md:text-3xl font-extrabold text-content leading-tight mb-4 group-hover:text-blue-400 transition-colors duration-300">
          {featuredProject.title}
        </h3>

        <p className="text-sm text-content-secondary leading-relaxed mb-5">
          {featuredProject.description}
        </p>

        {/* Problem → Solution */}
        <div className="space-y-3 mb-6">
          <div className="flex gap-3">
            <span className="shrink-0 w-5 h-5 rounded-md bg-red-500/15 border border-red-500/20 flex items-center justify-center text-[10px] text-red-400 font-bold mt-0.5">P</span>
            <p className="text-xs text-content-muted leading-relaxed">{featuredProject.problem}</p>
          </div>
          <div className="flex gap-3">
            <span className="shrink-0 w-5 h-5 rounded-md bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-[10px] text-emerald-400 font-bold mt-0.5">S</span>
            <p className="text-xs text-content-muted leading-relaxed">{featuredProject.solution}</p>
          </div>
        </div>

        {/* Key result */}
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/[0.06] px-4 py-3 mb-6">
          <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-1">Hasil Utama</p>
          <p className="text-sm font-bold text-content">{featuredProject.result}</p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {featuredProject.tech.map(t => <TechBadge key={t} name={t} />)}
        </div>

        {/* CTA buttons */}
        <div className="flex items-center gap-3">
          <motion.a
            href={featuredProject.link}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary !rounded-xl !py-2.5 !px-5 !text-xs"
          >
            <ExternalLink size={14} /> Live Demo
          </motion.a>
          <motion.a
            href={featuredProject.github}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="btn-secondary !rounded-xl !py-2.5 !px-5 !text-xs"
          >
            <Github size={14} /> Source Code
          </motion.a>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ─── Main Section ─── */
const INITIAL_VISIBLE = 6;

export const FeaturedProjects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [showAll, setShowAll] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY1 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [80, -50]);
  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_VISIBLE);

  return (
    <section ref={sectionRef} className="py-24 px-6 sm:px-12 relative overflow-hidden" id="projects">
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div data-parallax-background className="absolute inset-0 bg-cover bg-center opacity-75 scale-105" style={{
          backgroundImage: "url('/proyek.png')",
          filter: 'brightness(0.9) saturate(1.02) contrast(1.03)',
        }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--overlay-section-top)_0%,var(--overlay-section-mid)_35%,var(--overlay-section-bottom)_100%)]" />
      </div>

      {/* Dot grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* Parallax blobs */}
      <motion.div style={{ y: bgY1 }} className="absolute top-0 -right-20 w-[450px] h-[450px] bg-purple-500/[0.05] dark:bg-purple-500/[0.07] rounded-full blur-3xl pointer-events-none" />
      <motion.div style={{ y: bgY2 }} className="absolute bottom-0 -left-20 w-[350px] h-[350px] bg-blue-500/[0.05] dark:bg-blue-500/[0.06] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="stat-badge">Karya Saya</span>
          <h3 className="hero-text !text-[40px] pb-2">Proyek Unggulan</h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-content-muted text-sm max-w-lg mx-auto mt-4 leading-relaxed"
          >
            Koleksi proyek yang menunjukkan kemampuan saya dalam membangun solusi digital dari frontend hingga AI.
          </motion.p>
        </motion.div>

        {/* Featured Project */}
        <div className="mb-10">
          <FeaturedCard />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleProjects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>

        {/* Show more / less */}
        {projects.length > INITIAL_VISIBLE && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 flex justify-center"
          >
            <motion.button
              type="button"
              onClick={() => setShowAll(v => !v)}
              aria-expanded={showAll}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-6 py-3 text-sm font-semibold text-content transition-all duration-300 hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/[0.06]"
              style={{ background: 'var(--glass-bg)' }}
            >
              {showAll ? (
                <><ChevronUp size={16} /> Sembunyikan Proyek</>
              ) : (
                <><ChevronDown size={16} /> Lihat Semua Proyek ({projects.length - INITIAL_VISIBLE} lainnya)</>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
