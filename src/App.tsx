import React, { useState, useEffect } from "react";

// Minimal, black & white homepage concepts for PMC Consulting
// - Single-file React component
// - Tailwind CSS utility classes
// - Includes: sticky header with PMC logo, services grid with per‑card integrations,
//   freeform assistant box, a bottom blog section, and dynamic "next section" sticky CTA.

const services = [
  {
    title: "Ops Automation",
    blurb: "Eliminate manual data entry and handoffs across tools.",
    integrations: "Zapier · Google Sheets · Excel",
  },
  {
    title: "AI Helpdesk",
    blurb: "Draft, triage, and auto‑resolve repetitive customer requests.",
    integrations: "Email · Slack · CRM",
  },
  {
    title: "System Integrations",
    blurb: "Connect ERPs, TMS/WMS, CRMs, and spreadsheets cleanly.",
    integrations: "ERP · TMS/WMS · CRM · LSP",
  },
  {
    title: "SOP Codification",
    blurb: "Turn your tribal knowledge into reliable, automated flows.",
    integrations: "Google Docs · Confluence · Notion",
  },
  {
    title: "MCP Development",
    blurb: "Build and wire up Managed Context Platform agents and tools for reliable operator workflows.",
    integrations: "Internal tools",
  },
  {
    title: "Dashboards & Insight",
    blurb: "Live KPIs for throughput, cycle time, and unit economics.",
    integrations: "Google Sheets · Excel · Retool",
  },
];

// Dummy blog content
const blogPosts = [
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

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [tests, setTests] = useState<{ name: string; pass: boolean; details?: string }[]>([]);

  // Sticky CTA state — defaults assume hero in view
  const [nextHref, setNextHref] = useState<string>("#what-we-do");
  const [nextLabel, setNextLabel] = useState<string>("What can we do?");

  // Helper to slugify for stable data-testids
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  useEffect(() => {
    // IntersectionObserver to determine current section and choose the next one
    const ids = ["hero", "what-we-do", "assistant", "blog"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    // Initialize from defaults
    const updateFromIndex = (idx: number) => {
      const nextIdx = (idx + 1) % ids.length;
      const nextId = ids[nextIdx];
      const nextEl = document.getElementById(nextId);
      const rawTitle = nextEl?.getAttribute("data-section-title") || "Next";
      const title = nextId === "hero" ? "Back to top" : rawTitle;
      setNextHref(`#${nextId}`);
      setNextLabel(title);
    };

    // Assume hero visible on load
    updateFromIndex(0);

    const io = new IntersectionObserver(
      (entries) => {
        // Find most visible intersecting section
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        if (!vis) return;
        const idx = ids.indexOf((vis.target as HTMLElement).id);
        if (idx >= 0) updateFromIndex(idx);
      },
      {
        root: null,
        // Trigger earlier so the label feels anticipatory
        rootMargin: "0px 0px -60% 0px",
        threshold: [0.25, 0.5, 0.75],
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Simple in-app test harness (avoid regex literals in TSX to prevent parser hiccups)
  useEffect(() => {
    const results: { name: string; pass: boolean; details?: string }[] = [];

    // Footer tag
    const footerTag = document.querySelector('[data-testid="footer-tag"]');
    results.push({ name: "Footer tag text", pass: footerTag?.textContent?.trim() === "@2025 Patrick McElroy Consulting LLC." });

    // Services include MCP Development
    results.push({ name: "Services include MCP Development", pass: services.some((s) => s.title === "MCP Development") });

    // No legacy 'Quality & Audits' (case-insensitive, no regex)
    results.push({
      name: "No legacy 'Quality & Audits' service",
      pass: !services.some((s) => {
        const t = s.title.toLowerCase();
        return t.includes("quality") && t.includes("audits");
      }),
    });

    // Logo sizing classes
    const logo = document.querySelector('[data-testid="logo"]') as HTMLElement | null;
    const classList = logo?.className || "";
    results.push({ name: "Logo size classes present", pass: classList.includes("text-2xl") && classList.includes("md:text-3xl") });

    // Services title
    const servicesTitle = document.querySelector('[data-testid="services-title"]');
    results.push({ name: "Services title is 'What can we do?'", pass: servicesTitle?.textContent?.trim() === "What can we do?" });

    // Assistant title
    const assistantTitle = document.querySelector('[data-testid="assistant-title"]');
    results.push({ name: "Assistant title updated", pass: assistantTitle?.textContent?.trim() === "How can PMC help you?" });

    // Ask button
    const askBtn = document.querySelector('[data-testid="ask-btn"]');
    results.push({ name: "Ask button reads 'Ask PMC AI'", pass: (askBtn?.textContent || "").trim() === "Ask PMC AI" });

    // Per-card integrations present
    const integrations = document.querySelectorAll('[data-testid="integrations"]');
    results.push({ name: "Typical integrations present", pass: integrations.length === services.length, details: `found ${integrations.length} / expected ${services.length}` });

    // MCP Development integrations (case-insensitive, no regex)
    const mcpCard = document.querySelector(`[data-testid="card-${slug("MCP Development")}"] [data-testid="integrations"]`);
    results.push({ name: "MCP Development integrations", pass: !!mcpCard && (mcpCard.textContent || "").toLowerCase().includes("internal tools") });

    // Dashboards & Insight includes Sheets, Excel, Retool
    const dashCard = document.querySelector(`[data-testid="card-${slug("Dashboards & Insight")}"] [data-testid="integrations"]`);
    const dashText = (dashCard?.textContent || "").toLowerCase();
    results.push({ name: "Dashboards integrations", pass: !!dashCard && dashText.includes("google sheets") && dashText.includes("excel") && dashText.includes("retool") });

    // Header CTA should be scheduling (Calendly) — use .includes instead of regex literal
    const headerCta = document.querySelector('[data-testid="header-cta"]') as HTMLAnchorElement | null;
    results.push({ name: "Header CTA says 'Schedule a Consult'", pass: (headerCta?.textContent || "").trim() === "Schedule a Consult" });
    results.push({ name: "Header CTA links to Calendly", pass: !!headerCta && (headerCta.href || "").includes("calendly.com/pmc-consult/intro") });

    // Hero primary CTA should be scheduling
    const heroCta = document.querySelector('[data-testid="hero-cta"]') as HTMLAnchorElement | null;
    results.push({ name: "Hero CTA says 'Schedule a Consult'", pass: (heroCta?.textContent || "").trim() === "Schedule a Consult" });
    results.push({ name: "Hero CTA links to Calendly", pass: !!heroCta && (heroCta.href || "").includes("calendly.com/pmc-consult/intro") });

    // Sticky CTA should initially point to next section (what-we-do)
    const stickyCta = document.querySelector('[data-testid="sticky-cta"]') as HTMLAnchorElement | null;
    results.push({ name: "Sticky CTA initial href is #what-we-do", pass: stickyCta?.getAttribute("href") === "#what-we-do" });
    results.push({ name: "Sticky CTA text includes next label", pass: !!stickyCta && (stickyCta.textContent || "").includes("What can we do?") });

    // Blog section exists and has posts
    const blogSection = document.querySelector('[data-testid="blog-section"]');
    const blogCards = document.querySelectorAll('[data-testid="blog-card"]');
    results.push({ name: "Blog section exists", pass: !!blogSection });
    results.push({ name: "Blog has posts", pass: blogCards.length === blogPosts.length, details: `found ${blogCards.length} / expected ${blogPosts.length}` });

    // New: sanity check for the See What We Do anchor
    const seeWhat = document.querySelector('a[href="#what-we-do"]');
    results.push({ name: "Hero has 'See What We Do' anchor", pass: !!seeWhat });

    setTests(results);
  }, []);

  async function askModel() {
    setLoading(true);
    setAnswer(null);

    // 🔌 Replace this block with your backend call
    await new Promise((r) => setTimeout(r, 650));
    const canned =
      "Based on what you shared, PMC can prototype an automation to reduce manual steps, integrate your core systems, and surface a lightweight KPI view. We’d scope a <30‑day pilot with measurable ROI and handoff docs.";

    setAnswer(
      prompt.trim()
        ? `${canned} Example next step: a 45‑minute consult to map your workflow and pick 1–2 high‑leverage automations.`
        : "Tell us a little about your process, tools, and pain points. We’ll outline an approach in plain English."
    );
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Sticky header */}
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div
            className="font-black text-2xl md:text-3xl tracking-tight select-none"
            aria-label="PMC logo"
            data-testid="logo"
          >
            PMC
          </div>

          {/* Primary CTA — back to scheduling */}
          <a
            href="https://calendly.com/pmc-consult/intro"
            target="_blank"
            rel="noreferrer"
            data-testid="header-cta"
            className="rounded-full border border-black px-4 py-2 text-sm font-medium hover:bg-black hover:text-white transition"
          >
            Schedule a Consult
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" data-section-title="Hero" className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            AI automation for operators.
          </h1>
          <p className="mt-4 text-lg text-black/70">
            PMC partners with teams to remove busywork, connect systems, and ship
            pragmatic AI that pays for itself.
          </p>
          <div className="mt-8 flex gap-3">
            <a
              href="https://calendly.com/pmc-consult/intro"
              target="_blank"
              rel="noreferrer"
              data-testid="hero-cta"
              className="rounded-full border border-black px-5 py-2.5 text-sm font-medium hover:bg-black hover:text-white transition"
            >
              Schedule a Consult
            </a>
            <a
              href="#what-we-do"
              className="rounded-full border border-black/30 px-5 py-2.5 text-sm font-medium hover:border-black transition"
            >
              See What We Do
            </a>
          </div>
        </div>
      </section>

      {/* Services / Examples */}
      <section id="what-we-do" data-section-title="What can we do?" className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold" data-testid="services-title">What can we do?</h2>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="group rounded-2xl border border-black/20 p-5 hover:border-black transition"
              data-testid={`card-${slug(s.title)}`}
            >
              <div className="text-sm tracking-wider uppercase text-black/70">{s.title}</div>
              <div className="mt-2 text-sm text-black/70">{s.blurb}</div>
              <div className="mt-5 h-px bg-black/10" />
              <div className="mt-3 text-xs text-black/70" data-testid="integrations">
                <span className="font-medium">Typical integrations:</span> {s.integrations}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Freeform model box */}
      <section id="assistant" data-section-title="How can PMC help you?" className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl border border-black/20 p-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h3 className="text-lg font-semibold" data-testid="assistant-title">How can PMC help you?</h3>
            <span className="text-xs text-black/50">Calls custom PMC model to answer your questions</span>
          </div>

          <label htmlFor="prompt" className="sr-only">
            Describe your process, tools, and pain points
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your process, tools, and pain points…"
            className="mt-4 w-full min-h-[120px] rounded-xl border border-black/30 p-4 focus:outline-none focus:ring-0 focus:border-black bg-white"
          />

          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={askModel}
              disabled={loading}
              className="rounded-full border border-black px-4 py-2 text-sm font-medium disabled:opacity-50 hover:bg-black hover:text-white transition"
              data-testid="ask-btn"
            >
              {loading ? "Thinking…" : "Ask PMC AI"}
            </button>
            <a href="#blog" className="text-sm underline underline-offset-4">or read the blog</a>
          </div>

          <div className="mt-5 rounded-xl border border-black/10 bg-zinc-50 p-4 min-h-[80px]">
            <div className="text-xs uppercase tracking-wider text-black/50 mb-2">Response</div>
            <div className="text-sm leading-relaxed">
              {answer ?? (
                <span className="text-black/50">
                  Your tailored outline will appear here.
                </span>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Blog section */}
      <section id="blog" data-section-title="Learn more about our work" data-testid="blog-section" className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold">Learn more about our work</h2>
          <span className="text-xs text-black/50">Examples • How‑tos • Case studies</span>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((p) => (
            <article key={p.title} data-testid="blog-card" className="rounded-2xl border border-black/20 p-6 hover:border-black transition">
              <div className="text-xs text-black/50">{new Date(p.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })}</div>
              <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-black/70">{p.excerpt}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs border border-black/20 rounded-full px-2 py-0.5">{t}</span>
                ))}
              </div>
              <a href="#" className="mt-4 inline-block text-sm underline underline-offset-4">Read more</a>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-black/50 flex items-center justify-between">
          <div className="font-bold">PMC Consulting</div>
          <div data-testid="footer-tag">@2025 Patrick McElroy Consulting LLC.</div>
        </div>
      </footer>

      {/* Sticky bottom CTA — dynamic next section */}
      <div className="fixed bottom-4 left-0 right-0 mx-auto w-fit">
        <a
          href={nextHref}
          data-testid="sticky-cta"
          className="rounded-full border border-black bg-white px-5 py-2.5 text-sm font-medium shadow hover:bg-black hover:text-white transition"
          onClick={(e) => {
            if (nextLabel === "Back to top") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          {nextLabel}
        </a>
      </div>

      {/* Developer test results */}
      <section id="__dev_tests" className="mx-auto max-w-6xl px-4 py-8">
        <details>
          <summary className="cursor-pointer text-sm text-black/60">Developer test results ({tests.filter(t=>t.pass).length}/{tests.length} passing)</summary>
          <ul className="mt-3 space-y-1 text-sm">
            {tests.map((t, i) => (
              <li key={i} className={t.pass ? "text-emerald-700" : "text-red-700"}>
                {t.pass ? "✓" : "✗"} {t.name}
                {t.details ? <span className="text-black/50"> — {t.details}</span> : null}
              </li>
            ))}
          </ul>
        </details>
      </section>
    </main>
  );
}
