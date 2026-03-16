import Link from "next/link";
import type { Post } from "@/types/blog";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group">
      <div className="border-b border-border/50 mb-6 pb-1" />
      <Link href={`/blog/${post.slug}`} className="block">
        <h3 className="font-mono text-base font-bold uppercase tracking-wider text-foreground group-hover:text-accent-cyan transition-colors duration-200 mb-1.5">
          {post.frontmatter.title}{" "}
          <span className="inline-block text-accent-cyan transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            &#x2197;
          </span>
        </h3>
        <p className="font-mono text-sm text-muted uppercase tracking-wider mb-2">
          {post.frontmatter.description}
        </p>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <p className="font-mono text-[10px] text-subtle uppercase tracking-wider">
            {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
            {post.readingTime && (
              <span> &middot; {post.readingTime} min read</span>
            )}
          </p>
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] uppercase tracking-wider text-subtle border border-border/50 px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
