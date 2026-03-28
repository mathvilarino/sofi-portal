import { howItWorks } from "@/app/data/how-it-works";
import { Section } from "@/components/ui/Section";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative px-6 py-24" aria-label="Como funciona">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--surface)] to-transparent" aria-hidden="true" />
      <div className="max-w-6xl mx-auto relative">
        <Section>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-3">O PROCESSO</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">Como funciona</h2>
            <p className="text-[var(--muted)] max-w-lg mx-auto">
              Da conexão ao consumo em 4 passos simples. Sem ETL, sem cópias, sem complexidade.
            </p>
          </div>
        </Section>

        <div className="relative">
          {/* Animated Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-[var(--surface)] z-0 rounded-full overflow-hidden">
             {/* Glow traveling down the line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 dark:via-cyan-400 to-transparent opacity-50 w-[200%] h-full animate-flow-line" />
          </div>

          {/* Animated Connecting Line (Tablet/Mobile) */}
          {/* On smaller screens, it could be vertical or invisible, but for simplicity let's rely on the cards themselves. */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {howItWorks.map((step, i) => (
              <Section key={step.step} delay={i * 100}>
                <div className={`relative rounded-2xl p-6 glass border ${step.border} h-full bg-[var(--background)]/80 hover:bg-[var(--background)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group`}>
                  
                  {/* Big Number Background */}
                  <span className={`text-6xl font-black ${step.color} opacity-5 group-hover:opacity-10 transition-opacity absolute top-4 right-4 pointer-events-none`} aria-hidden="true">
                    {step.step}
                  </span>
                  
                  <div className={`w-12 h-12 rounded-xl border ${step.border} ${step.bg} shadow-內 bg-clip-padding backdrop-filter backdrop-blur-md flex items-center justify-center mb-6 relative group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                    {/* Tiny pulsing dot on the icon showing activity */}
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${step.bg} opacity-75`} />
                      <span className={`relative inline-flex rounded-full h-3 w-3 ${step.bg}`} />
                    </span>
                  </div>
                  
                  <h3 className="text-base font-bold text-[var(--foreground)] mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-[13px] text-[var(--muted)] leading-relaxed">{step.description}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
