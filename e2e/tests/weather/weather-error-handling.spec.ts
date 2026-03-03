import { test, expect } from '@playwright/test';
import { WeatherPage } from '../../pages/weather.page';

test.describe('Weather Dashboard - Error Handling', () => {
    let weatherPage: WeatherPage;

    test.beforeEach(async ({ page }) => {
        weatherPage = new WeatherPage(page);
        await weatherPage.goto('/');
    });

    test('should display error message for non-existent city', async ({ page }) => {
        weatherPage = new WeatherPage(page);

        // Mockear error 404 de API
        await weatherPage.mockWeatherAPIError(404);
        await weatherPage.goto('/');

        // Act
        await weatherPage.searchCity('InvalidCityNameXYZ123');

        // Assert
        const isErrorVisible = await weatherPage.isErrorMessageVisible();
        expect(isErrorVisible).toBe(true);

        // Weather card should not be visible
        await expect(weatherPage.weatherCard).not.toBeVisible();
    });

    test('should not search with empty input', async () => {
        // Assert - Search button should be disabled when input is empty
        await expect(weatherPage.searchButton).toBeDisabled();

        // No weather data should be displayed
        const isWeatherVisible = await weatherPage.weatherCard.isVisible();
        expect(isWeatherVisible).toBe(false);
    });
});
