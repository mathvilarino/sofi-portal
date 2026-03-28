import { ecosystemFeatures } from "@/app/data/ecosystem-features";
import { Section } from "@/components/ui/Section";

const bentoClasses = [
  "md:col-span-2", // 0: Data Virtualization (Wide)
  "md:col-span-1", // 1: Compliance & Masking (Square)
  "md:col-span-1 md:row-span-2", // 2: AI Catalog (Tall)
  "md:col-span-1", // 3: Design Studio (Square)
  "md:col-span-1", // 4: CDC & Replication (Square)
  "md:col-span-2", // 5: Multi-Protocol (Wide)
];

export function EcosystemFeaturesSection() {
  return (
    <section id="features" className="relative px-6 py-24" aria-label="Funcionalidades">
      <div className="max-w-6xl mx-auto relative">
        <Section>
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-3">ECOSSISTEMA</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">Tudo o que precisa, integrado</h2>
            <p className="text-[var(--muted)] max-w-lg mx-auto">
              Funcionalidades enterprise-grade projetadas para trabalharem juntas em um ecossistema unificado.
            </p>
          </div>
        </Section>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-min gap-4 md:grid-flow-dense">
          {ecosystemFeatures.map((feature, i) => (
            <Section key={feature.title} delay={i * 80} className={bentoClasses[i]}>
              <div className="group rounded-2xl p-6 md:p-8 glass hover:bg-[var(--surface-hover)] border border-[var(--border)] transition-all duration-300 h-full flex flex-col hover:shadow-xl hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm border border-black/5 dark:border-white/5`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-2 tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </section>
  );
}
