
import React, { useState, useEffect } from 'react';

const QUOTES = [
  "A Standard Above the Rest",
  "An Extension of Your Team",
  "Elite Talent. Global Scale.",
  "Your Growth, Our Precision.",
  "Seamless Operational Excellence."
];

interface RotatingQuoteProps {
  className?: string;
}

const RotatingQuote: React.FC<RotatingQuoteProps> = ({ className }) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % QUOTES.length);
        setFade(true);
      }, 500); // Wait for fade out
    }, 4000); // Rotate every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <p className={`${className} transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
      "{QUOTES[index]}"
    </p>
  );
};

export default RotatingQuote;
