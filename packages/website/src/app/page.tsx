import { Hero } from "@/components/home/hero";
import { LatestPosts } from "@/components/home/latest-posts";
import { socialLinks, siteConfig } from "@/lib/constants";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  x: Twitter,
  mail: Mail,
} as const;

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: "Software Engineer",
    description:
      "Software engineer specializing in web architecture, Next.js, TypeScript, and building scalable products.",
    knowsAbout: [
      "Software Architecture",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Web Development",
    ],
    sameAs: socialLinks
      .filter((l) => l.icon !== "mail")
      .map((l) => l.url),
  };

  return (
    <main className="mx-auto max-w-4xl px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <LatestPosts />
      <section className="py-24">
        <p className="mb-4 text-sm text-subtle font-heading">
          03 &mdash; Contact
        </p>
        <h2 className="font-heading text-2xl font-bold md:text-3xl">
          Get in Touch
        </h2>
        <p className="mt-4 text-muted max-w-xl">
          Want to chat? Feel free to reach out via email or find me on social
          media.
        </p>
        <div className="mt-6 flex items-center gap-5">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.name}
                href={link.url}
                target={link.icon === "mail" ? undefined : "_blank"}
                rel={link.icon === "mail" ? undefined : "noopener noreferrer"}
                aria-label={link.name}
                className="text-muted hover:text-accent-cyan transition-colors duration-200"
              >
                <Icon className="h-6 w-6" />
              </a>
            );
          })}
        </div>
        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-4 inline-block text-accent-cyan hover:underline underline-offset-4 transition-colors duration-200"
        >
          {siteConfig.email}
        </a>
      </section>
    </main>
  );
}
