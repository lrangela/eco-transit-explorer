import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class WeatherPage extends BasePage {
    // Selectores
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly weatherCard: Locator;
    readonly temperature: Locator;
    readonly description: Locator;
    readonly forecastCards: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);

        // Selectores quirúrgicos con data-testid
        this.searchInput = page.locator('[data-testid="search-input"]');
        this.searchButton = page.locator('[data-testid="search-button"]');

        // Weather data selectors
        this.weatherCard = page.locator('[data-testid="weather-card"]');
        this.temperature = page.locator('[data-testid="current-temperature"]');
        this.description = page.locator('[data-testid="weather-description"]');

        // Forecast cards
        this.forecastCards = page.locator('[data-testid="forecast-card"]');

        // Error handling
        this.errorMessage = page.locator('[data-testid="error-message"]');
    }

    async searchCity(cityName: string) {
        await this.searchInput.fill(cityName);
        await this.searchButton.click();

        // Esperar a que aparezca el skeleton (loading state) y luego desaparezca
        // Usamos catch porque si la respuesta es muy rápida el loading state podría no verse
        await this.page.getByTestId('loading-state').waitFor({ state: 'visible', timeout: 2000 }).catch(() => { });

        // Luego esperar a que aparezca el dato o el error
        // Promise.race podría ser mejor aquí, pero waitFor con timeout es seguro
        try {
            await this.weatherCard.waitFor({ state: 'visible', timeout: 10000 });
        } catch {
            // Puede que sea un error, dejamos que el test valide
        }
    }

    async getCurrentTemperature(): Promise<string> {
        await this.temperature.waitFor({ state: 'visible' });
        return await this.temperature.textContent() || '';
    }

    async getWeatherDescription(): Promise<string> {
        await this.description.waitFor({ state: 'visible' });
        return await this.description.textContent() || '';
    }

    async getForecastCount(): Promise<number> {
        // Esperar a que al menos una card esté visible
        await this.forecastCards.first().waitFor({ state: 'visible' });
        return await this.forecastCards.count();
    }

    async isErrorMessageVisible(): Promise<boolean> {
        try {
            await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    async waitForWeatherData() {
        await this.weatherCard.waitFor({ state: 'visible' });
        await this.temperature.waitFor({ state: 'visible' });
    }
}
