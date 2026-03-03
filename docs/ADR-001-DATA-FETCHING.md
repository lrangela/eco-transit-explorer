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
