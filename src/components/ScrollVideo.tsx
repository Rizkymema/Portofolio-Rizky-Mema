"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ScrollVideoProps {
  src: string;
  className?: string;
}

export default function ScrollVideo({ src, className = "" }: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Pastikan ini hanya berjalan di sisi client
    if (typeof window === "undefined") return;

    // Register plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const video = videoRef.current;

    if (!container || !video) return;

    // Menggunakan gsap.context untuk clean up yang mudah (mencegah memory leak)
    const ctx = gsap.context(() => {
      // 1. Fade in animation saat container muncul di viewport
      gsap.fromTo(
        container,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%", // Mulai animasi saat bagian atas container mencapai 85% dari viewport
            toggleActions: "play none none reverse", // Play saat masuk, reverse saat keluar
          },
        }
      );

      // 2. Play/Pause video berdasarkan posisi scroll
      ScrollTrigger.create({
        trigger: container,
        start: "top bottom", // Saat bagian atas elemen menyentuh bagian bawah viewport
        end: "bottom top",   // Saat bagian bawah elemen menyentuh bagian atas viewport
        onEnter: () => {
          video.play().catch((err) => console.warn("Autoplay dicegah oleh browser:", err));
        },
        onLeave: () => {
          video.pause();
        },
        onEnterBack: () => {
          video.play().catch((err) => console.warn("Autoplay dicegah oleh browser:", err));
        },
        onLeaveBack: () => {
          video.pause();
        },
      });
    }, containerRef); // Scope context ke container ini

    // Cleanup: hapus semua animasi & trigger yang dibuat dalam context ini
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`scroll-video relative w-full overflow-hidden rounded-2xl ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-auto object-cover"
        muted
        playsInline
        loop
        preload="metadata"
      />
    </div>
  );
}
