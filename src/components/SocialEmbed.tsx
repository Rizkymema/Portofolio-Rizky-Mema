import React, { useEffect } from 'react';

interface SocialEmbedProps {
  platform: 'tiktok' | 'instagram';
  url: string;
}

export const SocialEmbed: React.FC<SocialEmbedProps> = ({ platform, url }) => {

  const isProfileLink = !url.includes('/video/') && !url.includes('/p/') && !url.includes('/reel/');

  useEffect(() => {
    if (isProfileLink) return;

    // Inject Instagram Script
    if (platform === 'instagram') {
      if (!window.instgrm) {
        const script = document.createElement('script');
        script.src = "//www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
      } else {
        setTimeout(() => window.instgrm.Embeds.process(), 500);
      }
    }

    // Inject TikTok Script
    if (platform === 'tiktok') {
      const existingScript = document.getElementById('tiktok-embed-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'tiktok-embed-script';
        script.src = "https://www.tiktok.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [platform, url, isProfileLink]);

  let videoId = '';
  if (platform === 'tiktok' && !isProfileLink) {
    const match = url.match(/video\/(\d+)/);
    if (match) videoId = match[1];
  }

  // Jika yang dimasukkan adalah link profil (bukan video spesifik), tampilkan kartu profil elegan
  if (isProfileLink) {
    return (
      <div className="w-full flex justify-center bg-transparent shrink-0 snap-start my-4 px-4">
        <a href={url} target="_blank" rel="noreferrer" className="w-full max-w-[320px] bg-slate-800 rounded-2xl border border-border-subtle p-6 flex flex-col items-center gap-4 hover:bg-slate-700 transition-colors shadow-xl">
           <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-white">
              {platform === 'tiktok' ? '🎵' : '📷'}
           </div>
           <div className="text-center">
              <h4 className="text-white font-bold text-lg mb-1">@{url.includes('tiktok') ? 'rizkymema' : 'rizkymema'}</h4>
              <p className="text-content-muted text-sm mb-4">Kunjungi Profil {platform === 'tiktok' ? 'TikTok' : 'Instagram'}</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full text-sm transition-all shadow-md w-full">
                Lihat Semua Konten
              </button>
           </div>
           <p className="text-xs text-red-400 text-center mt-2 px-2 bg-red-500/10 py-2 rounded-lg border border-red-500/20">
             (Embed gagal: Masukkan link "Video/Postingan" spesifik, bukan link Profil Utama)
           </p>
        </a>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center bg-transparent shrink-0 snap-start my-4 px-2">
      {platform === 'tiktok' ? (
        <blockquote 
          className="tiktok-embed" 
          cite={url} 
          data-video-id={videoId} 
          style={{ maxWidth: '320px', minWidth: '300px' }}
        >
          <section></section>
        </blockquote>
      ) : (
        <blockquote 
          className="instagram-media" 
          data-instgrm-permalink={url} 
          data-instgrm-version="14" 
          style={{ 
            background: '#FFF', 
            border: '0', 
            borderRadius: '12px', 
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', 
            margin: '1px', 
            maxWidth: '320px', 
            minWidth: '300px', 
            padding: '0', 
            width: '99.375%' 
          }}
        >
        </blockquote>
      )}
    </div>
  );
};

// Menambahkan deklarasi global untuk window.instgrm agar tidak error TypeScript
declare global {
  interface Window {
    instgrm?: any;
  }
}
