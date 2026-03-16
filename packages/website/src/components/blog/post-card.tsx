import Link from "next/link";
import type { Post } from "@/types/blog";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group border-b border-border pb-6">
      <Link href={`/blog/${post.slug}`} className="block">
        <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-accent-cyan transition-colors duration-200">
          {post.frontmatter.title}
        </h3>
        <p className="mt-1 text-sm text-subtle">
          {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {post.readingTime && (
            <span> &middot; {post.readingTime} min read</span>
          )}
        </p>
        <p className="mt-2 text-muted">{post.frontmatter.description}</p>
        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-surface px-2 py-0.5 text-xs text-subtle"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}
