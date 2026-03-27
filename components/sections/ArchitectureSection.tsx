import { architectureLayers } from "@/app/data/architecture-layers";
import { Section } from "@/components/ui/Section";

export function ArchitectureSection() {
  return (
    <div id="architecture" className="relative px-6 py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.008] to-transparent" />
      <div className="max-w-4xl mx-auto relative">
        <Section>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Arquitetura em camadas</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Do conector à API de consumo — cada camada adiciona inteligência, segurança e performance.
            </p>
          </div>
        </Section>

        <Section>
          <div className="space-y-3">
            {architectureLayers.map((layer, i) => (
              <div key={layer.label}>
                <div className={`rounded-xl border p-5 ${layer.color} transition-all duration-300 hover:scale-[1.01]`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`w-2 h-2 rounded-full ${layer.dot}`} />
                    <span className="text-sm font-semibold text-white uppercase tracking-wider">{layer.label}</span>
                    <div className="flex-1 h-px bg-white/[0.06]" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {layer.items.map((item) => (
                      <span key={item} className="px-3 py-1 rounded-md text-xs font-medium bg-white/[0.05] text-gray-400 border border-white/[0.04]">{item}</span>
                    ))}
                  </div>
                </div>
                {i < architectureLayers.length - 1 && (
                  <div className="flex justify-center py-1">
                    <svg width="20" height="16" viewBox="0 0 20 16" className={layer.arrow}>
                      <path d="M10 0 L10 10 M5 6 L10 12 L15 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
