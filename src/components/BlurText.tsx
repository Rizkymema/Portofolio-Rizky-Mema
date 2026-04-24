import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom' | 'left' | 'right' | 'none';
  onAnimationComplete?: () => void;
  className?: string;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
  className = '',
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [completedCount, setCompletedCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (completedCount === elements.length && onAnimationComplete) {
      onAnimationComplete();
    }
  }, [completedCount, elements.length, onAnimationComplete]);

  const getDirectionOffset = () => {
    switch (direction) {
      case 'top': return { y: -20 };
      case 'bottom': return { y: 20 };
      case 'left': return { x: -20 };
      case 'right': return { x: 20 };
      case 'none': return {};
      default: return { y: -20 };
    }
  };

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          initial={{ 
            opacity: 0, 
            filter: 'blur(10px)', 
            ...getDirectionOffset() 
          }}
          animate={
            isInView
              ? { opacity: 1, filter: 'blur(0px)', x: 0, y: 0 }
              : {}
          }
          transition={{
            duration: 0.5,
            delay: index * (delay / 1000),
            ease: 'easeOut',
          }}
          onAnimationComplete={() => setCompletedCount(prev => prev + 1)}
          className="inline-block"
        >
          {element === ' ' ? '\u00A0' : element}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </span>
  );
};

export default BlurText;
