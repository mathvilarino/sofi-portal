export interface ArchitectureLayer {
  label: string;
  items: string[];
  color: string;
  dot: string;
  arrow: string;
}

export const architectureLayers: ArchitectureLayer[] = [
  {
    label: "Consumo",
    items: ["REST API", "OData v4", "SQL Console", "NLQ", "Marketplace"],
    color: "border-indigo-500/30 bg-indigo-500/5",
    dot: "bg-indigo-400",
    arrow: "text-indigo-500/40",
  },
  {
    label: "Governança",
    items: ["RBAC", "Masking", "PII Detection", "LGPD", "Audit"],
    color: "border-emerald-500/30 bg-emerald-500/5",
    dot: "bg-emerald-400",
    arrow: "text-emerald-500/40",
  },
  {
    label: "Engine",
    items: ["Query Planner", "Pushdown", "Federation", "Cache", "CDC"],
    color: "border-violet-500/30 bg-violet-500/5",
    dot: "bg-violet-400",
    arrow: "text-violet-500/40",
  },
  {
    label: "Conectores",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Oracle", "Snowflake", "..."],
    color: "border-amber-500/30 bg-amber-500/5",
    dot: "bg-amber-400",
    arrow: "",
  },
];
