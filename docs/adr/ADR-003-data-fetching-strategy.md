# ADR-003: Data Fetching Strategy

## English

- Date: 2026-01-29
- Status: Accepted

### Context

The project needs a signal-friendly data-fetching model that works without Zone.js while still allowing RxJS operators for retries, mapping, and concurrency.

### Decision

The current implementation uses:

- `rxResource` for weather and transit data streams that depend on signals
- `resource` for comparison flows that bridge promise-based orchestration into Angular reactivity
- RxJS operators for retry logic, mapping, and concurrent requests
- `firstValueFrom` when a promise boundary is useful for one-shot request orchestration

### Consequences

Benefits:

- compatible with zoneless change detection
- keeps components focused on reading reactive state
- allows RxJS orchestration where it still adds value

Trade-offs:

- mixed mental model: signals, resources, observables, and promises all exist in the codebase
- some tests require extra care because resources and signals schedule work asynchronously

## Español

- Fecha: 2026-01-29
- Estado: Aceptado

### Contexto

El proyecto necesita un modelo de data fetching compatible con Signals y sin Zone.js, pero que siga permitiendo usar operadores RxJS para reintentos, mapeo y concurrencia.

### Decisión

La implementación actual usa:

- `rxResource` para flujos de clima y tránsito dependientes de signals
- `resource` para comparaciones que conectan orquestación basada en promesas con la reactividad de Angular
- operadores RxJS para reintentos, mapeo y peticiones concurrentes
- `firstValueFrom` cuando conviene un límite tipo promesa para orquestación de peticiones one-shot

### Consecuencias

Beneficios:

- compatible con detección de cambios zoneless
- mantiene los componentes centrados en leer estado reactivo
- permite usar orquestación RxJS donde todavía aporta valor

Trade-offs:

- existe un modelo mental mixto: signals, resources, observables y promesas
- algunas pruebas requieren más cuidado porque resources y signals programan trabajo de forma asíncrona
