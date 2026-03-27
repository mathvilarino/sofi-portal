import type { LucideIcon } from "lucide-react";
import { Database, ShieldCheck, Brain, Workflow, RefreshCw, Globe } from "lucide-react";

export interface EcosystemFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bg: string;
}

export const ecosystemFeatures: EcosystemFeature[] = [
  {
    icon: Database,
    title: "Data Virtualization",
    description:
      "Acesse dados de qualquer fonte sem mover ou copiar. Virtual Databases com thin-clones e snapshots instantâneos.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Masking",
    description:
      "LGPD e GDPR nativos. 50+ regras de masking, detecção automática de PII em 27 categorias e audit trail completo.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Brain,
    title: "AI-Powered Catalog",
    description:
      "Catálogo semântico com classificação automática, lineage column-level e queries em linguagem natural via LLM.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: Workflow,
    title: "Design Studio",
    description:
      "Interface visual drag-and-drop para criar views virtuais com JOINs, UNIONs, transformações e publicação como data products.",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
  {
    icon: RefreshCw,
    title: "CDC & Replication",
    description:
      "Change Data Capture em tempo real via PostgreSQL WAL, MySQL binlog, Oracle LogMiner e SQL Server CT.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: Globe,
    title: "Multi-Protocol Access",
    description:
      "Consuma dados via REST API, OData v4, PostgreSQL Wire Protocol, query console SQL ou linguagem natural.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
];
