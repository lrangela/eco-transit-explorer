import { describe, expect, it } from 'vitest';
import {
  DEFAULT_RUNTIME_CONFIG,
  RuntimeConfigIssue,
  sanitizeRuntimeConfig,
} from './runtime-config.types';

function findIssue(issues: RuntimeConfigIssue[], path: string): RuntimeConfigIssue | undefined {
  return issues.find((issue) => issue.path === path);
}

describe('sanitizeRuntimeConfig', () => {
  it('should keep valid runtime config values', () => {
    const result = sanitizeRuntimeConfig({
      api: {
        weatherBaseUrl: 'https://cn-api.openweathermap.org/data/2.5',
        weatherApiKey: 'test-weather-key',
        weatherUnits: 'metric',
        weatherLanguage: 'es-PE',
        transitBaseUrl: 'https://api.citybik.es/v2',
      },
      features: {
        comparison: false,
        transit: true,
      },
      observability: {
        consoleLogging: true,
      },
    });

    expect(result.hasBlockingIssues).toBe(false);
    expect(result.issues).toEqual([]);
    expect(result.config).toEqual({
      api: {
        weatherBaseUrl: 'https://cn-api.openweathermap.org/data/2.5',
        weatherApiKey: 'test-weather-key',
        weatherUnits: 'metric',
        weatherLanguage: 'es-PE',
        transitBaseUrl: 'https://api.citybik.es/v2',
      },
      features: {
        comparison: false,
        transit: true,
      },
      observability: {
        consoleLogging: true,
      },
    });
  });

  it('should mark invalid URLs and enums as blocking issues', () => {
    const result = sanitizeRuntimeConfig({
      api: {
        weatherBaseUrl: 'http://insecure.example.com',
        weatherApiKey: 'configured-key',
        weatherUnits: 'kelvin',
        weatherLanguage: 'spanish',
        transitBaseUrl: 'not-a-url',
      },
    });

    expect(result.hasBlockingIssues).toBe(true);
    expect(findIssue(result.issues, 'api.weatherBaseUrl')?.severity).toBe('error');
    expect(findIssue(result.issues, 'api.weatherUnits')?.severity).toBe('error');
    expect(findIssue(result.issues, 'api.weatherLanguage')?.severity).toBe('error');
    expect(findIssue(result.issues, 'api.transitBaseUrl')?.severity).toBe('error');
    expect(result.config.api.weatherBaseUrl).toBe(DEFAULT_RUNTIME_CONFIG.api.weatherBaseUrl);
    expect(result.config.api.transitBaseUrl).toBe(DEFAULT_RUNTIME_CONFIG.api.transitBaseUrl);
    expect(result.config.api.weatherUnits).toBe(DEFAULT_RUNTIME_CONFIG.api.weatherUnits);
    expect(result.config.api.weatherLanguage).toBe(DEFAULT_RUNTIME_CONFIG.api.weatherLanguage);
  });

  it('should classify a missing weather key as a warning', () => {
    const result = sanitizeRuntimeConfig({
      api: {
        weatherBaseUrl: 'https://api.openweathermap.org/data/2.5',
        weatherUnits: 'metric',
        weatherLanguage: 'en',
        transitBaseUrl: 'https://api.citybik.es/v2',
      },
      features: {
        comparison: true,
        transit: true,
      },
      observability: {
        consoleLogging: false,
      },
    });

    expect(result.hasBlockingIssues).toBe(false);
    expect(findIssue(result.issues, 'api.weatherApiKey')?.severity).toBe('warning');
    expect(result.config.api.weatherApiKey).toBe(DEFAULT_RUNTIME_CONFIG.api.weatherApiKey);
  });

  it('should reject non-object payloads', () => {
    const result = sanitizeRuntimeConfig('invalid');

    expect(result.config).toEqual(DEFAULT_RUNTIME_CONFIG);
    expect(result.hasBlockingIssues).toBe(true);
    expect(result.issues).toEqual([
      {
        path: 'root',
        message: 'Runtime config root must be an object. Falling back to defaults.',
        severity: 'error',
      },
    ]);
  });
});
