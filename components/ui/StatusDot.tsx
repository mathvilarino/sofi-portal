"use client";

import { useState, useEffect } from "react";

export function StatusDot({ url }: { url: string }) {
  const [status, setStatus] = useState<"checking" | "online" | "offline">("checking");

  useEffect(() => {
    const check = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        await fetch(url, { mode: "no-cors", signal: controller.signal });
        clearTimeout(timeout);
        setStatus("online");
      } catch {
        setStatus("offline");
      }
    };
    check();
    const interval = setInterval(check, 30000);
    return () => clearInterval(interval);
  }, [url]);

  const colors = {
    checking: { dot: "bg-gray-500 animate-pulse", text: "text-gray-500" },
    online: { dot: "bg-emerald-400", text: "text-emerald-400" },
    offline: { dot: "bg-red-400", text: "text-red-400" },
  };
  const labels = { checking: "...", online: "Online", offline: "Offline" };

  return (
    <span className={`flex items-center gap-1.5 text-[11px] ${colors[status].text}`}>
      <span className="relative flex h-1.5 w-1.5">
        {status === "online" && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${colors[status].dot}`} />
      </span>
      {labels[status]}
    </span>
  );
}
