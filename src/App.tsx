import React from "react";

const CALENDLY = "https://calendly.com/pmc-consult/intro";
const EMAIL = "consulting@patrickmcelroy.me";

const focusAreas = [
  {
    title: "Strategy",
    blurb:
      "An outside perspective on positioning, priorities, and the decisions that move the business.",
  },
  {
    title: "Technology",
    blurb:
      "Practical, durable choices about AI, automation, and the systems your team depends on.",
  },
  {
    title: "Operations",
    blurb:
      "Sharper process and tooling — and the handoffs in between — so the work gets done cleanly.",
  },
];

export default function App() {
  return (
    <main className="min-h-screen bg-white text-black flex flex-col font-sans antialiased">
      {/* Header */}
      <header className="border-b border-black/10">
        <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
          <div className="font-semibold tracking-tight text-lg select-none">PMC</div>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-black px-4 py-2 text-sm font-medium hover:bg-black hover:text-white transition"
          >
            Schedule a call
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto w-full max-w-5xl px-6 py-24 md:py-32">
        <p className="text-xs uppercase tracking-[0.2em] text-black/50">
          Patrick McElroy Consulting
        </p>
        <h1 className="mt-5 text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
          Independent advisory
          <br />
          for founders and operators.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-black/70 leading-relaxed">
          A trusted outside perspective on the decisions that move the business —
          strategy, technology, and how the work actually gets done.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={CALENDLY}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:bg-black/80 transition"
          >
            Schedule a call
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="text-sm text-black/70 hover:text-black underline underline-offset-4"
          >
            {EMAIL}
          </a>
        </div>
      </section>

      {/* Focus */}
      <section className="border-t border-black/10">
        <div className="mx-auto w-full max-w-5xl px-6 py-20">
          <h2 className="text-xs uppercase tracking-[0.2em] text-black/50">Focus</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-12">
            {focusAreas.map((area) => (
              <div key={area.title}>
                <div className="text-lg font-semibold">{area.title}</div>
                <p className="mt-3 text-black/70 leading-relaxed">{area.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-black/10">
        <div className="mx-auto w-full max-w-5xl px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-black/60">
          <div>© 2026 Patrick McElroy Consulting LLC</div>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noreferrer"
            className="hover:text-black transition"
          >
            Schedule a call →
          </a>
        </div>
      </footer>
    </main>
  );
}
