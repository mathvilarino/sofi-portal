import { Section } from "@/components/ui/Section";

interface FeatureGroup {
  category: string;
  items: string[];
}

interface PlatformSpec {
  name: string;
  subtitle: string;
  accentColor: string;
  headerGradient: string;
  tagBg: string;
  tagText: string;
  tagBorder: string;
  groups: FeatureGroup[];
}

const platformSpecs: PlatformSpec[] = [
  {
    name: "SOFIX Engine",
    subtitle: "Test Data Management",
    accentColor: "text-indigo-500 dark:text-indigo-400",
    headerGradient: "from-indigo-600 to-purple-600",
    tagBg: "bg-indigo-500/10",
    tagText: "text-indigo-500 dark:text-indigo-400",
    tagBorder: "border-indigo-500/20",
    groups: [
      {
        category: "Provisionamento",
        items: [
          "Virtual Databases (VDBs) com thin-clones Copy-on-Write",
          "Snapshots incrementais com rollback instantâneo",
          "Provisionamento automático em < 30s para CI/CD",
          "Bookmarks de estado para compartilhar entre equipes",
        ],
      },
      {
        category: "Segurança",
        items: [
          "50+ regras de masking automático",
          "Detecção de PII em 27 categorias",
          "LGPD e GDPR compliance nativo",
          "Audit trail com registro completo de operações",
          "RBAC granular por VDB, schema e tabela",
        ],
      },
      {
        category: "Integração",
        items: [
          "Change Data Capture (CDC) em tempo real",
          "PostgreSQL WAL, MySQL binlog, Oracle LogMiner",
          "12+ conectores nativos para bancos de dados",
          "REST API para automação e pipelines",
          "99% de redução de storage com Copy-on-Write",
        ],
      },
    ],
  },
  {
    name: "SOFI Virtualization",
    subtitle: "Data Virtualization & Governance",
    accentColor: "text-rose-500 dark:text-rose-400",
    headerGradient: "from-rose-600 to-pink-600",
    tagBg: "bg-rose-500/10",
    tagText: "text-rose-500 dark:text-rose-400",
    tagBorder: "border-rose-500/20",
    groups: [
      {
        category: "Virtualização",
        items: [
          "Design Studio visual com drag-and-drop",
          "Views virtuais com JOINs, UNIONs e transformações",
          "Query Federation entre múltiplas fontes",
          "Data Products publicados no marketplace",
        ],
      },
      {
        category: "Governança",
        items: [
          "Catálogo semântico com classificação automática via IA",
          "Lineage column-level de ponta a ponta",
          "Data Quality com regras e alertas em tempo real",
          "Detecção automática de PII e dados sensíveis",
          "RBAC granular por view, tabela e coluna",
        ],
      },
      {
        category: "Acesso e consumo",
        items: [
          "40+ conectores nativos (SQL, NoSQL, Cloud, SaaS)",
          "REST API com endpoints auto-gerados",
          "OData v4 para Power BI e ferramentas de BI",
          "PostgreSQL Wire Protocol (qualquer client SQL)",
          "Queries em linguagem natural (NLQ) com LLM",
        ],
      },
    ],
  },
];

export function ComparisonSection() {
  return (
    <section id="compare" className="relative px-6 py-24" aria-label="Funcionalidades das plataformas">
      <div className="max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-3">FUNCIONALIDADES</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">O que cada plataforma oferece</h2>
            <p className="text-[var(--muted)] max-w-xl mx-auto">
              Conheça em detalhe os recursos de cada solução do ecossistema SOFI.
            </p>
          </div>
        </Section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {platformSpecs.map((platform) => (
            <Section key={platform.name}>
              <div className="rounded-2xl glass overflow-hidden h-full">
                {/* Header */}
                <div className={`bg-gradient-to-r ${platform.headerGradient} px-6 py-4`}>
                  <h3 className="text-base font-bold text-white">{platform.name}</h3>
                  <p className="text-[11px] text-white/70 font-medium uppercase tracking-wider">{platform.subtitle}</p>
                </div>

                {/* Feature groups */}
                <div className="divide-y divide-[var(--border)]">
                  {platform.groups.map((group) => (
                    <div key={group.category} className="px-6 py-5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border mb-3 ${platform.tagBg} ${platform.tagText} ${platform.tagBorder}`}>
                        {group.category}
                      </span>
                      <ul className="space-y-2">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-[13px] text-[var(--muted)] leading-snug">
                            <span className={`w-1 h-1 rounded-full ${platform.tagBg} ${platform.tagText} mt-1.5 flex-shrink-0 ring-2 ring-current opacity-50`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </section>
  );
}
