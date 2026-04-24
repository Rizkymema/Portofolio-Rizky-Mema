import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TextTypeProps {
  text?: string | string[];
  texts?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  variableSpeedEnabled?: boolean;
  variableSpeedMin?: number;
  variableSpeedMax?: number;
  cursorBlinkDuration?: number;
  className?: string;
}

const TextType: React.FC<TextTypeProps> = ({
  text,
  texts,
  typingSpeed = 75,
  deletingSpeed = 50,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "_",
  variableSpeedEnabled = false,
  variableSpeedMin = 60,
  variableSpeedMax = 120,
  cursorBlinkDuration = 0.5,
  className = "",
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  
  // Normalize strings array
  const textArray = texts || (Array.isArray(text) ? text : text ? [text] : []);
  
  useEffect(() => {
    if (!textArray || textArray.length === 0) return;

    const currentText = textArray[loopNum % textArray.length];
    
    let timer: NodeJS.Timeout;
    
    const getTypingSpeed = () => {
      if (variableSpeedEnabled) {
        return Math.floor(Math.random() * (variableSpeedMax - variableSpeedMin + 1)) + variableSpeedMin;
      }
      return isDeleting ? deletingSpeed : typingSpeed;
    };

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      }, getTypingSpeed());
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }, getTypingSpeed());
    }

    if (!isDeleting && displayText === currentText) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }

    return () => clearTimeout(timer);
  }, [
    displayText, 
    isDeleting, 
    loopNum, 
    textArray, 
    typingSpeed, 
    deletingSpeed, 
    pauseDuration, 
    variableSpeedEnabled, 
    variableSpeedMin, 
    variableSpeedMax
  ]);

  return (
    <span className={`inline-block ${className}`}>
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: cursorBlinkDuration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="inline-block ml-1"
        >
          {cursorCharacter}
        </motion.span>
      )}
    </span>
  );
};

export default TextType;
