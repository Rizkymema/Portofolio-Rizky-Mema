import React, { useRef } from 'react';
import { BrainCircuit, ScanEye } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

const skillCategories = [
  {
    title: "Pengembangan Frontend",
    icon: "🎨",
    skills: [
      { name: "React", level: "Mahir", iconUrl: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Next.js", level: "Menengah", iconUrl: "https://cdn.simpleicons.org/nextdotjs/white" },
      { name: "Tailwind CSS", level: "Mahir", iconUrl: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { name: "TypeScript", level: "Menengah", iconUrl: "https://cdn.simpleicons.org/typescript/3178C6" }
    ]
  },
  {
    title: "Pengembangan Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js", level: "Intermediate", iconUrl: "https://cdn.simpleicons.org/nodedotjs/339933" },
      { name: "Express", level: "Intermediate", iconUrl: "https://cdn.simpleicons.org/express/white" },
      { name: "Laravel", level: "Advanced", iconUrl: "https://cdn.simpleicons.org/laravel/FF2D20" },
      { name: "MySQL / PostgreSQL", level: "Intermediate", iconUrl: "https://cdn.simpleicons.org/mysql/4479A1" }
    ]
  },
  {
    title: "Kecerdasan Buatan",
    icon: "🧠",
    skills: [
      { name: "Python", level: "Mahir", iconUrl: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "TensorFlow", level: "Menengah", iconUrl: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
      { name: "CNN Architecture", level: "Mahir", isLucide: true, lucideIcon: <BrainCircuit size={16} className="text-pink-400" /> },
      { name: "Computer Vision", level: "Menengah", isLucide: true, lucideIcon: <ScanEye size={16} className="text-emerald-400" /> }
    ]
  },
  {
    title: "Alat & Deployment",
    icon: "🔧",
    skills: [
      { name: "Git / GitHub", level: "Mahir", iconUrl: "https://cdn.simpleicons.org/github/white" },
      { name: "Firebase", level: "Menengah", iconUrl: "https://cdn.simpleicons.org/firebase/FFCA28" },
      { name: "Vercel / Netlify", level: "Mahir", iconUrl: "https://cdn.simpleicons.org/vercel/white" },
      { name: "Figma", level: "Menengah", iconUrl: "https://cdn.simpleicons.org/figma/F24E1E" }
    ]
  }
];

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const bgY3 = useTransform(scrollYProgress, [0, 1], [40, -120]);

  return (
  <section ref={sectionRef} className="py-24 px-6 sm:px-12 relative overflow-hidden" id="skills">

    {/* Parallax background blobs */}
    <motion.div
      style={{ y: bgY1 }}
      className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/[0.06] rounded-full blur-3xl pointer-events-none"
    />
    <motion.div
      style={{ y: bgY2 }}
      className="absolute top-1/2 -right-40 w-[400px] h-[400px] bg-purple-500/5 dark:bg-purple-500/[0.06] rounded-full blur-3xl pointer-events-none"
    />
    <motion.div
      style={{ y: bgY3 }}
      className="absolute -bottom-20 left-1/3 w-[300px] h-[300px] bg-pink-500/[0.04] dark:bg-pink-500/[0.05] rounded-full blur-3xl pointer-events-none"
    />

    <div className="max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="stat-badge">Kemampuan Teknis</span>
        <h3 className="hero-text !text-[40px] pb-2">Keahlian & Teknologi Terkini</h3>
      </motion.div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.12, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="group relative rounded-2xl border border-white/10 bg-white/[0.05] p-6 transition-all duration-300 hover:border-sky-400/40 hover:bg-white/[0.08] hover:-translate-y-1"
          >
            <div className="absolute -inset-px rounded-2xl border border-sky-400/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true"></div>
            <div className="relative">
              <h4 className="flex items-center text-lg font-bold mb-6">
                <span className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/[0.05] flex items-center justify-center mr-4 text-2xl border border-black/10 dark:border-white/10 shadow-inner transition-colors duration-300 group-hover:bg-sky-400/10 group-hover:border-sky-400/30">
                  {category.icon}
                </span>
                <span className="transition-colors duration-300 group-hover:text-sky-300">{category.title}</span>
              </h4>
              <ul className="space-y-3">
                {category.skills.map(skill => (
                  <li key={skill.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {skill.isLucide ? (
                        <span className="w-5 h-5 flex items-center justify-center">{skill.lucideIcon}</span>
                      ) : (
                        <img src={skill.iconUrl} alt={skill.name} className="w-4 h-4" />
                      )}
                      <span className="text-slate-300">{skill.name}</span>
                    </div>
                    <span className="text-xs font-medium text-slate-500 bg-white/5 px-2 py-0.5 rounded">{skill.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};

