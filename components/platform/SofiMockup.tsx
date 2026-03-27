import { Search, Network, Eye, BarChart3, Database } from "lucide-react";

export function SofiMockup() {
  return (
    <div className="rounded-lg border border-rose-500/20 bg-[#0a0e1a] overflow-hidden h-44 text-[10px] flex">
      {/* Sidebar */}
      <div className="w-14 border-r border-white/[0.06] py-2 px-1.5 flex flex-col gap-1.5 flex-shrink-0">
        <div className="w-full h-5 rounded bg-rose-500/20 flex items-center justify-center">
          <Search className="w-2.5 h-2.5 text-rose-400" />
        </div>
        <div className="w-full h-5 rounded bg-white/[0.04] flex items-center justify-center">
          <Network className="w-2.5 h-2.5 text-gray-600" />
        </div>
        <div className="w-full h-5 rounded bg-white/[0.04] flex items-center justify-center">
          <Eye className="w-2.5 h-2.5 text-gray-600" />
        </div>
        <div className="w-full h-5 rounded bg-white/[0.04] flex items-center justify-center">
          <BarChart3 className="w-2.5 h-2.5 text-gray-600" />
        </div>
      </div>
      {/* Content — catalog view */}
      <div className="flex-1 p-2.5 overflow-hidden">
        <div className="text-[9px] text-gray-500 mb-2">Catalog</div>
        {/* Search bar */}
        <div className="flex items-center gap-1 rounded bg-white/[0.04] border border-white/[0.06] px-1.5 py-1 mb-2">
          <Search className="w-2.5 h-2.5 text-gray-600" />
          <span className="text-gray-600 text-[8px]">Buscar tabelas, views...</span>
        </div>
        {/* Catalog items */}
        <div className="space-y-1">
          {[
            { name: "customers", type: "PostgreSQL", cols: 14, pii: 3 },
            { name: "orders_view", type: "Virtual", cols: 8, pii: 0 },
            { name: "payments", type: "MySQL", cols: 11, pii: 5 },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-2 rounded bg-white/[0.02] border border-white/[0.04] px-1.5 py-1">
              <Database className="w-2.5 h-2.5 text-gray-600 flex-shrink-0" />
              <span className="flex-1 text-gray-400 text-[9px]">{item.name}</span>
              <span className="text-[8px] text-gray-600 px-1 rounded bg-white/[0.04]">{item.type}</span>
              <span className="text-[8px] text-gray-600">{item.cols} cols</span>
              {item.pii > 0 && (
                <span className="text-[8px] text-amber-400 px-1 rounded bg-amber-500/10">{item.pii} PII</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
