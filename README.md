# EcoTransit Explorer

![CI](https://github.com/lrangela/eco-transit-explorer/actions/workflows/ci-cd.yml/badge.svg)

EcoTransit Explorer is an Angular 21 portfolio application that combines weather data and urban mobility context in a modern standalone architecture built with Signals, zoneless change detection, PrimeNG, and Playwright.

## Live Demo

Current deployment:

**URL:** [https://lrangela.github.io/eco-transit-explorer/](https://lrangela.github.io/eco-transit-explorer/)

## Stack

- Angular 21
- Standalone components
- Signals and Resource API
- Zoneless change detection
- PrimeNG and PrimeFlex
- Playwright for E2E tests
- GitHub Actions for CI/CD

## Local Setup

Detailed setup instructions are available in [docs/LOCAL_SETUP.md](docs/LOCAL_SETUP.md).

Quick start:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create the local environment file:

   ```bash
   cd src\environments
   copy environment.local.example.ts environment.local.ts
   ```

3. Edit `environment.local.ts` and provide a valid OpenWeatherMap API key.

4. Start the app:

   ```bash
   npm run start:local
   ```

5. Open:

   ```text
   http://localhost:4200/
   ```

The local environment file is ignored by Git and is not intended to be committed.

## Available Scripts

- `npm start`: run the app with the default Angular serve configuration
- `npm run start:local`: run the app with the local environment file
- `npm run start:dev`: run the app with the committed development configuration
- `npm run build`: production build
- `npm run build:dev`: development build
- `npm run build:local`: local build
- `npm run test`: unit tests
- `npm run e2e`: Playwright end-to-end tests

## Project Structure

- `src/app/core`: cross-cutting infrastructure such as API clients, interceptors, and error mapping
- `src/app/features`: feature areas such as weather and transit
- `src/app/shared`: shared UI components
- `src/environments`: environment files for local, development, and production builds
- `docs`: technical notes and setup guides
- `e2e`: Playwright page objects, fixtures, and test suites

## API Integration

This project integrates external data sources:

- OpenWeatherMap for current conditions and forecast data
- Public open-data sources for transport and city context

Related documentation:

- [docs/API_INTEGRATION.md](docs/API_INTEGRATION.md)
- [docs/ADR-001-DATA-FETCHING.md](docs/ADR-001-DATA-FETCHING.md)
- [docs/adr/ADR-001-zoneless-architecture.md](docs/adr/ADR-001-zoneless-architecture.md)

## Testing

- Unit tests run through Angular's unit test builder with Vitest-compatible tooling
- E2E tests run with Playwright
- In CI, unit tests, E2E tests, and production build run as separate jobs

## CI/CD

The repository includes a GitHub Actions workflow at [.github/workflows/ci-cd.yml](.github/workflows/ci-cd.yml) that:

1. Installs dependencies
2. Runs unit tests
3. Runs Playwright E2E tests
4. Injects the production API key from GitHub Secrets
5. Builds the Angular app for GitHub Pages
6. Deploys the generated site

### Required Repository Secret

To allow the production build and deployment to work, configure this repository secret:

- `OPENWEATHER_API_KEY`

GitHub path:

- `Settings > Secrets and variables > Actions > New repository secret`

### GitHub Pages

The repository must use `GitHub Actions` as the Pages source:

- `Settings > Pages > Source > GitHub Actions`

## Security Note

This is a frontend application. Even when injected through GitHub Secrets during CI, the final production API key is embedded into the client bundle. For a production-grade system with sensitive credentials, a backend proxy should be used instead of exposing third-party API keys in the browser.
