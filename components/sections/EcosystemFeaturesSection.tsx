import { ecosystemFeatures } from "@/app/data/ecosystem-features";
import { Section } from "@/components/ui/Section";

export function EcosystemFeaturesSection() {
  return (
    <div id="features" className="relative px-6 py-24">
      <div className="max-w-6xl mx-auto relative">
        <Section>
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-3">ECOSSISTEMA</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Tudo o que precisa, integrado</h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Funcionalidades enterprise-grade distribuídas entre as duas plataformas do ecossistema SOFI.
            </p>
          </div>
        </Section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ecosystemFeatures.map((feature, i) => (
            <Section key={feature.title} delay={i * 80}>
              <div className="group rounded-xl p-6 glass hover:bg-white/[0.04] transition-all duration-300 h-full">
                <div className={`w-10 h-10 rounded-lg ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </div>
  );
}
