# Local Setup

## English

### Prerequisites

- Node.js compatible with the repository toolchain
- npm
- An OpenWeatherMap API key

### Local Environment File

Create the local file from the example:

```bash
cd src\environments
copy environment.local.example.ts environment.local.ts
```

Open `environment.local.ts` and replace `YOUR_API_KEY_HERE` with a valid API key.

Important:

- `environment.local.ts` is ignored by Git
- it must not be committed
- CI does not use this file

### Start Commands

- `npm run start:local`
  - uses `environment.local.ts`
  - recommended for local development with a personal API key

- `npm run start:dev`
  - uses `environment.development.ts`
  - intended for committed development configuration and CI-oriented scenarios

- `npm start`
  - uses the default serve target
  - not recommended when the local API key is only present in `environment.local.ts`

### Verification

1. Run:

   ```bash
   npm run start:local
   ```

2. Open `http://localhost:4200/`
3. Search for a city such as `Madrid` or `London`
4. Confirm that current weather and forecast data render correctly

### Troubleshooting

#### `environment.local.ts` not found

Create it again from the example:

```bash
copy src\environments\environment.local.example.ts src\environments\environment.local.ts
```

#### Invalid API key or `401`

- verify the copied key
- wait a few minutes after creating a new OpenWeatherMap account
- confirm that `npm run start:local` is being used instead of `npm start`

#### App loads but weather data does not appear

- verify the key in `environment.local.ts`
- verify network requests in the browser devtools
- confirm that the searched city exists

## Español

### Prerrequisitos

- Node.js compatible con el toolchain del repositorio
- npm
- Una API key de OpenWeatherMap

### Archivo de Entorno Local

Crear el archivo local a partir del ejemplo:

```bash
cd src\environments
copy environment.local.example.ts environment.local.ts
```

Abrir `environment.local.ts` y reemplazar `YOUR_API_KEY_HERE` por una API key válida.

Importante:

- `environment.local.ts` está ignorado por Git
- no debe versionarse
- CI no usa este archivo

### Comandos de Inicio

- `npm run start:local`
  - usa `environment.local.ts`
  - recomendado para desarrollo local con API key personal

- `npm run start:dev`
  - usa `environment.development.ts`
  - pensado para configuración de desarrollo versionada y escenarios orientados a CI

- `npm start`
  - usa el target por defecto de Angular
  - no es recomendable si la API key local solo existe en `environment.local.ts`

### Verificación

1. Ejecutar:

   ```bash
   npm run start:local
   ```

2. Abrir `http://localhost:4200/`
3. Buscar una ciudad como `Madrid` o `London`
4. Confirmar que se renderizan el clima actual y el pronóstico

### Solución de Problemas

#### No existe `environment.local.ts`

Crearlo nuevamente desde el ejemplo:

```bash
copy src\environments\environment.local.example.ts src\environments\environment.local.ts
```

#### API key inválida o error `401`

- verificar la clave copiada
- esperar unos minutos tras crear una cuenta nueva en OpenWeatherMap
- confirmar que se está usando `npm run start:local` y no `npm start`

#### La app carga pero no aparecen datos del clima

- verificar la clave en `environment.local.ts`
- revisar las peticiones de red en devtools
- confirmar que la ciudad buscada existe
