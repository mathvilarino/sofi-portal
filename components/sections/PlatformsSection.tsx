"use client";

import { useState } from "react";
import { platforms } from "@/app/data/platforms";
import { PlatformCard } from "@/components/platform/PlatformCard";
import { Section } from "@/components/ui/Section";

export function PlatformsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="platforms" className="relative px-6 py-24" aria-label="Plataformas">
      <div className="max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-3">PLATAFORMAS</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
              Duas plataformas, um ecossistema
            </h2>
            <p className="text-[var(--muted)] max-w-lg mx-auto">
              Soluções complementares que cobrem todo o ciclo de vida dos dados — da virtualização ao consumo governado.
            </p>
          </div>
        </Section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {platforms.map((platform) => (
            <Section key={platform.id}>
              <PlatformCard
                platform={platform}
                hoveredCard={hoveredCard}
                onMouseEnter={() => setHoveredCard(platform.id)}
                onMouseLeave={() => setHoveredCard(null)}
              />
            </Section>
          ))}
        </div>
      </div>
    </section>
  );
}
