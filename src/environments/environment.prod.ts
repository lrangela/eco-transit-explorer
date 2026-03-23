import { Environment } from './environment.model';

/**
 * Environment configuration for PRODUCTION builds.
 *
 * Este archivo solo define banderas de build del frontend.
 * Las credenciales de proveedores externos deben permanecer fuera del cliente
 * y resolverse en el backend proxy o gateway.
 */

export const environment: Environment = {
    production: true
};
