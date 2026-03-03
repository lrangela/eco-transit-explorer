# API Integration

## Overview

This project integrates with OpenWeatherMap using Angular's Resource API and RxJS Interceptors.

## Setup

### API Key

1. Get an API key from [OpenWeatherMap](https://openweathermap.org/api).
2. Open `src/environments/environment.ts` (for local dev, usually) or `src/environments/environment.development.ts`.
3. Replace `__REPLACE_ME__` with your actual API key.
   ```typescript
   apiKey: 'your_actual_key_here';
   ```
4. **DO NOT COMMIT** your real API key.

## Architecture

- **Resource API**: `WeatherService` uses Angular experimental `resource` API for data fetching.
- **Signals**: UI is fully powered by Signals (`input`, `computed`).
- **Interceptors**: Global `httpErrorInterceptor` normalizes errors into `DomainError` classes.
- **Cache**: In-memory TTL cache (60s) implemented in `WeatherService`.

### Error Handling

- **Rate Limit (429)**: Automatically retries with backoff based on `Retry-After` header.
- **Network Error**: Retries with exponential backoff.
- **UI**: Displays specific error messages (e.g., "Too many requests", "Network unavailable").

### Tokens & Clients

- `OPENWEATHER_BASE_URL` & `OPENWEATHER_API_KEY`: Defined in `src/app/core/api/api.tokens.ts`.
- `OpenWeatherClient`: Low-level HTTP client in `src/app/core/api/openweather.client.ts`.

## Endpoints

- **Current Weather**: `/weather` (GET)
  - Query Params: `q={city}`, `appid={key}`, `units=metric`
- **5-Day Forecast**: `/forecast` (GET)
  - Query Params: `q={city}`, `appid={key}`, `units=metric`
