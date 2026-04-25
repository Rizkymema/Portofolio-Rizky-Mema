"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, animate } from 'motion/react';
import type { Variants } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (value) => setProgress(Math.floor(value)),
    });
    return () => controls.stop();
  }, []);

  useEffect(() => {
    // Set a timer to hide the preloader after a few seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for exit animation to complete before telling parent
      setTimeout(() => {
        onComplete();
      }, 800); // match exit transition duration
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Text animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      },
    },
  };

  const words = "Welcome to my portofolio".split(" ");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-white"
        >
          {/* Background glow effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 flex flex-wrap justify-center gap-2 md:gap-3 text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-center px-4"
          >
            {words.map((word, index) => (
              <motion.span key={index} variants={itemVariants} className="block drop-shadow-2xl">
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 relative z-10 flex items-center justify-center drop-shadow-lg"
          >
            <span className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500">
              {progress}
            </span>
            <span className="text-3xl md:text-5xl ml-1 text-white/80 font-bold">%</span>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "circOut" }}
            className="absolute bottom-1/4 w-48 md:w-64 h-1 bg-white/20 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2.2, ease: "easeOut" }}
              className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
