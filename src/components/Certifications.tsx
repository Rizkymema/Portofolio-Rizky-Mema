import React from 'react';

const certs = [
  {
    title: "Juara Harapan I – Lomba Paduan Suara Mahasiswa Tingkat Nasional 2024",
    platform: "Kemendikbudristek",
    year: "Jul 2024",
    icon: "🏆"
  },
  {
    title: "Galactic Problem Solver – NASA International Space Apps Challenge",
    platform: "NASA",
    year: "Okt 2025",
    icon: "🚀"
  },
  {
    title: "Belajar Dasar Kecerdasan Buatan",
    platform: "Dicoding Indonesia",
    year: "Nov 2025",
    icon: "🤖"
  },
  {
    title: "Rekayasa Perintah (Prompt Engineering) untuk Pengembang Perangkat Lunak",
    platform: "Dicoding Indonesia",
    year: "Sep 2025",
    icon: "💬"
  },
  {
    title: "Akselerasi Inovasi Hijau melalui Kinerja PROPER",
    platform: "Olahkarsa",
    year: "Sep 2025",
    icon: "🌱"
  },
  {
    title: "Tim Pelaksana Program Penguatan Kapasitas Organisasi Kemahasiswaan",
    platform: "Ditjen Dikti Ristek",
    year: "Nov 2024",
    icon: "🎓"
  },
  {
    title: "Workshop Python: Algoritma Machine Learning dan Aplikasinya (Seri 2 & 3)",
    platform: "UNSRAT",
    year: "2021",
    icon: "🐍"
  },
  {
    title: "Analisis Data untuk E-Commerce Challenge",
    platform: "DQLab",
    year: "Mar 2023",
    icon: "📊"
  },
  {
    title: "Proyek Analisis Data B2B Retail: Laporan Kinerja Penjualan",
    platform: "DQLab",
    year: "Mei 2023",
    icon: "📈"
  },
  {
    title: "SQL Dasar: Group By dan Having",
    platform: "DQLab",
    year: "Jun 2023",
    icon: "🗄️"
  },
  {
    title: "Pendekatan Praktis Pemasaran Media Sosial",
    platform: "PT Gama Inovasi Berdikari",
    year: "Apr 2023",
    icon: "📱"
  },
  {
    title: "Pelatihan Akademik Organisasi Himsifor",
    platform: "UNSRAT",
    year: "Ags 2023",
    icon: "📚"
  },
  {
    title: "Latihan Kepemimpinan dan Manajemen Mahasiswa FMIPA",
    platform: "UNSRAT",
    year: "Jan 2023",
    icon: "👑"
  },
  {
    title: "Webinar Potensi Energi Panas Bumi: Perkembangan dan Dampaknya terhadap Lingkungan",
    platform: "UNSRAT",
    year: "2022",
    icon: "⚡"
  },
];

export const Certifications = () => (
  <section className="py-24 px-6 sm:px-12" id="certifications">
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="stat-badge">Pencapaian</span>
          <h3 className="hero-text !text-[40px] pb-2">Sertifikasi</h3>
        </div>
      </div>
      
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {certs.map((cert, i) => (
          <div key={i} className="group relative flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5 transition-all duration-300 hover:border-purple-400/40 hover:bg-white/[0.08] hover:-translate-y-1">
            <div className="absolute -inset-px rounded-2xl border border-purple-400/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true"></div>
            <div className="text-2xl">{cert.icon}</div>
            <div>
              <h4 className="font-bold text-slate-50 text-base leading-tight">{cert.title}</h4>
              <p className="text-sm text-slate-400 mt-1">{cert.platform} &middot; {cert.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
