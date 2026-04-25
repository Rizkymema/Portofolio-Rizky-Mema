import { useEffect, useRef, useState, useCallback } from 'react';

interface UseNavbarVisibilityOptions {
  /** Minimum scroll delta (px) before registering a direction change */
  threshold?: number;
  /** ScrollY below which navbar is ALWAYS visible */
  topOffset?: number;
  /** How close (px) to a section top before navbar reveals on scroll-up */
  sectionProximity?: number;
  /** CSS selector for section elements */
  sectionSelector?: string;
}

/**
 * Navbar visibility hook with section-boundary awareness.
 *
 * - Scroll DOWN → hide immediately
 * - Scroll UP  → show only when near a section top boundary ("mentok")
 * - At page top → always visible
 *
 * Uses rAF-throttled scroll + cached section offsets for performance.
 */
export function useNavbarVisibility({
  threshold = 8,
  topOffset = 80,
  sectionProximity = 150,
  sectionSelector = '[data-snap-section]',
}: UseNavbarVisibilityOptions = {}) {
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const sectionTops = useRef<number[]>([]);

  // Cache section top positions (absolute Y)
  const refreshSections = useCallback(() => {
    const els = document.querySelectorAll<HTMLElement>(sectionSelector);
    sectionTops.current = Array.from(els)
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top + window.scrollY;
      })
      .sort((a, b) => a - b);
  }, [sectionSelector]);

  const update = useCallback(() => {
    const currentY = window.scrollY;
    const delta = currentY - lastScrollY.current;

    // Always visible at top of page
    if (currentY <= topOffset) {
      setVisible(true);
      setIsScrolled(false);
      lastScrollY.current = currentY;
      ticking.current = false;
      return;
    }

    // If past topOffset, user has scrolled
    setIsScrolled(true);

    // Dead-zone: ignore micro-scrolls
    if (Math.abs(delta) < threshold) {
      ticking.current = false;
      return;
    }

    if (delta > 0) {
      // ── SCROLL DOWN → hide immediately ──
      setVisible(false);
    } else {
      // ── SCROLL UP → show only at section boundary ──
      const nearBoundary = sectionTops.current.some(
        (top) => Math.abs(currentY - top) <= sectionProximity
      );
      if (nearBoundary) {
        setVisible(true);
      }
    }

    lastScrollY.current = currentY;
    ticking.current = false;
  }, [threshold, topOffset, sectionProximity]);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    const onResize = () => refreshSections();

    // Initial setup
    refreshSections();
    lastScrollY.current = window.scrollY;

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('load', refreshSections);

    // Refresh after fonts/images settle
    if ('fonts' in document) {
      void document.fonts.ready.then(refreshSections);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', refreshSections);
    };
  }, [update, refreshSections]);

  return { visible, isScrolled };
}
