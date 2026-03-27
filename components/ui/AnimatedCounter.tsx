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
  useEffect(() => {
    if (!visible) return;
    if (end === 0) { setCount(0); return; }
    let current = 0;
    const step = Math.max(1, Math.floor(end / 30));
    const interval = setInterval(() => {
      current += step;
      if (current >= end) { setCount(end); clearInterval(interval); }
      else setCount(current);
    }, 30);
    return () => clearInterval(interval);
  }, [visible, end]);
  return <>{count}{suffix}</>;
}
