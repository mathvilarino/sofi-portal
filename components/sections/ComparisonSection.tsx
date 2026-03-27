import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { comparisonData } from "@/app/data/comparison";
import { Section } from "@/components/ui/Section";

export function ComparisonSection() {
  return (
    <div id="compare" className="relative px-6 py-24">
      <div className="max-w-4xl mx-auto relative">
        <Section>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Qual plataforma usar?</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Cada plataforma resolve problemas diferentes. Use as duas em conjunto para cobertura total.
            </p>
          </div>
        </Section>

        {/* Desktop: table */}
        <Section>
          <div className="hidden sm:block rounded-xl glass overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left p-4 text-gray-500 font-medium">Necessidade</th>
                  <th className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Image src="/logo-sofix.svg" alt="" width={18} height={18} className="rounded" />
                      <span className="text-indigo-400 font-semibold">SOFIX</span>
                    </div>
                  </th>
                  <th className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Image src="/logo-sofi.png" alt="" width={18} height={18} className="rounded" />
                      <span className="text-rose-400 font-semibold">SOFI</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                {comparisonData.map(([need, sofix, sofi]) => (
                  <tr key={need as string} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-gray-300">{need as string}</td>
                    <td className="p-4 text-center">
                      {sofix ? <CheckCircle2 className="w-4 h-4 text-indigo-400 mx-auto" /> : <span className="text-gray-700">—</span>}
                    </td>
                    <td className="p-4 text-center">
                      {sofi ? <CheckCircle2 className="w-4 h-4 text-rose-400 mx-auto" /> : <span className="text-gray-700">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Mobile: cards */}
        <div className="sm:hidden space-y-3">
          {comparisonData.map(([need, sofix, sofi]) => (
            <Section key={need as string}>
              <div className="rounded-lg glass p-4">
                <p className="text-sm text-gray-300 mb-2">{need as string}</p>
                <div className="flex gap-3">
                  {sofix && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-indigo-400">
                      <CheckCircle2 className="w-3 h-3" /> SOFIX
                    </span>
                  )}
                  {sofi && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-rose-400">
                      <CheckCircle2 className="w-3 h-3" /> SOFI
                    </span>
                  )}
                </div>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </div>
  );
}
