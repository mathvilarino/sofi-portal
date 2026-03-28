import { Database, Server, Layers, BarChart3, Search, Cloud, HardDrive, Cpu, Globe } from "lucide-react";
import { Section } from "@/components/ui/Section";

export function TrustedBySection() {
  const integrations = [
    { label: "PostgreSQL", icon: Database },
    { label: "Oracle", icon: Server },
    { label: "MongoDB", icon: Database },
    { label: "Snowflake", icon: Layers },
    { label: "MySQL", icon: Database },
    { label: "SQL Server", icon: Server },
    { label: "BigQuery", icon: BarChart3 },
    { label: "Elasticsearch", icon: Search },
    { label: "Redshift", icon: Database },
    { label: "S3 / GCS", icon: Cloud },
    { label: "Kafka", icon: Cpu },
    { label: "API REST", icon: Globe },
    { label: "DB2", icon: HardDrive },
  ];

  return (
    <Section>
      <div className="py-16 border-y border-[var(--border)] overflow-hidden bg-[var(--surface)] text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-10 px-6 font-semibold">
          Conectividade nativa com o seu ecossistema
        </p>

        {/* Marquee Container */}
        <div className="relative flex overflow-hidden group">
          
          {/* Fading Edges */}
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[var(--surface)] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[var(--surface)] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Content (duplicated for infinite loop) */}
          <div className="flex animate-marquee py-2 group-hover:[animation-play-state:paused] whitespace-nowrap min-w-full">
            {/* First sequence */}
            {integrations.map((db, idx) => (
              <div key={`db1-${idx}`} className="flex items-center gap-2.5 mx-8 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-default">
                <db.icon className="w-5 h-5 opacity-70" />
                <span className="text-[15px] font-medium tracking-tight whitespace-nowrap">{db.label}</span>
              </div>
            ))}
            {/* Duplicate sequence for seamless scrolling */}
            {integrations.map((db, idx) => (
              <div key={`db2-${idx}`} className="flex items-center gap-2.5 mx-8 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-default">
                <db.icon className="w-5 h-5 opacity-70" />
                <span className="text-[15px] font-medium tracking-tight whitespace-nowrap">{db.label}</span>
              </div>
            ))}
            {/* Third sequence just in case for large screens running out of items */}
            {integrations.map((db, idx) => (
              <div key={`db3-${idx}`} className="flex items-center gap-2.5 mx-8 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-default">
                <db.icon className="w-5 h-5 opacity-70" />
                <span className="text-[15px] font-medium tracking-tight whitespace-nowrap">{db.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
