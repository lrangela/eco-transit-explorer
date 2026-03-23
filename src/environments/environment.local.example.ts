import { Environment } from './environment.model';

/**
 * Local-only Angular environment.
 *
 * Use this file for local frontend-only overrides that must stay out of Git.
 */
export const environment: Environment = {
    production: false,
    runtimeConfigOverride: {
        api: {
            weatherApiKey: 'replace-with-your-openweather-api-key',
            weatherBaseUrl: 'https://api.openweathermap.org/data/2.5',
            weatherUnits: 'metric',
            weatherLanguage: 'en'
        }
    }
};
