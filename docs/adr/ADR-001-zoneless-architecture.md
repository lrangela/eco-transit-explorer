# ADR-001: Zoneless Architecture

## English

- Status: Accepted
- Date: 2026-01-31
- Angular Version: 21.x

### Context

The application is designed around Angular's zoneless change detection so that updates are driven by signals and explicit reactive primitives instead of Zone.js patching.

### Decision

The application uses:

- `provideZonelessChangeDetection()` in `src/app/app.config.ts`
- signals for local state
- `computed()` for derived UI state
- `resource` and `rxResource` for asynchronous data flows

### Consequences

Benefits:

- smaller runtime surface without Zone.js
- explicit reactivity
- better alignment with modern Angular APIs

Costs:

- third-party libraries may require test or browser shims
- some asynchronous tests are more sensitive to scheduling details

## Español

- Estado: Aceptado
- Fecha: 2026-01-31
- Versión Angular: 21.x

### Contexto

La aplicación está diseñada alrededor de la detección de cambios zoneless de Angular para que las actualizaciones dependan de signals y primitivas reactivas explícitas, no del parcheo de Zone.js.

### Decisión

La aplicación usa:

- `provideZonelessChangeDetection()` en `src/app/app.config.ts`
- signals para estado local
- `computed()` para estado derivado de UI
- `resource` y `rxResource` para flujos asíncronos

### Consecuencias

Beneficios:

- menor superficie de runtime sin Zone.js
- reactividad explícita
- mejor alineación con APIs modernas de Angular

Costes:

- algunas librerías third-party pueden necesitar shims en navegador o tests
- ciertas pruebas asíncronas son más sensibles al scheduling
