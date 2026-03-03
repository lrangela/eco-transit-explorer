# 🌍 EcoTransit Explorer (Angular 21 Reference Architecture)

![CI](https://github.com/lrangela/eco-transit-explorer/actions/workflows/ci-cd.yml/badge.svg)

A "Bleeding Edge" portfolio project demonstrating the use of **Angular 21 Zoneless**, **Signals**, **Resource API**, and **PrimeNG** in a real-world weather and transport dashboard application.

## 🌐 Demo en Vivo

**URL:** [https://lrangela.github.io/eco-transit-explorer/](https://lrangela.github.io/eco-transit-explorer/)

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
4. Espera unos minutos y accede a: `https://lrangela.github.io/eco-transit-explorer/`

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
