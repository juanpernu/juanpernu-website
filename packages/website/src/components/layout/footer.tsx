import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { socialLinks, siteConfig } from "@/lib/constants";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  x: Twitter,
  mail: Mail,
} as const;

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-8">
        <p className="text-sm text-subtle">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.name}
                href={link.url}
                target={link.icon === "mail" ? undefined : "_blank"}
                rel={link.icon === "mail" ? undefined : "noopener noreferrer"}
                aria-label={link.name}
                className="text-subtle hover:text-foreground transition-colors duration-200"
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
