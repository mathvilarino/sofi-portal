import { Database, GitBranch, Shield, Activity } from "lucide-react";

export function SofixMockup() {
  return (
    <div className="rounded-lg border border-indigo-500/20 bg-[var(--mockup-bg)] overflow-hidden h-44 text-[10px] flex" aria-hidden="true">
      {/* Sidebar */}
      <div className="w-14 border-r border-[var(--border)] py-2 px-1.5 flex flex-col gap-1.5 flex-shrink-0">
        <div className="w-full h-5 rounded bg-indigo-500/20 flex items-center justify-center">
          <Database className="w-2.5 h-2.5 text-indigo-500 dark:text-indigo-400" />
        </div>
        <div className="w-full h-5 rounded bg-[var(--surface)] flex items-center justify-center">
          <GitBranch className="w-2.5 h-2.5 text-[var(--muted-foreground)]" />
        </div>
        <div className="w-full h-5 rounded bg-[var(--surface)] flex items-center justify-center">
          <Shield className="w-2.5 h-2.5 text-[var(--muted-foreground)]" />
        </div>
        <div className="w-full h-5 rounded bg-[var(--surface)] flex items-center justify-center">
          <Activity className="w-2.5 h-2.5 text-[var(--muted-foreground)]" />
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 p-2.5 overflow-hidden">
        <div className="text-[9px] text-[var(--muted-foreground)] mb-2">Dashboard</div>
        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-1.5 mb-2">
          <div className="rounded bg-indigo-500/10 border border-indigo-500/20 p-1.5">
            <div className="text-indigo-500 dark:text-indigo-400 font-bold text-[11px]">12</div>
            <div className="text-[var(--muted-foreground)] text-[8px]">VDBs</div>
          </div>
          <div className="rounded bg-emerald-500/10 border border-emerald-500/20 p-1.5">
            <div className="text-emerald-500 dark:text-emerald-400 font-bold text-[11px]">98%</div>
            <div className="text-[var(--muted-foreground)] text-[8px]">Masked</div>
          </div>
          <div className="rounded bg-amber-500/10 border border-amber-500/20 p-1.5">
            <div className="text-amber-500 dark:text-amber-400 font-bold text-[11px]">3</div>
            <div className="text-[var(--muted-foreground)] text-[8px]">CDC Active</div>
          </div>
        </div>
        {/* Mini table */}
        <div className="rounded bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
          <div className="flex gap-2 px-1.5 py-1 border-b border-[var(--border)] text-[var(--muted-foreground)] text-[8px]">
            <span className="flex-1">Snapshot</span><span className="w-10">Status</span><span className="w-10">Size</span>
          </div>
          {["prod_snap_01", "dev_snap_03", "stg_snap_02"].map((s) => (
            <div key={s} className="flex gap-2 px-1.5 py-0.5 text-[var(--muted)] text-[8px]">
              <span className="flex-1 text-[var(--foreground)] opacity-70">{s}</span>
              <span className="w-10"><span className="inline-block w-1 h-1 rounded-full bg-emerald-400 mr-0.5" />ok</span>
              <span className="w-10 text-[var(--muted-foreground)]">2.1G</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
