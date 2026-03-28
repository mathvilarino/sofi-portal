import type { LucideIcon } from "lucide-react";
import {
  Database,
  Shield,
  GitBranch,
  Lock,
  Server,
  Layers,
  Zap,
  Activity,
  Network,
  Search,
  Eye,
  BarChart3,
  Sparkles,
} from "lucide-react";

export interface PlatformFeature {
  icon: LucideIcon;
  label: string;
}

export interface PlatformHighlight {
  icon: LucideIcon;
  label: string;
  color: string;
}

export interface Platform {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  url: string;
  apiUrl: string;
  logo: string;
  gradient: string;
  gradientBtn: string;
  glowColor: string;
  accentColor: string;
  accentBorder: string;
  accentBg: string;
  shadowColor: string;
  features: PlatformFeature[];
  highlights: PlatformHighlight[];
}

export const platforms: Platform[] = [
  {
    id: "sofix",
    name: "SOFIX Engine",
    subtitle: "Data as Code",
    description:
      "Virtualização de dados com VDBs thin-clone, snapshots incrementais, CDC em tempo real e 50+ regras de masking com detecção automática de PII.",
    url: "https://sofitest.dtsofi.com",
    apiUrl: "https://api.sofitest.dtsofi.com",
    logo: "/logo-sofix.svg",
    gradient: "from-indigo-500 via-purple-500 to-violet-600",
    gradientBtn:
      "from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500",
    glowColor: "rgba(99, 102, 241, 0.15)",
    accentColor: "text-indigo-400",
    accentBorder: "border-indigo-500/20",
    accentBg: "bg-indigo-500/10",
    shadowColor: "shadow-indigo-500/20",
    features: [
      { icon: Database, label: "Virtual Databases" },
      { icon: Shield, label: "50+ regras de masking" },
      { icon: GitBranch, label: "Snapshots & CDC" },
      { icon: Lock, label: "LGPD / GDPR" },
      { icon: Server, label: "12+ conectores" },
      { icon: Layers, label: "Copy-on-Write" },
    ],
    highlights: [
      { icon: Zap, label: "VDBs em segundos", color: "text-amber-400" },
      { icon: Shield, label: "LGPD Compliant", color: "text-emerald-400" },
      { icon: Activity, label: "CDC real-time", color: "text-sky-400" },
    ],
  },
  {
    id: "sofi",
    name: "SOFI Virtualization",
    subtitle: "The Universal Semantic Layer",
    description:
      "Catálogo semântico com Design Studio visual, lineage column-level, data quality e consumo via REST, OData, SQL ou linguagem natural.",
    url: "https://sofivirtualization.dtsofi.com",
    apiUrl: "https://api.sofivirtualization.dtsofi.com",
    logo: "/logo-sofi.png",
    gradient: "from-rose-500 via-red-500 to-pink-600",
    gradientBtn:
      "from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500",
    glowColor: "rgba(225, 29, 72, 0.15)",
    accentColor: "text-rose-400",
    accentBorder: "border-rose-500/20",
    accentBg: "bg-rose-500/10",
    shadowColor: "shadow-rose-500/20",
    features: [
      { icon: Network, label: "Design Studio" },
      { icon: Search, label: "Catálogo inteligente" },
      { icon: Eye, label: "Lineage column-level" },
      { icon: BarChart3, label: "Data Quality" },
      { icon: Sparkles, label: "NLQ (linguagem natural)" },
      { icon: Layers, label: "40+ conectores" },
    ],
    highlights: [
      { icon: Sparkles, label: "Zero-Copy Data", color: "text-violet-400" },
      { icon: Eye, label: "Governance", color: "text-emerald-400" },
      { icon: Network, label: "Visual Studio", color: "text-sky-400" },
    ],
  },
];
