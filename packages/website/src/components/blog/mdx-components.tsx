import type { MDXComponents } from "mdx/types";

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function YouTubeEmbed({ url }: { url: string }) {
  const id = extractYouTubeId(url);
  if (!id) return null;
  return (
    <div className="my-6 relative w-full" style={{ paddingBottom: "56.25%" }}>
      <iframe
        className="absolute inset-0 w-full h-full rounded-lg"
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="font-heading text-3xl font-bold mt-10 mb-4 text-foreground"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-heading text-2xl font-bold mt-8 mb-3 text-foreground"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-heading text-xl font-bold mt-6 mb-2 text-foreground"
      {...props}
    />
  ),
  p: (props) => <p className="my-4 leading-7 text-muted" {...props} />,
  a: (props) => {
    const href = props.href ?? "";
    if (href && extractYouTubeId(href)) {
      return <YouTubeEmbed url={href} />;
    }
    return (
      <a
        className="text-accent-cyan underline underline-offset-4 hover:text-accent-cyan/80 transition-colors duration-200"
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      />
    );
  },
  ul: (props) => (
    <ul className="my-4 ml-6 list-disc space-y-2 text-muted" {...props} />
  ),
  ol: (props) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-muted" {...props} />
  ),
  li: (props) => <li className="leading-7" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-accent-orange pl-6 italic text-muted"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-surface px-1.5 py-0.5 text-sm text-foreground font-mono break-words"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-border bg-surface p-4 text-sm"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  hr: () => <hr className="my-8 border-border" />,
  img: (props) => {
    const { alt, ...rest } = props as React.ImgHTMLAttributes<HTMLImageElement>;
    if (alt) {
      return (
        <figure className="my-6">
          {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
          <img className="rounded-lg w-full" loading="lazy" alt={alt} {...rest} />
          <figcaption className="mt-2 text-center font-mono text-[11px] text-subtle italic">
            {alt}
          </figcaption>
        </figure>
      );
    }
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img className="my-6 rounded-lg" loading="lazy" alt={alt} {...rest} />;
  },
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border border-border bg-surface px-4 py-2 text-left font-semibold text-foreground"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border border-border px-4 py-2 text-muted" {...props} />
  ),
};
