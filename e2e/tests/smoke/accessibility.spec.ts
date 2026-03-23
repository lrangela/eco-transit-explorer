import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Accessibility smoke', () => {
  test('should not have serious or critical accessibility violations on the home page', async ({ page }) => {
    await page.route('**/runtime-config.json', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          api: {
            weatherBaseUrl: 'https://api.openweathermap.org/data/2.5',
            weatherApiKey: 'test-key',
            weatherUnits: 'metric',
            weatherLanguage: 'en',
            transitBaseUrl: 'https://api.citybik.es/v2',
          },
          features: { comparison: true, transit: true },
          observability: { consoleLogging: false },
        }),
      });
    });

    await page.goto('/');

    const results = await new AxeBuilder({ page }).analyze();
    const blockingViolations = results.violations.filter(
      (violation) => violation.impact === 'serious' || violation.impact === 'critical',
    );

    expect(blockingViolations, JSON.stringify(blockingViolations, null, 2)).toEqual([]);
  });
});
