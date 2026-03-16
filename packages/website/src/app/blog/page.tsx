import type { Metadata } from "next";
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
    <main className="mx-auto max-w-4xl px-6 pt-32 pb-24">
      <h1 className="font-heading text-4xl font-bold md:text-5xl">Blog</h1>
      <p className="mt-4 text-muted max-w-xl">
        Writing about software engineering, architecture, and the craft of
        building products.
      </p>
      {posts.length === 0 ? (
        <p className="mt-12 text-subtle">Coming soon.</p>
      ) : (
        <div className="mt-12 grid gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
