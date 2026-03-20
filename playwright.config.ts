import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 14"] },
    },
    {
      name: "desktop-chrome",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    // Use WATCHPACK_POLLING=true to avoid EMFILE (too many open files) on dev machines.
    // Set WEBSITE_DIR env var to test a worktree branch (defaults to main package).
    command: `cd ${process.env.WEBSITE_DIR ?? "packages/website"} && WATCHPACK_POLLING=true npm run dev`,
    url: "http://localhost:3000",
    reuseExistingServer: true,
    stdout: "pipe",
    timeout: 120_000,
  },
});
