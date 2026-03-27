import { Database, Server, Layers, BarChart3, Search } from "lucide-react";
import { Section } from "@/components/ui/Section";

export function TrustedBySection() {
  return (
    <Section>
      <div className="px-6 py-16 text-center border-y border-white/[0.03]">
        <p className="text-xs uppercase tracking-widest text-gray-700 mb-8">
          Construído para ambientes enterprise
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 max-w-3xl mx-auto">
          {[
            { label: "PostgreSQL", icon: Database },
            { label: "Oracle", icon: Server },
            { label: "MongoDB", icon: Database },
            { label: "Snowflake", icon: Layers },
            { label: "MySQL", icon: Database },
            { label: "SQL Server", icon: Server },
            { label: "BigQuery", icon: BarChart3 },
            { label: "Elasticsearch", icon: Search },
          ].map((db) => (
            <div key={db.label} className="flex items-center gap-2 text-gray-600 hover:text-gray-400 transition-colors">
              <db.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{db.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
