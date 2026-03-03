/**
 * ⚠️ ARCHIVO DE EJEMPLO - NO USAR DIRECTAMENTE
 * 
 * INSTRUCCIONES PARA DESARROLLO LOCAL:
 * 
 * 1. Copia este archivo y renómbralo a: environment.local.ts
 *    Comando: copy environment.local.example.ts environment.local.ts
 * 
 * 2. Obtén una API key GRATIS de OpenWeatherMap:
 *    - Ve a: https://openweathermap.org/api
 *    - Click en "Sign Up" (crear cuenta gratis)
 *    - Verifica tu email
 *    - Ve a: https://home.openweathermap.org/api_keys
 *    - Copia tu "Default API Key"
 * 
 * 3. En environment.local.ts, reemplaza 'YOUR_API_KEY_HERE' con tu API key real
 * 
 * 4. Ejecuta el proyecto en modo local:
 *    npm run start:local
 * 
 * ✅ environment.local.ts está en .gitignore, NO se subirá a GitHub
 * ✅ Tu API key personal permanece SEGURA en tu máquina
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
        apiKey: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'  // ← Reemplaza con tu API key de OpenWeatherMap
    }
};

