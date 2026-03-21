import { Hero } from "@/components/home/hero";
import { Projects } from "@/components/home/projects";
import { LatestPosts } from "@/components/home/latest-posts";
import { socialLinks, siteConfig } from "@/lib/constants";

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
    <main className="w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Projects />
      <LatestPosts />
      {/* Contact section removed — merged into footer */}
    </main>
  );
}
