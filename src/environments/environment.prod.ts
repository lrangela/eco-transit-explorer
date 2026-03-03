/**
 * Environment configuration for PRODUCTION builds.
 * 
 * Este archivo se usa cuando ejecutas: ng build --configuration production
 * El placeholder __OPENWEATHER_API_KEY__ será reemplazado por GitHub Actions
 * con el valor real desde GitHub Secrets durante el CI/CD pipeline.
 */

export interface Environment {
    production: boolean;
    openWeather: {
        baseUrl: string;
        apiKey: string;
    };
}

export const environment: Environment = {
    production: true,
    openWeather: {
        baseUrl: 'https://api.openweathermap.org/data/2.5',
        apiKey: '__OPENWEATHER_API_KEY__'  // ← Placeholder para GitHub Actions
    }
};
