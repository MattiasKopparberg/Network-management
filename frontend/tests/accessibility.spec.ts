
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const themes = ["light", "dark"] as const;

for (const theme of themes) {
  test(`Landing page accessibility - ${theme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme });

    await page.goto("/");

    const accessibilityResults = await new AxeBuilder({ page })
      .withTags([
        "wcag2a",
        "wcag2aa",
        "wcag21a",
        "wcag21aa",
        "wcag22aa",
      ])
      .analyze();

    expect(
      accessibilityResults.violations,
      JSON.stringify(accessibilityResults.violations, null, 2)
    ).toEqual([]);
  });
}
