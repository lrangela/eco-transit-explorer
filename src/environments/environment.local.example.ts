/**
 * Example file for local development only.
 *
 * Copy this file to `environment.local.ts` and replace `YOUR_API_KEY_HERE`
 * with a valid OpenWeatherMap API key.
 *
 * `environment.local.ts` is ignored by Git and must not be committed.
 */

export interface Environment {
    production: boolean;
    openWeather: {
        baseUrl: string;
        apiKey: string;
    };
}

export const environment: Environment = {
    production: false,
    openWeather: {
        baseUrl: 'https://api.openweathermap.org/data/2.5',
        apiKey: 'YOUR_API_KEY_HERE'
    }
};
