import React from 'react';
import { motion } from 'motion/react';

type HighlightSkill = {
  name: string;
  icon: string;
};

const highlightSkills: HighlightSkill[] = [
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/white' },
  { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'TensorFlow', icon: 'https://cdn.simpleicons.org/tensorflow/FF6F00' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E' },
];

const edgeMask = 'linear-gradient(to right, transparent 0%, black 9%, black 91%, transparent 100%)';

export const HighlightSkills = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
      className="relative"
    >
      <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] shadow-[0_18px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#081120] via-[#081120]/88 to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#081120] via-[#081120]/88 to-transparent sm:w-24" />

        <div
          className="overflow-hidden"
          style={{
            WebkitMaskImage: edgeMask,
            maskImage: edgeMask,
          }}
        >
          <div className="marquee-track flex w-max group-hover:[animation-play-state:paused] [animation:highlight-skills-marquee_28s_linear_infinite]">
            {[0, 1].map((copyIndex) => (
              <div
                key={copyIndex}
                aria-hidden={copyIndex === 1}
                className="flex shrink-0 items-center gap-6 px-5 py-5 sm:gap-8 sm:px-7 sm:py-6 md:gap-10"
              >
                {highlightSkills.map((skill, skillIndex) => (
                  <motion.div
                    key={`${copyIndex}-${skill.name}`}
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 4.4 + (skillIndex % 3) * 0.45,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                      delay: skillIndex * 0.14,
                    }}
                    whileHover={{ scale: 1.1, y: -6 }}
                    className="group/item flex min-w-[84px] flex-col items-center justify-center rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-3 text-center transition-all duration-300 hover:border-cyan-300/35 hover:bg-white/[0.06] hover:shadow-[0_0_15px_rgba(0,200,255,0.6)] sm:min-w-[108px] sm:px-5 sm:py-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950/35 ring-1 ring-white/10 sm:h-14 sm:w-14">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        loading="lazy"
                        className="h-6 w-6 drop-shadow-[0_0_12px_rgba(255,255,255,0.14)] sm:h-7 sm:w-7"
                      />
                    </div>
                    <span className="mt-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/76 sm:text-[11px]">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes highlight-skills-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </motion.div>
  );
};