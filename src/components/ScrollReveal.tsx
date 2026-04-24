import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, MotionValue } from 'motion/react';

interface ScrollRevealProps {
  children: string;
  baseOpacity?: number;
  enableBlur?: boolean;
  baseRotation?: number;
  blurStrength?: number;
  className?: string;
}

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  baseOpacity: number;
  enableBlur: boolean;
  baseRotation: number;
  blurStrength: number;
}

const Word = ({ word, progress, start, end, baseOpacity, enableBlur, baseRotation, blurStrength }: WordProps) => {
  const opacity = useTransform(progress, [start, end], [baseOpacity, 1]);
  const rotate = useTransform(progress, [start, end], [baseRotation, 0]);
  const blurVal = useTransform(progress, [start, end], [blurStrength, 0]);
  const filter = useMotionTemplate`blur(${blurVal}px)`;

  return (
    <motion.span
      style={{
        opacity,
        rotate,
        filter: enableBlur ? filter : 'none'
      }}
      className="mr-[0.25em] inline-block"
    >
      {word}
    </motion.span>
  );
};

export default function ScrollReveal({
  children,
  baseOpacity = 0.1,
  enableBlur = false,
  baseRotation = 0,
  blurStrength = 4,
  className = ""
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 50%"]
  });

  const words = children.split(' ');

  return (
    <div ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return (
          <Word
            key={i}
            word={word}
            progress={scrollYProgress}
            start={start}
            end={end}
            baseOpacity={baseOpacity}
            enableBlur={enableBlur}
            baseRotation={baseRotation}
            blurStrength={blurStrength}
          />
        );
      })}
    </div>
  );
}
