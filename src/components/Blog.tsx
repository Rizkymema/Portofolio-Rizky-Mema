import React from 'react';

const posts = [
  {
    title: "Mengapa Arsitektur CNN Cocok untuk Deteksi Tekstur?",
    category: "Tutorial AI",
    date: "12 Mar 2024",
    readTime: "5 mnt baca",
    desc: "Penjelasan mendalam tentang bagaimana kernel pada CNN mengekstrak fitur gambar dan tekstur."
  },
  {
    title: "Cara Konsisten Bikin Konten Edukasi Tech di Tengah Kesibukan",
    category: "Tips Konten",
    date: "28 Feb 2024",
    readTime: "4 mnt baca",
    desc: "Workflow saya dalam membuat konten short video berkualitas tentang teknologi, dari script hingga publishing."
  },
  {
    title: "Dari Skripsi ke Produk Nyata: Evolusi Model Pendeteksi Daun",
    category: "Sharing Pengalaman",
    date: "15 Jan 2024",
    readTime: "8 mnt baca",
    desc: "Mengubah proyek penelitian kampus menjadi alat yang dapat digunakan langsung oleh petani nilam."
  }
];

export const Blog = () => (
  <section className="py-24 px-6 sm:px-12" id="blog">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="stat-badge">Insight & Pemikiran</span>
        <h3 className="hero-text !text-[40px] pb-2">Blog / Artikel</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <div key={i} className="group cursor-pointer glass-card hover:bg-black/5 dark:hover:bg-white/[0.05] hover:border-black/20 dark:hover:border-white/20 transition p-4">
            <div className="h-40 bg-slate-100 dark:bg-slate-900 rounded-xl mb-4 border border-black/5 dark:border-white/5 group-hover:border-black/10 dark:group-hover:border-white/10 transition relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />
            </div>
            <div className="flex gap-4 items-center mb-3">
              <span className="pill !bg-blue-500/20 !text-blue-300 !border-none !px-2 !py-0.5">{post.category}</span>
              <span className="text-[10px] text-slate-600 dark:text-slate-500 font-bold uppercase tracking-widest">{post.date}</span>
            </div>
            <h4 className="text-[17px] font-extrabold mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition leading-snug text-slate-900 dark:text-white">{post.title}</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-4 line-clamp-3">{post.desc}</p>
            <span className="text-[10px] text-slate-600 dark:text-slate-500 font-bold uppercase tracking-widest">{post.readTime}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
