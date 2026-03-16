import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software engineering, architecture, and building products.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Circuit-board background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-blog" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="160" stroke="#fafafa" strokeWidth="0.5" />
              <line x1="80" y1="0" x2="80" y2="160" stroke="#fafafa" strokeWidth="0.5" />
              <line x1="160" y1="0" x2="160" y2="160" stroke="#fafafa" strokeWidth="0.5" />
              <line x1="0" y1="0" x2="160" y2="0" stroke="#fafafa" strokeWidth="0.5" />
              <line x1="0" y1="80" x2="160" y2="80" stroke="#fafafa" strokeWidth="0.5" />
              <rect x="20" y="20" width="40" height="40" fill="none" stroke="#fafafa" strokeWidth="0.5" />
              <rect x="100" y="100" width="30" height="30" fill="none" stroke="#fafafa" strokeWidth="0.5" />
              <line x1="60" y1="40" x2="100" y2="40" stroke="#fafafa" strokeWidth="0.5" />
              <circle cx="115" cy="60" r="6" fill="none" stroke="#fafafa" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-blog)" />
        </svg>
      </div>

      <div className="relative z-10 px-8 md:px-16 pt-32 pb-24">
        {/* Nav bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-background/80 backdrop-blur-sm border-b border-border/30">
          <Link
            href="/"
            className="font-mono text-sm uppercase tracking-wider text-foreground hover:text-accent-cyan transition-colors duration-200"
          >
            &#x2190; Back
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-subtle">
            Blog
          </span>
        </nav>

        {/* Header */}
        <div className="mb-10 md:mb-20 text-left md:text-right pr-0 md:pr-[20%]">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-subtle">
            All Posts
          </p>
          <h1 className="font-heading text-4xl font-bold italic md:text-5xl lg:text-6xl uppercase tracking-tight">
            Blog{" "}
            <span className="text-accent-cyan inline-block animate-pulse" style={{ animationDuration: "3s" }}>&#x2726;</span>{" "}
            Archive
          </h1>
        </div>

        {/* Posts grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-24 gap-y-2">
            {/* Left column: intro + posts */}
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.08em] text-muted leading-relaxed mb-12">
                Thoughts on software engineering,
                architecture, and the craft of
                building products:
              </p>

              {posts.length === 0 ? (
                <p className="font-mono text-sm text-subtle uppercase tracking-wider">
                  Coming soon.
                </p>
              ) : (
                <div>
                  {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </div>

            {/* Right column: description — hidden on mobile to avoid orphaned text */}
            <div className="hidden md:block">
              <p className="font-mono text-sm uppercase tracking-[0.08em] text-muted leading-relaxed">
                Writing about web architecture,
                TypeScript, AI integration, and the
                craft of building scalable products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
