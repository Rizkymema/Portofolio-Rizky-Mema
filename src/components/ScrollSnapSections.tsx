"use client";

import { type PropsWithChildren, type ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

interface ScrollSnapContainerProps {
  children: ReactNode;
  enabled?: boolean;
}

interface ScrollSnapSectionProps extends PropsWithChildren {
  className?: string;
}

export const ScrollSnapContainer = ({ children, enabled = true }: ScrollSnapContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const container = containerRef.current;
    const rootElement = document.documentElement;
    const bodyElement = document.body;

    if (!container) {
      return;
    }

    rootElement.classList.add('snap-scroll-active');
    bodyElement.classList.add('snap-scroll-active');

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const refreshTriggers = () => ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('[data-snap-section]', container);
      const backgroundParallaxLayers = gsap.utils.toArray<HTMLElement>('[data-parallax-background]', container);

      if (sections.length < 2) {
        return;
      }

      const parallaxTravel = window.innerWidth < 768 ? 4 : 8;

      backgroundParallaxLayers.forEach((layer) => {
        const parentSection = layer.closest('section');

        if (!parentSection) {
          return;
        }

        gsap.fromTo(
          layer,
          { yPercent: -parallaxTravel },
          {
            yPercent: parallaxTravel,
            ease: 'none',
            overwrite: 'auto',
            scrollTrigger: {
              trigger: parentSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      let snapTween: gsap.core.Tween | null = null;
      let scrollEndTimer: number | null = null;

      const getSectionOffsets = () => sections.map((section) => section.offsetTop);

      const syncActiveSection = () => {
        const currentScroll = window.scrollY;
        const sectionOffsets = getSectionOffsets();
        const nearestOffset = sectionOffsets.reduce((closest, offset) => {
          return Math.abs(offset - currentScroll) < Math.abs(closest - currentScroll) ? offset : closest;
        }, sectionOffsets[0] ?? 0);

        sections.forEach((section, index) => {
          section.dataset.snapActive = String(sectionOffsets[index] === nearestOffset);
        });
      };

      const snapToNearestSection = () => {
        const currentScroll = window.scrollY;
        const sectionOffsets = getSectionOffsets();
        const nearestOffset = sectionOffsets.reduce((closest, offset) => {
          return Math.abs(offset - currentScroll) < Math.abs(closest - currentScroll) ? offset : closest;
        }, sectionOffsets[0] ?? 0);

        const snapDistance = Math.abs(nearestOffset - currentScroll);
        const snapThreshold = window.innerHeight * 0.4;

        syncActiveSection();

        if (snapDistance === 0 || snapDistance > snapThreshold) {
          return;
        }

        snapTween?.kill();
        snapTween = gsap.to(window, {
          duration: 0.45,
          ease: 'power2.out',
          overwrite: true,
          scrollTo: { y: nearestOffset, autoKill: false },
          onComplete: () => {
            snapTween = null;
            syncActiveSection();
          },
          onInterrupt: () => {
            snapTween = null;
          },
        });
      };

      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onToggle: () => {
            syncActiveSection();
          },
        });
      });

      const scheduleSnap = () => {
        if (snapTween) {
          return;
        }

        if (scrollEndTimer !== null) {
          window.clearTimeout(scrollEndTimer);
        }

        scrollEndTimer = window.setTimeout(() => {
          scrollEndTimer = null;
          snapToNearestSection();
        }, 160);
      };

      window.addEventListener('scroll', scheduleSnap, { passive: true });
      syncActiveSection();

      return () => {
        window.removeEventListener('scroll', scheduleSnap);

        if (scrollEndTimer !== null) {
          window.clearTimeout(scrollEndTimer);
        }

        snapTween?.kill();
      };
    }, container);

    window.addEventListener('load', refreshTriggers);

    if ('fonts' in document) {
      void document.fonts.ready.then(refreshTriggers);
    }

    requestAnimationFrame(refreshTriggers);

    return () => {
      window.removeEventListener('load', refreshTriggers);
      rootElement.classList.remove('snap-scroll-active');
      bodyElement.classList.remove('snap-scroll-active');
      ctx.revert();
    };
  }, [enabled]);

  return (
    <div ref={containerRef} data-snap-scroll-root className="relative">
      {children}
    </div>
  );
};

export const ScrollSnapSection = ({ children, className = '' }: ScrollSnapSectionProps) => {
  return (
    <div data-snap-section className={`relative min-h-[100svh] ${className}`.trim()}>
      {children}
    </div>
  );
};