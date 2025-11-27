import React, { useEffect, useState, ReactNode } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  render?: (text: string) => ReactNode; // New prop for custom rendering
}

export const Typewriter = ({ text, speed = 30, onComplete, render }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  if (render) {
    return <>{render(displayedText)}</>;
  }

  return <>{displayedText}</>;
};
