import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Ignore AI tool directories that cause EMFILE errors in dev
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        "**/node_modules/**",
        "**/.git/**",
        "**/.cursor/**",
        "**/.windsurf/**",
        "**/.roo/**",
        "**/.claude/**",
        "**/.agents/**",
        "**/.augment/**",
        "**/.cline/**",
        "**/.continue/**",
        "**/.superpowers/**",
        "**/.trae/**",
        "**/.vibe/**",
        "**/.goose/**",
        "**/.kiro/**",
        "**/.junie/**",
        "**/.qwen/**",
        "**/.factory/**",
        "**/skills/**",
      ],
    };
    return config;
  },
};

export default nextConfig;
