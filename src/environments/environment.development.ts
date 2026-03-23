import { Environment } from './environment.model';

/**
 * Environment de desarrollo versionado.
 *
 * Los secretos del proveedor climático no pertenecen al frontend.
 * Las URLs base y feature flags se cargan desde `public/runtime-config.json`.
 * `environment.local.ts` solo debe usarse para overrides locales de Angular.
 */
export const environment: Environment = {
    production: false
};
