import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';

/* ─── Skill Data ─── */
const skillCategories = [
  {
    id: 'frontend',
    title: 'Pengembangan Frontend',
    subtitle: 'UI / UX & Web',
    gradient: 'from-sky-500/20 to-blue-600/20',
    accentColor: 'sky',
    borderHover: 'hover:border-sky-400/50',
    glowColor: 'rgba(56,189,248,0.15)',
    skills: [
      {
        name: 'React',
        level: 95,
        levelLabel: 'Mahir',
        icon: 'https://cdn.simpleicons.org/react/61DAFB',
        description: 'Library utama untuk membangun antarmuka dinamis dan SPA.',
      },
      {
        name: 'Next.js',
        level: 70,
        levelLabel: 'Menengah',
        icon: 'https://cdn.simpleicons.org/nextdotjs/white',
        description: 'Framework SSR/SSG untuk performa web optimal.',
      },
      {
        name: 'Tailwind CSS',
        level: 90,
        levelLabel: 'Mahir',
        icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
        description: 'Utility-first CSS framework untuk styling cepat.',
      },
      {
        name: 'TypeScript',
        level: 72,
        levelLabel: 'Menengah',
        icon: 'https://cdn.simpleicons.org/typescript/3178C6',
        description: 'Superset JavaScript dengan type-safety untuk kode lebih solid.',
      },
    ],
  },
  {
    id: 'backend',
    title: 'Pengembangan Backend',
    subtitle: 'Server & Database',
    gradient: 'from-violet-500/20 to-purple-600/20',
    accentColor: 'violet',
    borderHover: 'hover:border-violet-400/50',
    glowColor: 'rgba(139,92,246,0.15)',
    skills: [
      {
        name: 'Node.js',
        level: 68,
        levelLabel: 'Intermediate',
        icon: 'https://cdn.simpleicons.org/nodedotjs/339933',
        description: 'Runtime JavaScript sisi server untuk API.',
      },
      {
        name: 'Express',
        level: 65,
        levelLabel: 'Intermediate',
        icon: 'https://cdn.simpleicons.org/express/white',
        description: 'Framework minimalis Node.js untuk REST API.',
      },
      {
        name: 'Laravel',
        level: 82,
        levelLabel: 'Advanced',
        icon: 'https://cdn.simpleicons.org/laravel/FF2D20',
        description: 'Framework PHP untuk aplikasi web berskala besar.',
      },
      {
        name: 'MySQL / PostgreSQL',
        level: 70,
        levelLabel: 'Intermediate',
        icon: 'https://cdn.simpleicons.org/mysql/4479A1',
        description: 'Sistem manajemen basis data relasional.',
      },
    ],
  },
  {
    id: 'ai',
    title: 'Kecerdasan Buatan',
    subtitle: 'AI & Machine Learning',
    gradient: 'from-rose-500/20 to-pink-600/20',
    accentColor: 'rose',
    borderHover: 'hover:border-rose-400/50',
    glowColor: 'rgba(244,63,94,0.15)',
    skills: [
      {
        name: 'Python',
        level: 90,
        levelLabel: 'Mahir',
        icon: 'https://cdn.simpleicons.org/python/3776AB',
        description: 'Bahasa utama untuk pengembangan model AI/ML.',
      },
      {
        name: 'TensorFlow',
        level: 72,
        levelLabel: 'Menengah',
        icon: 'https://cdn.simpleicons.org/tensorflow/FF6F00',
        description: 'Framework deep learning untuk training & deployment model.',
      },
      {
        name: 'CNN Architecture',
        level: 88,
        levelLabel: 'Mahir',
        icon: 'https://cdn.simpleicons.org/pytorch/EE4C2C',
        description: 'Digunakan dalam model klasifikasi penyakit tanaman nilam.',
      },
      {
        name: 'Computer Vision',
        level: 70,
        levelLabel: 'Menengah',
        icon: 'https://cdn.simpleicons.org/opencv/5C3EE8',
        description: 'Deteksi objek & klasifikasi gambar real-time.',
      },
    ],
  },
  {
    id: 'tools',
    title: 'Alat & Deployment',
    subtitle: 'DevOps & Design',
    gradient: 'from-emerald-500/20 to-teal-600/20',
    accentColor: 'emerald',
    borderHover: 'hover:border-emerald-400/50',
    glowColor: 'rgba(16,185,129,0.15)',
    skills: [
      {
        name: 'Git / GitHub',
        level: 88,
        levelLabel: 'Mahir',
        icon: 'https://cdn.simpleicons.org/github/white',
        description: 'Version control & kolaborasi kode.',
      },
      {
        name: 'Firebase',
        level: 68,
        levelLabel: 'Menengah',
        icon: 'https://cdn.simpleicons.org/firebase/FFCA28',
        description: 'Backend-as-a-service untuk autentikasi & database.',
      },
      {
        name: 'Vercel / Netlify',
        level: 85,
        levelLabel: 'Mahir',
        icon: 'https://cdn.simpleicons.org/vercel/white',
        description: 'Platform deployment modern untuk web apps.',
      },
      {
        name: 'Figma',
        level: 72,
        levelLabel: 'Menengah',
        icon: 'https://cdn.simpleicons.org/figma/F24E1E',
        description: 'Desain UI/UX kolaboratif dan prototyping.',
      },
    ],
  },
];

/* ─── Accent color map for Tailwind classes ─── */
const accentMap: Record<string, { text: string; bg: string; border: string; bar: string; ring: string }> = {
  sky:     { text: 'text-sky-400',     bg: 'bg-sky-500/10',     border: 'border-sky-500/20',   bar: 'bg-sky-400',     ring: 'ring-sky-400/30' },
  violet:  { text: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/20', bar: 'bg-violet-400',  ring: 'ring-violet-400/30' },
  rose:    { text: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20',   bar: 'bg-rose-400',    ring: 'ring-rose-400/30' },
  emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20',bar: 'bg-emerald-400', ring: 'ring-emerald-400/30' },
};

/* ─── Skill Item Component ─── */
const SkillItem = ({
  skill,
  accent,
  index,
}: {
  skill: (typeof skillCategories)[0]['skills'][0];
  accent: string;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const colors = accentMap[accent];

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="group/skill flex items-center gap-3 py-2.5 px-3 rounded-xl transition-all duration-300 hover:bg-white/[0.03] cursor-default"
      >
        {/* 3D-style icon container */}
        <motion.div
          whileHover={{ scale: 1.18, rotate: -6 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className={`relative w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colors.bg} ${colors.border} border shadow-lg`}
          style={{
            boxShadow: `0 4px 14px -2px ${accentMap[accent].bar.replace('bg-', '').replace('-400', '')}`,
          }}
        >
          {/* Simulated 3D shine overlay */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-5 h-5 relative z-10 drop-shadow-md"
            loading="lazy"
          />
        </motion.div>

        {/* Skill info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-content truncate">
              {skill.name}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${colors.text}`}>
              {skill.levelLabel}
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className={`h-full rounded-full ${colors.bar} shadow-sm`}
              style={{
                boxShadow: `0 0 8px ${accentMap[accent].bar.replace('bg-', '').replace('-400', '')}40`,
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Hover tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`absolute left-0 right-0 -bottom-1 translate-y-full z-50 px-3 py-2.5 rounded-xl border ${colors.border} backdrop-blur-xl shadow-2xl`}
            style={{ background: 'var(--glass-bg)' }}
          >
            <p className="text-xs text-content-secondary leading-relaxed">
              {skill.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Category Card Component ─── */
const CategoryCard = ({
  category,
  index,
}: {
  category: (typeof skillCategories)[0];
  index: number;
}) => {
  const colors = accentMap[category.accentColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -6 }}
      className={`group relative rounded-2xl border border-border-subtle p-6 transition-all duration-500 ${category.borderHover}`}
      style={{ background: 'var(--glass-bg)' }}
    >
      {/* Glassmorphism card backdrop */}
      <div className="absolute inset-0 rounded-2xl backdrop-blur-xl" />

      {/* Hover glow effect */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${category.glowColor}, transparent 60%)`,
        }}
      />

      {/* Subtle gradient overlay on hover */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} border ${colors.border} flex items-center justify-center shadow-lg`}
          >
            {/* Category icon glyph */}
            <span className="text-xl">
              {category.id === 'frontend' && '🎨'}
              {category.id === 'backend' && '⚙️'}
              {category.id === 'ai' && '🧠'}
              {category.id === 'tools' && '🔧'}
            </span>
          </motion.div>
          <div>
            <h4 className={`text-base font-bold text-content transition-colors duration-300 group-hover:${colors.text.replace('text-', 'text-')}`}>
              {category.title}
            </h4>
            <p className="text-[11px] font-medium text-content-muted uppercase tracking-wider">
              {category.subtitle}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px w-full mb-5 ${colors.bg} opacity-60`} />

        {/* Skills list */}
        <div className="space-y-1">
          {category.skills.map((skill, i) => (
            <SkillItem
              key={skill.name}
              skill={skill}
              accent={category.accentColor}
              index={i}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Skills Section ─── */
export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const bgY3 = useTransform(scrollYProgress, [0, 1], [40, -120]);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 sm:px-12 relative overflow-hidden"
      id="skills"
    >
      {/* Background image layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          data-parallax-background
          className="absolute inset-0 bg-cover bg-center opacity-75 scale-105"
          style={{
            backgroundImage: "url('/keahlihan.png')",
            filter: 'brightness(0.88) saturate(0.95) contrast(1.02)',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--overlay-section-top)_0%,var(--overlay-section-mid)_35%,var(--overlay-section-bottom)_100%)]" />
      </div>

      {/* Animated dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

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

      {/* Additional ambient glow shapes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-r from-blue-500/[0.04] via-purple-500/[0.06] to-pink-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="stat-badge"
          >
            Kemampuan Teknis
          </motion.span>

          <h3 className="hero-text !text-[40px] pb-2">
            Keahlian & Teknologi Terkini
          </h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-content-muted text-sm max-w-lg mx-auto mt-4 leading-relaxed"
          >
            Rangkuman kemampuan teknis yang saya kuasai dan terus kembangkan
            dalam membangun solusi digital berdampak.
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => (
            <CategoryCard key={category.id} category={category} index={idx} />
          ))}
        </div>

        {/* Bottom decorative stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-wrap justify-center gap-6 md:gap-10"
        >
          {[
            { value: '16+', label: 'Teknologi' },
            { value: '14+', label: 'Proyek' },
            { value: '3+', label: 'Tahun Pengalaman' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.7,
                  type: 'spring',
                  stiffness: 200,
                }}
                viewport={{ once: true }}
                className="block text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                {stat.value}
              </motion.span>
              <span className="text-[10px] font-semibold text-content-muted uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
