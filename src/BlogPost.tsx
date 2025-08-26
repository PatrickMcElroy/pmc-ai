import React from "react";
import { useParams, Link } from "react-router-dom";
import { blogPosts, slug } from "./blogPosts";

export default function BlogPost() {
  const { slug: urlSlug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => slug(p.title) === urlSlug);

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Header copied from home for consistent styling */}
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div
            className="font-black text-3xl md:text-4xl tracking-tight select-none"
            aria-label="PMC logo"
            data-testid="logo"
          >
            PMC
          </div>
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

      {/* Blog content */}
      <article className="mx-auto max-w-3xl px-4 py-12">
        <Link to="/" className="text-sm underline underline-offset-4">
          ← Back to home
        </Link>
        {post ? (
          <div>
            <div className="mt-4 text-xs text-black/50">
              {new Date(post.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </div>
            <h1 className="mt-1 text-3xl font-semibold">{post.title}</h1>
            <p className="mt-4 text-base text-black/70">{post.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="text-xs border border-black/20 rounded-full px-2 py-0.5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <h1 className="text-2xl font-semibold">Post not found</h1>
          </div>
        )}
      </article>

      {/* Footer copied from home for consistent styling */}
      <footer className="border-t border-black/10">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-black/50 flex items-center justify-between">
          <div className="font-bold">PMC Consulting</div>
          <div data-testid="footer-tag">©{new Date().getFullYear()} Patrick McElroy Consulting LLC.</div>
        </div>
      </footer>
    </main>
  );
}
