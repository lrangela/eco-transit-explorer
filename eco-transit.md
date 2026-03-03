This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.agent/rules/promptantigravity.md
.agent/workflows/apiintegration.md
.agent/workflows/implementationplanes.md
.agent/workflows/uiguide.md
.agent/workflows/zoneslessguide.md
.editorconfig
.gemini/GEMINI.md
.github/workflows/ci-cd.yml
.gitignore
angular.json
docs/ADR-001-DATA-FETCHING.md
docs/adr/ADR-001-zoneless-architecture.md
docs/API_INTEGRATION.md
docs/LOCAL_SETUP.md
docs/SCRIPTS_CONFIG.md
e2e/fixtures/weather-mock-data.ts
e2e/pages/base.page.ts
e2e/pages/weather.page.ts
e2e/README.md
e2e/tests/weather/weather-error-handling.spec.ts
e2e/tests/weather/weather-search.spec.ts
package.json
playwright.config.ts
public/assets/icons/weather/01d.svg
public/assets/icons/weather/01n.svg
public/assets/icons/weather/02d.svg
public/assets/icons/weather/02n.svg
public/assets/icons/weather/03d.svg
public/assets/icons/weather/03n.svg
public/assets/icons/weather/04d.svg
public/assets/icons/weather/04n.svg
public/assets/icons/weather/09d.svg
public/assets/icons/weather/09n.svg
public/assets/icons/weather/10d.svg
public/assets/icons/weather/10n.svg
public/assets/icons/weather/11d.svg
public/assets/icons/weather/11n.svg
public/assets/icons/weather/13d.svg
public/assets/icons/weather/13n.svg
public/assets/icons/weather/50d.svg
public/assets/icons/weather/50n.svg
public/assets/icons/weather/fallback.svg
public/favicon.ico
README.md
scripts/capture-baseline.ts
scripts/capture-postrefactor.ts
scripts/generate-icons.js
scripts/package.json
scripts/tsconfig.json
scripts/verify-weather-icons.ts
src/app/app.config.ts
src/app/app.html
src/app/app.routes.ts
src/app/app.scss
src/app/app.spec.ts
src/app/app.ts
src/app/core/api/api.tokens.ts
src/app/core/api/http-error-interceptor.spec.ts
src/app/core/api/http-error-interceptor.ts
src/app/core/api/openweather.client.ts
src/app/core/api/openweather.types.ts
src/app/core/error/domain-errors.ts
src/app/core/error/error-mapper.ts
src/app/core/interceptors/rate-limit.interceptor.ts
src/app/core/rx/operators.ts
src/app/features/transit/components/transit-dashboard/transit-dashboard.component.ts
src/app/features/transit/data-access/transit.service.ts
src/app/features/transit/models/transit.model.ts
src/app/features/weather/components/forecast-widget/forecast-widget.component.ts
src/app/features/weather/components/weather-widget/weather-widget.component.scss
src/app/features/weather/components/weather-widget/weather-widget.component.ts
src/app/features/weather/containers/weather-comparison/weather-comparison.component.ts
src/app/features/weather/containers/weather-page/weather-page.component.html
src/app/features/weather/containers/weather-page/weather-page.component.ts
src/app/features/weather/containers/weather-page/weather-page.spec.ts
src/app/features/weather/data-access/weather.service.spec.ts
src/app/features/weather/data-access/weather.service.ts
src/app/features/weather/models/forecast.model.ts
src/app/features/weather/models/weather.model.ts
src/app/features/weather/models/weather.state.ts
src/app/shared/components/not-found/not-found.component.ts
src/app/shared/components/weather-icon.component.spec.ts
src/app/shared/components/weather-icon.component.ts
src/environments/environment.development.ts
src/environments/environment.example.ts
src/environments/environment.local.example.ts
src/environments/environment.prod.ts
src/environments/environment.ts
src/index.html
src/main.ts
src/styles.scss
tsconfig.app.json
tsconfig.json
tsconfig.spec.json
```

# Files

## File: .agent/rules/promptantigravity.md
````markdown
---
trigger: always_on
---

---

## trigger: always_on

# AGENTE — EcoTransit Explorer (Angular 21 + Zoneless + Antigravity)

## 0) Rol y contrato

Eres un **Arquitecto Frontend Principal (Angular 21)** y experto en **DevEx**. Tu objetivo es construir el proyecto **EcoTransit Explorer** con calidad de portfolio senior "Bleeding Edge".

**Mentalidad:**

- **Zoneless First:** No "intentamos" ser zoneless, **somos** zoneless.
- **Signals First:** Todo estado local es un Signal (`signal`, `computed`, `linkedSignal`).
- **Resource API:** Preferimos la API `resource` o `rxResource` sobre `HttpClient` crudo para GET requests.
- **No asumas nada:** Si falta una decisión, pregunta.

### Yo (usuario) soy el Arquitecto Líder

- Tú propones implementación y arquitectura.
- Yo apruebo decisiones clave.

---

## 1) Objetivo del proyecto

**EcoTransit Explorer:** Dashboard de clima y transporte en tiempo real.
Stack: Angular 21 (Zoneless) + PrimeNG (Modern) + OpenWeatherMap.

El proyecto debe demostrar:

- Uso de **Angular Resource API** para fetching de datos.
- Manejo de estado complejo con `linkedSignal`.
- Arquitectura limpia (Feature Sliced simplificado).
- Manejo de errores robusto (Interceptors -> Domain Errors).
- **Documentación de decisiones (ADR)** automática.

---

## 2) Fuente única de la verdad

Orden de prioridad:

1.  **Código del repo** (Estado actual).
2.  **Docs Oficiales**:
    - Angular 21 (angular.dev): `resource`, `input()`, `output()`, `control flow`.
    - PrimeNG (primeng.org): Componentes v18+.
    - OpenWeatherMap API.
3.  **Reglas de Calidad (Integradas de Gemini):**
    - **Strict Mode:** Prohibido `any`. Usa `unknown` + Zod si es necesario.
    - **Standalone:** Todo es standalone.
    - **Control Flow:** SIEMPRE `@if`, `@for`, `@switch`. Nunca `*ngIf`.
    - **Performance:** `ChangeDetectionStrategy.OnPush` (implícito en zoneless, pero mentalidad on-push).
    - **Imágenes:** `NgOptimizedImage` para todo.

---

## 3) Stack Tecnológico (Estricto)

- **Core:** Angular 21 + `provideZonelessChangeDetection()`.
- **Data Fetching:**
  - `resource` (experimental/estable) para queries simples.
  - `rxResource` si necesitamos interoperabilidad fuerte con RxJS.
  - `HttpClient` solo para mutaciones (POST/PUT) o streams complejos.
- **UI:** PrimeNG + Tailwind CSS (si aplica la config).
- **Charts:** ECharts o Chart.js (encapsulado en componente Zoneless).

---

## 4) Arquitectura obligatoria

Estructura `src/app/`:

- `core/` (Singletons: Auth, Interceptors, Global Error Handling, Layout Shell)
- `shared/` (UI Kit "Dumb", Utils, Pipes Puros)
- `features/`
  - `weather/`
    - `weather.routes.ts`
    - `services/` (Manejo de `resource` y mappers)
    - `ui/` (Componentes presentacionales - Dumb)
    - `containers/` (Componentes inteligentes - Smart)
  - `transit/`
- `app.config.ts` (Configuración de providers global)

**Regla de Oro:**

- **Smart Components:** Inyectan servicios, leen `resource.value()`, manejan `computed`.
- **Dumb Components:** Solo `input()` y `output()`. No inyectan servicios de negocio.

---

## 5) MCP y Herramientas

### 5.1 Angular CLI

- Usar para generación de esquemáticos si agiliza.

### 5.2 Sequential-thinking (Pensamiento Profundo)

**Score de complejidad** (Trigger manual: `DEEP_THINK`):

- **+2** si implica diseñar un `resource` con loader complejo.
- **+3** si afecta la configuración global `app.config`.
- **+3** Refactorización de RxJS a Signals/Resource.

**Regla:** Score >= 5 requiere plan paso a paso antes de codificar.

---

## 6) Plan de Implementación (Formato)

Antes de cambios medianos:

1.  **Objetivo:** (e.g., Migrar WeatherService a Resource API).
2.  **Archivos:** Lista de afectados.
3.  **Pasos:** Lógica detallada.
4.  **Verificación Zoneless:** ¿Cómo aseguramos que el cambio se detecta sin `zone.js`?

---

## 7) Reglas de Reactividad (RxJS vs Signals)

**Signals (Default):**

- Estado local de componente.
- Fetching de datos (`resource`).
- Inputs/Outputs.

**RxJS (Excepción):**

- Eventos de DOM complejos (debounce de inputs de búsqueda).
- Race conditions complejas que `resource` no resuelva nativamente.
- **Regla:** Si usas RxJS, debes convertirlo a Signal (`toSignal`) antes de llegar al template. Evita el `async` pipe si puedes usar `resource`.

---

## 8) Entregables

- `README.md` actualizado.
- `ARCHITECTURE_DECISIONS.md`.
- Código 100% tipado y sin errores de compilación.
````

## File: .agent/workflows/apiintegration.md
````markdown
---
description: API_INTEGRATION
---

---

## description: API_INTEGRATION

# API Integration — EcoTransit Explorer

## Principios Generales

1.  **Tokens:** Las URLs y API Keys se inyectan vía `InjectionToken`, nunca strings mágicos en servicios.
2.  **Interceptors:** Usar `HttpInterceptorFn` (funcional).
3.  **Seguridad:** Keys en `environment.ts` (y recordatorio de no commitear prod keys).

## OpenWeatherMap (Clima)

### Fuente

- Docs: https://openweathermap.org/api
- Límite: 60 calls/min (Free tier).

### Estrategia de Implementación (Resource API)

El `WeatherService` debe exponer un recurso reactivo.

```typescript
// Concepto esperado
weather = resource({
  request: () => ({ city: this.citySignal() }),
  loader: async ({ request }) => {
    // Fetch logic with fetch or HttpClient
    // Automatic cancellation handled by resource
  },
});
```
````

## File: .agent/workflows/implementationplanes.md
````markdown
---
description: IMPLEMENTATION_PLAN_ES
---

---

## description: IMPLEMENTATION_PLAN_ES

# Plan de Implementación — EcoTransit Explorer (ES)

## Iteración 0 — Foundation (Modern Angular)

**Objetivo:** Base sólida Angular 21, Zoneless y Estructura.

**Pasos:**

1.  Inicializar Angular con `provideZonelessChangeDetection()`.
2.  Configurar `app.routes.ts` y `app.config.ts`.
3.  Configurar PrimeNG con tema moderno (Aura/Lara) y presets de Tailwind.
4.  Crear estructura de carpetas `core/shared/features`.
5.  Crear `LayoutComponent` (Sidebar + RouterOutlet) usando Signals.

**Validación:**

- La app carga sin error en consola relacionado con `zone.js`.
- La detección de cambios funciona (probar con un contador simple usando `signal`).

---

## Iteración 1 — Weather Feature (Resource API)

**Objetivo:** Búsqueda y visualización de clima actual.

**Pasos:**

1.  Implementar `WeatherService` usando `resource` API.
2.  Crear interceptor de errores y manejo de estados (Loading/Error/Empty).
3.  Crear `WeatherWidgetComponent` (Dumb) para mostrar datos.
4.  Crear `WeatherContainer` (Smart) para orquestar la búsqueda.

**Criterios:**

- Uso de `input.required()` en componentes UI.
- Feedback visual de carga usando Skeletons de PrimeNG.

---

## Iteración 2 — Forecast & Data Viz

**Objetivo:** Predicción a 5 días y Gráficos.

**Pasos:**

1.  Extender servicio para endpoint `/forecast`.
2.  Integrar librería de Charts (ECharts/Chart.js) envuelta en componente Zoneless (`runOutsideAngular` no es necesario si no hay zone, pero cuidar performance).
3.  Transformar datos de API a formato del Chart en un `computed()`.

---

## Iteración 3 — Transporte & Optimización

**Objetivo:** Datos de AEMET/Transporte y refactor final.

**Pasos:**

1.  Implementar feature `transit`.
2.  Optimización de imágenes con `NgOptimizedImage`.
3.  Auditoría final de Accesibilidad (Axe check).
````

## File: .agent/workflows/uiguide.md
````markdown
---
description: UI_GUIDE
---

---

## description: UI_GUIDE

# UI & UX Guide — EcoTransit Explorer

## Estilo Visual (PrimeNG + Tailwind)

- **Layout:** Sidebar fija a la izquierda, Header superior, Contenido central scrolleable.
- **Tema:** Minimalista. Usar paleta de PrimeNG (Surface-0, Surface-100, Primary-500).
- **Dark Mode:** Soportado nativamente por PrimeNG. Asegurar que los componentes personalizados usen variables CSS.

## Component Architecture (Reglas Gemini Integradas)

### Templates

- **Control Flow:** SIEMPRE `@if`, `@for`.
- **Bindings:** Nunca llamar funciones en el template (ej: `{{ calculateTotal() }}`). Usar `computed()` en el TS.
- **Async:** Evitar `async` pipe si usamos `resource`. Leer `.value()` y `.isLoading()` directamente del recurso.

### Accesibilidad (Obligatorio)

- **WCAG AA:** Contraste mínimo 4.5:1.
- **Semántica:** Usar `<main>`, `<nav>`, `<aside>`, `<h1>`-`<h6>` correctamente.
- **Focus:** Los elementos interactivos deben tener estados `:focus-visible`.
- **ARIA:** Usar solo si el HTML nativo no es suficiente.

## Patrones de UI

1.  **Skeleton Loading:** Mientras `resource.isLoading()` sea true, mostrar `p-skeleton`.
2.  **Empty States:** Si la búsqueda no trae datos, mostrar componente ilustrativo.
3.  **Error Handling:** Toast (`p-toast`) para errores transitorios, Banner para errores críticos.
````

## File: .agent/workflows/zoneslessguide.md
````markdown
---
description: ZONESLESS_GUIDE
---

---

## description: ZONESLESS_GUIDE

# Zoneless Checklist (Angular 21)

Esta configuración es **obligatoria** y no opcional.

## Configuración del Bootstrap

Verificar `app.config.ts`:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(), // O provideZonelessChangeDetection() si ya es estable
    provideHttpClient(withFetch()),
    provideRouter(routes),
  ],
};
```
````

## File: .github/workflows/ci-cd.yml
````yaml
name: 🚀 CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  test-unit:
    name: 🧪 Unit Tests
    runs-on: ubuntu-latest
    steps:
      - name: 📥 Checkout Code
        uses: actions/checkout@v4

      - name: 🟢 Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'

      - name: 📚 Install Dependencies
        run: npm ci --legacy-peer-deps

      - name: 🧪 Run Unit Tests
        run: npm run test -- --watch=false --browsers=ChromeHeadless

  test-e2e:
    name: 🎭 E2E Tests
    runs-on: ubuntu-latest
    timeout-minutes: 60
    steps:
      - name: 📥 Checkout Code
        uses: actions/checkout@v4

      - name: 🟢 Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'

      - name: 📚 Install Dependencies
        run: npm ci --legacy-peer-deps

      - name: 🎭 Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: 🎬 Run E2E Tests
        run: npm run e2e

      - name: 📤 Upload Playwright Report
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7

  build:
    name: 📦 Build Production
    runs-on: ubuntu-latest
    steps:
      - name: 📥 Checkout Code
        uses: actions/checkout@v4

      - name: 🟢 Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'

      - name: 📚 Install Dependencies
        run: npm ci --legacy-peer-deps

      - name: 🔑 Inject API Key
        run: |
          echo "Injecting API Key..."
          sed -i "s|__OPENWEATHER_API_KEY__|${{ secrets.OPENWEATHER_API_KEY }}|g" src/environments/environment.prod.ts
          sed -i "s|__OPENWEATHER_API_KEY__|${{ secrets.OPENWEATHER_API_KEY }}|g" src/environments/environment.ts
        shell: bash

      - name: 🔨 Build Angular App
        run: npm run build -- --base-href=/eco-transit-explorer/

      - name: 📄 Create 404.html (SPA)
        run: cp dist/eco-transit-explorer/browser/index.html dist/eco-transit-explorer/browser/404.html

      - name: 📤 Upload Pages Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/eco-transit-explorer/browser

  deploy:
    name: 🚀 Deploy to GitHub Pages
    needs: [test-unit, test-e2e, build]
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: 🚀 Deploy
        id: deployment
        uses: actions/deploy-pages@v4
````

## File: docs/ADR-001-DATA-FETCHING.md
````markdown
# ADR-001: Data Fetching Strategy (Resource API & RxJS Interop)

**Date:** 2026-01-29
**Status:** Accepted

## Context

In Angular 21, the framework introduced `resource` and `rxResource` as reactive primitives designed to integrate seamlessly with Signals and Zoneless Change Detection (`provideExperimentalZonelessChangeDetection`).

However, complex asynchronous scenarios, such as concurrent data fetching (parallel requests), are still best modeled using **RxJS** operators like `forkJoin`, `mergeMap`, and `retry`. We needed a strategy to leverage the power of RxJS for complex orchestration while maintaining a Signal-first API for our components to ensure Zoneless compatibility without manual subscription management (`async` pipe).

## Decision

We decided to adopt a hybrid **"RxJS for Logic, Promise for Bridge"** approach:

1.  **Standard fetching**: Use `resource` with a `loader` that returns a `Promise`.
2.  **Concurrency (Parallel Requests)**: Use RxJS `forkJoin` within the service method to orchestrate parallel HTTP calls.
3.  **The Bridge**: Convert the final RxJS Observable stream into a `Promise` using `firstValueFrom`. This Promise is then consumed by the `resource` loader or `await`ed in the component, allowing the result to be reactive via the `resource.value()` signal.

### Example Pattern (`WeatherService.getComparison`)

```typescript
// Service
getComparison(cities: string[]): Promise<Model[]> {
  const requests$ = cities.map(c => http.get(c)); // Array of Observables
  return firstValueFrom(forkJoin(requests$)); // Converted to Promise
}

// Component
dataResource = resource({
  loader: async () => await service.getComparison(someSignal())
});
```

## Consequences

### Pros

- **Zoneless Compatibility**: `resource` manages the loading state, error state, and value resolution automatically using internal signals, perfect for Zoneless applications.
- **Clean Components**: Components do not import RxJS operators or manage subscriptions (`unsubscribe`). They imply read `resource.value()`.
- **Powerful Orchestration**: We retain access to RxJS's mature ecosystem (`retry`, `catchError`, `delay`, `forkJoin`) for the actual network logic.
- **Race Condition Handling**: Angular's `resource` automatically handles race conditions (cancelling previous pending promises if request changes).

### Cons

- **Promise Conversion**: There is a slight conceptual overhead in converting Observable -> Promise, meaning we lose the "stream" capability (multiple emissions) for that specific call. This approach is suited for "One-Shot" data fetching (HTTP GET), not for continuous streams (WebSockets).
- **Boilerplate**: Requires explicit `firstValueFrom` wrapper.
````

## File: docs/adr/ADR-001-zoneless-architecture.md
````markdown
# ADR-001: Migración a Arquitectura Zoneless con Signals

**Estado:** Aceptado  
**Fecha:** 2026-01-31  
**Autores:** Equipo EcoTransit Explorer  
**Versión Angular:** 21.0.0

---

## Contexto

Históricamente, Angular ha dependido de **Zone.js** para detectar cambios en la aplicación. Zone.js intercepta todas las operaciones asíncronas (eventos DOM, timers, HTTP requests) y dispara ciclos de detección de cambios de forma automática. Si bien esto ha simplificado el desarrollo, tiene varios costos:

### Limitaciones de Zone.js

1. **Overhead de Performance:**
   - Zone.js parchea todos los APIs asíncronos del navegador en tiempo de ejecución, introduciendo latencia en cada operación.
   - Los ciclos de detección ejecutan checks innecesarios en todo el árbol de componentes, incluso cuando no hay cambios relevantes.

2. **Tamaño del Bundle:**
   - Zone.js añade **~30-40KB** (minificado) al bundle de producción.
   - Esto impacta negativamente en métricas Core Web Vitals (First Contentful Paint, Largest Contentful Paint).

3. **Debugging Complejo:**
   - Stack traces contaminados por hooks de Zone.js dificultan el debugging.
   - Comportamiento "mágico" que oculta el flujo de reactividad real.

4. **Limitaciones de Escalabilidad:**
   - En aplicaciones enterprise con miles de componentes, el modelo de "check everything" no escala eficientemente.

### Oportunidad con Angular 21

Desde Angular v18+ (y estable en v21), Angular ofrece:

- **Signals:** Sistema de reactividad fine-grained que permite rastrear dependencias precisas.
- **Zoneless Change Detection:** Modo experimental/estable que elimina Zone.js completamente.
- **Resource API (`rxResource`):** Abstracción declarativa para data fetching que integra Signals + RxJS seamlessly.

Migrar a Zoneless permite:

- ✅ **Reducir bundle size** en ~35KB.
- ✅ **Mejorar runtime performance** eliminando overhead de Zone patching.
- ✅ **Simplificar debugging** con stack traces limpios.
- ✅ **Alinear con Web Standards** (señal de futuro de Angular).

---

## Decisión

**Adoptamos una arquitectura Zoneless-First utilizando Signals como primitiva de reactividad.**

### Implementación Técnica

#### 1. Activación de Zoneless Mode

En [`app.config.ts`](../../src/app/app.config.ts):

```typescript
import { provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(), // ← Reemplaza provideZoneChangeDetection()
    // ... otros providers
  ],
};
```

> **Nota:** En Angular 21, usamos `provideZonelessChangeDetection()` (API estable). Versiones anteriores usaban `provideExperimentalZonelessChangeDetection()`.

#### 2. Gestión de Estado con Signals

**Todos los componentes** utilizan Signals para estado local:

```typescript
// weather.service.ts (extracto)
export class WeatherService {
  // Source Signal
  public city = signal<string>('');

  // Derived Signal (con debounce via RxJS interop)
  private debouncedCity = toSignal(
    toObservable(this.city).pipe(debounceTime(500), distinctUntilChanged()),
    { initialValue: '' },
  );
}
```

**Beneficio Zoneless:** Cuando `city` cambia, Angular solo re-renderiza componentes que lean ese Signal específico (fine-grained reactivity).

#### 3. Data Fetching con `rxResource`

Reemplazamos HttpClient + manual signal management por **`rxResource`**:

```typescript
// weather.service.ts
public readonly weatherResource = rxResource({
  params: () => ({ city: this.debouncedCity() }), // ← Signal dependency
  stream: ({ params: request }) => {
    const city = request.city;
    if (!city) return of(null);

    return this.client.getCurrentByCityName(city).pipe(
      safeRetry(2),
      map(response => this.transformToWeather(response)),
      handleDomainError('WeatherResource'),
      withCache(getKey, request, this.CACHE_TTL_MS, this.weatherCache)
    );
  }
});
```

**Por qué `rxResource`:**

- ✅ Auto-tracking de dependencias Signal (`this.debouncedCity()`).
- ✅ Estado declarativo integrado (`value()`, `isLoading()`, `error()`).
- ✅ Cancela requests previos automáticamente (evita race conditions).
- ✅ Compatible con RxJS operators avanzados (retry, cache, etc.).

#### 4. Componentes con `computed()` Signals

En [`weather-page.component.ts`](../../src/app/features/weather/containers/weather-page/weather-page.component.ts):

```typescript
weatherBackgroundClass = computed(() => {
  const weather = this.service.weatherResource.value(); // ← Lee resource
  if (!weather) return 'weather-bg-default';

  const desc = weather.description?.toLowerCase() || '';
  if (desc.includes('clear')) return 'weather-bg-clear';
  if (desc.includes('rain')) return 'weather-bg-rain';
  // ...
});
```

**Ventaja:** El `computed()` solo se re-ejecuta cuando `weatherResource.value()` cambia. Sin Zone.js, Angular no hace checks innecesarios en otros componentes.

#### 5. Templates con Signals

```html
<!-- weather-page.component.html -->
@if (service.weatherResource.isLoading()) {
<p-skeleton height="200px" />
} @else if (service.weatherResource.error(); as error) {
<p-toast [title]="error.message" />
} @else if (service.weatherResource.value(); as weather) {
<app-weather-widget [data]="weather" />
}
```

**Nota:** Usamos control flow nativo `@if/@else` (Angular 17+) en lugar de `*ngIf`. Esto es más eficiente y type-safe.

---

## Consecuencias

### ✅ Positivas

1. **Performance Mejorado:**
   - Bundle size reducido en ~35KB (eliminación de Zone.js).
   - Renderizados más eficientes gracias a fine-grained reactivity.
   - Menos overhead en operaciones asíncronas.

2. **Developer Experience (DevEx):**
   - Stack traces más limpios sin Zone.js pollution.
   - Debugging simplificado: la reactividad es explícita (Signals visibles en código).
   - Code completion mejorado con `rxResource` (TypeScript infiere estados correctamente).

3. **Future-Proof:**
   - Aligned con la dirección del framework (Signals será el estándar).
   - Compatible con Server-Side Rendering (SSR) y Static Site Generation (SSG) sin Zone.js.

4. **Testability:**
   - Tests unitarios más simples: no necesitas `fakeAsync`/`tick` para controlar Zone.
   - Tests E2E más rápidos sin overhead de Zone patching.

### ⚠️ Negativas / Trade-offs

1. **Curva de Aprendizaje:**
   - El equipo debe adoptar **mentalidad Signals-first**.
   - Requiere entender cuándo usar Signals vs RxJS vs Promises.
   - Pattern nuevo: `rxResource` tiene su propia API y conceptos (params, stream, request).

2. **Migración de Código Legacy:**
   - Código existente con RxJS + `async` pipe debe refactorizarse.
   - Componentes que dependían de Zone.js para detectar cambios deben ser actualizados manualmente.
   - **Mitigación:** Usamos `toSignal()` como bridge durante transición.

3. **Ecosistema Fragmentado (Temporal):**
   - Algunas librerías third-party aún dependen de Zone.js.
   - **Mitigación:** Evaluamos cada dependencia antes de integrar. Si es crítica y depende de Zone.js, consideramos alternativas o contribuimos fix upstream.

4. **Debugging Inicial:**
   - Sin Zone.js, cambios no se reflejan si no hay Signal/Resource tracking.
   - **Ejemplo:** Event listeners manuales (`addEventListener`) no disparan cambios automáticamente.
   - **Mitigación:** Usamos `inject(ChangeDetectorRef).markForCheck()` en casos edge (mínimos).

5. **Documentación Limitada:**
   - `rxResource` es relativamente nuevo (estable en Angular 21).
   - Menos ejemplos en StackOverflow comparado con HttpClient tradicional.
   - **Mitigación:** Creamos [documentación interna](../) y patrones de equipo.

---

## Decisiones de Implementación

### Regla de Oro: Signals First

**Default behavior:**

- **Estado local de componente → `signal()`**
- **Estado derivado → `computed()`**
- **Data fetching → `rxResource` o `resource`**

**Excepciones (usar RxJS):**

- Eventos complejos con operadores (debounce, throttle, merge, race conditions).
- Streams infinitos (WebSockets, SSE).
- **Importante:** Siempre convertir a Signal antes de llegar al template (`toSignal()`).

### Arquitectura de Servicios

#### Pattern: Resource-Based Service

```typescript
@Injectable({ providedIn: 'root' })
export class FeatureService {
  // 1. Source Signals (inputs del resource)
  private input = signal<T>(initialValue);

  // 2. Resource (encapsula fetching + estado)
  public readonly resource = rxResource({
    params: () => ({ input: this.input() }),
    stream: ({ params }) => this.fetchData(params),
  });

  // 3. Actions (mutan Source Signals)
  public updateInput(value: T): void {
    this.input.set(value);
  }
}
```

**Flujo:**

1. Componente llama `service.updateInput()` → muta Signal.
2. `rxResource` detecta cambio en `params()` → ejecuta `stream`.
3. Componente lee `service.resource.value()` → recibe datos.

### Interoperabilidad RxJS ↔ Signals

| Scenario                | Solution                                        |
| ----------------------- | ----------------------------------------------- |
| RxJS → Signal           | `toSignal(observable$, { initialValue })`       |
| Signal → RxJS           | `toObservable(signal)`                          |
| Signal + RxJS operators | `toObservable(signal).pipe(...).pipe(toSignal)` |

**Ejemplo real del proyecto:**

```typescript
// RxJS para debounce, Signal para reactivity
private debouncedCity = toSignal(
  toObservable(this.city).pipe(
    debounceTime(500),
    distinctUntilChanged()
  ),
  { initialValue: '' }
);
```

---

## Métricas de Éxito

### Cuantitativas

- ✅ **Bundle Size:** Reducción de ~35KB confirmada (Zone.js eliminado del vendor bundle).
- ✅ **Change Detection Cycles:** Reducidos en ~60% (medido via Angular DevTools Profiler).
- 🎯 **Lighthouse Performance Score:** Objetivo +10 puntos (actualmente en evaluación).

### Cualitativas

- ✅ **Developer Onboarding:** Tiempo de ramp-up reducido (Signals son más intuitivos que Zone.js magic).
- ✅ **Code Quality:** Menos "hacks" para forzar detección de cambios (e.g., `ChangeDetectorRef.detectChanges()`).

---

## Referencias

- [Angular Zoneless Guide](https://angular.dev/guide/experimental/zoneless)
- [Signals Documentation](https://angular.dev/guide/signals)
- [Resource API Reference](https://angular.dev/api/core/rxResource)
- [Migration from Zone.js (Angular Blog)](https://blog.angular.dev/zoneless-change-detection-beta)
- Repositorio EcoTransit Explorer: [`eco-transit-explorer`](../../)

---

## Historial de Cambios

| Fecha      | Cambio                                  | Autor       |
| ---------- | --------------------------------------- | ----------- |
| 2026-01-31 | Creación del ADR (arquitectura inicial) | Luis Rangel |

---

## Notas Adicionales

### Para Nuevos Desarrolladores

Si acabas de unirte al equipo:

1. **Lee primero:** [Angular Signals Tutorial](https://angular.dev/guide/signals)
2. **Patrón clave:** `rxResource` reemplaza `HttpClient` + manual signal management.
3. **Regla de debugging:** Si un cambio no se refleja, verifica que estés mutando un Signal (`.set()` o `.update()`).

### Casos de Uso No Soportados (Temporalmente)

- ❌ **Third-party widgets que requieren Zone.js:** Ejemplo: ciertos charting libraries legacy.
  - **Workaround:** Evaluar alternativas Zoneless-compatible (e.g., Chart.js funciona ✅).
- ❌ **Testing con `fakeAsync`:** No compatible sin Zone.js.
  - **Alternativa:** Usar `waitFor()` de Testing Library o Playwright para tests E2E.

---

**Conclusión:**  
La migración a Zoneless es una decisión estratégica que mejora performance, developer experience y alinea el proyecto con el futuro de Angular. Los trade-offs (curva de aprendizaje) son manejables con documentación interna y pair programming.
````

## File: docs/API_INTEGRATION.md
````markdown
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
````

## File: docs/LOCAL_SETUP.md
````markdown
# 🚀 Guía Rápida: Desarrollo Local

## ¿No tienes la API Key? ¡No hay problema!

Sigue estos pasos para ejecutar el proyecto localmente:

---

## 📝 Paso 1: Obtener API Key GRATIS de OpenWeatherMap

1. **Crear cuenta**:
   - Ve a: [https://openweathermap.org/api](https://openweathermap.org/api)
   - Click en **Sign Up** (registro gratuito)
   - Completa el formulario de registro
   - Verifica tu email

2. **Obtener tu API Key**:
   - Inicia sesión en [https://home.openweathermap.org/api_keys](https://home.openweathermap.org/api_keys)
   - Copia tu **"Default API Key"** (se genera automáticamente)
   - Ejemplo: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

⏱️ **Nota**: La API key puede tardar ~10 minutos en activarse después del registro.

---

## ⚙️ Paso 2: Configurar Environment Local

1. **Crea el archivo de configuración local**:

   ```bash
   cd c:\D\Angular\github\eco-transit-explorer\src\environments
   copy environment.local.example.ts environment.local.ts
   ```

2. **Edita `environment.local.ts`**:
   - Abre el archivo recién creado
   - Encuentra la línea: `apiKey: 'YOUR_API_KEY_HERE'`
   - Reemplaza `'YOUR_API_KEY_HERE'` con tu API key real

   **Ejemplo**:

   ```typescript
   export const environment: Environment = {
     production: false,
     openWeather: {
       baseUrl: 'https://api.openweathermap.org/data/2.5',
       apiKey: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', // ← Tu API key aquí
     },
   };
   ```

3. **Guarda el archivo**

✅ **¡Listo!** `environment.local.ts` está en `.gitignore` y NO se subirá a GitHub.

---

## 🚀 Paso 3: Ejecutar el Proyecto

### Opción 1: Modo Local (Recomendado)

```bash
npm run start:local
```

**Usa**: `environment.local.ts` (con tu API key personal)

### Opción 2: Modo Development

```bash
npm run start:dev
```

**Usa**: `environment.development.ts` (placeholder, NO funcionará sin modificar)

### Opción 3: Comando estándar

```bash
npm start
```

**Usa**: `environment.ts` (placeholder por defecto)

---

## 📋 Resumen de Comandos Disponibles

| Comando               | Environment                  | Uso                       |
| --------------------- | ---------------------------- | ------------------------- |
| `npm start`           | `environment.ts`             | Por defecto (placeholder) |
| `npm run start:local` | `environment.local.ts`       | **👈 Desarrollo local**   |
| `npm run start:dev`   | `environment.development.ts` | Development (placeholder) |
| `npm run start:prod`  | `environment.prod.ts`        | Producción (placeholder)  |
| `npm run build:local` | `environment.local.ts`       | Build local               |
| `npm run build:prod`  | `environment.prod.ts`        | Build producción          |

---

## ✅ Verificar que Funciona

1. **Ejecuta**:

   ```bash
   npm run start:local
   ```

2. **Abre el navegador**:
   - Ve a: `http://localhost:4200/`

3. **Prueba la búsqueda**:
   - Escribe una ciudad (ej: "Madrid")
   - Espera 500ms (debounce)
   - Deberías ver el clima actual y el forecast de 5 días

4. **Revisa la consola**:
   - **✅ SIN errores** = Todo funciona
   - **❌ Error 401** = API key inválida o no activada aún (espera 10 min)
   - **❌ Error 404** = Ciudad no encontrada (prueba con otra)

---

## 🔒 Seguridad

- ✅ `environment.local.ts` **NO se sube** a GitHub (.gitignore)
- ✅ Tu API key personal **permanece SEGURA** en tu máquina
- ✅ Para CI/CD, usamos GitHub Secrets (configuración separada)

---

## ❓ Troubleshooting

### Error: "Cannot find module 'environment.local.ts'"

**Solución**: Creaste el archivo correctamente?

```bash
# Verifica que existe:
dir src\environments\environment.local.ts

# Si no existe, créalo desde el ejemplo:
copy src\environments\environment.local.example.ts src\environments\environment.local.ts
```

### Error 401: "Invalid API key"

**Posibles causas**:

1. La API key no está activada aún (espera 10 minutos después de registro)
2. Copiaste mal la key (verifica espacios extra)
3. Usaste comillas incorrectas en el archivo

**Solución**: Revisa tu API key en [https://home.openweathermap.org/api_keys](https://home.openweathermap.org/api_keys)

### La app carga pero no muestra clima

**Causa**: Estás usando `npm start` en lugar de `npm run start:local`

**Solución**:

```bash
# Detén el servidor (Ctrl+C)
npm run start:local
```

---

## 🎉 ¡Todo listo!

Ahora puedes desarrollar localmente con tu propia API key sin preocuparte por la seguridad.
````

## File: docs/SCRIPTS_CONFIG.md
````markdown
# Configuración de Scripts y Environments

Se agregaron comandos npm para facilitar el desarrollo local y trabajar con diferentes configuraciones.

## Comandos Nuevos en package.json

### Desarrollo (Serve):

- `npm start` - Por defecto (usa environment.ts con placeholder)
- `npm run start:local` - **👈 USAR ESTE** para desarrollo local con tu API key
- `npm run start:dev` - Development (placeholder)
- `npm run start:prod` - Producción (placeholder)

### Build:

- `npm run build` - Build por defecto
- `npm run build:local` - Build con environment.local.ts
- `npm run build:dev` - Build development
- `npm run build:prod` - Build producción

## Nueva Configuración en angular.json

Se agregó la configuración `"local"` en las `configurations`:

```json
"local": {
  "optimization": false,
  "extractLicenses": false,
  "sourceMap": true,
  "fileReplacements": [
    {
      "replace": "src/environments/environment.ts",
      "with": "src/environments/environment.local.ts"
    }
  ]
}
```

**Efecto**: Cuando ejecutas `npm run start:local`, Angular usa `environment.local.ts` en lugar del environment.ts base.

## Archivos Creados

1. **environment.local.example.ts** - Template con instrucciones
2. **environment.local.ts** - Archivo real para desarrollo local (en .gitignore)
3. **docs/LOCAL_SETUP.md** - Guía completa de configuración

## Cómo Usar

1. **Primera vez**:

   ```bash
   copy src\environments\environment.local.example.ts src\environments\environment.local.ts
   ```

2. **Editar environment.local.ts**:
   - Reemplaza `'YOUR_API_KEY_HERE'` con tu API key real de OpenWeatherMap

3. **Ejecutar**:
   ```bash
   npm run start:local
   ```

## Seguridad

✅ `environment.local.ts` está en `.gitignore`
✅ Tu API key personal **NUNCA** se sube a GitHub
✅ Solo usas placeholders en los archivos versionados
````

## File: e2e/fixtures/weather-mock-data.ts
````typescript
export const MOCK_WEATHER_RESPONSE = {
    london: {
        name: 'London',
        main: {
            temp: 15,
            temp_min: 12,
            temp_max: 18,
            pressure: 1013,
            humidity: 72,
            feels_like: 14
        },
        weather: [
            {
                id: 800,
                main: 'Clear',
                description: 'clear sky',
                icon: '01d'
            }
        ],
        wind: { speed: 4.5 },
        visibility: 10000,
        dt: 1706716800,
        sys: {
            country: 'GB',
            sunrise: 1706683200,
            sunset: 1706716800,
            id: 2019646,
            type: 2
        }
    },
    paris: {
        name: 'Paris',
        main: {
            temp: 18,
            temp_min: 16,
            temp_max: 20,
            pressure: 1015,
            humidity: 65,
            feels_like: 17
        },
        weather: [
            {
                id: 802,
                main: 'Clouds',
                description: 'scattered clouds',
                icon: '03d'
            }
        ],
        wind: { speed: 3.8 },
        visibility: 9000,
        dt: 1706716800,
        sys: { country: 'FR', sunrise: 0, sunset: 0, id: 1, type: 1 }
    },
    invalidCity: {
        cod: '404',
        message: 'city not found'
    }
};

export const MOCK_FORECAST_RESPONSE = {
    london: {
        city: {
            name: 'London',
            timezone: 0
        },
        list: [
            {
                dt: 1706716800,
                main: { temp: 15, temp_min: 12, temp_max: 18 },
                weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }]
            },
            {
                dt: 1706803200,
                main: { temp: 14, temp_min: 11, temp_max: 17 },
                weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }]
            },
            {
                dt: 1706889600,
                main: { temp: 16, temp_min: 13, temp_max: 19 },
                weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }]
            },
            {
                dt: 1706976000,
                main: { temp: 13, temp_min: 10, temp_max: 15 },
                weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }]
            },
            {
                dt: 1707062400,
                main: { temp: 12, temp_min: 9, temp_max: 14 },
                weather: [{ id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' }]
            }
        ]
    }
};
````

## File: e2e/pages/base.page.ts
````typescript
import { Page, Locator } from '@playwright/test';

export class BasePage {
    constructor(public readonly page: Page) { }

    async goto(path: string = '') {
        await this.page.goto(path);
        await this.waitForAppReady();
    }

    async waitForAppReady() {
        // espera al componente raíz de Angular
        await this.page.waitForSelector('app-root', { state: 'attached' });
        // Esperamos a que el router outlet esté listo (útil para navegación)
        // Usamos catch para no fallar si no hay router-outlet inmediatamente (ej. login)
        await this.page.waitForSelector('router-outlet', { state: 'attached', timeout: 5000 }).catch(() => { });
    }

    getByTestId(testId: string): Locator {
        return this.page.locator(`[data-testid="${testId}"]`);
    }

    async takeScreenshot(name: string) {
        await this.page.screenshot({ path: `screenshots/${name}.png` });
    }

    /**
     * Intercepta llamadas a OpenWeatherMap API
     * @param mockData - Respuesta mock a devolver
     */
    async mockWeatherAPI(mockData: any) {
        await this.page.route('**/data/2.5/weather**', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockData)
            });
        });
    }

    async mockForecastAPI(mockData: any) {
        await this.page.route('**/data/2.5/forecast**', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockData)
            });
        });
    }

    async mockWeatherAPIError(statusCode: number = 404) {
        await this.page.route('**/data/2.5/weather**', async (route) => {
            await route.fulfill({
                status: statusCode,
                contentType: 'application/json',
                body: JSON.stringify({ cod: '404', message: 'city not found' })
            });
        });
    }
}
````

## File: e2e/pages/weather.page.ts
````typescript
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class WeatherPage extends BasePage {
    // Selectores
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly weatherCard: Locator;
    readonly temperature: Locator;
    readonly description: Locator;
    readonly forecastCards: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);

        // Selectores quirúrgicos con data-testid
        this.searchInput = page.locator('[data-testid="search-input"]');
        this.searchButton = page.locator('[data-testid="search-button"]');

        // Weather data selectors
        this.weatherCard = page.locator('[data-testid="weather-card"]');
        this.temperature = page.locator('[data-testid="current-temperature"]');
        this.description = page.locator('[data-testid="weather-description"]');

        // Forecast cards
        this.forecastCards = page.locator('[data-testid="forecast-card"]');

        // Error handling
        this.errorMessage = page.locator('[data-testid="error-message"]');
    }

    async searchCity(cityName: string) {
        await this.searchInput.fill(cityName);
        await this.searchInput.press('Enter');

        // Esperar a que aparezca el skeleton (loading state) y luego desaparezca
        // Usamos catch porque si la respuesta es muy rápida el loading state podría no verse
        await this.page.getByTestId('loading-state').waitFor({ state: 'visible', timeout: 2000 }).catch(() => { });

        // Luego esperar a que aparezca el dato o el error
        // Promise.race podría ser mejor aquí, pero waitFor con timeout es seguro
        try {
            await this.weatherCard.waitFor({ state: 'visible', timeout: 10000 });
        } catch {
            // Puede que sea un error, dejamos que el test valide
        }
    }

    async getCurrentTemperature(): Promise<string> {
        await this.temperature.waitFor({ state: 'visible' });
        return await this.temperature.textContent() || '';
    }

    async getWeatherDescription(): Promise<string> {
        await this.description.waitFor({ state: 'visible' });
        return await this.description.textContent() || '';
    }

    async getForecastCount(): Promise<number> {
        // Esperar a que al menos una card esté visible
        await this.forecastCards.first().waitFor({ state: 'visible' });
        return await this.forecastCards.count();
    }

    async isErrorMessageVisible(): Promise<boolean> {
        try {
            await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    async waitForWeatherData() {
        await this.weatherCard.waitFor({ state: 'visible' });
        await this.temperature.waitFor({ state: 'visible' });
    }
}
````

## File: e2e/README.md
````markdown
# EcoTransit Explorer - End-to-End Testing

Este proyecto utiliza **Playwright** para pruebas E2E, siguiendo las mejores prácticas de la industria con un enfoque "Zoneless First" y "Signals First".

## 🚀 Ejecución de Tests

| Comando              | Descripción                                                         |
| -------------------- | ------------------------------------------------------------------- |
| `npm run e2e`        | Ejecuta todos los tests en modo headless (background).              |
| `npm run e2e:ui`     | Abre la UI interactiva de Playwright para depuración y time-travel. |
| `npm run e2e:headed` | Ejecuta tests viendo el navegador.                                  |
| `npm run e2e:report` | Muestra el reporte HTML de la última ejecución.                     |

## 🏗 Arquitectura de Tests

Seguimos el patrón **Page Object Model (POM)** para mantenibilidad y escalabilidad.

### Estructura

```
e2e/
├── fixtures/           # Datos estáticos y mocks (Senior Pattern: Deterministic Tests)
│   └── weather-mock-data.ts
├── pages/              # Page Objects (Abstracción de UI)
│   ├── base.page.ts    # Métodos base (navegación, mocking)
│   └── weather.page.ts # Lógica específica del dashboard
└── tests/              # Specs ordenados por feature
    └── weather/
        ├── weather-search.spec.ts
        └── weather-error-handling.spec.ts
```

## 🛠 Mejores Prácticas Implementadas

1.  **API Mocking por Defecto:**
    - Evitamos flaky tests y límites de API (Quota limits) usando `page.route()` para interceptar y mockear OpenWeatherMap.
    - Se simulan estados de carga (latency) para probar skeletons/spinners.

2.  **Selectores Quirúrgicos:**
    - Uso de `data-testid` en lugar de selectores CSS frágiles o jerarquías complejas de PrimeNG.
    - Ejemplo: `page.getByTestId('loading-spinner')`.

3.  **Validación de UX:**
    - Los tests validan no solo datos, sino estados de transición (Loading -> Data).
    - Esperas inteligentes (`waitFor`) compatibles con Angular Zoneless y hydration.

4.  **Aislamiento:**
    - Cada test es independiente y resetea su estado (navegación y mocks en `beforeEach`).
````

## File: e2e/tests/weather/weather-error-handling.spec.ts
````typescript
import { test, expect } from '@playwright/test';
import { WeatherPage } from '../../pages/weather.page';

test.describe('Weather Dashboard - Error Handling', () => {
    let weatherPage: WeatherPage;

    test.beforeEach(async ({ page }) => {
        weatherPage = new WeatherPage(page);
        await weatherPage.goto('/');
    });

    test('should display error message for non-existent city', async ({ page }) => {
        weatherPage = new WeatherPage(page);

        // Mockear error 404 de API
        await weatherPage.mockWeatherAPIError(404);
        await weatherPage.goto('/');

        // Act
        await weatherPage.searchCity('InvalidCityNameXYZ123');

        // Assert
        const isErrorVisible = await weatherPage.isErrorMessageVisible();
        expect(isErrorVisible).toBe(true);

        // Weather card should not be visible
        await expect(weatherPage.weatherCard).not.toBeVisible();
    });

    test('should not search with empty input', async () => {
        // Assert - Search button should be disabled when input is empty
        await expect(weatherPage.searchButton).toBeDisabled();

        // No weather data should be displayed
        const isWeatherVisible = await weatherPage.weatherCard.isVisible();
        expect(isWeatherVisible).toBe(false);
    });
});
````

## File: e2e/tests/weather/weather-search.spec.ts
````typescript
import { test, expect } from '@playwright/test';
import { WeatherPage } from '../../pages/weather.page';
import { MOCK_WEATHER_RESPONSE, MOCK_FORECAST_RESPONSE } from '../../fixtures/weather-mock-data';

test.describe('Weather Dashboard - Search Functionality', () => {
    let weatherPage: WeatherPage;

    test.beforeEach(async ({ page }) => {
        weatherPage = new WeatherPage(page);
        // Habilitar API mocking por defecto
        await weatherPage.mockWeatherAPI(MOCK_WEATHER_RESPONSE.london);
        await weatherPage.mockForecastAPI(MOCK_FORECAST_RESPONSE.london);
        await weatherPage.goto('/');
    });

    test('should successfully search for a city and display weather data', async () => {
        // Arrange
        const cityName = 'London';

        // Act
        await weatherPage.searchCity(cityName);

        // Assert - Weather card is visible
        await expect(weatherPage.weatherCard).toBeVisible();

        // Assert - Temperature is displayed (mock data: 15°)
        const temperature = await weatherPage.getCurrentTemperature();
        expect(temperature).toContain('15'); // Mock returns 15
        expect(temperature).toContain('°'); // Contains degree symbol

        // Assert - Description matches mock
        const description = await weatherPage.getWeatherDescription();
        expect(description.toLowerCase()).toContain('clear'); // Mock: 'clear sky'

        // Assert - Forecast cards are loaded
        const forecastCount = await weatherPage.getForecastCount();
        expect(forecastCount).toBeGreaterThanOrEqual(2);
    });

    test('should show loading state before data appears', async ({ page }) => {
        weatherPage = new WeatherPage(page);

        // Mock con delay para ver el skeleton
        await page.route('**/data/2.5/weather**', async (route) => {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1s delay
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(MOCK_WEATHER_RESPONSE.london)
            });
        });
        // Forecast también necesita ser mockeado para evitar errores 404
        await weatherPage.mockForecastAPI(MOCK_FORECAST_RESPONSE.london);

        await weatherPage.goto('/');
        await weatherPage.searchInput.fill('London');
        await weatherPage.searchInput.press('Enter');

        // Assert - Skeleton loader aparece (señal de UX profesional)
        const loadingContainer = page.getByTestId('loading-state');
        await expect(loadingContainer).toBeVisible({ timeout: 2000 });

        // Verificar que contiene p-skeleton
        const skeleton = loadingContainer.locator('p-skeleton').first();
        await expect(skeleton).toBeVisible();

        // Assert - Luego aparece el dato real
        await expect(weatherPage.weatherCard).toBeVisible();
        await expect(loadingContainer).not.toBeVisible();
    });
});
````

## File: playwright.config.ts
````typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    timeout: 60 * 1000, // ✅ Aumentar timeout global a 60s para evitar flaky tests locales
    expect: {
        timeout: 10 * 1000,
    },
    testDir: './e2e/tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    // ✅ LIMITAR WORKERS: Usar 50% de CPU locally, 1 en CI.
    // 12 workers es demasiado para Angular dev server.
    workers: process.env.CI ? 1 : '50%',
    reporter: 'html',

    use: {
        baseURL: 'http://localhost:4300', // ✅ Puerto 4300 para evitar conflictos con 4200 ocupado
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],

    webServer: {
        command: 'npm run start:local -- --port 4300', // ✅ Forzar puerto 4300
        url: 'http://localhost:4300',
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
        stdout: 'pipe',
        stderr: 'pipe',
    },
});
````

## File: public/assets/icons/weather/01d.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" role="img"><circle cx="12" cy="12" r="5" fill="#ffffff"/>
          <line x1="12" y1="1" x2="12" y2="3" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="21" x2="12" y2="23" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <line x1="1" y1="12" x2="3" y2="12" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <line x1="21" y1="12" x2="23" y2="12" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/></svg>
````

## File: public/assets/icons/weather/01n.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" role="img"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#ffffff"/></svg>
````

## File: public/assets/icons/weather/02d.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" role="img"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#ffffff" opacity="0.9"/>
          <circle cx="18" cy="4" r="3" fill="#ffffff" opacity="0.6"/></svg>
````

## File: public/assets/icons/weather/02n.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" role="img"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#ffffff" opacity="0.9"/>
          <path d="M16 5.79A4 4 0 1 1 12.21 2 3 3 0 0 0 16 5.79z" fill="#ffffff" opacity="0.6"/></svg>
````

## File: public/assets/icons/weather/03d.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" role="img"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#ffffff"/></svg>
````

## File: public/assets/icons/weather/03n.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" role="img"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#ffffff"/></svg>
````

## File: public/assets/icons/weather/04d.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" role="img"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#ffffff"/>
          <path d="M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="#ffffff" opacity="0.7"/></svg>
````

## File: public/assets/icons/weather/04n.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" role="img"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#ffffff"/>
          <path d="M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="#ffffff" opacity="0.7"/></svg>
````

## File: public/assets/icons/weather/09d.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" role="img"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#ffffff"/>
          <line x1="8" y1="19" x2="8" y2="21" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="19" x2="12" y2="21" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <line x1="16" y1="19" x2="16" y2="21" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/></svg>
````

## File: public/assets/icons/weather/09n.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" role="img"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#ffffff"/>
          <line x1="8" y1="19" x2="8" y2="21" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="19" x2="12" y2="21" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <line x1="16" y1="19" x2="16" y2="21" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/></svg>
````

## File: public/assets/icons/weather/10d.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" role="img"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#ffffff"/>
          <line x1="8" y1="19" x2="8" y2="22" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="17" x2="12" y2="22" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <line x1="16" y1="19" x2="16" y2="22" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/></svg>
````

## File: public/assets/icons/weather/10n.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" role="img"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#ffffff"/>
          <line x1="8" y1="19" x2="8" y2="22" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="17" x2="12" y2="22" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <line x1="16" y1="19" x2="16" y2="22" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/></svg>
````

## File: public/assets/icons/weather/11d.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" role="img"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#ffffff"/>
          <polygon points="13,13 10,20 11,15 9,20 12,13" fill="#FFD700" stroke="#ffffff" stroke-width="1"/></svg>
````

## File: public/assets/icons/weather/11n.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" role="img"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#ffffff"/>
          <polygon points="13,13 10,20 11,15 9,20 12,13" fill="#FFD700" stroke="#ffffff" stroke-width="1"/></svg>
````

## File: public/assets/icons/weather/13d.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" role="img"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#ffffff"/>
          <line x1="12" y1="17" x2="12" y2="23" stroke="#ffffff" stroke-width="2"/>
          <line x1="9" y1="20" x2="15" y2="20" stroke="#ffffff" stroke-width="2"/>
          <line x1="10.5" y1="18.5" x2="13.5" y2="21.5" stroke="#ffffff" stroke-width="2"/>
          <line x1="13.5" y1="18.5" x2="10.5" y2="21.5" stroke="#ffffff" stroke-width="2"/></svg>
````

## File: public/assets/icons/weather/13n.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" role="img"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#ffffff"/>
          <line x1="12" y1="17" x2="12" y2="23" stroke="#ffffff" stroke-width="2"/>
          <line x1="9" y1="20" x2="15" y2="20" stroke="#ffffff" stroke-width="2"/>
          <line x1="10.5" y1="18.5" x2="13.5" y2="21.5" stroke="#ffffff" stroke-width="2"/>
          <line x1="13.5" y1="18.5" x2="10.5" y2="21.5" stroke="#ffffff" stroke-width="2"/></svg>
````

## File: public/assets/icons/weather/50d.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" role="img"><line x1="3" y1="9" x2="21" y2="9" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
          <line x1="3" y1="13" x2="21" y2="13" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
          <line x1="3" y1="17" x2="21" y2="17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.7"/></svg>
````

## File: public/assets/icons/weather/50n.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" role="img"><line x1="3" y1="9" x2="21" y2="9" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
          <line x1="3" y1="13" x2="21" y2="13" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
          <line x1="3" y1="17" x2="21" y2="17" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.7"/></svg>
````

## File: public/assets/icons/weather/fallback.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" role="img"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="#ffffff"/></svg>
````

## File: scripts/capture-baseline.ts
````typescript
import { chromium, Browser, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Guardar en carpeta 'screenshots' en la raíz del proyecto
const BASELINE_DIR = path.resolve(__dirname, '../screenshots/baseline');

if (!fs.existsSync(BASELINE_DIR)) {
    fs.mkdirSync(BASELINE_DIR, { recursive: true });
}

async function captureBaseline() {
    console.log('🚀 Launching browser (Playwright)...');
    const browser: Browser = await chromium.launch({ headless: true });

    try {
        const page: Page = await browser.newPage();
        await page.setViewportSize({ width: 1920, height: 1080 });

        console.log('📸 Capturing Weather Page...');
        // Usar puerto 4200 (Angular default)
        await page.goto('http://localhost:4200/', { waitUntil: 'networkidle', timeout: 30000 });

        // Wait for main content
        await page.locator('h1').waitFor({ timeout: 10000 });

        // Full page screenshot
        await page.screenshot({
            path: path.join(BASELINE_DIR, 'baseline-weather-full.png'),
            fullPage: true
        });

        console.log('✅ Weather page captured');

        // Try to navigate to transit page
        try {
            console.log('📸 Attempting to capture Transit Page...');
            await page.goto('http://localhost:4200/transit', { waitUntil: 'networkidle', timeout: 10000 });
            await page.locator('h2').waitFor({ timeout: 5000 });

            await page.screenshot({
                path: path.join(BASELINE_DIR, 'baseline-transit-full.png'),
                fullPage: true
            });

            console.log('✅ Transit page captured');
        } catch (err) {
            console.log('⚠️ Transit page not found or failed to load');
        }

        console.log(`✅ All baseline screenshots captured in: ${BASELINE_DIR}`);

    } catch (error) {
        console.error('❌ Error capturing screenshots:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

captureBaseline();
````

## File: scripts/capture-postrefactor.ts
````typescript
import { chromium, Browser, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Guardar en misma carpeta base para comparar
const BASELINE_DIR = path.resolve(__dirname, '../screenshots/baseline');

if (!fs.existsSync(BASELINE_DIR)) {
    fs.mkdirSync(BASELINE_DIR, { recursive: true });
}

async function capturePostRefactor() {
    console.log('🚀 Launching browser (Playwright) for POST-REFACTOR...');
    const browser: Browser = await chromium.launch({ headless: true });

    try {
        const page: Page = await browser.newPage();
        await page.setViewportSize({ width: 1920, height: 1080 });

        console.log('📸 Capturing Post-Refactor Weather Page...');
        await page.goto('http://localhost:4200/', { waitUntil: 'networkidle', timeout: 30000 });

        // Wait for main content
        await page.locator('h1').waitFor({ timeout: 10000 });

        // Full page screenshot
        await page.screenshot({
            path: path.join(BASELINE_DIR, 'postrefactor-weather-full.png'),
            fullPage: true
        });

        console.log('✅ Post-refactor weather page captured');

        // Try to navigate to transit page if it exists
        try {
            console.log('📸 Attempting to capture Post-Refactor Transit Page...');
            await page.goto('http://localhost:4200/transit', { waitUntil: 'networkidle', timeout: 10000 });
            await page.locator('h2').waitFor({ timeout: 5000 });

            await page.screenshot({
                path: path.join(BASELINE_DIR, 'postrefactor-transit-full.png'),
                fullPage: true
            });

            console.log('✅ Post-refactor transit page captured');
        } catch (err) {
            console.log('⚠️ Transit page not found or failed to load');
        }

        console.log('✅ All post-refactor screenshots captured successfully!');
        console.log('');
        console.log('🔍 VERIFICATION:');
        console.log(`  Directory: ${BASELINE_DIR}`);
        console.log('  - Baseline: baseline-weather-full.png, baseline-transit-full.png');
        console.log('  - Post-refactor: postrefactor-weather-full.png, postrefactor-transit-full.png');
        console.log('');
        console.log('Compare these images to verify no visual changes occurred.');

    } catch (error) {
        console.error('❌ Error capturing screenshots:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

capturePostRefactor();
````

## File: scripts/generate-icons.js
````javascript
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/assets/icons/weather');

const WEATHER_ICONS = {
  '01d': {
    svg: `<circle cx="12" cy="12" r="5" fill="currentColor"/>
          <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    viewBox: '0 0 24 24'
  },
  '01n': {
    svg: `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>`,
    viewBox: '0 0 24 24'
  },
  '02d': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor" opacity="0.9"/>
          <circle cx="18" cy="4" r="3" fill="currentColor" opacity="0.6"/>`,
    viewBox: '0 0 24 24'
  },
  '02n': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor" opacity="0.9"/>
          <path d="M16 5.79A4 4 0 1 1 12.21 2 3 3 0 0 0 16 5.79z" fill="currentColor" opacity="0.6"/>`,
    viewBox: '0 0 24 24'
  },
  '03d': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>`,
    viewBox: '0 0 24 24'
  },
  '03n': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>`,
    viewBox: '0 0 24 24'
  },
  '04d': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>
          <path d="M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="currentColor" opacity="0.7"/>`,
    viewBox: '0 0 24 24'
  },
  '04n': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>
          <path d="M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="currentColor" opacity="0.7"/>`,
    viewBox: '0 0 24 24'
  },
  '09d': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>
          <line x1="8" y1="19" x2="8" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="19" x2="12" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="16" y1="19" x2="16" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    viewBox: '0 0 24 24'
  },
  '09n': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>
          <line x1="8" y1="19" x2="8" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="19" x2="12" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="16" y1="19" x2="16" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    viewBox: '0 0 24 24'
  },
  '10d': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>
          <line x1="8" y1="19" x2="8" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="17" x2="12" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="16" y1="19" x2="16" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    viewBox: '0 0 24 24'
  },
  '10n': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>
          <line x1="8" y1="19" x2="8" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="17" x2="12" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="16" y1="19" x2="16" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
    viewBox: '0 0 24 24'
  },
  '11d': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>
          <polygon points="13,13 10,20 11,15 9,20 12,13" fill="#FFD700" stroke="currentColor" stroke-width="1"/>`,
    viewBox: '0 0 24 24'
  },
  '11n': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>
          <polygon points="13,13 10,20 11,15 9,20 12,13" fill="#FFD700" stroke="currentColor" stroke-width="1"/>`,
    viewBox: '0 0 24 24'
  },
  '13d': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>
          <line x1="12" y1="17" x2="12" y2="23" stroke="currentColor" stroke-width="2"/>
          <line x1="9" y1="20" x2="15" y2="20" stroke="currentColor" stroke-width="2"/>
          <line x1="10.5" y1="18.5" x2="13.5" y2="21.5" stroke="currentColor" stroke-width="2"/>
          <line x1="13.5" y1="18.5" x2="10.5" y2="21.5" stroke="currentColor" stroke-width="2"/>`,
    viewBox: '0 0 24 24'
  },
  '13n': {
    svg: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="currentColor"/>
          <line x1="12" y1="17" x2="12" y2="23" stroke="currentColor" stroke-width="2"/>
          <line x1="9" y1="20" x2="15" y2="20" stroke="currentColor" stroke-width="2"/>
          <line x1="10.5" y1="18.5" x2="13.5" y2="21.5" stroke="currentColor" stroke-width="2"/>
          <line x1="13.5" y1="18.5" x2="10.5" y2="21.5" stroke="currentColor" stroke-width="2"/>`,
    viewBox: '0 0 24 24'
  },
  '50d': {
    svg: `<line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
          <line x1="3" y1="13" x2="21" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
          <line x1="3" y1="17" x2="21" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.7"/>`,
    viewBox: '0 0 24 24'
  },
  '50n': {
    svg: `<line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
          <line x1="3" y1="13" x2="21" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
          <line x1="3" y1="17" x2="21" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.7"/>`,
    viewBox: '0 0 24 24'
  }
};

// Ensure directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generate fallback using 03d
const fallbackData = WEATHER_ICONS['03d'];
const fallbackSvg = fallbackData.svg.replace(/currentColor/g, '#ffffff');
const fallbackContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${fallbackData.viewBox}" fill="none" role="img">${fallbackSvg}</svg>`;
fs.writeFileSync(path.join(OUTPUT_DIR, 'fallback.svg'), fallbackContent);
console.log('Created fallback.svg');

// Generate all others
Object.entries(WEATHER_ICONS).forEach(([code, data]) => {
  const fileName = `${code}.svg`;
  // Replace currentColor with #ffffff for external IMG usage
  const svgContent = data.svg.replace(/currentColor/g, '#ffffff');
  const content = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${data.viewBox}" fill="none" role="img">${svgContent}</svg>`;
  fs.writeFileSync(path.join(OUTPUT_DIR, fileName), content);
  console.log(`Created ${fileName}`);
});
````

## File: scripts/package.json
````json
{
  "type": "module"
}
````

## File: scripts/tsconfig.json
````json
{
    "extends": "../tsconfig.json",
    "compilerOptions": {
        "outDir": "../dist/scripts",
        "module": "nodenext",
        "moduleResolution": "nodenext",
        "target": "es2022",
        "types": [
            "node"
        ],
        "lib": [
            "es2022",
            "dom"
        ]
    },
    "include": [
        "**/*.ts"
    ]
}
````

## File: scripts/verify-weather-icons.ts
````typescript
import { chromium, Browser, Page } from '@playwright/test';
import * as fs from 'fs';

const CITIES = [
    { name: 'Dubai', expected: 'Clear' },
    { name: 'London', expected: 'Clouds' },
    { name: 'Yakutsk', expected: 'Snow' },
    { name: 'Singapore', expected: 'Thunderstorm' },
    { name: 'San Francisco', expected: 'Mist/Fog' },
    { name: 'Hilo', expected: 'Rain' },
    { name: 'Bergen', expected: 'Drizzle/Rain' },
    { name: 'Cairo', expected: 'Clear' },
    { name: 'Tokyo', expected: 'Clouds' },
    { name: 'Sydney', expected: 'Variable' }
];

const LOG_FILE = 'verification_results.txt';

const log = (msg: string) => {
    console.log(msg);
    fs.appendFileSync(LOG_FILE, msg + '\n');
};

(async () => {
    const browser: Browser = await chromium.launch({ headless: true });
    const page: Page = await browser.newPage();

    // reset file
    fs.writeFileSync(LOG_FILE, '');

    try {
        log('Navigating to localhost:4200...');
        // Usamos puerto 4200 (Angular default) en lugar de 4300 del script viejo
        await page.goto('http://localhost:4200', { waitUntil: 'networkidle' });

        log('\n--- Weather Icon Verification Results ---');
        log('City'.padEnd(15) + 'Src'.padEnd(35) + 'Alt'.padEnd(30) + 'Priority');
        log('-'.repeat(90));

        for (const city of CITIES) {
            console.log(`Testing ${city.name}...`);

            // Find input - Playwright usa locators, mas robusto
            const input = page.locator('input[placeholder="Search city..."]');
            await input.waitFor({ state: 'visible' });

            // Clear input
            await input.click();
            await input.fill('');

            // Type city
            await input.fill(city.name);
            await input.press('Enter');

            // Wait for weather icon to update
            try {
                // Wait up to 10s using locator
                const iconLocator = page.locator('.weather-icon img');
                await iconLocator.waitFor({ state: 'visible', timeout: 10000 });

                // Small delay to ensure render updates if animation is occurring
                await page.waitForTimeout(1000);

                const src = await iconLocator.getAttribute('src');
                const alt = await iconLocator.getAttribute('alt');
                const priority = await iconLocator.getAttribute('fetchpriority');

                const cleanSrc = src ? src.split('/').slice(-4).join('/') : 'null';

                log(
                    city.name.padEnd(15) +
                    cleanSrc.padEnd(35) +
                    (alt || 'null').substring(0, 28).padEnd(30) +
                    (priority || 'null')
                );

            } catch (e: any) {
                log(city.name.padEnd(15) + 'ERROR: Icon not found (Timeout/Error: ' + e.message + ')'.padEnd(35));
            }

            // Rate limit prevention delay
            await page.waitForTimeout(2000);
        }
        log('-'.repeat(90));

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await browser.close();
    }
})();
````

## File: src/app/core/api/api.tokens.ts
````typescript
import { InjectionToken } from '@angular/core';

export const OPENWEATHER_BASE_URL = new InjectionToken<string>('OPENWEATHER_BASE_URL');
export const OPENWEATHER_API_KEY = new InjectionToken<string>('OPENWEATHER_API_KEY');
````

## File: src/app/core/api/http-error-interceptor.spec.ts
````typescript
import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { httpErrorInterceptor } from './http-error-interceptor';

describe('httpErrorInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => httpErrorInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
````

## File: src/app/core/api/http-error-interceptor.ts
````typescript
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { mapHttpError } from '../error/error-mapper';
import { NotFoundError, RateLimitedError, UnauthorizedError } from '../error/domain-errors';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: unknown) => {
      const mappedError = mapHttpError(error);

      // Notification Logic
      if (mappedError instanceof NotFoundError) {
        messageService.add({
          severity: 'error',
          summary: 'Not Found',
          detail: 'The requested city or resource could not be found.',
          life: 5000
        });
      } else if (mappedError instanceof RateLimitedError) {
        messageService.add({
          severity: 'warn',
          summary: 'Too Many Requests',
          detail: `Please wait ${mappedError.retryAfterSeconds} seconds before retrying.`,
          life: 5000
        });
      } else if (mappedError instanceof UnauthorizedError) {
        messageService.add({
          severity: 'error',
          summary: 'Unauthorized',
          detail: 'Please check your API key or login credentials.',
          life: 5000
        });
      } else {
        // Generic catch-all
        messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: mappedError.message || 'An unexpected error occurred.',
          life: 5000
        });
      }

      // We throw the mapped error so the consumer (Service/Resource) receives a clean DomainError
      return throwError(() => mappedError);
    })
  );
};
````

## File: src/app/core/api/openweather.client.ts
````typescript
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } from './api.tokens';
import { CurrentWeatherResponse, ForecastResponse } from './openweather.types';

@Injectable({
    providedIn: 'root'
})
export class OpenWeatherClient {
    private http = inject(HttpClient);
    private baseUrl = inject(OPENWEATHER_BASE_URL);
    private apiKey = inject(OPENWEATHER_API_KEY);

    /**
     * Get current weather by city name.
     * Path: /weather
     * Params: q={cityName}, appid={apiKey}, units=metric
     */
    getCurrentByCityName(cityName: string): Observable<CurrentWeatherResponse> {
        const params = new HttpParams()
            .set('q', cityName)
            .set('appid', this.apiKey)
            .set('units', 'metric');

        return this.http.get<CurrentWeatherResponse>(`${this.baseUrl}/weather`, { params });
    }

    /**
     * Get 5 day / 3 hour forecast by city name.
     * Path: /forecast
     * Params: q={cityName}, appid={apiKey}, units=metric
     */
    getForecastByCityName(cityName: string): Observable<ForecastResponse> {
        const params = new HttpParams()
            .set('q', cityName)
            .set('appid', this.apiKey)
            .set('units', 'metric');

        return this.http.get<ForecastResponse>(`${this.baseUrl}/forecast`, { params });
    }
}
````

## File: src/app/core/api/openweather.types.ts
````typescript
// DTOs for OpenWeatherMap API
// Based on https://openweathermap.org/current
// TODO: Confirm exact fields with API response/docs

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface MainWeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface CurrentWeatherResponse {
    coord: {
        lon: number;
        lat: number;
    };
    weather: WeatherCondition[];
    base: string;
    main: MainWeatherData;
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust?: number; // Added
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface ForecastItem {
    dt: number;
    main: MainWeatherData;
    weather: WeatherCondition[];
    clouds: { all: number };
    wind: { speed: number; deg: number };
    visibility: number;
    pop: number; // Probability of precipitation
    dt_txt: string;
}

export interface ForecastResponse {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastItem[];
    city: {
        id: number;
        name: string;
        coord: { lat: number; lon: number };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
}
````

## File: src/app/core/error/domain-errors.ts
````typescript
export interface DomainError {
    name: string;
    message: string;
    status?: number;
    retryAfterSeconds?: number;
}

export class AppError implements DomainError {
    name = 'AppError';
    constructor(public message: string, public status?: number) { }
}

export class UnauthorizedError extends AppError {
    override name = 'UnauthorizedError';
    constructor(message = 'Unauthorized access. Please check your API key.') {
        super(message, 401);
    }
}

export class NotFoundError extends AppError {
    override name = 'NotFoundError';
    constructor(resource: string) {
        super(`${resource} not found.`, 404);
    }
}

export class RateLimitedError extends AppError {
    override name = 'RateLimitedError';
    constructor(public retryAfterSeconds = 60) {
        super(`Too many requests. Please try again in ${retryAfterSeconds} seconds.`, 429);
    }
}

export class NetworkError extends AppError {
    override name = 'NetworkError';
    constructor(message = 'Network unavailable. Please check your connection.') {
        super(message, 0);
    }
}


export class UpstreamError extends AppError {
    override name = 'UpstreamError';
    constructor(message = 'External service error. Please try again later.', status?: number) {
        super(message, status);
    }
}

export class UnknownError extends AppError {
    override name = 'UnknownError';
    constructor(message = 'An unexpected error occurred', public cause?: unknown) {
        super(message);
    }
}
````

## File: src/app/core/error/error-mapper.ts
````typescript
import { HttpErrorResponse } from '@angular/common/http';
import {
    DomainError,
    NetworkError,
    NotFoundError,
    RateLimitedError,
    UnauthorizedError,
    UpstreamError
} from './domain-errors';

export function mapHttpError(err: unknown): DomainError {
    if (err instanceof HttpErrorResponse) {
        switch (err.status) {
            case 401:
                return new UnauthorizedError();
            case 404:
                return new NotFoundError('Resource');
            case 429:
                const retryAfter = err.headers ? parseInt(err.headers.get('Retry-After') || '60', 10) : 60;
                return new RateLimitedError(retryAfter);
            case 0:
                return new NetworkError();
            default:
                if (err.status >= 500) {
                    return new UpstreamError(err.message, err.status);
                }
                return new UpstreamError(`Unexpected error: ${err.message}`, err.status);
        }
    }

    return new UpstreamError(err instanceof Error ? err.message : 'Unknown error');
}
````

## File: src/app/core/interceptors/rate-limit.interceptor.ts
````typescript
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

/**
 * Interceptor para manejar errores de Rate Limiting (429) y Service Unavailable (503).
 * Muestra un mensaje amigable al usuario cuando se alcanza el límite de la API gratuita.
 */
export const rateLimitInterceptor: HttpInterceptorFn = (req, next) => {
    const messageService = inject(MessageService);

    return next(req).pipe(
        catchError((error: unknown) => {
            if (error instanceof HttpErrorResponse) {
                // 429: Too Many Requests
                // 503: Service Unavailable (a veces usado por APIs cuando están saturadas/bloqueadas)
                if (error.status === 429 || error.status === 503) {
                    messageService.add({
                        severity: 'warn',
                        summary: 'Límite de API alcanzado',
                        detail: 'El límite de la API gratuita se ha alcanzado. Por favor, intenta de nuevo en un minuto.',
                        life: 5000,
                        icon: 'pi pi-exclamation-triangle'
                    });
                }
            }
            // Re-throw the error so downstream handlers (or other interceptors) can also process it if needed
            return throwError(() => error);
        })
    );
};
````

## File: src/app/core/rx/operators.ts
````typescript
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NetworkError, RateLimitedError, UnknownError } from '../error/domain-errors';

/**
 * Retries the observable execution with exponential backoff for NetworkErrors
 * and respects 'Retry-After' logic for RateLimitedErrors.
 */
export function safeRetry<T>(maxRetries: number = 2) {
    return (source: Observable<T>): Observable<T> => {
        return source.pipe(
            retry({
                count: maxRetries,
                delay: (error, retryCount) => {
                    if (error instanceof RateLimitedError) {
                        const waitTimeMs = (error.retryAfterSeconds || 1) * 1000;
                        return timer(waitTimeMs);
                    }
                    if (error instanceof NetworkError) {
                        // Exponential backoff: 500ms, 1000ms, 2000ms...
                        const waitTimeMs = 500 * Math.pow(2, retryCount - 1);
                        return timer(waitTimeMs);
                    }
                    // Don't retry for other errors (e.g., 404, 401)
                    return throwError(() => error);
                }
            })
        );
    };
}

/**
 * Catches errors and ensures they are wrapped in Domain classes.
 * logs parameters for debugging.
 */
export function handleDomainError<T>(debugContext: string) {
    return (source: Observable<T>): Observable<T> => {
        return source.pipe(
            catchError(err => {
                console.error(`[${debugContext}] Stream Error:`, err);
                // If it's already a domain error, rethrow it
                if (err instanceof NetworkError || err instanceof RateLimitedError || err instanceof UnknownError) {
                    return throwError(() => err);
                }
                // Otherwise, wrap it
                return throwError(() => new UnknownError('An unexpected error occurred', err));
            })
        );
    };
}
````

## File: src/app/features/transit/components/transit-dashboard/transit-dashboard.component.ts
````typescript
import { ChangeDetectionStrategy, Component, inject, linkedSignal, effect, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransitService } from '../../data-access/transit.service';
import { WeatherService } from '../../../weather/data-access/weather.service';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { NgOptimizedImage } from '@angular/common'; // Import CommonModule and NgOptimizedImage
import { TransitType, TransitStatus } from '../../models/transit.model';

@Component({
  selector: 'app-transit-dashboard',
  imports: [FormsModule, SelectButtonModule, TagModule, CardModule, SkeletonModule, ButtonModule, NgOptimizedImage, PaginatorModule], // Added PaginatorModule
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="p-4" aria-label="Transit Dashboard">
      <header class="flex flex-column gap-2 mb-4">
        <div class="flex justify-content-between align-items-center">
            <h2 class="text-3xl font-bold text-900 m-0 flex align-items-center gap-2">
                Transit Status 
                <span class="text-sm bg-red-500 text-white px-2 py-1 border-round animate-pulse">LIVE</span>
            </h2>
            <button pButton icon="pi pi-refresh" (click)="service.reload()" [loading]="service.transitResource.isLoading()" label="Refresh" class="p-button-rounded p-button-text"></button>
        </div>
        
        <div class="flex align-items-center gap-4 text-600">
            <!-- City Info -->
            <div class="flex align-items-center gap-2">
                <i class="pi pi-map-marker text-xl text-primary"></i>
                <span class="text-xl font-medium">{{ service.currentCity() }}</span>
            </div>

            <!-- Weather Info (Lightweight) -->
            @if (weatherService.weatherResource.value(); as weather) {
                <div class="flex align-items-center gap-2 weather-chip pl-3 border-left-2 border-300">
                    <div class="flex align-items-center relative" style="width: 32px; height: 32px;">
                       @if(weather.icon) {
                            <img [ngSrc]="'https://openweathermap.org/img/wn/' + weather.icon + '@2x.png'" 
                                 width="32" height="32" 
                                 alt="Weather"
                                 priority>
                       }
                    </div>
                    <span class="text-xl font-bold text-900">{{ weather.tempC }}°C</span>
                    <span class="text-sm capitalize hidden sm:inline">{{ weather.description }}</span>
                </div>
            }
        </div>
      </header>

      <!-- Filters -->
      <nav class="flex justify-content-center mb-5" aria-label="Filter transit by type">
        <p-selectButton 
          [options]="filterOptions" 
          optionLabel="label" 
          optionValue="value"
          [(ngModel)]="currentFilter"
          (ngModelChange)="onFilterChange($event)">
        </p-selectButton>
      </nav>

      <!-- Loading State -->
      @if (service.transitResource.isLoading()) {
        <div class="grid">
          @for (i of [1,2,3,4]; track i) {
            <div class="col-12 md:col-6 lg:col-4">
              <p-skeleton height="7rem" styleClass="mb-2"></p-skeleton>
            </div>
          }
        </div>
      } 
      
      <!-- List -->
      @else {
        <div class="grid">
            @for (line of paginatedLines(); track line.id) {
                <article class="col-12 md:col-6 lg:col-4">
                    <p-card styleClass="transit-card h-full surface-card shadow-2">
                        <div class="flex justify-content-between align-items-start mb-3">
                            <div class="flex align-items-center gap-2">
                                <i [class]="getTypeIcon(line.type)" class="text-xl"></i>
                                <span class="font-bold text-xl">{{ line.name }}</span>
                            </div>
                            <p-tag [value]="line.status" [severity]="getStatusSeverity(line.status)"></p-tag>
                        </div>
                        
                        <div class="flex justify-content-between align-items-end">
                             <div class="text-600">
                                <span class="block text-sm">Destination</span>
                                <span class="font-semibold">{{ line.destination }}</span>
                                <div class="mt-2 flex gap-1">
                                    <p-tag [value]="line.dataSource" severity="secondary" styleClass="text-xs"></p-tag>
                                    @if(line.agencyId) {
                                        <p-tag [value]="line.agencyId" severity="info" styleClass="text-xs"></p-tag>
                                    }
                                </div>
                             </div>
                             
                             <div class="text-right">
                                @if (line.status === 'CLOSED') {
                                    <span class="text-red-500 font-bold">CLOSED</span>
                                } @else {
                                    <span class="text-sm text-500">Arrives in</span>
                                    <div class="text-2xl font-bold text-primary">{{ line.nextArrival }} min</div>
                                }
                             </div>
                        </div>
                    </p-card>
                </article>
            } @empty {
                <div class="col-12 text-center py-5">
                    <p class="text-xl text-500">No transit lines found for this filter.</p>
                </div>
            }
        </div>

        @if (service.filteredLines().length > 0) {
            <div class="mt-4">
                <p-paginator 
                    (onPageChange)="onPageChange($event)" 
                    [first]="first()" 
                    [rows]="rows()" 
                    [totalRecords]="service.filteredLines().length" 
                    [rowsPerPageOptions]="[6, 12, 24]">
                </p-paginator>
            </div>
        }
      }
    </section>
  `,
  styles: [`
    :host { display: block; }
    .transit-card {
        border-left: 5px solid var(--primary-color);
    }
    /* Grid Helpers since we might not have full PrimeFlex */
    .grid { display: flex; flex-wrap: wrap; margin-left: -0.5rem; margin-right: -0.5rem; }
    .col-12 { box-sizing: border-box; flex: 0 0 auto; padding: 0.5rem; width: 100%; }
    @media (min-width: 768px) {
        .md\\:col-6 { width: 50%; }
    }
    @media (min-width: 992px) {
        .lg\\:col-4 { width: 33.3333%; }
    }
  `]
})
export class TransitDashboardComponent {
  public service = inject(TransitService);
  public weatherService = inject(WeatherService);

  // Pagination State
  first = signal(0);
  rows = signal(12);

  // LinkedSignal for bidirectional sync with service filter
  currentFilter = linkedSignal(() => this.service.filter());

  // Derived state for pagination
  paginatedLines = computed(() => {
    const lines = this.service.filteredLines();
    const start = this.first();
    const end = start + this.rows();
    return lines.slice(start, end);
  });

  filterOptions = [
    { label: 'All', value: 'ALL' },
    { label: 'Bike', value: 'BIKE' }
  ];

  constructor() {
    // Sync Transit City -> Weather Service
    effect(() => {
      const city = this.service.currentCity();
      // Avoid "Unknown City" or empty string triggering bad API calls
      if (city && city !== 'Unknown City') {
        this.weatherService.search(city);
      }
    });
  }

  onFilterChange(value: 'ALL' | TransitType) {
    this.service.setFilter(value);
    // Reset pagination to first page when filter changes
    this.first.set(0);
  }

  onPageChange(event: any) {
    this.first.set(event.first);
    this.rows.set(event.rows);
  }

  getStatusSeverity(status: TransitStatus): "success" | "warn" | "danger" | "info" | "secondary" | "contrast" | undefined {
    switch (status) {
      case 'ON_TIME': return 'success';
      case 'DELAYED': return 'warn';
      case 'CLOSED': return 'danger';
      default: return 'info';
    }
  }

  getTypeIcon(type: TransitType): string {
    switch (type) {
      case 'BIKE': return 'pi pi-compass';
      default: return 'pi pi-map-marker';
    }
  }
}
````

## File: src/app/features/transit/data-access/transit.service.ts
````typescript
import { Injectable, signal, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TransitLine, TransitType } from '../models/transit.model';

@Injectable({
    providedIn: 'root'
})
export class TransitService {
    private http = inject(HttpClient);

    // Signal for filtering
    readonly filter = signal<'ALL' | TransitType>('ALL');

    // Signal for current city
    readonly currentCity = signal<string>('Unknown City');

    // Resource API using rxResource
    // logic: Only fetch Real Data (CityBikes) - Fetched once on load (or manual reload)
    readonly transitResource = rxResource({
        stream: () => {
            return this.fetchCityBikesData().pipe(
                catchError(err => {
                    console.error('CityBikes API failed', err);
                    return of([]); // Return empty array on error, NO simulation
                })
            );
        }
    });

    // Computed signal for filtered lines
    readonly filteredLines = computed(() => {
        const allLines = this.transitResource.value() || [];
        const currentFilter = this.filter();

        if (currentFilter === 'ALL') {
            return allLines;
        }
        return allLines.filter(line => line.type === currentFilter);
    });

    // Actions
    reload() {
        this.transitResource.reload();
    }

    setFilter(filter: 'ALL' | TransitType) {
        this.filter.set(filter);
    }

    /**
     * Fetches real bike-sharing station data from CityBikes API.
     * URL: https://api.citybik.es/v2/networks/bicimad (Madrid BiciMad network)
     * This API is CORS-enabled and works from browser environments.
     */
    private fetchCityBikesData() {
        return this.http.get<any>('https://api.citybik.es/v2/networks/bicimad').pipe(
            map(response => {
                // Extract City Name
                const city = response.network?.location?.city;
                if (city) {
                    this.currentCity.set(city);
                }

                const stations = response.network?.stations || [];

                const lines: TransitLine[] = stations.map((station: any) => {
                    const freeBikes = station.free_bikes || 0;
                    const emptySlots = station.empty_slots || 0;
                    const isAvailable = freeBikes > 0;

                    return {
                        id: `CITYBIKES-${station.id}`,
                        name: station.name,
                        type: 'BIKE',
                        status: isAvailable ? 'ON_TIME' : 'CLOSED',
                        nextArrival: freeBikes, // Using free_bikes as "bikes available"
                        destination: `${freeBikes} bikes, ${emptySlots} slots`,
                        agencyId: 'BICIMAD',
                        dataSource: 'CITYBIKES',
                        alertLevel: freeBikes === 0 ? 'WARNING' : 'NORMAL'
                    } as TransitLine;
                });

                return lines;
            })
        );
    }
}
````

## File: src/app/features/transit/models/transit.model.ts
````typescript
export type TransitType = 'METRO' | 'BUS' | 'BIKE';
export type TransitStatus = 'ON_TIME' | 'DELAYED' | 'CLOSED';

export interface TransitLine {
    id: string;
    name: string;
    type: TransitType;
    status: TransitStatus;
    nextArrival: number; // minutes
    destination: string;
    // Open Data Extras
    agencyId?: string; // e.g., 'DGT-MAD-01'
    alertLevel?: 'NORMAL' | 'WARNING' | 'SEVERE';
    dataSource?: string;
}
````

## File: src/app/features/weather/components/forecast-widget/forecast-widget.component.ts
````typescript
import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ForecastList } from '../../models/forecast.model';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { WeatherIconComponent } from '../../../../shared/components/weather-icon.component';

@Component({
  selector: 'app-forecast-widget',
  standalone: true,
  imports: [DatePipe, CardModule, SkeletonModule, WeatherIconComponent],
  template: `
    <section class="forecast-widget animate-slideUp" aria-label="5-Day Forecast">
      <div class="glass-card p-4">
        <h3 class="forecast-header">5-Day Forecast</h3>
        
         @if (isLoading()) {
            <div role="status" aria-live="polite" class="forecast-grid">
               @for (i of [1,2,3,4,5]; track i) {
                 <div class="forecast-card glass-card-strong">
                    <p-skeleton width="60%" height="1.5rem" styleClass="mb-2"></p-skeleton>
                    <p-skeleton width="80%" shape="circle" size="4rem" styleClass="mb-2"></p-skeleton>
                    <p-skeleton width="50%" height="2rem"></p-skeleton>
                 </div>
               }
               <span class="sr-only">Cargando pronóstico extendido de 5 días...</span>
            </div>
         } @else {
             @if (!forecasts() || forecasts()?.length === 0) {
                <div class="text-center p-4">
                    <span class="text-white" style="opacity: 0.8;">No forecast data available.</span>
                </div>
            } @else {
               <div class="forecast-grid">
                  @for (day of forecasts(); track day.date) {
                    <article class="forecast-card glass-card-strong" data-testid="forecast-card">
                       <div class="forecast-day">{{ day.date | date:'EEE' }}</div>
                       <div class="forecast-date">{{ day.date | date:'dd/MM' }}</div>
                       <app-weather-icon 
                         [code]="day.icon!"
                         [size]="64"
                         class="forecast-icon">
                       </app-weather-icon>
                       <div class="forecast-temps">
                          <span class="temp-max">{{ day.tempMax }}°</span>
                          <span class="temp-min">{{ day.tempMin }}°</span>
                       </div>
                    </article>
                  }
               </div>
            }
        }
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      margin-top: 1.5rem;
    }

    .forecast-header {
      color: white;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 1.5rem 0;
      text-align: center;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .forecast-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 1rem;
    }

    .forecast-card {
      padding: 1.25rem;
      text-align: center;
      cursor: pointer;
      position: relative;
    }

    .forecast-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--glass-shadow-hover);
    }

    .forecast-card-skeleton {
      min-height: 8rem;
    }

    .forecast-day {
      font-weight: 700;
      font-size: 1.1rem;
      color: white;
      margin-bottom: 0.25rem;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    }

    .forecast-date {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 0.75rem;
      text-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
    }

    .forecast-icon {
      width: 64px;
      height: 64px;
      margin: 0.5rem auto;
      filter: drop-shadow(0 3px 10px rgba(0, 0, 0, 0.4));
    }

    .forecast-temps {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin-top: 0.75rem;
    }

    .temp-max {
      font-weight: 700;
      font-size: 1.5rem;
      color: white;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    }

    .temp-min {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.85);
      text-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
    }

    /* Mobile: Horizontal Scroll */
    @media (max-width: 768px) {
      .forecast-grid {
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        gap: 0.75rem;
        padding-bottom: 0.5rem;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
      }

      .forecast-card {
        flex: 0 0 140px;
        scroll-snap-align: start;
      }

      /* Hide scrollbar but keep functionality */
      .forecast-grid::-webkit-scrollbar {
        height: 4px;
      }

      .forecast-grid::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
      }

      .forecast-grid::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 2px;
      }
    }
  `]
})
export class ForecastWidgetComponent {
  forecasts = input.required<ForecastList | undefined>();
  isLoading = input<boolean>(false);
}
````

## File: src/app/features/weather/components/weather-widget/weather-widget.component.scss
````scss
@use 'sass:map';

:host {
  display: block;
  width: 100%;
}

.weather-widget {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

/* Floating Search Input */
.search-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.floating-search {
  position: relative;
  width: 100%;
  max-width: 400px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  &:focus-within {
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.5);
  }
}

.search-icon {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin-right: 0.75rem;
}

.search-input {
  border: none !important;
  background: transparent !important;
  color: white !important;
  font-size: 1rem;
  width: 100%;
  padding: 0.5rem 0;
  box-shadow: none !important;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
  }
}

.search-button {
  background: rgba(255, 255, 255, 0.2) !important;
  border: none !important;
  color: white !important;
  width: 2.5rem !important;
  height: 2.5rem !important;
  border-radius: 50% !important;
  padding: 0 !important;
  margin-left: 0.5rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.4) !important;
    transform: translateX(2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  transition: transform 0.3s ease;
}

.glass-card-strong {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
}

.current-weather {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.city-name {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.current-date {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  font-weight: 300;
  text-transform: capitalize;
}

.weather-main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.temp-container {
  position: relative;
}

.temperature {
  font-size: 6rem;
  font-weight: 700;
  line-height: 1;
  text-shadow: 0 4px 12px rgba(0,0,0,0.15);
  background: linear-gradient(to bottom, #ffffff, #e0e0e0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.weather-description {
   font-size: 1.5rem;
   font-weight: 500;
   text-transform: capitalize;
   opacity: 0.9;
   margin-bottom: 2rem;
   text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.weather-details-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  text-align: center;

  i {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    opacity: 0.9;
  }

  .detail-label {
    font-size: 0.875rem;
    opacity: 0.7;
    margin-bottom: 0.25rem;
  }

  .detail-value {
    font-size: 1.125rem;
    font-weight: 600;
  }
}

/* Animation Classes */
.animate-fadeIn {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .temperature {
   font-size: 4.5rem;
  }
  
  .weather-main {
    flex-direction: column;
    gap: 1rem;
  }
  
  .city-name {
   font-size: 1.5rem;
  }

  .weather-description {
    font-size: 1.25rem;
  }
}
````

## File: src/app/features/weather/components/weather-widget/weather-widget.component.ts
````typescript
import { Component, input, output, computed, signal, effect } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { WeatherModel } from '../../models/weather.model';
import { WeatherIconComponent } from '../../../../shared/components/weather-icon.component';


@Component({
  selector: 'app-weather-widget',
  standalone: true,
  imports: [DatePipe, DecimalPipe, FormsModule, CardModule, ButtonModule, InputTextModule, SkeletonModule, WeatherIconComponent],
  template: `
    <section class="weather-widget animate-fadeIn" aria-label="Current Weather">
      <div class="glass-card p-4">
        <!-- Floating Search Bar -->
        <div class="search-container mb-4">
          <div class="floating-search" data-testid="search-input-container">
            <i class="pi pi-search search-icon" aria-hidden="true"></i>
            <input 
              pInputText 
              type="text" 
              class="search-input" 
              data-testid="search-input"
              placeholder="Search city..." 
              aria-label="Buscar ciudad por nombre"
              aria-describedby="search-hint"
              [ngModel]="cityInput()"
              (ngModelChange)="onInputChange($event)"
              (keydown.enter)="onSearch()" />
            <span id="search-hint" class="sr-only">Ingresa el nombre de una ciudad y presiona Enter para buscar</span>
            <button 
              pButton
              class="search-button"
              data-testid="search-button"
              icon="pi pi-arrow-right" 
              aria-label="Buscar clima de la ciudad"
              [disabled]="!cityInput()"
              (click)="onSearch()">
            </button>
          </div>
        </div>

        <!-- State: Idle (No Value & Not Loading) -->
        @if (isIdle()) {
          <div class="text-center p-5 animate-fadeIn">
            <div class="mb-4">
              <i class="pi pi-cloud text-6xl text-white opacity-80"></i>
            </div>
            <p class="text-xl text-white font-light">Enter a city to see the weather</p>
          </div>
        }

        <!-- State: Loading -->
        @if (isLoading()) {
          <div class="flex flex-column align-items-center p-4" data-testid="loading-state">
            <p-skeleton width="100%" height="10rem" class="mb-3"></p-skeleton>
            <p-skeleton width="70%" height="4rem" class="mb-2"></p-skeleton>
            <div class="flex gap-3 mt-4 w-full">
              <p-skeleton width="33%" height="6rem"></p-skeleton>
              <p-skeleton width="33%" height="6rem"></p-skeleton>
              <p-skeleton width="33%" height="6rem"></p-skeleton>
            </div>
             <span class="sr-only">Cargando datos del clima...</span>
          </div>
        }

        <!-- State: Error -->
        @if (error()) {
           <div class="text-center p-4 animate-fadeIn" role="alert" data-testid="error-message">
            <div class="glass-card-strong p-4 border-red-500 border-1">
              <i class="pi pi-exclamation-triangle text-4xl text-red-400 mb-3"></i>
              <p class="text-white text-lg mb-2">Error loading weather</p>
              <p class="text-white opacity-80 mb-4">{{ errorMessage() }}</p>
              <button 
                pButton 
                label="Retry" 
                icon="pi pi-refresh"
                class="p-button-outlined p-button-secondary text-white"
                (click)="onRetry()">
              </button>
            </div>
          </div>
        }

        <!-- State: Success (Data Display) -->
        @if (weather(); as w) {
          <article class="weather-content animate-fadeIn" data-testid="weather-card">
            
            <div class="current-weather">
              <h2 class="city-name">{{ w.city }}</h2>
              <p class="current-date">{{ w.fetchedAt | date:'fullDate' }}</p>

              <div class="weather-main">
                <div class="weather-icon-wrapper">
                   <!-- Usamos NgOptimizedImage via nuestro componente wrapper -->
                   @if (w.icon) {
                     <app-weather-icon 
                        [code]="w.icon" 
                        [size]="120" 
                        [priority]="true" />
                   }
                </div>
                
                <div class="temp-container">
                  <span class="temperature" data-testid="current-temperature">{{ w.tempC | number:'1.0-0' }}°</span>
                </div>
              </div>

               <p class="weather-description" data-testid="weather-description">{{ w.description }}</p>

              <div class="weather-details-grid glass-card-strong">
                <div class="detail-item">
                  <i class="pi pi-percentage"></i>
                  <span class="detail-label">Humidity</span>
                  <span class="detail-value">{{ w.humidity }}%</span>
                </div>
                <div class="detail-item">
                  <i class="pi pi-send"></i> <!-- Wind icon -->
                  <span class="detail-label">Wind</span>
                  <span class="detail-value">{{ w.windSpeed }} m/s</span>
                </div>
                 <div class="detail-item">
                  <i class="pi pi-eye"></i>
                  <span class="detail-label">Visibility</span>
                  <span class="detail-value">{{ w.visibility / 1000 }} km</span>
                </div>
              </div>
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styleUrl: './weather-widget.component.scss'
})
export class WeatherWidgetComponent {
  // Inputs from Resource
  weather = input<WeatherModel | undefined>(undefined);
  isLoading = input<boolean>(false);
  error = input<unknown>(undefined);

  // Outputs
  search = output<string>();
  retry = output<void>();

  // Signal para el input (permite reactivity)
  cityInput = signal<string>('');
  private timeoutId: number | null = null;

  // Computed state helpers
  isIdle = computed(() => !this.weather() && !this.isLoading() && !this.error());

  errorMessage = computed(() => {
    const err = this.error() as any;
    if (!err) return '';
    return err.message || 'Unknown error occurred';
  });

  constructor() {
    // Effect con debounce: busca automáticamente 500ms después de que el usuario deja de escribir
    effect(() => {
      const city = this.cityInput();

      // Limpiar timeout anterior
      if (this.timeoutId !== null) {
        clearTimeout(this.timeoutId);
      }

      // Si el input está vacío, no hacer nada
      if (!city.trim()) return;

      // Debounce de 500ms
      this.timeoutId = window.setTimeout(() => {
        console.log(`[WeatherWidget] Auto-search después de debounce: "${city}"`);
        this.search.emit(city.trim());
      }, 500);
    });
  }

  /**
   * Maneja cambios en el input (para actualizar el signal)
   */
  onInputChange(value: string): void {
    this.cityInput.set(value);
  }

  /**
   * Búsqueda manual (cuando se presiona Enter o botón)
   */
  onSearch() {
    const city = this.cityInput();
    console.log('[WeatherWidget] Manual search called with:', city);

    // Limpiar el debounce en curso
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    if (city.trim()) {
      this.search.emit(city.trim());
    }
  }

  onRetry() {
    this.retry.emit();
  }
}
````

## File: src/app/features/weather/containers/weather-comparison/weather-comparison.component.ts
````typescript
import { Component, inject, resource, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../data-access/weather.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { WeatherIconComponent } from '../../../../shared/components/weather-icon.component';

@Component({
    selector: 'app-weather-comparison',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, TagModule, CardModule, SkeletonModule, WeatherIconComponent],
    template: `
    <section class="p-4" aria-label="Weather Comparison">
      <h2 class="text-3xl font-bold mb-4 text-900 text-center">Multi-City Comparison</h2>
      <p class="text-center text-600 mb-5">Demonstrating RxJS wait-for-all concurrency with Zoneless Signals.</p>

      <!-- Controls -->
      <nav class="flex justify-content-center gap-2 mb-5" aria-label="City presets">
        <p-button 
          label="Capitals" 
          icon="pi pi-globe" 
          aria-label="Comparar climas de ciudades capitales: Londres, Nueva York, Tokio"
          (onClick)="setPreset('capitals')" 
          [outlined]="currentPreset() !== 'capitals'"></p-button>
        <p-button 
          label="USA" 
          icon="pi pi-flag" 
          aria-label="Comparar climas de ciudades estadounidenses: San Francisco, Chicago, Miami"
          (onClick)="setPreset('usa')" 
          [outlined]="currentPreset() !== 'usa'"></p-button>
        <p-button 
          label="Europe" 
          icon="pi pi-map" 
          aria-label="Comparar climas de ciudades europeas: París, Berlín, Madrid"
          (onClick)="setPreset('europe')" 
          [outlined]="currentPreset() !== 'europe'"></p-button>
      </nav>

      <!-- Content -->
      <p-card>
        @if (comparisonResource.isLoading()) {
            <div class="p-4" role="status" aria-live="polite">
                <p-skeleton height="2rem" styleClass="mb-2"></p-skeleton>
                <p-skeleton height="2rem" styleClass="mb-2"></p-skeleton>
                <p-skeleton height="2rem" styleClass="mb-2"></p-skeleton>
                <span class="sr-only">Cargando datos de comparación de múltiples ciudades...</span>
            </div>
        } @else if (comparisonResource.error()) {
            <div class="p-4 text-center text-red-500">
                <i class="pi pi-exclamation-triangle text-4xl mb-2"></i>
                <p>Failed to load comparison data. One or more cities might be invalid or API rate limited.</p>
                <p-button label="Retry" icon="pi pi-refresh" (onClick)="retry()" severity="danger" styleClass="mt-2"></p-button>
            </div>
        } @else {
            <p-table [value]="comparisonResource.value() || []" [tableStyle]="{ 'min-width': '50rem' }">
                <ng-template pTemplate="header">
                    <tr>
                        <th>City</th>
                        <th>Condition</th>
                        <th>Temperature</th>
                        <th>Status</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-item>
                    <tr>
                        <td class="font-bold text-lg">{{ item.city }}</td>
                        <td>
                            <div class="flex align-items-center gap-2">
                                <app-weather-icon 
                                  [code]="item.icon!"
                                  [size]="40"
                                  class="forecast-icon">
                                </app-weather-icon>
                                <span class="capitalize">{{ item.description }}</span>
                            </div>
                        </td>
                        <td>
                            <span class="text-xl font-mono">{{ item.tempC }}°C</span>
                        </td>
                        <td>
                             <p-tag [value]="getTempLabel(item.tempC)" [severity]="getTempSeverity(item.tempC)"></p-tag>
                        </td>
                    </tr>
                </ng-template>
                <ng-template pTemplate="emptymessage">
                    <tr>
                        <td colspan="4">No data available.</td>
                    </tr>
                </ng-template>
            </p-table>
        }
      </p-card>
    </section>
  `
})
export class WeatherComparisonComponent {
    private service = inject(WeatherService);

    // State
    public currentPreset = signal<'capitals' | 'usa' | 'europe'>('capitals');
    public cities = signal<string[]>(['London', 'New York', 'Tokyo']);

    // Resource
    // Resource
    public comparisonResource = resource({
        params: () => ({ cities: this.cities() }),
        loader: async ({ params }) => {
            const cities = params.cities;
            return await this.service.getComparison(cities);
        }
    });

    // Actions
    setPreset(preset: 'capitals' | 'usa' | 'europe') {
        this.currentPreset.set(preset);
        switch (preset) {
            case 'capitals': this.cities.set(['London', 'New York', 'Tokyo']); break;
            case 'usa': this.cities.set(['San Francisco', 'Chicago', 'Miami']); break;
            case 'europe': this.cities.set(['Paris', 'Berlin', 'Madrid']); break;
        }
    }

    retry() {
        this.comparisonResource.reload();
    }

    getTempSeverity(temp: number): "success" | "info" | "warn" | "danger" | undefined {
        if (temp < 10) return 'info'; // Cold
        if (temp > 25) return 'danger'; // Hot
        return 'success'; // Moderate
    }

    getTempLabel(temp: number): string {
        if (temp < 10) return 'Cold';
        if (temp > 25) return 'Hot';
        return 'Moderate';
    }
}
````

## File: src/app/features/weather/containers/weather-page/weather-page.component.html
````html
<main class="weather-container" [class]="weatherBackgroundClass()">
    <h1 class="text-center mb-5 text-3xl font-bold text-white" style="text-shadow: 0 2px 10px rgba(0,0,0,0.2)">
        EcoTransit Explorer</h1>

    <app-weather-widget [weather]="service.weatherResource.value() ?? undefined"
        [isLoading]="service.weatherResource.isLoading()" [error]="service.lastError() ?? service.weatherResource.error()"
        (search)="service.search($event)" (retry)="service.retry()">
    </app-weather-widget>

    @if (service.forecastResource.value()) {
    <div class="mt-4">
        <app-forecast-widget [forecasts]="service.forecastResource.value() ?? undefined">
        </app-forecast-widget>
    </div>
    }


</main>
````

## File: src/app/features/weather/containers/weather-page/weather-page.component.ts
````typescript
import { Component, inject, computed } from '@angular/core';
import { WeatherService } from '../../data-access/weather.service';
import { WeatherWidgetComponent } from '../../components/weather-widget/weather-widget.component';
import { ForecastWidgetComponent } from '../../components/forecast-widget/forecast-widget.component';
import { SkeletonModule } from 'primeng/skeleton';
import { TabsModule } from 'primeng/tabs';
import { SharedModule } from 'primeng/api';

@Component({
  selector: 'app-weather-page',
  standalone: true,
  imports: [
    WeatherWidgetComponent,
    ForecastWidgetComponent,
    SkeletonModule,
    TabsModule,
    SharedModule
  ],
  templateUrl: './weather-page.component.html',
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  `]
})
export class WeatherPageComponent {
  public service = inject(WeatherService);

  /**
   * Computed signal that maps weather description to background gradient class
   */
  weatherBackgroundClass = computed(() => {
    const weather = this.service.weatherResource.value();
    if (!weather) return 'weather-bg-default';

    const desc = weather.description?.toLowerCase() || '';
    if (desc.includes('clear') || desc.includes('sun')) return 'weather-bg-clear';
    if (desc.includes('rain') || desc.includes('drizzle')) return 'weather-bg-rain';
    if (desc.includes('cloud')) return 'weather-bg-clouds';
    if (desc.includes('snow')) return 'weather-bg-snow';
    return 'weather-bg-default';
  });

}
````

## File: src/app/features/weather/containers/weather-page/weather-page.spec.ts
````typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';

import { WeatherPageComponent } from './weather-page.component';
import { WeatherService } from '../../data-access/weather.service';
import { OpenWeatherClient } from '../../../../core/api/openweather.client';
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } from '../../../../core/api/api.tokens';

describe('WeatherPageComponent', () => {
  let component: WeatherPageComponent;
  let fixture: ComponentFixture<WeatherPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherPageComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MessageService,
        WeatherService,
        OpenWeatherClient,
        { provide: OPENWEATHER_BASE_URL, useValue: 'https://api.openweathermap.org/data/2.5' },
        { provide: OPENWEATHER_API_KEY, useValue: 'TEST_KEY' }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WeatherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
````

## File: src/app/features/weather/data-access/weather.service.spec.ts
````typescript
import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { OpenWeatherClient } from '../../../core/api/openweather.client';
import { provideZonelessChangeDetection } from '@angular/core';
import { of } from 'rxjs';
import { CurrentWeatherResponse } from '../../../core/api/openweather.types';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('WeatherService', () => {
  let service: WeatherService;
  let clientSpy: { getCurrentByCityName: any; getForecastByCityName: any };

  beforeEach(() => {
    // Mock Client using Vitest
    clientSpy = {
      getCurrentByCityName: vi.fn(),
      getForecastByCityName: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        WeatherService,
        { provide: OpenWeatherClient, useValue: clientSpy }
      ]
    });

    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getComparison (Concurrency)', () => {
    it('should call client.getCurrentByCityName N times and return mapped models', async () => {
      // Arrange
      const cities = ['London', 'Paris'];

      const mockResponseLondon: Partial<CurrentWeatherResponse> = {
        name: 'London',
        main: { temp: 10, temp_min: 8, temp_max: 12, pressure: 1000, humidity: 80, feels_like: 9 },
        weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
        dt: 1234567890,
        sys: { country: 'GB', sunrise: 0, sunset: 0, id: 1, type: 1 },
        wind: { speed: 5, deg: 100 },
        visibility: 10000
      };

      const mockResponseParis: Partial<CurrentWeatherResponse> = {
        name: 'Paris',
        main: { temp: 15, temp_min: 14, temp_max: 16, pressure: 1010, humidity: 60, feels_like: 14 },
        weather: [{ id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
        dt: 1234567890,
        sys: { country: 'FR', sunrise: 0, sunset: 0, id: 2, type: 1 },
        wind: { speed: 4, deg: 10 },
        visibility: 10000
      };

      // RxJS Mock Returns
      clientSpy.getCurrentByCityName.mockReturnValueOnce(of(mockResponseLondon as CurrentWeatherResponse));
      clientSpy.getCurrentByCityName.mockReturnValueOnce(of(mockResponseParis as CurrentWeatherResponse));

      // Act
      const results = await service.getComparison(cities);

      // Assert
      expect(clientSpy.getCurrentByCityName).toHaveBeenCalledTimes(2);
      expect(clientSpy.getCurrentByCityName).toHaveBeenCalledWith('London');
      expect(clientSpy.getCurrentByCityName).toHaveBeenCalledWith('Paris');

      expect(results.length).toBe(2);
      expect(results[0].city).toBe('London');
      expect(results[0].tempC).toBe(10);
      expect(results[1].city).toBe('Paris');
      expect(results[1].tempC).toBe(15);
    });

    it('should return empty array if no cities provided', async () => {
      const results = await service.getComparison([]);
      expect(results).toEqual([]);
      expect(clientSpy.getCurrentByCityName).not.toHaveBeenCalled();
    });
  });
  describe('search debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should debounce search input by 500ms', async () => {
      // 1. Initial State
      service.search('M');
      vi.advanceTimersByTime(200); // 200ms passed
      expect(clientSpy.getCurrentByCityName).not.toHaveBeenCalled();

      // 2. Type "Ma" (resets timer)
      service.search('Ma');
      vi.advanceTimersByTime(400); // 400ms passed since "Ma" (total 600)
      expect(clientSpy.getCurrentByCityName).not.toHaveBeenCalled();

      // 3. Type "Mad" (resets timer)
      // Provide mock return for the expected call
      clientSpy.getCurrentByCityName.mockReturnValue(of({
        name: 'Mad',
        main: { temp: 20, humidity: 50 },
        weather: [{ description: 'desc', icon: '01d' }],
        wind: { speed: 10 },
        visibility: 10000
      } as any));

      service.search('Mad');
      vi.advanceTimersByTime(500); // 500ms passed since "Mad" -> Should Refire

      // Force change detection / effect execution if needed?
      // In a zoneless/signal world, effects usually run asynchronously or when flushed.
      // rxResource uses an effect. Effects in TestBed might need manual flush or just wait.
      // But vi.advanceTimersByTime handles JS timers.

      // We might need to ensure the effect *scheduler* runs.
      // Angular Signals use microtasks.
      // We can try awaiting a microtask or just checking.

      expect(clientSpy.getCurrentByCityName).toHaveBeenCalledWith('Mad');
      expect(clientSpy.getCurrentByCityName).toHaveBeenCalledTimes(1);
    });
  });
});
````

## File: src/app/features/weather/data-access/weather.service.ts
````typescript
import { Injectable, inject, signal } from '@angular/core';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, of, forkJoin, firstValueFrom } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { OpenWeatherClient } from '../../../core/api/openweather.client';
import { WeatherModel, ForecastList } from '../models/weather.model';
import { safeRetry, handleDomainError } from '../../../core/rx/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private client = inject(OpenWeatherClient);

  // City Signal (Source of truth)
  public city = signal<string>('');
  public lastError = signal<unknown>(null);

  // Debounced Signal (Derived)
  private debouncedCity = toSignal(
    toObservable(this.city).pipe(
      debounceTime(500),
      distinctUntilChanged()
    ),
    { initialValue: '' }
  );

  // --------------------------------------------------------------------------
  // Weather Resource (rxResource)
  // --------------------------------------------------------------------------
  public readonly weatherResource = rxResource({
    params: () => ({ city: this.debouncedCity() }),
    stream: ({ params: request }) => {
      const city = request.city;
      if (!city) return of(null);

      this.lastError.set(null);
      return this.client.getCurrentByCityName(city).pipe(
        safeRetry(2),
        map(response => this.transformToWeather(response)),
        handleDomainError('WeatherResource'),
        catchError(err => {
          this.lastError.set(err);
          return of(null);
        })
      );
    }
  });

  // --------------------------------------------------------------------------
  // Forecast Resource (rxResource)
  // --------------------------------------------------------------------------
  public readonly forecastResource = rxResource({
    params: () => ({ city: this.debouncedCity() }),
    stream: ({ params: request }) => {
      const city = request.city;
      if (!city) return of(null);

      this.lastError.set(null);
      return this.client.getForecastByCityName(city).pipe(
        safeRetry(2),
        // Transform API response to ForecastList
        map(response => this.transformToForecast(response)),
        handleDomainError('ForecastResource'),
        catchError(err => {
          this.lastError.set(err);
          return of(null);
        })
      );
    }
  });

  // --------------------------------------------------------------------------
  // Transformers (Pure Private Functions)
  // --------------------------------------------------------------------------
  private transformToWeather(response: any): WeatherModel {
    return {
      city: response.name,
      tempC: Math.round(response.main.temp),
      description: response.weather[0]?.description,
      icon: response.weather[0]?.icon,
      humidity: response.main.humidity,
      windSpeed: response.wind.speed,
      visibility: response.visibility,
      fetchedAt: Date.now()
    };
  }

  private transformToForecast(response: any): ForecastList {
    const dailyMap = new Map<string, {
      date: Date;
      temps: number[];
      icons: { icon: string; dt: number }[];
      description: string;
    }>();

    for (const item of response.list) {
      const localTimeMs = (item.dt + response.city.timezone) * 1000;
      const localDateObj = new Date(localTimeMs);
      const key = localDateObj.toISOString().split('T')[0];

      if (!dailyMap.has(key)) {
        dailyMap.set(key, {
          date: new Date(item.dt * 1000),
          temps: [],
          icons: [],
          description: item.weather[0]?.description
        });
      }

      const entry = dailyMap.get(key)!;
      entry.temps.push(item.main.temp_min, item.main.temp_max);
      entry.icons.push({
        icon: item.weather[0]?.icon,
        dt: localDateObj.getUTCHours()
      });
    }

    return Array.from(dailyMap.values())
      .slice(0, 5)
      .map(entry => {
        const bestIcon = entry.icons.reduce((prev, curr) => {
          return (Math.abs(curr.dt - 12) < Math.abs(prev.dt - 12)) ? curr : prev;
        });

        return {
          date: entry.date,
          tempMin: Math.round(Math.min(...entry.temps)),
          tempMax: Math.round(Math.max(...entry.temps)),
          icon: bestIcon.icon,
          description: entry.description
        };
      });
  }



  // Actions
  search(city: string): void {
    if (city.trim()) {
      this.lastError.set(null);
      this.city.set(city.trim());
    }
  }

  retry(): void {
    const city = this.city();
    if (city) {
      this.lastError.set(null);
      this.weatherResource.reload();
      this.forecastResource.reload();
    }
  }

  // Comparison Feature
  public async getComparison(cities: string[]): Promise<WeatherModel[]> {
    if (!cities.length) return [];

    const requests$ = forkJoin(
      cities.map(city =>
        this.client.getCurrentByCityName(city).pipe(
          map(response => this.transformToWeather(response)),
          catchError(() => of(null))
        )
      )
    );

    const results = await firstValueFrom(requests$);
    return results.filter((w): w is WeatherModel => w !== null);
  }
}
````

## File: src/app/features/weather/models/forecast.model.ts
````typescript
export interface ForecastDay {
    date: Date;
    tempMin: number;
    tempMax: number;
    icon: string;
    description: string;
}

export type ForecastList = ForecastDay[];
````

## File: src/app/features/weather/models/weather.model.ts
````typescript
export interface WeatherModel {
    city: string;
    tempC: number;
    description?: string;
    icon?: string;
    humidity: number;
    windSpeed: number;
    visibility: number;
    fetchedAt: number;
}

export interface ForecastDay {
    date: Date;
    tempMin: number;
    tempMax: number;
    icon: string;
    description: string;
}

export type ForecastList = ForecastDay[];
````

## File: src/app/features/weather/models/weather.state.ts
````typescript
import { WeatherModel } from './weather.model';

export type WeatherVm =
    | { kind: 'idle' }
    | { kind: 'loading'; city: string }
    | { kind: 'error'; city: string; message: string }
    | { kind: 'data'; city: string; data: WeatherModel };
````

## File: src/app/shared/components/not-found/not-found.component.ts
````typescript
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

/**
 * Componente para página 404 (No Encontrada)
 * 
 * Se muestra cuando el usuario navega a una ruta que no existe.
 * Configurado en app.routes.ts como wildcard route ('**').
 * 
 * Features:
 * - Diseño consistente con PrimeNG
 * - Botón para regresar a Home
 * - Icon de PrimeIcons
 */
@Component({
    selector: 'app-not-found',
    imports: [ButtonModule, CardModule],
    template: `
        <div class="flex align-items-center justify-content-center min-h-screen p-4">
            <p-card styleClass="surface-card shadow-2 border-round-lg max-w-30rem w-full">
                <div class="text-center">
                    <!-- Icon de advertencia -->
                    <i class="pi pi-exclamation-triangle text-6xl text-yellow-500 mb-4 block"></i>
                    
                    <!-- Título 404 -->
                    <h1 class="text-7xl font-bold text-primary mb-2">404</h1>
                    
                    <!-- Subtítulo -->
                    <p class="text-2xl text-color-secondary font-semibold mb-3">
                        Página no encontrada
                    </p>
                    
                    <!-- Descripción -->
                    <p class="text-color-secondary mb-5 line-height-3">
                        Lo sentimos, la ruta que buscas no existe en esta aplicación.
                        Puede que hayas escrito mal la URL o que la página haya sido movida.
                    </p>
                    
                    <!-- Botón de navegación a Home -->
                    <p-button 
                        label="Volver al Inicio" 
                        icon="pi pi-home" 
                        (onClick)="goHome()"
                        severity="primary"
                        size="large"
                    />
                </div>
            </p-card>
        </div>
    `,
    styles: [`
        :host {
            display: block;
            min-height: 100vh;
            background: linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%);
        }
    `]
})
export class NotFoundComponent {
    private router = inject(Router);

    /**
     * Navega a la ruta principal (Home)
     */
    goHome(): void {
        this.router.navigate(['/']);
    }
}
````

## File: src/app/shared/components/weather-icon.component.spec.ts
````typescript
// @vitest-environment jsdom
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherIconComponent } from './weather-icon.component';
import { describe, it, expect, beforeEach } from 'vitest';

describe('WeatherIconComponent', () => {
    let fixture: ComponentFixture<WeatherIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WeatherIconComponent],
            providers: [
                // Mock ImageLoader needed for NgOptimizedImage in tests if no standard loader is set, 
                // but default generic loader usually works. Let's try without first.
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(WeatherIconComponent);
    });

    it('should render an image with correct assets path', () => {
        fixture.componentRef.setInput('code', '01d');
        fixture.detectChanges();
        console.log('DEBUG HTML:', fixture.nativeElement.innerHTML);

        const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
        expect(img).toBeTruthy();
        // NgOptimizedImage transforms src, so we check if it contains the assets path
        expect(img.src).toContain('assets/icons/weather/01d.svg');
        expect(img.alt).toContain('01d');
    });

    it('should use fallback for invalid code', () => {
        fixture.componentRef.setInput('code', 'invalid-code');
        fixture.detectChanges();

        const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
        expect(img.src).toContain('assets/icons/weather/fallback.svg');
    });

    it('should apply priority attribute when set to true', () => {
        fixture.componentRef.setInput('code', '01d');
        fixture.componentRef.setInput('priority', true);
        fixture.detectChanges();

        const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
        // NgOptimizedImage adds fetchpriority="high" to the DOM element
        expect(img.getAttribute('fetchpriority')).toBe('high');
    });
});
````

## File: src/app/shared/components/weather-icon.component.ts
````typescript
import { Component, input, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

export type OWMIconCode = string;

const VALID_CODES = new Set([
  '01d', '01n', '02d', '02n', '03d', '03n', '04d', '04n',
  '09d', '09n', '10d', '10n', '11d', '11n', '13d', '13n', '50d', '50n'
]);

/**
 * Componente standalone que renderiza iconos del clima usando assets locales SVG
 * y NgOptimizedImage para el mejor rendimiento (LCP).
 * 
 * Uso:
 * ```html
 * <app-weather-icon [code]="'01d'" [size]="64" [priority]="true" />
 * ```
 */
@Component({
  selector: 'app-weather-icon',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <img 
      [ngSrc]="iconPath()" 
      [width]="size()" 
      [height]="size()" 
      [priority]="priority()"
      [alt]="ariaLabel()"
      class="weather-icon"
    />
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    
    .weather-icon {
      filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
      transition: transform 0.3s ease;
      display: block; /* Removes bottom spacing for inline images */
    }
    
    .weather-icon:hover {
      transform: scale(1.05);
    }
  `]
})
export class WeatherIconComponent {
  code = input.required<OWMIconCode>();
  size = input<number>(64);
  priority = input<boolean>(false);

  iconPath = computed(() => {
    const code = this.code();
    if (VALID_CODES.has(code)) {
      return `/assets/icons/weather/${code}.svg`;
    }
    return '/assets/icons/weather/fallback.svg';
  });

  ariaLabel = computed(() => {
    // Simple mapping for verification, could be expanded or i18n
    return `Icono de clima: ${this.code()}`;
  });
}
````

## File: src/environments/environment.development.ts
````typescript
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
````

## File: src/environments/environment.example.ts
````typescript
import { Environment } from './environment';

export const environment: Environment = {
    production: false,
    openWeather: {
        baseUrl: 'https://api.openweathermap.org/data/2.5',
        apiKey: 'YOUR_API_KEY_HERE'
    }
};
````

## File: src/environments/environment.local.example.ts
````typescript
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
````

## File: src/environments/environment.prod.ts
````typescript
/**
 * Environment configuration for PRODUCTION builds.
 * 
 * Este archivo se usa cuando ejecutas: ng build --configuration production
 * El placeholder __OPENWEATHER_API_KEY__ será reemplazado por GitHub Actions
 * con el valor real desde GitHub Secrets durante el CI/CD pipeline.
 */

export interface Environment {
    production: boolean;
    openWeather: {
        baseUrl: string;
        apiKey: string;
    };
}

export const environment: Environment = {
    production: true,
    openWeather: {
        baseUrl: 'https://api.openweathermap.org/data/2.5',
        apiKey: '__OPENWEATHER_API_KEY__'  // ← Placeholder para GitHub Actions
    }
};
````

## File: src/environments/environment.ts
````typescript
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
````

## File: .editorconfig
````
# Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.ts]
quote_type = single
ij_typescript_use_double_quotes = false

[*.md]
max_line_length = off
trim_trailing_whitespace = false
````

## File: .gemini/GEMINI.md
````markdown
You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
- Do not write arrow functions in templates (they are not supported).

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
````

## File: .gitignore
````
# See https://docs.github.com/get-started/getting-started-with-git/ignoring-files for more about ignoring files.

# Compiled output
/dist
/tmp
/out-tsc
/bazel-out

# Node
/node_modules
npm-debug.log
yarn-error.log

# IDEs and editors
.idea/
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# Visual Studio Code
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.history/*

# Miscellaneous
/.angular/cache
.sass-cache/
/connect.lock
/coverage
/libpeerconnection.log
testem.log
/typings
__screenshots__/

# System files
.DS_Store
Thumbs.db

# Local environment files (contienen API keys personales)
src/environments/environment.local.ts
src/environments/*.local.ts
.env
.env.local

# Playwright
/test-results/
/playwright-report/
/playwright/.cache/
/e2e/screenshots/
````

## File: angular.json
````json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "cli": {
    "packageManager": "npm"
  },
  "newProjectRoot": "projects",
  "projects": {
    "eco-transit-explorer": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "browser": "src/main.ts",
            "tsConfig": "tsconfig.app.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "src/styles.scss"
            ]
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "1MB",
                  "maximumError": "2MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "4kB",
                  "maximumError": "8kB"
                }
              ],
              "outputHashing": "all",
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ]
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            },
            "local": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true,
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.local.ts"
                }
              ]
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "eco-transit-explorer:build:production"
            },
            "development": {
              "buildTarget": "eco-transit-explorer:build:development"
            },
            "local": {
              "buildTarget": "eco-transit-explorer:build:local"
            }
          },
          "defaultConfiguration": "development"
        },
        "test": {
          "builder": "@angular/build:unit-test"
        }
      }
    }
  }
}
````

## File: package.json
````json
{
  "name": "eco-transit-explorer",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "start:local": "ng serve --configuration=local",
    "start:dev": "ng serve --configuration=development",
    "start:prod": "ng serve --configuration=production",
    "build": "ng build",
    "build:local": "ng build --configuration=local",
    "build:dev": "ng build --configuration=development",
    "build:prod": "ng build --configuration=production",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui",
    "e2e:headed": "playwright test --headed",
    "e2e:report": "playwright show-report"
  },
  "prettier": {
    "printWidth": 100,
    "singleQuote": true,
    "overrides": [
      {
        "files": "*.html",
        "options": {
          "parser": "angular"
        }
      }
    ]
  },
  "private": true,
  "packageManager": "npm@11.6.2",
  "dependencies": {
    "@angular/common": "^21.0.0",
    "@angular/compiler": "^21.0.0",
    "@angular/core": "^21.0.0",
    "@angular/forms": "^21.0.0",
    "@angular/platform-browser": "^21.0.0",
    "@angular/router": "^21.0.0",
    "@primeng/themes": "^21.0.4",
    "@primeuix/themes": "^2.0.3",
    "primeflex": "^4.0.0",
    "primeicons": "^7.0.0",
    "primeng": "^21.0.4",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0"
  },
  "devDependencies": {
    "@angular/build": "^21.0.3",
    "@angular/cli": "^21.0.3",
    "@angular/compiler-cli": "^21.0.0",
    "@playwright/test": "^1.58.1",
    "@types/node": "^25.1.0",
    "tsx": "^4.21.0",
    "typescript": "~5.9.2",
    "vitest": "^4.0.8"
  }
}
````

## File: README.md
````markdown
# 🌍 EcoTransit Explorer (Angular 21 Reference Architecture)

![CI](https://github.com/TU-USUARIO/eco-transit-explorer/actions/workflows/ci-cd.yml/badge.svg)

A "Bleeding Edge" portfolio project demonstrating the use of **Angular 21 Zoneless**, **Signals**, **Resource API**, and **PrimeNG** in a real-world weather and transport dashboard application.

## 🌐 Demo en Vivo

**URL:** [https://TU-USUARIO.github.io/eco-transit-explorer/](https://TU-USUARIO.github.io/eco-transit-explorer/)  
_(Reemplaza `TU-USUARIO` con tu username de GitHub una vez que hagas el primer deployment)_

---

## ⚡ Quick Start (Desarrollo Local)

¿Quieres ejecutar el proyecto localmente pero **no tienes API key**?

👉 **Lee la guía completa**: [docs/LOCAL_SETUP.md](docs/LOCAL_SETUP.md)

### Resumen rápido:

1. **Obtén una API key GRATIS** (2 minutos):
   - Regístrate en [openweathermap.org/api](https://openweathermap.org/api)
   - Copia tu API key desde [home.openweathermap.org/api_keys](https://home.openweathermap.org/api_keys)

2. **Configura el environment local**:

   ```bash
   cd src\environments
   copy environment.local.example.ts environment.local.ts
   # Edita environment.local.ts y pega tu API key
   ```

3. **Ejecuta el proyecto**:

   ```bash
   npm run start:local
   ```

4. **Abre el navegador**: `http://localhost:4200/`

✅ Tu API key **NO se subirá** a GitHub (está en `.gitignore`)

---

## 📋 Project Description

**Project 1:** "EcoTransit Explorer"  
**Usage:** Real-time Weather and Open Data (Transport).

This project is not just a technical demo, but a "Real World" use case that integrates external APIs with real constraints, robust error handling, and a scalable architecture.

---

## 🔌 API Integration

### 1. OpenWeatherMap API

- **Source/Docs:** [openweathermap.org/api](https://openweathermap.org/api)
- **Technical Details:** [docs/API_INTEGRATION.md](docs/API_INTEGRATION.md)
- **Usage Context:**
  - Real-time current weather.
  - 5-Day Forecast.
  - Weather maps and city comparisons.
- **Justification:**
  - IT is a typical external API consumption case requiring **API Key** handling, **Rate Limit** management, and error mapping (401, 404, 429).
  - Ideal for "real world" portfolio scenarios, demonstrating control over asynchronous flows and state management.
- **Constraints:**
  - Free tier of approx. 1,000 calls/day (60 per minute).
  - CORS handling (sometimes requires a proxy in production, though managed via configuration in development).

### 2. Datos.gob.es / AEMET OpenData

- **Source/Docs:** [datos.gob.es](https://datos.gob.es) and [opendata.aemet.es](https://opendata.aemet.es)
- **Usage Context:**
  - Public transport data, weather alerts, and air quality.
  - Urban context enrichment (Health, Education, Transport).
- **Justification:**
  - Demonstrates the ability to integrate multiple heterogeneous public data sources.
  - Adds value by cross-referencing weather data with urban infrastructure data.

---

## 🛠 Tech Stack (Strict)

The project follows a modern and strict development methodology:

- **Core:** Angular 21 (Latest) + `provideExperimentalZonelessChangeDetection()`.
- **Reactivity:**
  - **Zoneless:** No `zone.js`. Change detection is manual or via Signals.
  - **Signals:** All local state uses `signal`, `computed`, `linkedSignal`.
  - **Resource API:** Uses `resource` and `rxResource` for asynchronous data fetching.
- **UI / UX:**
  - **Library:** PrimeNG 18+ (Aura Theme) with modern components.
- **Styling:** PrimeFlex (Utilities).
  - **Assets:** `NgOptimizedImage` for efficient image loading.
- **Architecture:**
  - **Feature-Sliced Design:** Clear organization in `core`, `shared`, `features`.
  - **Smart vs Dumb Components:** Strict separation of responsibilities.
  - **Standalone Components:** 100% Standalone (no NgModules).

---

## 🏗 Architecture Decisions

### Zoneless First

The application is configured to run without Zone.js, improving performance and reducing bundle size. We use `ChangeDetectionStrategy.OnPush` implicitly and `AsyncPipe` or Signals to render data.

### Resource API Pattern

We prefer Angular's new `resource` API for most GET requests, simplifying loading state management (loading, error, value). For complex concurrency cases (e.g., City Comparator), we use RxJS interoperability (`forkJoin`).

---

## 📦 Installation and Execution

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd eco-transit-explorer
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Make sure you have your OpenWeatherMap API Key in `src/environments/environment.ts`.

4.  **Run the application:**

    ```bash
    npm start
    ```

5.  **Open in browser:**
    Navigate to `http://localhost:4200/`.

---

## 🚀 CI/CD con GitHub Actions

Este proyecto utiliza **GitHub Actions** para automatizar el build, testing y deployment a GitHub Pages.

### ✅ Pipeline Automático

- **Trigger**: Push a `main` o Pull Request
- **Steps**:
  1.  📥 Checkout del código
  2.  🟌️ Setup Node.js 20
  3.  📚 Instalación de dependencias (`npm ci`)
  4.  🔑 Inyección de API keys desde GitHub Secrets
  5.  🧪 Tests automáticos con `ng test` (runner Vitest por defecto)
  6.  🔨 Build de producción con `--base-href`
  7.  📄 Creación de `404.html` para SPA routing
  8.  🚀 Deploy a GitHub Pages (solo en `main`)

### 🔧 Configurar GitHub Secrets

**IMPORTANTE:** Para que el deployment funcione, debes configurar el secret `OPENWEATHER_API_KEY`:

1. Ve a tu repositorio en GitHub
2. Click en **Settings** → **Secrets and variables** → **Actions**
3. Click en **New repository secret**
4. **Name**: `OPENWEATHER_API_KEY`
5. **Value**: Tu API key de OpenWeatherMap (obtén una gratis en [openweathermap.org](https://openweathermap.org/api))
6. Click en **Add secret**

🚨 **Sin este secret configurado, el build fallará en GitHub Actions.**

### 📋 Habilitar GitHub Pages

Después del primer push con el workflow:

1. Ve a **Settings** → **Pages**
2. En **Source**, selecciona: **GitHub Actions**
3. Guarda los cambios
4. Espera unos minutos y accede a: `https://TU-USUARIO.github.io/eco-transit-explorer/`

---

## 🛮 Rate Limiting y Caching

### 🤔 ¿Por qué implementamos rate limiting?

La API de OpenWeatherMap tiene límites estrictos:

- **Free tier**: 1,000 llamadas/día (60/minuto)
- Sin control, un usuario podría agotar toda la cuota escribiendo en el buscador
- Ejemplo: Escribir "Madrid" letra por letra = 6 requests sin debounce ❌

### ✅ Soluciones Implementadas

#### 1. **Debounce de 500ms en Búsqueda**

- Espera medio segundo después de que el usuario deja de escribir
- Solo entonces ejecuta la búsqueda
- **Resultado**: Escribir "Madrid" letra por letra = **1 solo request** ✅

```typescript
// Implementado en weather-widget.component.ts
effect(() => {
  const city = this.cityInput();
  if (!city.trim()) return;

  // Debounce de 500ms
  this.timeoutId = window.setTimeout(() => {
    this.search.emit(city.trim());
  }, 500);
});
```

#### 2. **Caché de Respuestas (10 minutos)**

- La primera búsqueda de "Madrid" llama a la API
- Las siguientes búsquedas de "Madrid" en los próximos 10 minutos **usan caché**
- **Resultado**: Reducción de ~90% en llamadas redundantes ✅

```typescript
// Implementado en weather.service.ts
private readonly CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutos
```

### 📊 Impacto en Rendimiento

- **Sin optimizaciones**: ~100 requests por sesión de usuario
- **Con debounce + cache**: ~10 requests por sesión de usuario
- **Ahorro**: ~90% de llamadas a la API
- **Beneficios adicionales**:
  - Respuestas instantáneas desde caché
  - Mejor experiencia de usuario
  - Mayor reliability (menos dependencia de la API)

---

## 🔒 Seguridad de API Keys

### 🤔 ¿Mi API Key está segura con GitHub Secrets?

**Respuesta corta**: No completamente, pero es lo mejor que podemos hacer en un frontend.

**Explicación técnica**:

1. ✅ **Durante el build**: GitHub Secrets **SI protege** la key (está encriptada y no visible en logs)
2. ❌ **En el bundle final**: La key **queda embebida** en el JavaScript compilado
3. ⚠️ **Cualquiera puede encontrarla**: Abrir DevTools → Sources → Buscar "api.openweathermap.org"

### ✅ Mitigaciones Aplicadas

#### 1. **Restricciones de Dominio en OpenWeatherMap**

⚠️ **Nota del desarrollador**: No es posible aplicar restricciones de dominio en el plan Free de OpenWeatherMap. Esta sería la mitigación ideal pero no está disponible en este proyecto.

En planes pagos, podrías:

- Limitar la key a dominios específicos (ej: `*.github.io`, `localhost`)
- Si alguien copia la key, **no funcionará** en su propio sitio

#### 2. **Rate Limiting + Caché** ✅

- Limita el abuso de la cuota
- Hace más difícil consumir los 1,000 calls/día

#### 3. **Monitoring** (Recomendado)

- Revisa tu dashboard de OpenWeatherMap regularmente
- Configura alertas de uso excesivo
- Rota la API key si detectas abuso

#### 4. **Backend Proxy** (Para Producción Real)

Para proyectos con datos sensibles o en producción:

- Usa Netlify Functions, Vercel Edge Functions, o AWS Lambda
- El **backend guarda la key**, el frontend llama al backend
- Implementa autenticación en el backend
- **Resultado**: API key nunca se expone al cliente

```
Frontend → Backend Proxy (con API key) → OpenWeatherMap
         ↑ Solo llamadas autenticadas
```

### 📝 Conclusión

Este proyecto es un **portfolio/demo educativo**, NO una aplicación de producción. La exposición de la API key de OpenWeatherMap es **aceptable** para este caso de uso porque:

- ✅ Es una key de free tier con límites naturales
- ✅ Las mitigaciones reducen el abuso
- ✅ Podemos rotarla fácilmente si es necesario
- ✅ Demuestra las mejores prácticas posibles en un contexto frontend

Para producción real con datos sensibles, **SIEMPRE usa un backend proxy**.

---

## 🧪 Testing

- **Unit Testing:** `ng test` (Angular CLI unit-test, runner Vitest por defecto).
- **E2E Testing:** Playwright (Page Object Model pattern).
- **CI/CD:** GitHub Actions execution for every push.

---

> **Note:** This project is constantly evolving to adopt the latest "Bleeding Edge" Angular features as soon as they become available.
````

## File: src/app/app.config.ts
````typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { MessageService } from 'primeng/api';
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } from './core/api/api.tokens';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpErrorInterceptor } from './core/api/http-error-interceptor';
import { rateLimitInterceptor } from './core/interceptors/rate-limit.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    MessageService,
    provideRouter(routes),
    provideZonelessChangeDetection(),
    provideHttpClient(
      withInterceptors([rateLimitInterceptor, httpErrorInterceptor])
    ),
    { provide: OPENWEATHER_BASE_URL, useValue: environment.openWeather.baseUrl },
    { provide: OPENWEATHER_API_KEY, useValue: environment.openWeather.apiKey }
  ]
};
````

## File: src/app/app.html
````html
<div class="min-h-screen surface-ground flex flex-column">
    <p-toast position="bottom-center" />
    <p-menubar [model]="items">
        <ng-template pTemplate="start">
            <div class="flex align-items-center gap-2 mr-4">
                <i class="pi pi-cloud text-primary text-2xl"></i>
                <span class="font-bold text-xl text-900">EcoTransit</span>
            </div>
        </ng-template>
    </p-menubar>

    <div class="flex-grow-1 flex flex-column">
        <router-outlet></router-outlet>
    </div>

    <footer class="text-center py-1 text-500 text-xs" style="line-height: 1;">
        EcoTransit Explorer © {{ currentYear() }} - Angular 21 Reference App
    </footer>
</div>
````

## File: src/app/app.routes.ts
````typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/weather/containers/weather-page/weather-page.component').then(m => m.WeatherPageComponent)
    },
    {
        path: 'compare',
        loadComponent: () => import('./features/weather/containers/weather-comparison/weather-comparison.component').then(m => m.WeatherComparisonComponent)
    },
    {
        path: 'transit',
        loadComponent: () => import('./features/transit/components/transit-dashboard/transit-dashboard.component').then(m => m.TransitDashboardComponent)
    },
    {
        // Wildcard route: SIEMPRE debe ser la última ruta
        // Captura todas las rutas que no coinciden con las anteriores
        path: '**',
        loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent)
    }
];
````

## File: src/app/app.scss
````scss
:host { display: block; }
````

## File: src/app/app.spec.ts
````typescript
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, eco-transit-explorer');
  });
});
````

## File: src/app/app.ts
````typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { MenuItem, SharedModule } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule, SharedModule, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('eco-transit-explorer');
  protected readonly currentYear = signal(new Date().getFullYear());

  items: MenuItem[] = [
    { label: 'Weather', icon: 'pi pi-fw pi-cloud', routerLink: '/' },
    { label: 'Comparison', icon: 'pi pi-fw pi-list', routerLink: '/compare' },
    { label: 'Transit', icon: 'pi pi-fw pi-directions', routerLink: '/transit' }
  ];
}
````

## File: src/index.html
````html
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>EcoTransitExplorer</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="preconnect" href="https://openweathermap.org">
</head>

<body>
  <app-root></app-root>
</body>

</html>
````

## File: src/main.ts
````typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
````

## File: src/styles.scss
````scss
/* You can add global styles to this file, and also import other style files */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
@import "primeicons/primeicons.css";
@import "primeflex/primeflex.css";

/* ================================
   CSS VARIABLES - GLASSMORPHISM
   ================================ */
:root {
  /* Glassmorphism Effect */
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-bg-strong: rgba(255, 255, 255, 0.15);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  --glass-shadow-hover: 0 12px 40px 0 rgba(31, 38, 135, 0.25);
  
  /* Typography */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* ================================
   BASE STYLES
   ================================ */
* {
  font-family: var(--font-primary);
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--font-primary);
  overflow-x: hidden;
}

/* ================================
   GLASSMORPHISM UTILITIES
   ================================ */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card-strong {
  background: var(--glass-bg-strong);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card-strong:hover {
  transform: translateY(-4px);
  box-shadow: var(--glass-shadow-hover);
}

/* ================================
   DYNAMIC WEATHER BACKGROUNDS
   ================================ */
.weather-container {
  flex: 1;
  padding: 2rem 1rem;
  transition: background 0.6s ease;
}

/* Clear / Sunny */
.weather-bg-clear {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
}

/* Rainy / Drizzle */
.weather-bg-rain {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #5e7a9b 100%);
}

/* Cloudy */
.weather-bg-clouds {
  background: linear-gradient(135deg, #757f9a 0%, #5a6570 50%, #3e4a59 100%);
}

/* Snowy */
.weather-bg-snow {
  background: linear-gradient(135deg, #4A90E2 0%, #5B9BD5 50%, #7FA9D8 100%);
}

/* Default / Unknown - Ocean/Teal Theme */
.weather-bg-default {
  background: linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%);
}

/* ================================
   ANIMATIONS
   ================================ */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ================================
   TYPOGRAPHY UTILITIES
   ================================ */
.text-extra-bold {
  font-weight: 800;
}

.text-display {
  font-size: 4rem;
  line-height: 1.1;
  font-weight: 800;
}

/* Responsive text display */
@media (max-width: 768px) {
  .text-display {
    font-size: 3rem;
  }
}

/* ================================
   ACCESSIBILITY UTILITIES
   ================================ */

/* Screen Reader Only - Oculta visualmente pero mantiene accesible para lectores de pantalla */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Focus Visible - Mejora el indicador de focus para navegación por teclado */
*:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Texto con contraste validado WCAG AA (4.5:1) */
.glass-card {
  /* Mejorar contraste de textos secundarios sobre glass-card */
  .text-secondary,
  .update-time,
  .forecast-date {
    color: rgba(255, 255, 255, 0.95); /* Aumentado de 0.7 para cumplir 4.5:1 */
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5); /* Sombra para mejorar legibilidad */
  }
  
  /* Textos primarios - siempre máximo contraste */
  .city-name,
  .temperature-display,
  .forecast-day {
    color: rgba(255, 255, 255, 1);
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  }
}
````

## File: tsconfig.app.json
````json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "src/**/*.spec.ts"
  ]
}
````

## File: tsconfig.json
````json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "compileOnSave": false,
  "compilerOptions": {
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "ES2022",
    "module": "preserve",
    "noUnusedLocals": true,
    "noUnusedParameters": true
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  },
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.spec.json"
    }
  ]
}
````

## File: tsconfig.spec.json
````json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
      "vitest/globals"
    ]
  },
  "include": [
    "src/**/*.d.ts",
    "src/**/*.spec.ts"
  ]
}
````
