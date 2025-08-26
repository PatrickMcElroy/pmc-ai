export const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export interface BlogPost {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Case Study: Automating Chassis Split Audits with MCP",
    date: "2025-08-10",
    tags: ["MCP", "Logistics", "Audits"],
    excerpt:
      "How a lightweight MCP agent validated rates, matched docs, and cut manual checks using Sheets + Command + LSP exports.",
  },
  {
    title: "Zapier vs Retool for Logistics Workflows",
    date: "2025-07-22",
    tags: ["Zapier", "Retool", "Integrations"],
    excerpt:
      "Where each tool shines for ops teams: triggers, human-in-the-loop steps, and long-running approvals.",
  },
  {
    title: "From Google Sheets to Live KPIs in 48 Hours",
    date: "2025-07-05",
    tags: ["Dashboards", "Sheets", "KPI"],
    excerpt:
      "Turning a spreadsheet into a resilient, real-time dashboard with alerts and a single source of truth.",
  },
  {
    title: "Wiring LSP Data into Command: Lessons Learned",
    date: "2025-06-28",
    tags: ["LSP", "APIs", "Data"],
    excerpt:
      "Data hygiene, reconciliation strategies, and idempotent updates when upstreams aren't perfectly aligned.",
  },
];

