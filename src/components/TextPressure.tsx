import React, { useRef, useState, useEffect } from 'react';

interface TextPressureProps {
  text: string;
  flex?: boolean;
  alpha?: boolean;
  stroke?: boolean;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  textColor?: string;
  strokeColor?: string;
  minFontSize?: number;
  className?: string;
}

const TextPressure: React.FC<TextPressureProps> = ({
  text,
  flex = true,
  alpha = false,
  stroke = false,
  width = true,
  weight = true,
  italic = true,
  textColor,
  strokeColor = "#5227FF",
  minFontSize, // We will ignore minFontSize and use CSS scale for responsiveness
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const chars = text.split('');

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}
      style={{ display: flex ? 'flex' : 'block' }}
    >
      <div className="flex">
        {chars.map((char, index) => {
          let effect = 0;
          if (spanRefs.current[index]) {
            const rect = spanRefs.current[index]!.getBoundingClientRect();
            const charCenterX = rect.left + rect.width / 2;
            const charCenterY = rect.top + rect.height / 2;
            const dx = mousePos.x - charCenterX;
            const dy = mousePos.y - charCenterY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            // Max distance to affect is around 300px
            effect = Math.max(0, 1 - dist / 300);
          }

          // Variable font settings
          const fw = weight ? 100 + effect * 800 : 400; // 100 to 900
          const wd = width ? 50 + effect * 100 : 100; // 50 to 150
          const it = italic ? effect : 0; // 0 to 1
          
          const opacity = alpha ? 0.3 + effect * 0.7 : 1;
          const scale = 1 + (effect * 0.3); // Scale up to 1.3x
          
          let textShadow = 'none';
          if (stroke) {
             textShadow = `-1px -1px 0 ${strokeColor}, 1px -1px 0 ${strokeColor}, -1px 1px 0 ${strokeColor}, 1px 1px 0 ${strokeColor}`;
          }

          return (
            <span
              key={index}
              ref={(el) => { spanRefs.current[index] = el; }}
              style={{
                color: textColor, // if undefined, inherits from parent
                opacity,
                textShadow,
                transform: `scale(${scale})`,
                fontWeight: fw,
                fontStyle: it > 0.5 ? 'italic' : 'normal',
                fontVariationSettings: `"wght" ${fw}, "wdth" ${wd}, "ital" ${it}`,
                transition: 'transform 0.1s, font-weight 0.1s, font-variation-settings 0.1s, opacity 0.1s',
                display: 'inline-block',
                lineHeight: 1,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TextPressure;
