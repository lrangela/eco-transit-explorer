import { Environment } from './environment';

export const environment: Environment = {
    production: false,
    openWeather: {
        baseUrl: 'https://api.openweathermap.org/data/2.5',
        apiKey: 'YOUR_API_KEY_HERE'
    }
};
