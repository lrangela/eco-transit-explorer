# API Integration

## English

### Overview

The project integrates with OpenWeatherMap through an Angular service layer built on top of `HttpClient`, dependency-injection tokens, `rxResource`, and domain-level error mapping.

### Configuration Model

- `src/environments/environment.ts`: tracked base environment with the `__OPENWEATHER_API_KEY__` placeholder
- `src/environments/environment.development.ts`: tracked development placeholder
- `src/environments/environment.prod.ts`: tracked production placeholder, replaced in CI
- `src/environments/environment.local.ts`: local-only file, ignored by Git

### Tokens and Client

- `OPENWEATHER_BASE_URL` and `OPENWEATHER_API_KEY` are defined in `src/app/core/api/api.tokens.ts`
- `OpenWeatherClient` is implemented in `src/app/core/api/openweather.client.ts`
- Tokens are wired in `src/app/app.config.ts`

### Endpoints Used

- `GET /weather`
  - Query params: `q`, `appid`, `units=metric`
- `GET /forecast`
  - Query params: `q`, `appid`, `units=metric`

### Error Handling

- `httpErrorInterceptor` maps HTTP errors to domain errors
- `rateLimitInterceptor` shows a PrimeNG toast for `429` and `503`
- `safeRetry()` retries:
  - rate-limited requests using `Retry-After`
  - network failures using exponential backoff

### Notes

- No real API key should be stored in tracked source files.
- CI injects `OPENWEATHER_API_KEY` during the production build.
- Local development should use `environment.local.ts`.

## Español

### Resumen

El proyecto integra OpenWeatherMap mediante una capa de servicios Angular construida sobre `HttpClient`, tokens de inyección, `rxResource` y mapeo de errores a nivel de dominio.

### Modelo de Configuración

- `src/environments/environment.ts`: entorno base versionado con el placeholder `__OPENWEATHER_API_KEY__`
- `src/environments/environment.development.ts`: placeholder versionado para desarrollo
- `src/environments/environment.prod.ts`: placeholder versionado para producción, reemplazado en CI
- `src/environments/environment.local.ts`: archivo solo local, ignorado por Git

### Tokens y Cliente

- `OPENWEATHER_BASE_URL` y `OPENWEATHER_API_KEY` están definidos en `src/app/core/api/api.tokens.ts`
- `OpenWeatherClient` está implementado en `src/app/core/api/openweather.client.ts`
- Los tokens se registran en `src/app/app.config.ts`

### Endpoints Utilizados

- `GET /weather`
  - Parámetros: `q`, `appid`, `units=metric`
- `GET /forecast`
  - Parámetros: `q`, `appid`, `units=metric`

### Manejo de Errores

- `httpErrorInterceptor` transforma errores HTTP en errores de dominio
- `rateLimitInterceptor` muestra un toast de PrimeNG para `429` y `503`
- `safeRetry()` reintenta:
  - peticiones limitadas por cuota usando `Retry-After`
  - fallos de red con backoff exponencial

### Notas

- No debe guardarse ninguna API key real en archivos versionados.
- CI inyecta `OPENWEATHER_API_KEY` durante el build de producción.
- El desarrollo local debe usar `environment.local.ts`.
