import { Environment } from './environment';

/**
 * TEMPLATE para environment de desarrollo local.
 * 
 * INSTRUCCIONES:
 * 1. Copia este archivo a: environment.local.ts
 * 2. En environment.local.ts, reemplaza 'YOUR_API_KEY_HERE' con tu API key real
 * 3. environment.local.ts está en .gitignore y NO se subirá a GitHub
 */
export const environment: Environment = {
    production: false,
    openWeather: {
        baseUrl: 'https://api.openweathermap.org/data/2.5',
        apiKey: 'YOUR_API_KEY_HERE'  // ← Reemplaza esto con tu API key
    }
};
