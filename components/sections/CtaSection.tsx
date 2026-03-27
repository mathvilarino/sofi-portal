import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { platforms } from "@/app/data/platforms";
import { Section } from "@/components/ui/Section";

export function CtaSection() {
  return (
    <div className="relative px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Section>
          <div className="rounded-2xl glass p-10 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-indigo-500/[0.06] rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[150px] bg-rose-500/[0.04] rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Pronto para começar?</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Acesse qualquer plataforma e comece a virtualizar seus dados em minutos. Sem cartão de crédito.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={platforms[0].url}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-xl shadow-indigo-500/20 w-full sm:w-auto justify-center"
                >
                  <Image src="/logo-sofix.svg" alt="SOFIX" width={22} height={22} className="rounded-md" />
                  SOFIX Engine
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={platforms[1].url}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 transition-all duration-300 shadow-xl shadow-rose-500/20 w-full sm:w-auto justify-center"
                >
                  <Image src="/logo-sofi.png" alt="SOFI" width={22} height={22} className="rounded-md" />
                  SOFI Virtualization
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
