export interface Environment {
    production: boolean;
    openWeather: {
        baseUrl: string;
        apiKey: string;
    };
}

/**
 * Environment configuration for DEVELOPMENT builds (default).
 * 
 * ⚠️ IMPORTANTE: Este archivo ahora usa un placeholder.
 * Para desarrollo local, crea un archivo environment.local.ts con tu API key personal.
 * 
 * Durante CI/CD, GitHub Actions reemplazará __OPENWEATHER_API_KEY__ con el valor real.
 */
export const environment: Environment = {
    production: false,
    openWeather: {
        baseUrl: 'https://api.openweathermap.org/data/2.5',
        apiKey: '__OPENWEATHER_API_KEY__'  // ← Placeholder
    }
};
