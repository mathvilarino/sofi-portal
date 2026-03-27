import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Platform } from "@/app/data/platforms";
import { StatusDot } from "@/components/ui/StatusDot";
import { SofixMockup } from "@/components/platform/SofixMockup";
import { SofiMockup } from "@/components/platform/SofiMockup";

export interface PlatformCardProps {
  platform: Platform;
  hoveredCard: string | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function PlatformCard({
  platform,
  hoveredCard,
  onMouseEnter,
  onMouseLeave,
}: PlatformCardProps) {
  return (
    <a
      href={platform.url}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`block group relative rounded-2xl overflow-hidden glass cursor-pointer transition-all duration-500 ${
        hoveredCard === platform.id ? "scale-[1.01] shadow-2xl" : ""
      }`}
      style={{
        boxShadow: hoveredCard === platform.id ? `0 0 80px ${platform.glowColor}` : "none",
      }}
    >
      <div className={`h-[2px] w-full bg-gradient-to-r ${platform.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="p-7 sm:p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`rounded-xl border ${platform.accentBorder} ${platform.accentBg} overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
            <Image src={platform.logo} alt={`${platform.name} logo`} width={44} height={44} className="rounded-xl" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white mb-0.5">{platform.name}</h3>
            <p className={`text-[10px] font-semibold uppercase tracking-widest ${platform.accentColor} opacity-60`}>{platform.subtitle}</p>
          </div>
          <StatusDot url={platform.url} />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed mb-4">{platform.description}</p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {platform.highlights.map((h) => (
            <span key={h.label} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/[0.04] border border-white/[0.06] text-gray-300">
              <h.icon className={`w-2.5 h-2.5 ${h.color}`} />
              {h.label}
            </span>
          ))}
        </div>

        {/* UI Mockup */}
        <div className="mb-4 group-hover:scale-[1.01] transition-transform duration-500">
          {platform.id === "sofix" ? <SofixMockup /> : <SofiMockup />}
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-1.5 mb-5">
          {platform.features.map((feature) => (
            <div key={feature.label} className="flex items-center gap-1.5 text-[12px] text-gray-400 group-hover:text-gray-300 transition-colors">
              <feature.icon className={`w-3 h-3 ${platform.accentColor} opacity-40 group-hover:opacity-70 transition-opacity flex-shrink-0`} />
              {feature.label}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r ${platform.gradientBtn} transition-all duration-300 shadow-lg shadow-black/20`}>
            Acessar <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
          <span className="text-[11px] text-gray-700 font-mono hidden sm:block">{platform.url.replace("http://", "")}</span>
        </div>
      </div>
    </a>
  );
}
