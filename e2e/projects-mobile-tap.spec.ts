import { test, expect } from "@playwright/test";

test.describe("Projects section — mobile tap", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    // Scroll to projects section
    await page.evaluate(() => {
      const section = document.querySelector('[role="button"][aria-label*="Open"]');
      section?.scrollIntoView({ behavior: "instant", block: "center" });
    });
    await page.waitForTimeout(500);
  });

  test("tapping a project card opens the slide-over on mobile", async ({ page }) => {
    const card = page.locator('[role="button"][aria-label*="iAngela"]');
    await expect(card).toBeVisible();

    // Simulate a tap (touchstart + touchend + click, no movement)
    await card.tap();

    // The slide-over dialog should appear
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible({ timeout: 2000 });

    // Verify it shows iAngela content
    await expect(dialog.locator("h2")).toContainText("iAngela");
  });

  test("tapping via manual touch events opens slide-over", async ({ page }) => {
    const card = page.locator('[role="button"][aria-label*="Bilog"]');
    await expect(card).toBeVisible();

    const box = await card.boundingBox();
    if (!box) throw new Error("Card not visible");

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    // Manual touch sequence like a real phone tap
    await page.touchscreen.tap(cx, cy);

    // Wait for any synthetic click to propagate
    await page.waitForTimeout(500);

    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible({ timeout: 2000 });
    await expect(dialog.locator("h2")).toContainText("Bilog");
  });

  test("tapping a project card opens slide-over on desktop via click", async ({ page }) => {
    const card = page.locator('[role="button"][aria-label*="iAngela"]');
    await expect(card).toBeVisible();

    await card.click();

    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible({ timeout: 2000 });
    await expect(dialog.locator("h2")).toContainText("iAngela");
  });

  test("ESC closes the slide-over", async ({ page }) => {
    const card = page.locator('[role="button"][aria-label*="iAngela"]');
    await card.tap();

    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible({ timeout: 2000 });

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible({ timeout: 2000 });
  });

  test("dragging a card does NOT open the slide-over", async ({ page }) => {
    const card = page.locator('[role="button"][aria-label*="iAngela"]');
    await expect(card).toBeVisible();

    const box = await card.boundingBox();
    if (!box) throw new Error("Card not visible");

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    // Simulate a mouse drag (move > 3px threshold)
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 60, cy, { steps: 10 });
    await page.mouse.up();

    // Wait for any synthetic click to fire
    await page.waitForTimeout(500);

    // Dialog should NOT appear after a drag
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).not.toBeVisible({ timeout: 1000 });
  });
});
