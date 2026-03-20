import { test, expect } from "@playwright/test";

/**
 * Regression tests for the mobile re-render bug.
 *
 * Root cause: @splinetool/react-spline renders a WebGL canvas on mobile.
 * iOS Safari aggressively reclaims GPU memory, losing the WebGL context and
 * triggering Spline's internal scene reload cycle — visible as a flash/flicker.
 * The fix: FloatingShape skips Spline entirely on viewports < 1024px (lg breakpoint).
 *
 * These tests verify:
 *  1. No <canvas> element is mounted on mobile viewports (Spline not loaded)
 *  2. No structural DOM mutations occur in the Hero section during 3+ clock ticks
 *  3. The clock still updates its text (LocalClock is still working)
 *  4. On desktop, the Spline canvas IS present
 */

test.describe("Home page — mobile re-render regression", () => {
  test.describe("mobile viewport", () => {
    // Pixel 5 / iPhone 14 — both configured in playwright.config.ts projects
    // but we also set it explicitly here for clarity

    test("Spline canvas is NOT mounted on mobile", async ({ page }) => {
      await page.goto("/");
      // Give React time to hydrate and run effects (including the isDesktop check)
      await page.waitForTimeout(500);

      // The react-grab dev tool also creates a canvas — target only Spline's wrapper
      const splineCanvas = page.locator("[data-spline-wrapper] canvas");
      await expect(splineCanvas).toHaveCount(0);
    });

    test("No structural DOM mutations during 3 clock ticks", async ({
      page,
    }) => {
      await page.goto("/");
      // Wait for full hydration
      await page.waitForLoadState("networkidle");

      /**
       * Observe the hero <section> for childList mutations (elements added/removed).
       * Text updates (clock ticking) are characterData, not childList — so they
       * don't count. We want zero structural mutations over 3+ seconds.
       */
      const structuralMutations = await page.evaluate((): Promise<number> => {
        return new Promise((resolve) => {
          // Use the first section on the page (hero) — querySelector with main > section
          // can fail in some browser contexts; section:first-of-type is more robust.
          const hero = document.querySelector("section");
          if (!hero) {
            resolve(-1);
            return;
          }

          let count = 0;
          const observer = new MutationObserver((records) => {
            count += records.filter((r) => r.type === "childList").length;
          });

          observer.observe(hero, { childList: true, subtree: true });

          // 3.5 seconds covers 3 full clock ticks
          setTimeout(() => {
            observer.disconnect();
            resolve(count);
          }, 3500);
        });
      });

      // -1 means the hero section wasn't found — fail explicitly
      expect(structuralMutations).not.toBe(-1);
      expect(structuralMutations).toBe(0);
    });

    test("LocalClock text updates every second", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      // The clock renders as a <span class="text-accent-cyan">
      // Wait for it to have a time value (not the "--:--" placeholder)
      const clock = page.locator("span.text-accent-cyan").first();
      await expect(clock).not.toHaveText("--:--", { timeout: 3000 });

      const firstTime = await clock.textContent();

      // Wait >1s and check the text changed
      await page.waitForTimeout(1100);
      const secondTime = await clock.textContent();

      expect(firstTime).not.toBeNull();
      expect(secondTime).not.toBeNull();
      expect(firstTime).not.toBe(secondTime);
    });
  });

  test.describe("desktop viewport", () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test("Spline canvas IS mounted on desktop", async ({ page }) => {
      await page.goto("/");

      // Verify that FloatingShape renders the Spline wrapper on desktop (isDesktop=true).
      // Check that the canvas is ATTACHED (present in DOM), not necessarily visible —
      // Spline's CDN may not be reachable in headless CI, so opacity may stay at 0.
      await expect(page.locator("[data-spline-wrapper] canvas")).toBeAttached({ timeout: 15_000 });
    });

    test("No structural DOM mutations during 3 clock ticks on desktop", async ({
      page,
    }, testInfo) => {
      // Mobile-chrome project uses Pixel 5 device emulation (deviceScaleFactor 2.75)
      // which conflicts with the viewport override in ways that break DOM queries.
      // This test is covered by the desktop-chrome project instead.
      test.skip(
        testInfo.project.name === "mobile-chrome",
        "Run on desktop-chrome project — mobile device emulation conflicts with viewport override"
      );

      await page.goto("/");
      // Wait until the hero section is in the DOM AND React has hydrated.
      // Don't use networkidle — Spline's CDN keeps the network perpetually busy.
      await page.waitForFunction(() => !!document.querySelector("section"), { timeout: 10_000 });
      // Extra buffer for Spline's initial canvas mount to settle before observing
      await page.waitForTimeout(3000);

      const structuralMutations = await page.evaluate((): Promise<number> => {
        return new Promise((resolve) => {
          const hero = document.querySelector("section");
          if (!hero) {
            resolve(-1);
            return;
          }

          let count = 0;
          const observer = new MutationObserver((records) => {
            // Ignore Spline's own internal canvas attribute changes
            const nonSplineMutations = records.filter(
              (r) =>
                r.type === "childList" &&
                !(r.target as Element).closest?.("[data-spline-wrapper]")
            );
            count += nonSplineMutations.length;
          });

          observer.observe(hero, { childList: true, subtree: true });

          setTimeout(() => {
            observer.disconnect();
            resolve(count);
          }, 3500);
        });
      });

      expect(structuralMutations).not.toBe(-1);
      expect(structuralMutations).toBe(0);
    });
  });
});
