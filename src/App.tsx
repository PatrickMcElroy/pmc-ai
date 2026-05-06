import React from "react";

const CALENDLY = "https://calendly.com/pmc-consult/intro";
const EMAIL = "consulting@patrickmcelroy.me";

const focusAreas = [
  {
    title: "Software & tools",
    blurb:
      "Pick the right software, skip the wrong stuff, and make AI and automation actually useful day to day.",
  },
  {
    title: "Day-to-day operations",
    blurb:
      "Fix the bottlenecks, clean up the handoffs, and get more done without adding headcount.",
  },
  {
    title: "Where to focus next",
    blurb:
      "Sort through the options and figure out what actually moves the needle for your business.",
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
      <section className="mx-auto w-full max-w-5xl px-6 pt-12 pb-10 md:pt-16 md:pb-14">
        <p className="text-xs uppercase tracking-[0.2em] text-black/50">
          Patrick McElroy Consulting · Norfolk, VA
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight">
          Straightforward advice for small businesses.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-black/70 leading-relaxed">
          I help local owners pick the right tools, smooth out day-to-day
          operations, and think through what's next — without the
          consultant-speak.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
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
        <div className="mx-auto w-full max-w-5xl px-6 py-12 md:py-14">
          <h2 className="text-xs uppercase tracking-[0.2em] text-black/50">
            How I help
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {focusAreas.map((area) => (
              <div key={area.title}>
                <div className="text-base font-semibold">{area.title}</div>
                <p className="mt-2 text-black/70 leading-relaxed">{area.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-black/10">
        <div className="mx-auto w-full max-w-5xl px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm text-black/60">
          <div>© 2026 Patrick McElroy Consulting LLC</div>
          <div>Norfolk, Virginia</div>
        </div>
      </footer>
    </main>
  );
}
