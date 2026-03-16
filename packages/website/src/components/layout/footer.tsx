import { socialLinks, siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative w-full border-t border-border/40 bg-background">
      {/* Circuit-board background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-footer" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="160" stroke="#fafafa" strokeWidth="0.5" />
              <line x1="80" y1="0" x2="80" y2="160" stroke="#fafafa" strokeWidth="0.5" />
              <line x1="160" y1="0" x2="160" y2="160" stroke="#fafafa" strokeWidth="0.5" />
              <line x1="0" y1="0" x2="160" y2="0" stroke="#fafafa" strokeWidth="0.5" />
              <line x1="0" y1="80" x2="160" y2="80" stroke="#fafafa" strokeWidth="0.5" />
              <rect x="20" y="20" width="40" height="40" fill="none" stroke="#fafafa" strokeWidth="0.5" />
              <rect x="100" y="100" width="30" height="30" fill="none" stroke="#fafafa" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-footer)" />
        </svg>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-8 px-8 md:px-16 py-10">
        {/* Left: Name + location + copyright */}
        <div className="flex flex-col gap-1.5">
          <p className="font-heading text-2xl font-bold uppercase tracking-tight">
            {siteConfig.author}
          </p>
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            Buenos Aires, Argentina
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-subtle">
            &copy; {new Date().getFullYear()} &mdash; All rights reserved
          </p>
        </div>

        {/* Center: scroll to top */}
        <a
          href="#"
          className="hidden lg:flex group flex-col items-center gap-1.5 text-muted hover:text-foreground transition-colors duration-200 p-3 min-h-[44px] min-w-[44px] justify-center"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="group-hover:-translate-y-0.5 transition-transform duration-200"
          >
            <path d="M10 16V4M10 4L5 9M10 4L15 9" />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
            Top
          </span>
        </a>

        {/* Right: Reach out + social links */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:justify-self-end">
          <p className="font-mono text-sm uppercase tracking-wider text-foreground">
            Reach out to me<br />
            over here at:
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {socialLinks
              .filter((l) => l.icon !== "mail")
              .map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-wider text-foreground border border-border/60 px-3 sm:px-4 py-2.5 hover:border-accent-cyan hover:text-accent-cyan transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-mono text-xs uppercase tracking-wider text-foreground border border-border/60 px-3 sm:px-4 py-2.5 hover:border-accent-cyan hover:text-accent-cyan transition-colors duration-200"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
