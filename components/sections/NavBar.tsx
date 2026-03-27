"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { platforms } from "@/app/data/platforms";
import { EcosystemLogo } from "@/components/ui/EcosystemLogo";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#030712]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <EcosystemLogo size="navbar" />
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white leading-none">SOFI</span>
            <span className="text-[9px] font-medium uppercase tracking-widest text-gray-500 leading-none mt-0.5">Data Ecosystem</span>
          </div>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
          <a href="#platforms" className="hover:text-white transition-colors">Plataformas</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">Como funciona</a>
          <a href="#features" className="hover:text-white transition-colors">Funcionalidades</a>
          <a href="#architecture" className="hover:text-white transition-colors">Arquitetura</a>
          <a href="#compare" className="hover:text-white transition-colors">Comparar</a>
        </div>
        <div className="flex items-center gap-2">
          <a href={platforms[0].url} className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-indigo-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-indigo-500/10">
            <Image src="/logo-sofix.svg" alt="" width={16} height={16} className="rounded" />
            SOFIX
          </a>
          <a href={platforms[1].url} className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-rose-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-rose-500/10">
            <Image src="/logo-sofi.png" alt="" width={16} height={16} className="rounded" />
            SOFI
          </a>
        </div>
      </div>
    </nav>
  );
}
