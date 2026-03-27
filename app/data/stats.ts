export interface Stat {
  end: number;
  suffix: string;
  label: string;
  sublabel: string;
}

export const stats: Stat[] = [
  { end: 40, suffix: "+", label: "Conectores", sublabel: "SQL, NoSQL, Cloud & SaaS" },
  { end: 0, suffix: "%", label: "Data Copied", sublabel: "Zero-copy architecture" },
  { end: 10, suffix: "x", label: "Mais rápido", sublabel: "vs ETL tradicional" },
  { end: 100, suffix: "%", label: "API Ready", sublabel: "REST, OData, SQL & NLQ" },
];
