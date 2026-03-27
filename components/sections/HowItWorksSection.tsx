import { ArrowRight } from "lucide-react";
import { howItWorks } from "@/app/data/how-it-works";
import { Section } from "@/components/ui/Section";

export function HowItWorksSection() {
  return (
    <div id="how-it-works" className="relative px-6 py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.008] to-transparent" />
      <div className="max-w-5xl mx-auto relative">
        <Section>
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-3">COMO FUNCIONA</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Como funciona</h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Da conexão ao consumo em 4 passos simples. Sem ETL, sem cópias, sem complexidade.
            </p>
          </div>
        </Section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {howItWorks.map((step, i) => (
            <Section key={step.step} delay={i * 100}>
              <div className={`relative rounded-xl p-6 glass border ${step.border} h-full`}>
                <span className={`text-4xl font-black ${step.color} opacity-10 absolute top-4 right-4`}>
                  {step.step}
                </span>
                <div className={`w-10 h-10 rounded-lg ${step.bg} flex items-center justify-center mb-4`}>
                  <step.icon className={`w-5 h-5 ${step.color}`} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-[13px] text-gray-400 leading-relaxed">{step.description}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 text-gray-700">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            </Section>
          ))}
        </div>
      </div>
    </div>
  );
}
