"use client";

import { useState, useEffect } from "react";

export function AnimatedCounter({
  end,
  suffix,
  visible,
}: {
  end: number;
  suffix: string;
  visible: boolean;
}) {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!visible) return;
    if (end === 0) { 
      setCount(0); 
      setIsDone(true);
      return; 
    }
    
    let current = 0;
    const step = Math.max(1, Math.floor(end / 30));
    
    const interval = setInterval(() => {
      current += step;
      if (current >= end) { 
        setCount(end); 
        setIsDone(true);
        clearInterval(interval); 
      } else {
        setCount(current);
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, [visible, end]);

  return (
    <span className={`inline-block origin-bottom ${isDone ? "animate-pop" : ""}`}>
      {count}{suffix}
    </span>
  );
}
