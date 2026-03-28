import { architectureLayers } from "@/app/data/architecture-layers";
import { Section } from "@/components/ui/Section";
import { ArrowRight, ArrowDown } from "lucide-react";

export function ArchitectureSection() {
  // Find layers for specific positioning
  const layerConectores = architectureLayers.find(l => l.label === "Conectores");
  const layerEngine = architectureLayers.find(l => l.label === "Engine");
  const layerGov = architectureLayers.find(l => l.label === "Governança");
  const layerConsumo = architectureLayers.find(l => l.label === "Consumo");

  if (!layerConectores || !layerEngine || !layerGov || !layerConsumo) return null;

  return (
    <section id="architecture" className="relative px-6 py-24 overflow-hidden" aria-label="Arquitetura">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--surface)] to-transparent" aria-hidden="true" />
      <div className="max-w-5xl mx-auto relative">
        <Section>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">Arquitetura Integrada</h2>
            <p className="text-[var(--muted)] max-w-lg mx-auto">
              Processamento em tempo real com governança injetada no motor — do conector ao consumo sem cópias.
            </p>
          </div>
        </Section>

        <Section>
          {/* Desktop Diagram (shows as Bento Blocks) */}
          <div className="hidden lg:grid grid-cols-[1fr_auto_1.5fr_auto_1fr] items-center gap-4">
            
            {/* Left: Conectores */}
            <div className={`rounded-xl border p-6 ${layerConectores.color} h-full flex flex-col justify-center transition-all duration-300 hover:scale-[1.02] shadow-sm`}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`w-2.5 h-2.5 rounded-full ${layerConectores.dot} animate-pulse`} />
                <span className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">{layerConectores.label}</span>
              </div>
              <div className="flex flex-col gap-2">
                {layerConectores.items.map((item) => (
                  <span key={item} className="px-3 py-1.5 rounded-md text-xs font-semibold bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)]">{item}</span>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <ArrowRight className="w-6 h-6 text-[var(--muted-foreground)] opacity-50" />

            {/* Middle: Engine + Governança */}
            <div className="flex flex-col gap-4 h-full relative">
              {/* Connection line between top and bottom boxes */}
              <div className="absolute left-1/2 top-[40%] bottom-[40%] w-0.5 bg-[var(--border)] -translate-x-1/2 z-0" />
              
              {/* Top: Governança */}
              <div className={`relative z-10 rounded-xl border p-6 ${layerGov.color} flex-1 flex flex-col justify-center transition-all duration-300 hover:scale-[1.02] shadow-md backdrop-blur-sm`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`w-2.5 h-2.5 rounded-full ${layerGov.dot}`} />
                  <span className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">{layerGov.label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {layerGov.items.map((item) => (
                    <span key={item} className="px-3 py-1.5 rounded-md text-[11px] font-bold bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] uppercase">{item}</span>
                  ))}
                </div>
              </div>

              {/* Bottom: Engine */}
              <div className={`relative z-10 rounded-xl border p-6 ${layerEngine.color} flex-1 flex flex-col justify-center transition-all duration-300 hover:scale-[1.02] shadow-md backdrop-blur-sm`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`w-2.5 h-2.5 rounded-full ${layerEngine.dot} shadow-[0_0_10px_currentColor]`} />
                  <span className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">{layerEngine.label} (CORE)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {layerEngine.items.map((item) => (
                    <span key={item} className="px-3 py-1.5 rounded-md text-[11px] font-bold bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] uppercase">{item}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Arrow */}
            <ArrowRight className="w-6 h-6 text-[var(--muted-foreground)] opacity-50" />

            {/* Right: Consumo */}
            <div className={`rounded-xl border p-6 ${layerConsumo.color} h-full flex flex-col justify-center transition-all duration-300 hover:scale-[1.02] shadow-sm`}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`w-2.5 h-2.5 rounded-full ${layerConsumo.dot}`} />
                <span className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">{layerConsumo.label}</span>
              </div>
              <div className="flex flex-col gap-2">
                {layerConsumo.items.map((item) => (
                  <span key={item} className="px-3 py-1.5 rounded-md text-xs font-semibold bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)]">{item}</span>
                ))}
              </div>
            </div>

          </div>

          {/* Mobile Diagram (Stacked but better designed) */}
          <div className="lg:hidden flex flex-col gap-3">
            {[layerConectores, layerEngine, layerGov, layerConsumo].map((layer, idx) => (
              <div key={layer.label} className="flex flex-col items-center gap-3">
                <div className={`w-full rounded-xl border p-5 ${layer.color} shadow-sm`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${layer.dot}`} />
                    <span className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">{layer.label}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {layer.items.map((item) => (
                      <span key={item} className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] uppercase">{item}</span>
                    ))}
                  </div>
                </div>
                {idx < 3 && <ArrowDown className="w-5 h-5 text-[var(--muted-foreground)] opacity-50" />}
              </div>
            ))}
          </div>
        </Section>
      </div>
    </section>
  );
}
