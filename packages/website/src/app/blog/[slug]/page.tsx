import type { Metadata } from "next";
import Link from "next/link";
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
    <main className="relative min-h-screen overflow-hidden">
      {/* Circuit-board background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-post" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="160" stroke="#fafafa" strokeWidth="0.5" />
              <line x1="80" y1="0" x2="80" y2="160" stroke="#fafafa" strokeWidth="0.5" />
              <line x1="160" y1="0" x2="160" y2="160" stroke="#fafafa" strokeWidth="0.5" />
              <line x1="0" y1="0" x2="160" y2="0" stroke="#fafafa" strokeWidth="0.5" />
              <line x1="0" y1="80" x2="160" y2="80" stroke="#fafafa" strokeWidth="0.5" />
              <rect x="20" y="20" width="40" height="40" fill="none" stroke="#fafafa" strokeWidth="0.5" />
              <rect x="100" y="100" width="30" height="30" fill="none" stroke="#fafafa" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-post)" />
        </svg>
      </div>

      <div className="relative z-10 px-8 md:px-16 pt-32 pb-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Nav bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-background/80 backdrop-blur-sm border-b border-border/30">
          <Link
            href="/blog"
            className="font-mono text-sm uppercase tracking-wider text-foreground hover:text-accent-cyan transition-colors duration-200"
          >
            &#x2190; Blog
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-subtle">
            Article
          </span>
        </nav>

        {/* Post header */}
        <header className="mb-16 max-w-3xl mx-auto">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-subtle">
            {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {post.readingTime && (
              <span> &mdash; {post.readingTime} min read</span>
            )}
          </p>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold italic leading-tight md:text-4xl lg:text-5xl uppercase tracking-tight mb-4 break-words">
            {post.frontmatter.title}
          </h1>
          <p className="font-mono text-sm text-muted uppercase tracking-wider">
            {post.frontmatter.description}
          </p>
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] uppercase tracking-wider text-subtle border border-border/50 px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="mt-8 w-full h-px bg-border/40" />
        </header>

        {/* Post body */}
        <article className="prose-custom max-w-3xl mx-auto">
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

        {/* Post footer */}
        <footer className="max-w-3xl mx-auto mt-20">
          <div className="w-full h-px bg-border/40 mb-8" />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-base font-bold uppercase tracking-wider text-foreground">
                {siteConfig.author}
              </p>
              <p className="font-mono text-xs text-muted uppercase tracking-wider mt-1">
                Software engineer &mdash; Buenos Aires, Argentina
              </p>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-foreground hover:text-accent-cyan transition-colors duration-200"
            >
              <span>All posts</span>
              <span className="inline-block text-accent-cyan transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                &#x2197;
              </span>
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
