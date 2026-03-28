import { Search, Network, Eye, BarChart3, Database } from "lucide-react";

export function SofiMockup() {
  return (
    <div className="rounded-lg border border-rose-500/20 bg-[var(--mockup-bg)] overflow-hidden h-44 text-[10px] flex" aria-hidden="true">
      {/* Sidebar */}
      <div className="w-14 border-r border-[var(--border)] py-2 px-1.5 flex flex-col gap-1.5 flex-shrink-0">
        <div className="w-full h-5 rounded bg-rose-500/20 flex items-center justify-center">
          <Search className="w-2.5 h-2.5 text-rose-500 dark:text-rose-400" />
        </div>
        <div className="w-full h-5 rounded bg-[var(--surface)] flex items-center justify-center">
          <Network className="w-2.5 h-2.5 text-[var(--muted-foreground)]" />
        </div>
        <div className="w-full h-5 rounded bg-[var(--surface)] flex items-center justify-center">
          <Eye className="w-2.5 h-2.5 text-[var(--muted-foreground)]" />
        </div>
        <div className="w-full h-5 rounded bg-[var(--surface)] flex items-center justify-center">
          <BarChart3 className="w-2.5 h-2.5 text-[var(--muted-foreground)]" />
        </div>
      </div>
      {/* Content — catalog view */}
      <div className="flex-1 p-2.5 overflow-hidden">
        <div className="text-[9px] text-[var(--muted-foreground)] mb-2">Catalog</div>
        {/* Search bar */}
        <div className="flex items-center gap-1 rounded bg-[var(--surface)] border border-[var(--border)] px-1.5 py-1 mb-2">
          <Search className="w-2.5 h-2.5 text-[var(--muted-foreground)]" />
          <span className="text-[var(--muted-foreground)] text-[8px]">Buscar tabelas, views...</span>
        </div>
        {/* Catalog items */}
        <div className="space-y-1">
          {[
            { name: "customers", type: "PostgreSQL", cols: 14, pii: 3 },
            { name: "orders_view", type: "Virtual", cols: 8, pii: 0 },
            { name: "payments", type: "MySQL", cols: 11, pii: 5 },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-2 rounded bg-[var(--surface)] border border-[var(--border)] px-1.5 py-1">
              <Database className="w-2.5 h-2.5 text-[var(--muted-foreground)] flex-shrink-0" />
              <span className="flex-1 text-[var(--foreground)] opacity-70 text-[9px]">{item.name}</span>
              <span className="text-[8px] text-[var(--muted-foreground)] px-1 rounded bg-[var(--surface)]">{item.type}</span>
              <span className="text-[8px] text-[var(--muted-foreground)]">{item.cols} cols</span>
              {item.pii > 0 && (
                <span className="text-[8px] text-amber-500 dark:text-amber-400 px-1 rounded bg-amber-500/10">{item.pii} PII</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
