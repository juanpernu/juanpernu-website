import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, Frontmatter } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

const SLUG_REGEX = /^[a-z0-9-]+$/;

function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const sanitized = path.basename(slug);
  if (!SLUG_REGEX.test(sanitized)) return null;

  const filePath = path.join(BLOG_DIR, `${sanitized}.md`);
  if (!fs.existsSync(filePath)) return null;

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const frontmatter = data as Frontmatter;

    return {
      slug: sanitized,
      frontmatter,
      content,
      readingTime: getReadingTime(content),
    };
  } catch {
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .filter((post) => post.frontmatter.published !== false)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
  return posts;
}
