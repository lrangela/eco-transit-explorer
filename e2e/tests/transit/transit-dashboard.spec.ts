import { expect, test } from '@playwright/test';
import { BasePage } from '../../pages/base.page';

test.describe('Transit Dashboard', () => {
  test('should show bike availability instead of fake ETA', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.mockTransitAPI({
      network: {
        location: { city: 'Madrid' },
        stations: [{ id: '1', name: 'Station 1', free_bikes: 4, empty_slots: 6 }],
      },
    });
    await basePage.mockWeatherAPI({
      name: 'Madrid',
      main: { temp: 21, temp_min: 20, temp_max: 22, humidity: 45 },
      weather: [{ description: 'clear sky', icon: '01d' }],
      wind: { speed: 3 },
      visibility: 10000,
      dt: 1,
    });

    await basePage.goto('/transit');

    await expect(page.getByText('BiciMAD Station Availability')).toBeVisible();
    await expect(page.getByTestId('transit-scope-note')).toContainText('not bus or metro arrival times');
    await expect(page.getByText('Bikes available')).toBeVisible();
    await expect(page.getByText('Arrives in')).toHaveCount(0);
  });
});
