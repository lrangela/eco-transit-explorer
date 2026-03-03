# Scripts and Environment Configuration

## English

### npm Scripts

#### Serve

- `npm start`: default Angular serve target
- `npm run start:local`: serve using `environment.local.ts`
- `npm run start:dev`: serve using `environment.development.ts`
- `npm run start:prod`: serve using the production target

#### Build

- `npm run build`: production build
- `npm run build:local`: local build using `environment.local.ts`
- `npm run build:dev`: development build
- `npm run build:prod`: production build

#### Tests

- `npm run test`: unit tests via `@angular/build:unit-test`
- `npm run e2e`: Playwright E2E suite
- `npm run e2e:ui`: Playwright UI mode
- `npm run e2e:headed`: headed Playwright execution

### angular.json Configurations

The application defines:

- `development`
- `production`
- `local`

The `local` configuration replaces:

```json
{
  "replace": "src/environments/environment.ts",
  "with": "src/environments/environment.local.ts"
}
```

### Notes

- `npm run start:local` is the intended local workflow when using a personal API key
- `npm run start:dev` is the committed development path and is used by CI-related tooling where a tracked environment is required
- `npm run test` currently runs with `jsdom` available in dev dependencies

## Español

### Scripts npm

#### Serve

- `npm start`: target por defecto de Angular
- `npm run start:local`: serve usando `environment.local.ts`
- `npm run start:dev`: serve usando `environment.development.ts`
- `npm run start:prod`: serve usando el target de producción

#### Build

- `npm run build`: build de producción
- `npm run build:local`: build local usando `environment.local.ts`
- `npm run build:dev`: build de desarrollo
- `npm run build:prod`: build de producción

#### Pruebas

- `npm run test`: pruebas unitarias vía `@angular/build:unit-test`
- `npm run e2e`: suite E2E con Playwright
- `npm run e2e:ui`: modo UI de Playwright
- `npm run e2e:headed`: ejecución visible de Playwright

### Configuraciones de angular.json

La aplicación define:

- `development`
- `production`
- `local`

La configuración `local` reemplaza:

```json
{
  "replace": "src/environments/environment.ts",
  "with": "src/environments/environment.local.ts"
}
```

### Notas

- `npm run start:local` es el flujo recomendado para desarrollo local con API key personal
- `npm run start:dev` es la ruta de desarrollo versionada y se usa en herramientas asociadas a CI cuando hace falta un entorno trackeado
- `npm run test` ejecuta las pruebas unitarias con `jsdom` disponible en dev dependencies
