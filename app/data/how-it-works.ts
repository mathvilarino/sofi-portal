import type { LucideIcon } from "lucide-react";
import { Cable, ScanEye, Workflow, MonitorSmartphone } from "lucide-react";

export interface HowItWorksStep {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bg: string;
  border: string;
}

export const howItWorks: HowItWorksStep[] = [
  {
    step: "01",
    icon: Cable,
    title: "Conecte suas fontes",
    description: "Registre qualquer banco de dados, data warehouse, API ou arquivo. Suporte a 40+ conectores nativos.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    step: "02",
    icon: ScanEye,
    title: "Descubra e governe",
    description: "Escaneamento automático de schema, detecção de PII, classificação de dados e políticas de masking.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    step: "03",
    icon: Workflow,
    title: "Crie views virtuais",
    description: "Use o Design Studio visual ou SQL para criar camadas semânticas sem copiar dados.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    step: "04",
    icon: MonitorSmartphone,
    title: "Consuma em qualquer lugar",
    description: "REST API, OData, SQL, linguagem natural ou publique no marketplace como data product.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
];
