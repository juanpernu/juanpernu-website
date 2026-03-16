---
title: "Building with Next.js 15 and React 19"
date: "2024-12-15"
description: "Notes on rebuilding my personal website with Next.js 15, React 19, and a modern toolchain."
tags: ["nextjs", "react", "web"]
published: true
---

## Why Rebuild?

Sometimes a project needs a fresh foundation. My previous site was functional but carried technical debt — a split monorepo with a separate UI package that added complexity without value.

## The Stack

The new setup is deliberately simple:

- **Next.js 15** with the App Router
- **React 19** with Server Components
- **MDX** for blog content via `next-mdx-remote`
- **Shiki** for syntax highlighting
- **Tailwind CSS** for styling

## Server Components

React Server Components change how we think about data fetching. Blog posts are loaded at build time:

```typescript
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}
```

No client-side fetching, no loading states. The HTML is generated at build time and served statically.

## What's Next

I'm planning to add more content and maybe some interactive experiments. The foundation is solid — now it's time to build on it.
