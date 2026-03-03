# EcoTransit Explorer

![CI](https://github.com/lrangela/eco-transit-explorer/actions/workflows/ci-cd.yml/badge.svg)

## English

EcoTransit Explorer is an Angular 21 portfolio application that combines weather data and urban mobility context in a standalone architecture built with Signals, zoneless change detection, PrimeNG, and Playwright.

### Live Demo

- URL: [https://lrangela.github.io/eco-transit-explorer/](https://lrangela.github.io/eco-transit-explorer/)

### Stack

- Angular 21
- Standalone components
- Signals, `resource`, and `rxResource`
- Zoneless change detection
- PrimeNG and PrimeFlex
- Playwright for E2E tests
- GitHub Actions and GitHub Pages

### Quick Start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file:

   ```bash
   cd src\environments
   copy environment.local.example.ts environment.local.ts
   ```

3. Edit `environment.local.ts` and replace `YOUR_API_KEY_HERE` with a valid OpenWeatherMap API key.

4. Start the app:

   ```bash
   npm run start:local
   ```

5. Open `http://localhost:4200/`.

`environment.local.ts` is ignored by Git and must never be committed.

### Available Scripts

- `npm start`: run the default Angular serve configuration
- `npm run start:local`: run with `environment.local.ts`
- `npm run start:dev`: run with `environment.development.ts`
- `npm run start:prod`: run with the production serve target
- `npm run build`: production build
- `npm run build:local`: local build
- `npm run build:dev`: development build
- `npm run build:prod`: production build
- `npm run test`: unit tests
- `npm run e2e`: Playwright E2E suite
- `npm run e2e:ui`: Playwright UI mode
- `npm run e2e:headed`: headed Playwright run

### Documentation

- [docs/LOCAL_SETUP.md](docs/LOCAL_SETUP.md)
- [docs/API_INTEGRATION.md](docs/API_INTEGRATION.md)
- [docs/SCRIPTS_CONFIG.md](docs/SCRIPTS_CONFIG.md)
- [docs/ADR-001-DATA-FETCHING.md](docs/ADR-001-DATA-FETCHING.md)
- [docs/adr/ADR-001-zoneless-architecture.md](docs/adr/ADR-001-zoneless-architecture.md)

### CI/CD

The repository includes a GitHub Actions workflow at [.github/workflows/ci-cd.yml](.github/workflows/ci-cd.yml) that:

1. Installs dependencies
2. Runs unit tests
3. Runs Playwright E2E tests
4. Injects `OPENWEATHER_API_KEY` into production placeholders during CI
5. Builds the Angular app for GitHub Pages
6. Deploys the generated site

Required repository secret:

- `OPENWEATHER_API_KEY`

GitHub setup path:

- `Settings > Secrets and variables > Actions > New repository secret`
- `Settings > Pages > Source > GitHub Actions`

### Security Notes

- No real API keys should exist in tracked files.
- `environment.local.ts` is intended for local-only development.
- This is a frontend application, so any production API key injected at build time is still shipped to the browser bundle.
- For production-grade secret protection, a backend proxy is required.

## Español

EcoTransit Explorer es una aplicación portfolio en Angular 21 que combina datos meteorológicos y contexto de movilidad urbana en una arquitectura standalone construida con Signals, detección de cambios zoneless, PrimeNG y Playwright.

### Demo en Vivo

- URL: [https://lrangela.github.io/eco-transit-explorer/](https://lrangela.github.io/eco-transit-explorer/)

### Stack

- Angular 21
- Componentes standalone
- Signals, `resource` y `rxResource`
- Detección de cambios zoneless
- PrimeNG y PrimeFlex
- Playwright para pruebas E2E
- GitHub Actions y GitHub Pages

### Inicio Rápido

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Crear el archivo de entorno local:

   ```bash
   cd src\environments
   copy environment.local.example.ts environment.local.ts
   ```

3. Editar `environment.local.ts` y reemplazar `YOUR_API_KEY_HERE` con una API key válida de OpenWeatherMap.

4. Iniciar la aplicación:

   ```bash
   npm run start:local
   ```

5. Abrir `http://localhost:4200/`.

`environment.local.ts` está ignorado por Git y no debe versionarse.

### Scripts Disponibles

- `npm start`: ejecuta la configuración por defecto de Angular
- `npm run start:local`: ejecuta con `environment.local.ts`
- `npm run start:dev`: ejecuta con `environment.development.ts`
- `npm run start:prod`: ejecuta el target de producción
- `npm run build`: build de producción
- `npm run build:local`: build local
- `npm run build:dev`: build de desarrollo
- `npm run build:prod`: build de producción
- `npm run test`: pruebas unitarias
- `npm run e2e`: suite E2E con Playwright
- `npm run e2e:ui`: modo UI de Playwright
- `npm run e2e:headed`: ejecución visible de Playwright

### Documentación

- [docs/LOCAL_SETUP.md](docs/LOCAL_SETUP.md)
- [docs/API_INTEGRATION.md](docs/API_INTEGRATION.md)
- [docs/SCRIPTS_CONFIG.md](docs/SCRIPTS_CONFIG.md)
- [docs/ADR-001-DATA-FETCHING.md](docs/ADR-001-DATA-FETCHING.md)
- [docs/adr/ADR-001-zoneless-architecture.md](docs/adr/ADR-001-zoneless-architecture.md)

### CI/CD

El repositorio incluye un workflow de GitHub Actions en [.github/workflows/ci-cd.yml](.github/workflows/ci-cd.yml) que:

1. Instala dependencias
2. Ejecuta pruebas unitarias
3. Ejecuta pruebas E2E con Playwright
4. Inyecta `OPENWEATHER_API_KEY` en los placeholders de producción durante CI
5. Compila la aplicación Angular para GitHub Pages
6. Publica el sitio generado

Secret requerido del repositorio:

- `OPENWEATHER_API_KEY`

Ruta de configuración en GitHub:

- `Settings > Secrets and variables > Actions > New repository secret`
- `Settings > Pages > Source > GitHub Actions`

### Notas de Seguridad

- No deben existir API keys reales en archivos versionados.
- `environment.local.ts` está pensado solo para desarrollo local.
- Esta es una aplicación frontend, por lo que cualquier API key de producción inyectada en build termina dentro del bundle del navegador.
- Para proteger secretos de forma real en producción, hace falta un backend proxy.
