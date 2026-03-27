import Image from "next/image";
import { Code2 } from "lucide-react";
import { platforms } from "@/app/data/platforms";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.04] px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-white">SOFI</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-700 mt-0.5">Ecossystem</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Plataforma enterprise de virtualização e governança de dados. Zero-copy, real-time, AI-powered.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">Plataformas</h4>
            <ul className="space-y-2">
              <li>
                <a href={platforms[0].url} className="text-sm text-gray-600 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-indigo-500" />SOFIX Engine
                </a>
              </li>
              <li>
                <a href={platforms[1].url} className="text-sm text-gray-600 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-500" />SOFI Virtualization
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">APIs</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-gray-600 flex items-center gap-2 font-mono">
                  <Code2 className="w-3 h-3 text-gray-700" />{platforms[0].apiUrl?.replace("http://", "")}
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-600 flex items-center gap-2 font-mono">
                  <Code2 className="w-3 h-3 text-gray-700" />{platforms[1].apiUrl?.replace("http://", "")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-white/[0.04] mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-700">
            SOFI Data Ecossystem &copy; {new Date().getFullYear()} — Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-700">
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
