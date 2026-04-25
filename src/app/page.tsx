"use client";

import { Preloader } from '../components/Preloader';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { CreatorHub } from '../components/CreatorHub';
import { Experience } from '../components/Experience';
import { Certifications } from '../components/Certifications';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { ScrollSnapContainer, ScrollSnapSection } from '../components/ScrollSnapSections';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import PillNav from '../components/PillNav';
import StaggeredMenu from '../components/StaggeredMenu';

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStaggeredOpen, setIsStaggeredOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Work', href: '#projects' },
    { label: 'Content', href: '#creator-hub' },
    { label: 'Contact', href: '#contact' }
  ];

  // List of all items for the Staggered Menu
  const staggeredItems = [
    { label: 'HOME', link: '#home' },
    { label: 'ABOUT', link: '#about' },
    { label: 'SKILLS', link: '#skills' },
    { label: 'WORK', link: '#projects' },
    { label: 'CONTENT', link: '#creator-hub' },
    { label: 'EXPERIENCE', link: '#experience' },
    { label: 'CERTIFICATIONS', link: '#certifications' },
    { label: 'CONTACT', link: '#contact' }
  ];

  const socialList = [
    { label: 'GitHub', link: '#' },
    { label: 'Instagram', link: '#' },
    { label: 'TikTok', link: '#' },
    { label: 'Facebook', link: '#' }
  ];

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      // Threshold to hide main nav and show hamburger
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      <main className={`w-full relative transition-colors duration-500 overflow-x-hidden ${!isLoaded ? 'h-screen overflow-hidden' : ''}`}>
      
      {/* 
        Top Nav (PillNav) 
        Will fade out and move up when scrolled
      */}
      <nav className={`fixed top-6 inset-x-4 md:inset-x-0 mx-auto max-w-5xl bg-[var(--bg-primary)]/80 backdrop-blur-2xl border border-border-subtle px-4 md:px-6 py-3 rounded-full z-50 shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-500 ${isScrolled ? '-translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[var(--bg-secondary)]/30 to-transparent rounded-full -z-10 pointer-events-none"></div>
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6">
          <div className="col-start-1 justify-self-start">
            <a href="#home" className="shrink-0 text-2xl font-extrabold tracking-tight text-content hover:opacity-80 transition cursor-pointer">
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
              className="hidden sm:inline-flex h-11 items-center justify-center rounded-full border border-border-subtle bg-bg-tertiary px-5 text-sm font-semibold uppercase tracking-[0.08em] text-content transition-all duration-300 hover:bg-bg-surface-hover hover:shadow-md hover:shadow-black/5 dark:hover:shadow-white/5"
            >
              Kontak Saya
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-bg-secondary border border-border-subtle hover:bg-bg-tertiary transition-all duration-300 text-content"
              aria-label="Buka Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed top-28 inset-x-4 z-40 md:hidden transition-all duration-300 ${(!isScrolled && isMenuOpen) ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="rounded-[28px] border border-border-subtle bg-[var(--bg-primary)]/85 p-3 shadow-xl shadow-black/10 dark:shadow-black/25 backdrop-blur-2xl">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex h-11 items-center rounded-full bg-bg-tertiary px-4 text-sm font-semibold uppercase tracking-[0.08em] text-content-secondary transition-all duration-300 hover:bg-bg-surface-hover"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="flex h-11 items-center justify-center rounded-full border border-border-subtle bg-[var(--btn-bg)] text-sm font-semibold uppercase tracking-[0.08em] text-[var(--btn-text)] transition-all duration-300 hover:opacity-85"
            >
              Kontak Saya
            </a>
          </div>
        </div>
      </div>

      {/* Floating Staggered Menu Component - Appears on Scroll */}
      <div className={`fixed top-6 right-6 z-[60] transition-all duration-500 ${isScrolled ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="bg-bg-secondary/40 backdrop-blur-md rounded-full shadow-lg border border-border-subtle p-2 text-content flex items-center justify-center hover:bg-bg-tertiary transition-colors">
          <StaggeredMenu
            isOpen={isStaggeredOpen}
            onToggle={() => setIsStaggeredOpen(!isStaggeredOpen)}
            items={staggeredItems}
            socialItems={socialList}
            menuButtonColor={isDark ? '#ffffff' : '#0f172a'}
            openMenuButtonColor="#ffffff"
            colors={['#0F172A', '#1E293B']}
            accentColor="#60A5FA"
          />
        </div>
      </div>
      
      <ScrollSnapContainer enabled={isLoaded}>
        {/* Hero — transparent so the fixed video background shows through */}
        <ScrollSnapSection>
          <div className="pt-32">
            <Hero />
          </div>
        </ScrollSnapSection>

        {/* All sections after Hero keep their current visuals while gaining stable snap anchors */}
        <div className="relative z-10 flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <ScrollSnapSection className="portfolio-section-shell">
            <About />
          </ScrollSnapSection>

          <ScrollSnapSection className="portfolio-section-shell">
            <Skills />
          </ScrollSnapSection>

          <ScrollSnapSection className="portfolio-section-shell">
            <FeaturedProjects />
          </ScrollSnapSection>

          <ScrollSnapSection className="portfolio-section-shell">
            <CreatorHub />
          </ScrollSnapSection>

          <ScrollSnapSection className="portfolio-section-shell">
            <Experience />
          </ScrollSnapSection>

          <ScrollSnapSection className="portfolio-section-shell">
            <Certifications />
          </ScrollSnapSection>

          <ScrollSnapSection className="portfolio-section-shell">
            <Contact />
            <Footer />
          </ScrollSnapSection>
        </div>
      </ScrollSnapContainer>

      {/* Floating Theme Toggle */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center bg-bg-secondary backdrop-blur-lg border border-border-subtle text-content text-xl shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 z-50"
        aria-label="Ubah Tema"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <Sun size={24} className={`absolute transition-all duration-300 ${isDark ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
          <Moon size={24} className={`absolute transition-all duration-300 ${!isDark ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`} />
        </div>
      </button>
    </main>
    </>
  );
}
