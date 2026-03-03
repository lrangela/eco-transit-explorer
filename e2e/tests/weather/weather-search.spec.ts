import { test, expect } from '@playwright/test';
import { WeatherPage } from '../../pages/weather.page';
import { MOCK_WEATHER_RESPONSE, MOCK_FORECAST_RESPONSE } from '../../fixtures/weather-mock-data';

test.describe('Weather Dashboard - Search Functionality', () => {
    let weatherPage: WeatherPage;

    test.beforeEach(async ({ page }) => {
        weatherPage = new WeatherPage(page);
        // Habilitar API mocking por defecto
        await weatherPage.mockWeatherAPI(MOCK_WEATHER_RESPONSE.london);
        await weatherPage.mockForecastAPI(MOCK_FORECAST_RESPONSE.london);
        await weatherPage.goto('/');
    });

    test('should successfully search for a city and display weather data', async () => {
        // Arrange
        const cityName = 'London';

        // Act
        await weatherPage.searchCity(cityName);

        // Assert - Weather card is visible
        await expect(weatherPage.weatherCard).toBeVisible();

        // Assert - Temperature is displayed (mock data: 15°)
        const temperature = await weatherPage.getCurrentTemperature();
        expect(temperature).toContain('15'); // Mock returns 15
        expect(temperature).toContain('°'); // Contains degree symbol

        // Assert - Description matches mock
        const description = await weatherPage.getWeatherDescription();
        expect(description.toLowerCase()).toContain('clear'); // Mock: 'clear sky'

        // Assert - Forecast cards are loaded
        const forecastCount = await weatherPage.getForecastCount();
        expect(forecastCount).toBeGreaterThanOrEqual(2);
    });

    test('should show loading state before data appears', async ({ page }) => {
        weatherPage = new WeatherPage(page);

        // Mock con delay para ver el skeleton
        await page.route('**/data/2.5/weather**', async (route) => {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1s delay
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(MOCK_WEATHER_RESPONSE.london)
            });
        });
        // Forecast también necesita ser mockeado para evitar errores 404
        await weatherPage.mockForecastAPI(MOCK_FORECAST_RESPONSE.london);

        await weatherPage.goto('/');
        await weatherPage.searchInput.fill('London');
        await weatherPage.searchInput.press('Enter');

        // Assert - Skeleton loader aparece (señal de UX profesional)
        const loadingContainer = page.getByTestId('loading-state');
        await expect(loadingContainer).toBeVisible({ timeout: 2000 });

        // Verificar que contiene p-skeleton
        const skeleton = loadingContainer.locator('p-skeleton').first();
        await expect(skeleton).toBeVisible();

        // Assert - Luego aparece el dato real
        await expect(weatherPage.weatherCard).toBeVisible();
        await expect(loadingContainer).not.toBeVisible();
    });
});
