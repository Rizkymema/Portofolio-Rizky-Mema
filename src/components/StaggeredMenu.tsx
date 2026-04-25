'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Instagram, Facebook, Link2 } from 'lucide-react';

/* ────────────────────── Helpers ────────────────────── */
const getSocialIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('github')) return <Github className="w-5 h-5 sm:w-6 sm:h-6" />;
  if (lowerName.includes('instagram')) return <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />;
  if (lowerName.includes('facebook')) return <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />;
  if (lowerName.includes('tiktok')) {
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    );
  }
  return <Link2 className="w-5 h-5 sm:w-6 sm:h-6" />;
};

/* ────────────────────── Types ────────────────────── */
interface MenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
}

interface SocialItem {
  label: string;
  link: string;
}

interface StaggeredMenuProps {
  /** Position of the toggle button */
  position?: 'left' | 'right';
  /** Navigation items */
  items: MenuItem[];
  /** Social links */
  socialItems?: SocialItem[];
  /** Show social links */
  displaySocials?: boolean;
  /** Show item numbering (01, 02 …) */
  displayItemNumbering?: boolean;
  /** Toggle button color (closed state) */
  menuButtonColor?: string;
  /** Toggle button color (open state) */
  openMenuButtonColor?: string;
  /** Change button color when menu opens */
  changeMenuColorOnOpen?: boolean;
  /** Gradient colors for the overlay background */
  colors?: [string, string];
  /** Accent color for hovers and numbering */
  accentColor?: string;
  /** Whether menu is open (controlled) */
  isOpen: boolean;
  /** Toggle callback */
  onToggle: () => void;
  /** Callback fired when a navigation link is clicked */
  onNavigate?: () => void;
}

/* ────────────── Hamburger Toggle Button ────────────── */
const HamburgerToggle = ({
  isOpen,
  onClick,
  color,
  openColor,
  changeOnOpen,
}: {
  isOpen: boolean;
  onClick: () => void;
  color: string;
  openColor: string;
  changeOnOpen: boolean;
}) => {
  const currentColor = changeOnOpen && isOpen ? openColor : color;

  return (
    <button
      onClick={onClick}
      className="relative z-[60] w-10 h-10 flex items-center justify-center focus:outline-none"
      aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
    >
      <div className="w-6 h-4 relative flex flex-col justify-between">
        <motion.span
          animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          className="block w-full h-[2px] rounded-full origin-center"
          style={{ backgroundColor: currentColor }}
        />
        <motion.span
          animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="block w-full h-[2px] rounded-full"
          style={{ backgroundColor: currentColor }}
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          className="block w-full h-[2px] rounded-full origin-center"
          style={{ backgroundColor: currentColor }}
        />
      </div>
    </button>
  );
};

/* ────────────────── Animation Variants ────────────────── */
const overlayVariants = {
  closed: {
    x: '100%',
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const },
  },
  open: {
    x: '0%',
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const },
  },
};

const backdropVariants = {
  closed: { opacity: 0, transition: { duration: 0.4 } },
  open: { opacity: 1, transition: { duration: 0.4 } },
};

const menuItemVariants = {
  closed: { opacity: 0, y: 40, filter: 'blur(6px)' },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      delay: 0.35 + i * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: -20,
    filter: 'blur(4px)',
    transition: {
      duration: 0.3,
      delay: i * 0.04,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  }),
};

const socialVariants = {
  closed: { opacity: 0, y: 20 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: 0.6 + i * 0.06,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

/* ────────────────── Main Component ────────────────── */
const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  items,
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  menuButtonColor = '#ffffff',
  openMenuButtonColor = '#ffffff',
  changeMenuColorOnOpen = true,
  colors = ['#0F172A', '#1E293B'],
  accentColor = '#60A5FA',
  isOpen,
  onToggle,
  onNavigate,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Hamburger Toggle */}
      <HamburgerToggle
        isOpen={isOpen}
        onClick={onToggle}
        color={menuButtonColor}
        openColor={openMenuButtonColor}
        changeOnOpen={changeMenuColorOnOpen}
      />

      {/* Sidebar Overlay via Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[100] flex justify-end overflow-hidden">
              {/* Backdrop */}
              <motion.div
                variants={backdropVariants}
                initial="closed"
                animate="open"
                exit="closed"
                onClick={onToggle}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
              />

              {/* Sidebar Panel */}
              <motion.div
                key="sidebar-menu"
                variants={overlayVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="relative w-full max-w-[550px] h-full shadow-2xl overflow-y-auto overflow-x-hidden"
                style={{
                  background: `linear-gradient(160deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
                }}
              >
                {/* Decorative grid lines */}
                <div className="fixed inset-0 pointer-events-none opacity-[0.04]">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '80px 80px',
                    }}
                  />
                </div>

                {/* Accent glow */}
                <div
                  className="fixed w-[600px] h-[600px] rounded-full opacity-10 blur-[120px] pointer-events-none"
                  style={{
                    background: accentColor,
                    top: '10%',
                    right: '-10%',
                  }}
                />

                {/* Close Button - Top Right */}
                <div className="sticky top-0 right-0 w-full flex justify-end p-6 md:p-8 z-50 pointer-events-none">
                  <motion.button
                    onClick={onToggle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.5 } }}
                    exit={{ opacity: 0 }}
                    className="text-white/60 hover:text-white transition-colors text-3xl leading-none font-light tracking-[0.2em] pointer-events-auto"
                    aria-label="Tutup menu"
                  >
                    ...
                  </motion.button>
                </div>

                {/* Content - Flow Layout */}
                <div className="relative z-10 w-full px-8 sm:px-12 md:px-16 pt-8 pb-20 md:pb-28 min-h-full flex flex-col justify-center">
                  {/* Navigation Items Grid - Increased gap for clarity */}
                  <nav className="flex flex-col gap-6 sm:gap-8 md:gap-10 w-full">
                    {items.map((item, i) => (
                      <motion.a
                        key={item.link}
                        href={item.link}
                        aria-label={item.ariaLabel || item.label}
                        custom={i}
                        variants={menuItemVariants}
                        initial="closed"
                        animate="open"
                        exit="exit"
                        onClick={() => {
                          onNavigate?.();
                          onToggle();
                        }}
                        className="group flex items-baseline gap-6 md:gap-8 w-full cursor-pointer"
                      >
                        {/* Number - Left Side (Fixed width for alignment) */}
                        {displayItemNumbering && (
                          <motion.div
                            className="text-xs sm:text-sm font-mono font-medium w-8 text-left mt-2 md:mt-3 opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ color: accentColor }}
                          >
                            <span className="block border-b border-white/20 pb-2 group-hover:border-white/50 transition-colors">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                          </motion.div>
                        )}

                        {/* Text - Right Side */}
                        <div className="flex-1">
                          <motion.span
                            className="block text-4xl sm:text-5xl md:text-6xl font-black text-white/80 uppercase tracking-tighter leading-none transition-colors duration-300 group-hover:text-white drop-shadow-md origin-left"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.label}
                          </motion.span>
                        </div>
                      </motion.a>
                    ))}
                  </nav>

                  {/* Bottom Footer Section */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.7 } }}
                    exit={{ opacity: 0 }}
                    className="mt-16 pt-10 border-t border-white/10 w-full flex flex-col gap-8"
                  >
                    {/* Social Links */}
                    {displaySocials && socialItems.length > 0 && (
                      <div className="flex flex-col gap-4">
                        <span
                          className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] font-mono"
                          style={{ color: accentColor }}
                        >
                          IKUTI SAYA
                        </span>
                        <div className="flex flex-wrap items-center gap-5 sm:gap-6">
                          {socialItems.map((social, i) => (
                            <motion.a
                              key={social.link}
                              href={social.link}
                              target="_blank"
                              rel="noreferrer"
                              custom={i + 1}
                              variants={socialVariants}
                              initial="closed"
                              animate="open"
                              exit="exit"
                              className="text-white/60 hover:text-white transition-all duration-300 flex-shrink-0 flex items-center justify-center transform hover:-translate-y-1"
                              aria-label={social.label}
                              title={social.label}
                            >
                              {getSocialIcon(social.label)}
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Copyright */}
                    <div className="text-[10px] sm:text-xs font-medium tracking-[0.1em] text-white/30 uppercase mt-2">
                       @ 2026 RIZKY MEMa
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default StaggeredMenu;

