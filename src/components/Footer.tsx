import React from 'react';
import { Github, Instagram, Facebook } from 'lucide-react';

const TikTokIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const Footer = () => (
  <footer className="py-12 border-t border-border-subtle bg-transparent w-full">
    <div className="max-w-6xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex gap-4 items-center">
        <span className="text-xl font-extrabold tracking-tight text-content">V<span className="text-blue-500 dark:text-blue-400">.</span></span>
      </div>
      <p className="text-content-muted text-[10px] font-bold uppercase tracking-widest">&copy; {new Date().getFullYear()} Rizky Mema. Hak cipta dilindungi undang-undang.</p>
      
      <div className="flex items-center gap-3">
        <a href="https://github.com" target="_blank" rel="noreferrer" className="group w-8 h-8 rounded-full flex items-center justify-center bg-surface border border-border-subtle hover:bg-surface-hover hover:-translate-y-1 text-content-muted transition-all duration-300" aria-label="GitHub">
          <Github size={14} className="transition-colors group-hover:text-content" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="group w-8 h-8 rounded-full flex items-center justify-center bg-surface border border-border-subtle hover:bg-surface-hover hover:-translate-y-1 text-content-muted transition-all duration-300" aria-label="Instagram">
          <Instagram size={14} className="transition-colors group-hover:text-pink-500" />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="group w-8 h-8 rounded-full flex items-center justify-center bg-surface border border-border-subtle hover:bg-surface-hover hover:-translate-y-1 text-content-muted transition-all duration-300" aria-label="TikTok">
          <TikTokIcon size={14} className="transition-colors group-hover:text-cyan-400" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="group w-8 h-8 rounded-full flex items-center justify-center bg-surface border border-border-subtle hover:bg-surface-hover hover:-translate-y-1 text-content-muted transition-all duration-300" aria-label="Facebook">
          <Facebook size={14} className="transition-colors group-hover:text-blue-600" />
        </a>
      </div>
    </div>
  </footer>
);
