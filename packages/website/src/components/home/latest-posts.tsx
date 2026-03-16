import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";

export async function LatestPosts() {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 3);

  if (latestPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-24">
      <p className="mb-4 text-sm text-subtle font-heading">02 &mdash; Writing</p>
      <h2 className="font-heading text-2xl font-bold md:text-3xl">
        Latest Posts
      </h2>
      <div className="mt-8 grid gap-6">
        {latestPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <Link
        href="/blog"
        className="mt-8 inline-block text-accent-cyan hover:underline underline-offset-4 transition-colors duration-200"
      >
        View all posts
      </Link>
    </section>
  );
}
