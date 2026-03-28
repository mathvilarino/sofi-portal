"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, ArrowRight, ChevronDown } from "lucide-react";
import { stats } from "@/app/data/stats";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { platforms } from "@/app/data/platforms";

export function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-12 overflow-hidden" aria-label="Hero">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:[mask-image:radial-gradient(ellipse_at_center,black,transparent)]" aria-hidden="true" />

      {/* Glow Blobs */}
      <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-indigo-500/[0.05] rounded-full blur-3xl animate-pulse-glow" aria-hidden="true" />
      <div className="absolute bottom-[-20%] right-[10%] w-[600px] h-[600px] bg-rose-500/[0.05] rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} aria-hidden="true" />

      <div className="relative z-10 text-center max-w-4xl animate-fade-in-up animate-fade-in-up-1">
        {/* Shimmer Badge */}
        <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] overflow-hidden group text-xs text-[var(--muted)] mb-10 uppercase tracking-widest font-medium shadow-sm cursor-default">
          <div className="absolute inset-0 top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-[var(--foreground)] opacity-[0.05] dark:opacity-10 to-transparent animate-shimmer" />
          <Sparkles className="w-3 h-3 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300 relative z-10" />
          <span className="relative z-10">Enterprise Data Platform</span>
        </div>

        {/* Main Title: Gradiente animado + Glow */}
        <h1 className="mb-6 relative">
          <div className="absolute inset-0 left-1/2 -translate-x-1/2 blur-3xl opacity-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 rounded-full w-1/2 h-1/2 top-1/2 -translate-y-1/2 pointer-events-none" />
          <span className="relative block text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter bg-gradient-to-r from-indigo-600 via-purple-500 to-rose-500 dark:from-indigo-400 dark:via-purple-400 dark:to-rose-400 bg-[length:200%_auto] animate-text-gradient bg-clip-text text-transparent leading-[0.9]">
            SOFI
          </span>
          <span className="block mt-3 text-base sm:text-lg font-medium tracking-[0.3em] uppercase text-[var(--muted)] relative z-10">
            Data Ecosystem
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-[var(--muted)] leading-relaxed max-w-2xl mx-auto mb-4">
          Virtualização, test data management e governança de dados.{" "}
          <span className="text-[var(--foreground)] opacity-80">Ambientes ágeis. Sem ETL. Sem complexidade.</span>
        </p>
        <p className="text-sm text-[var(--muted-foreground)] mb-10 max-w-lg mx-auto">
          Duas plataformas complementares que substituem soluções como Delphix e Denodo
          com uma stack moderna, open e enterprise-ready.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href={platforms[0].url}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-xl shadow-indigo-500/20"
          >
            Explorar SOFIX Engine
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href={platforms[1].url}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 transition-all duration-300 shadow-xl shadow-rose-500/20"
          >
            Explorar SOFI Virtualization
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="flex justify-center mb-12">
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-medium text-[var(--muted)] glass hover:text-[var(--foreground)] transition-all duration-300"
          >
            Como funciona
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>

        {/* Animated Stats */}
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="text-3xl sm:text-4xl font-black bg-gradient-to-b from-gray-900 to-gray-400 dark:from-white dark:to-gray-500 bg-clip-text text-transparent tabular-nums">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} visible={statsVisible} />
              </div>
              <div className="text-sm text-[var(--foreground)] opacity-80 font-medium mt-1">{stat.label}</div>
              <div className="text-[11px] text-[var(--muted-foreground)] mt-0.5">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <ChevronDown className="w-5 h-5 text-[var(--muted-foreground)]" />
      </div>
    </section>
  );
}
