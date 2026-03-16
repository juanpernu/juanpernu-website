import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export function Hero() {
  return (
    <section className="py-24 md:py-32">
      <p className="mb-4 text-sm text-subtle font-heading">01 &mdash; About</p>
      <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        {siteConfig.name}
        <span className="block text-lg text-muted font-body font-normal mt-2">
          Software Engineer &amp; Technical Writer
        </span>
      </h1>
      <p className="mt-4 text-lg text-muted md:text-xl max-w-2xl">
        Software engineer specializing in web architecture with Next.js,
        React, and TypeScript. I write about software engineering patterns,
        technical architecture decisions, and building scalable web products.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/blog"
          className="text-accent-cyan hover:underline underline-offset-4 transition-colors duration-200"
        >
          Read the blog
        </Link>
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-accent-orange hover:underline underline-offset-4 transition-colors duration-200"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}
