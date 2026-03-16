export const siteConfig = {
  name: "Juan Pernumian",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://juanpernumian.com.ar",
  description:
    "Juan Pernumian — software engineer writing about web architecture, Next.js, TypeScript, and building products.",
  twitterHandle: "@JuanPernu",
  author: "Juan Pernumian",
  email: "juan.pernumian@gmail.com",
};

export const navItems = [
  { label: "Blog", href: "/blog" },
] as const;

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/juanpernu",
    icon: "github" as const,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/juanpernu/",
    icon: "linkedin" as const,
  },
  {
    name: "X",
    url: "https://x.com/JuanPernu",
    icon: "x" as const,
  },
  {
    name: "Email",
    url: "mailto:juan.pernumian@gmail.com",
    icon: "mail" as const,
  },
] as const;
