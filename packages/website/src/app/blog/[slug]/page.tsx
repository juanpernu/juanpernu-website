import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/mdx-components";
import { siteConfig } from "@/lib/constants";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      publishedTime: post.frontmatter.date,
      authors: [siteConfig.author],
      tags: post.frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      creator: siteConfig.twitterHandle,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
      sameAs: [
        "https://github.com/juanpernu",
        "https://www.linkedin.com/in/juanpernu/",
        "https://x.com/JuanPernu",
      ],
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/blog/${post.slug}`,
    keywords: post.frontmatter.tags?.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    inLanguage: "en",
    wordCount: post.content.split(/\s+/).length,
  };

  return (
    <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="mb-10">
        <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl">
          {post.frontmatter.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-subtle">
          <time dateTime={post.frontmatter.date}>
            {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>&middot;</span>
          <span>{post.readingTime} min read</span>
          <span>&middot;</span>
          <span>{siteConfig.author}</span>
        </div>
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
      </header>
      <article className="prose-custom">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: "github-dark-dimmed",
                    keepBackground: true,
                  },
                ],
              ],
            },
          }}
        />
      </article>
      <footer className="mt-16 border-t border-border pt-8">
        <p className="font-heading font-bold text-foreground">
          {siteConfig.author}
        </p>
        <p className="text-sm text-muted mt-1">
          Software engineer specializing in web architecture, Next.js, and
          TypeScript. Writing about building products and the craft of software
          engineering.
        </p>
      </footer>
    </main>
  );
}
