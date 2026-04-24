/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { FeaturedProjects } from './components/FeaturedProjects';
import { CreatorHub } from './components/CreatorHub';
import { Experience } from './components/Experience';
import { Certifications } from './components/Certifications';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import PillNav from './components/PillNav';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Work', href: '#projects' },
    { label: 'Content', href: '#creator-hub' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <main className="w-full relative transition-colors duration-500" style={{ background: 'var(--bg-color)' }}>
      {/* Top Nav */}
      <nav className="fixed top-6 inset-x-4 md:inset-x-0 mx-auto max-w-5xl bg-white/60 dark:bg-[#0b1228]/60 backdrop-blur-2xl border border-black/5 dark:border-white/10 px-4 md:px-6 py-3 rounded-full z-50 shadow-lg shadow-black/5 transition-colors duration-500">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent dark:from-white/5 dark:to-transparent rounded-full -z-10 pointer-events-none"></div>
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6">
          <div className="col-start-1 justify-self-start">
            <a href="#home" className="shrink-0 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white hover:opacity-80 transition cursor-pointer">
              Rizky<span className="text-blue-400">.</span>
            </a>
          </div>

          <div className="col-start-2 hidden md:flex justify-self-center px-2 lg:px-4">
            <PillNav
              items={navItems}
              baseColor={isDark ? '#ffffff' : '#0f172a'}
              pillColor="transparent"
              hoveredPillTextColor={isDark ? '#0f172a' : '#ffffff'}
              pillTextColor={isDark ? '#cbd5e1' : '#475569'}
              className="md:flex"
            />
          </div>

          <div className="col-start-3 flex items-center justify-self-end gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-black/5 px-5 text-sm font-semibold uppercase tracking-[0.08em] text-slate-900 transition-all duration-300 hover:bg-black/10 hover:shadow-md hover:shadow-black/5 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:shadow-white/5"
            >
              Siap Bekerja
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 text-slate-900 dark:text-white"
              aria-label="Buka Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed top-28 inset-x-4 z-40 md:hidden transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="rounded-[28px] border border-black/10 bg-white/70 p-3 shadow-xl shadow-black/10 backdrop-blur-2xl dark:border-white/10 dark:bg-[#0b1228]/85">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex h-11 items-center rounded-full bg-black/[0.04] px-4 text-sm font-semibold uppercase tracking-[0.08em] text-slate-700 transition-all duration-300 hover:bg-black/[0.08] dark:bg-white/[0.06] dark:text-slate-100 dark:hover:bg-white/[0.12]"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="flex h-11 items-center justify-center rounded-full border border-black/10 bg-black text-sm font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:bg-slate-800 dark:border-white/10 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              Siap Bekerja
            </a>
          </div>
        </div>
      </div>
      
      {/* Hero — transparent so the fixed video background shows through */}
      <div className="pt-32">
        <Hero />
      </div>

      {/* All sections after Hero get a solid background so they render cleanly
          on top of the fixed video layer */}
      <div className="relative z-10 flex flex-col">
        <About />
        <Skills />
        <FeaturedProjects />
        <CreatorHub />
        <Experience />
        <Certifications />
        <Blog />
        <Contact />
        <Footer />
      </div>

      {/* Floating Theme Toggle */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center bg-white/50 dark:bg-black/20 backdrop-blur-lg border border-black/5 dark:border-white/5 text-slate-900 dark:text-white text-xl shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 z-50"
        aria-label="Ubah Tema"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <Sun size={24} className={`absolute transition-all duration-300 ${isDark ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
          <Moon size={24} className={`absolute transition-all duration-300 ${!isDark ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`} />
        </div>
      </button>
    </main>
  );
}
