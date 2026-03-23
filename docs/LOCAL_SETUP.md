# Local Setup

## English

### Real Problem

Developers need to run the project locally without committing secrets and without depending on a backend service that does not exist in production.

### Solution

Local execution uses `src/environments/environment.local.ts` as a Git-ignored override while the tracked runtime config stays safe and secret-free.

### Stack

- Node.js 20+
- npm
- Angular CLI
- OpenWeather API key for local weather calls

### Technical Decisions

- `environment.local.ts` is the only place where a local real key is expected
- `runtime-config.json` remains a deployment template
- `start:local` uses Angular file replacement
- `start:dev` is reserved for versioned config and CI-like runs

### How to Run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create the local override:

   ```bash
   copy src\environments\environment.local.example.ts src\environments\environment.local.ts
   ```

3. Add your OpenWeather API key.

4. Start the app:

   ```bash
   npm run start:local
   ```

5. Open `http://localhost:4200/`.

### Troubleshooting

- `401` or `403`
  - verify the API key
  - verify the selected `weatherBaseUrl`
  - if required for your region, use `https://cn-api.openweathermap.org/data/2.5`

- app loads but no weather data
  - inspect browser network requests
  - verify the searched city exists

## Español

### Problema real

Los desarrolladores necesitan correr el proyecto localmente sin versionar secretos y sin depender de un backend que no existe en producción.

### Solución

La ejecución local usa `src/environments/environment.local.ts` como override ignorado por Git, mientras que la configuración runtime versionada se mantiene segura y sin secretos.

### Stack

- Node.js 20+
- npm
- Angular CLI
- API key de OpenWeather para llamadas locales de clima

### Decisiones técnicas

- `environment.local.ts` es el único lugar donde se espera una key real local
- `runtime-config.json` se mantiene como plantilla de despliegue
- `start:local` usa file replacement de Angular
- `start:dev` queda para configuración versionada y ejecuciones tipo CI

### Cómo correr

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Crea el override local:

   ```bash
   copy src\environments\environment.local.example.ts src\environments\environment.local.ts
   ```

3. Agrega tu API key de OpenWeather.

4. Inicia la app:

   ```bash
   npm run start:local
   ```

5. Abre `http://localhost:4200/`.

### Solución de problemas

- `401` o `403`
  - verifica la API key
  - verifica el `weatherBaseUrl`
  - si tu región lo requiere, usa `https://cn-api.openweathermap.org/data/2.5`

- la app carga pero no aparecen datos
  - revisa las peticiones en el navegador
  - confirma que la ciudad buscada existe
