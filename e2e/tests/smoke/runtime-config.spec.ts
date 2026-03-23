import { expect, test } from '@playwright/test';

test.describe('Runtime config smoke', () => {
  test('should hide feature-flagged navigation entries', async ({ page }) => {
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
          features: { comparison: false, transit: false },
          observability: { consoleLogging: false },
        }),
      });
    });

    await page.goto('/');

    await expect(page.getByRole('link', { name: 'Comparison' })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Bikes' })).toHaveCount(0);
  });
});
