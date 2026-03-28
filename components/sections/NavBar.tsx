"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { platforms } from "@/app/data/platforms";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "#platforms", label: "Plataformas" },
  { href: "#how-it-works", label: "Como funciona" },
  { href: "#features", label: "Funcionalidades" },
  { href: "#architecture", label: "Arquitetura" },
  { href: "#compare", label: "Comparar" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)] shadow-sm"
            : "bg-transparent py-2"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="flex flex-col">
              <span className="text-[17px] font-black tracking-tight text-[var(--foreground)] leading-none group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-rose-500 transition-all duration-300">SOFI</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)] leading-none mt-0.5 group-hover:text-[var(--foreground)] transition-colors duration-300">Data Ecosystem</span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 text-[13px] font-semibold text-[var(--muted)]">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="px-3.5 py-2 rounded-full hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-all duration-300">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a href={platforms[0].url} className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-indigo-500/10">
              <Image src="/logo-sofix.svg" alt="SOFIX Engine Logo" width={16} height={16} className="rounded" />
              SOFIX
            </a>
            <a href={platforms[1].url} className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-rose-500 dark:hover:text-rose-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-rose-500/10">
              <Image src="/logo-sofi.png" alt="SOFI Virtualization Logo" width={16} height={16} className="rounded" />
              SOFI
            </a>

            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-all"
              aria-label="Abrir menu de navegação"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="absolute right-0 top-16 bottom-0 w-72 bg-[var(--background)] border-l border-[var(--border)] p-6 flex flex-col gap-6 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
            style={{ animationDuration: "0.25s" }}
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors py-2 border-b border-[var(--border)]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3 mt-auto">
              <a href={platforms[0].url} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600">
                <Image src="/logo-sofix.svg" alt="SOFIX Engine" width={18} height={18} className="rounded" />
                SOFIX Engine
              </a>
              <a href={platforms[1].url} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-rose-600 to-pink-600">
                <Image src="/logo-sofi.png" alt="SOFI Virtualization" width={18} height={18} className="rounded" />
                SOFI Virtualization
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
