import { Page, Locator } from '@playwright/test';

export class BasePage {
    constructor(public readonly page: Page) { }

    async goto(path: string = '') {
        await this.page.goto(path);
        await this.waitForAppReady();
    }

    async waitForAppReady() {
        // espera al componente raíz de Angular
        await this.page.waitForSelector('app-root', { state: 'attached' });
        // Esperamos a que el router outlet esté listo (útil para navegación)
        // Usamos catch para no fallar si no hay router-outlet inmediatamente (ej. login)
        await this.page.waitForSelector('router-outlet', { state: 'attached', timeout: 5000 }).catch(() => { });
    }

    getByTestId(testId: string): Locator {
        return this.page.locator(`[data-testid="${testId}"]`);
    }

    async takeScreenshot(name: string) {
        await this.page.screenshot({ path: `screenshots/${name}.png` });
    }

    async mockRuntimeConfig(overrides?: Record<string, unknown>) {
        await this.page.route('**/runtime-config.json', async (route) => {
            const config = {
                api: {
                    weatherBaseUrl: 'https://api.openweathermap.org/data/2.5',
                    weatherApiKey: 'test-key',
                    weatherUnits: 'metric',
                    weatherLanguage: 'en',
                    transitBaseUrl: 'https://api.citybik.es/v2',
                },
                features: {
                    comparison: true,
                    transit: true,
                },
                observability: {
                    consoleLogging: false,
                },
                ...overrides,
            };

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(config),
            });
        });
    }

    /**
     * Intercepta llamadas a OpenWeatherMap API
     * @param mockData - Respuesta mock a devolver
     */
    async mockWeatherAPI(mockData: any) {
        await this.page.route('**/data/2.5/weather**', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockData)
            });
        });
    }

    async mockForecastAPI(mockData: any) {
        await this.page.route('**/data/2.5/forecast**', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockData)
            });
        });
    }

    async mockWeatherAPIError(statusCode: number = 404) {
        await this.page.route('**/data/2.5/weather**', async (route) => {
            await route.fulfill({
                status: statusCode,
                contentType: 'application/json',
                body: JSON.stringify({ cod: '404', message: 'city not found' })
            });
        });
    }

    async mockTransitAPI(mockData: any, statusCode: number = 200) {
        await this.page.route('**/networks/bicimad', async (route) => {
            await route.fulfill({
                status: statusCode,
                contentType: 'application/json',
                body: JSON.stringify(mockData),
            });
        });
    }
}
