import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const projects = [
  {
    title: "Aethra – Platform Produktivitas AI (SaaS)",
    description: "Platform asisten virtual berbasis AI untuk penulisan dan peringkasan teks dalam satu dasbor terpusat.",
    period: "Okt 2025 – Jan 2026",
    tech: ["Next.js", "React", "TypeScript", "OpenAI API", "Tailwind"],
    link: "#"
  },
  {
    title: "Dasbor Perdagangan Aset Real-Time",
    description: "Grafik interaktif, analisis teknikal otomatis & bot Python (FastAPI + CCXT) dengan integrasi AI untuk perdagangan aset secara real-time.",
    period: "Ags 2025 – Nov 2025",
    tech: ["Next.js", "React", "TypeScript", "Python", "FastAPI", "CCXT"],
    link: "#"
  },
  {
    title: "Platform Layanan Makeup Artist (MUA)",
    description: "Sistem multi-pengguna berbasis Django untuk pemesanan jadwal dan galeri portofolio MUA secara digital.",
    period: "Sep 2025 – Des 2025",
    tech: ["Django", "Python", "PostgreSQL", "Bootstrap"],
    link: "#"
  },
  {
    title: "NoteConverter AI",
    description: "Platform AI konversi not balok ke not angka untuk paduan suara, arranger, dan pendidik musik.",
    period: "Nov 2025 – Feb 2026",
    tech: ["React", "Python", "TypeScript", "AI/ML"],
    link: "#"
  },
  {
    title: "AI Inventory untuk UMKM",
    description: "Platform manajemen inventaris berbasis AI untuk Usaha Mikro, Kecil, dan Menengah di Indonesia.",
    period: "Jul 2025 – Okt 2025",
    tech: ["React", "Python", "FastAPI", "AI"],
    link: "#"
  },
  {
    title: "Klasifikasi Batu Menggunakan YOLO",
    description: "Deteksi dan klasifikasi 7 jenis batu secara real-time menggunakan model YOLO.",
    period: "Sep 2025 – Des 2025",
    tech: ["Python", "YOLOv8", "OpenCV", "TensorFlow"],
    link: "#"
  },
  {
    title: "Situs Web Desa Toundanouw",
    description: "Sistem informasi desa untuk pelayanan publik dan transparansi informasi. KKT 145 UNSRAT.",
    period: "Des 2025 – Feb 2026",
    tech: ["React", "Laravel", "MySQL"],
    link: "#"
  },
  {
    title: "Karwanua",
    description: "Platform kalkulator emisi karbon untuk pelaporan dan pemantauan jejak karbon secara digital.",
    period: "Jul 2025 – Sep 2025",
    tech: ["React", "TypeScript", "Node.js", "Tailwind"],
    link: "#"
  },
  {
    title: "Mdo.AI",
    description: "Chatbot asisten virtual berbasis AI untuk layanan informasi masyarakat Kota Manado.",
    period: "Jul 2025 – Ags 2025",
    tech: ["Python", "LangChain", "FastAPI", "React"],
    link: "#"
  },
  {
    title: "Sistem Pemesanan Lapangan Futsal",
    description: "Aplikasi web pemesanan lapangan futsal secara daring dengan fitur penjadwalan & manajemen pengguna.",
    period: "Ags 2025 – Sep 2025",
    tech: ["React", "Node.js", "MySQL"],
    link: "#"
  },
  {
    title: "Identifikasi Penyakit Mosaik Tanaman Nilam",
    description: "Model klasifikasi berbasis deep learning menggunakan arsitektur MobileNetV2 untuk deteksi penyakit tanaman nilam.",
    period: "April 2025",
    tech: ["Python", "TensorFlow", "MobileNetV2", "Keras"],
    link: "#"
  },
  {
    title: "Orders – Situs Profil & Portofolio Perusahaan",
    description: "Company profile dan portofolio digital untuk startup Orders.",
    period: "Mei 2025 – Jul 2025",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    link: "#"
  },
  {
    title: "Sistem Pengelolaan Limbah Berbasis Web3",
    description: "Platform pengelolaan limbah terintegrasi teknologi Web3 untuk transparansi dan auditabilitas data.",
    period: "Nov 2024 – Jul 2025",
    tech: ["Solidity", "React", "Web3.js", "Ethereum"],
    link: "#"
  },
  {
    title: "Tanah Nyiur Lestari",
    description: "Startup lingkungan berbasis di Bitung yang berfokus pada pelestarian ekosistem pesisir.",
    period: "Nov 2024 – Jun 2025",
    tech: ["React", "Node.js", "Figma"],
    link: "#"
  },
];

// Parallax offsets per card: cycle through a few depth values
const cardParallaxOffsets = projects.map((_, i) => [0, 30, 15][i % 3]);

const Card = ({ title, description, period, tech, link }: (typeof projects)[0]) => {
  return (
    <a 
      href={link}
      className="group relative block w-full rounded-3xl border border-white/[0.15] bg-white/[0.05] p-6 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1"
    >
      <div className="absolute -inset-px rounded-3xl border border-blue-400/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true"></div>
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-bold text-slate-50 transition-colors duration-300 group-hover:text-blue-300">{title}</h3>
          <p className="flex-shrink-0 text-xs font-semibold uppercase tracking-widest text-slate-400">{period}</p>
        </div>
        <p className="mt-3 text-sm text-slate-300">{description}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {tech.map(t => (
            <span key={t} className="pill !text-xs !font-semibold !border-white/10 !bg-white/[0.05]">{t}</span>
          ))}
        </div>
      </div>
    </a>
  );
};

export const FeaturedProjects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY1 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [80, -50]);
  const labelY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
  <section ref={sectionRef} className="py-24 px-6 sm:px-12 relative overflow-hidden" id="projects">

    {/* Parallax decorative background blobs */}
    <motion.div
      style={{ y: bgY1 }}
      className="absolute top-0 -right-20 w-[450px] h-[450px] bg-purple-500/[0.05] dark:bg-purple-500/[0.07] rounded-full blur-3xl pointer-events-none"
    />
    <motion.div
      style={{ y: bgY2 }}
      className="absolute bottom-0 -left-20 w-[350px] h-[350px] bg-blue-500/[0.05] dark:bg-blue-500/[0.06] rounded-full blur-3xl pointer-events-none"
    />

    <div className="max-w-6xl mx-auto relative z-10">
      <div className="flex justify-between items-end mb-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className="stat-badge">Karya Saya</span>
          <h3 className="text-4xl font-extrabold hero-text !text-[40px] pb-2">Proyek Unggulan</h3>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-slate-900 dark:text-white hover:text-purple-500 dark:hover:text-purple-300 transition font-medium hidden sm:block text-sm"
        >
          Lihat Semua Proyek →
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.1 }}
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, cardParallaxOffsets[i]]) }}
          >
            <Card {...p} />
          </motion.div>
        ))}
      </div>
      <button className="text-slate-900 dark:text-white hover:text-purple-500 dark:hover:text-purple-300 transition font-medium sm:hidden mt-8 block mx-auto text-sm">Lihat Semua Proyek →</button>
    </div>
  </section>
  );
};

