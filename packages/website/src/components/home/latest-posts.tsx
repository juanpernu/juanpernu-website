import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export async function LatestPosts() {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 3);

  if (latestPosts.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full py-16 md:py-32 overflow-hidden">
      {/* Circuit-board background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-posts" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
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
          <rect width="100%" height="100%" fill="url(#circuit-posts)" />
        </svg>
      </div>

      <div className="w-full px-8 md:px-16">
        {/* Section title — large decorative */}
        <div className="mb-10 md:mb-20 text-left md:text-right pr-0 md:pr-[20%]">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-subtle">
            03 &mdash; Writing
          </p>
          <h2 className="font-heading text-4xl font-bold italic md:text-5xl lg:text-6xl uppercase tracking-tight">
            Latest{" "}
            <span className="text-accent-cyan inline-block animate-pulse" style={{ animationDuration: "3s" }}>&#x2726;</span>{" "}
            Posts
          </h2>
        </div>

        {/* Two-column Sutera-style layout */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-24 gap-y-16">
          {/* Left column: intro + posts list */}
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.08em] text-muted leading-relaxed mb-12">
              Recent articles on ai, design patterns
              &amp; trends, and building products:
            </p>

            <div>
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="border-b border-border/50 mb-6 pb-1" />
                  <h3 className="font-mono text-base font-bold uppercase tracking-wider text-foreground group-hover:text-accent-cyan transition-colors duration-200 mb-1.5">
                    {post.frontmatter.title}{" "}
                    <span className="inline-block text-accent-cyan transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      &#x2197;
                    </span>
                  </h3>
                  <p className="font-mono text-sm text-muted uppercase tracking-wider mb-6">
                    {post.frontmatter.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Right column: intro + CTA */}
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.08em] text-muted leading-relaxed mb-12">
              Writing about web architecture,
              TypeScript, AI integration, and the
              craft of building scalable products.
              Publishing:
            </p>

            <div>
              <div className="border-b border-border/50 mb-6 pb-1" />
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 font-mono text-base font-bold uppercase tracking-wider text-foreground hover:text-accent-cyan transition-colors duration-200 mb-6"
              >
                <span>View all posts</span>
                <span className="inline-block text-accent-cyan transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  &#x2197;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
